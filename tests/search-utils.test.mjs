import { test } from 'node:test';
import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { resolveSiteOrigin, searchConfiguration, publicUrl, serializeJsonLd } from '../src/lib/search-utils.ts';

test('public indexing requires an explicit secure public origin', () => {
  for (const value of [undefined, '', ' ', 'not a URL', 'http://example.com', 'https://localhost', 'https://127.0.0.1', 'https://[::1]', 'https://preview.local', 'https://preview.test', 'https://example.com/services', 'https://example.com/?campaign=1', 'https://example.com/#home', 'https://user:secret@example.com', 'https://example.com:3000']) {
    assert.equal(resolveSiteOrigin(value), null, String(value));
  }
  // Reserved documentation origin used in tests only.
  assert.equal(resolveSiteOrigin(' https://EXAMPLE.com/ '), 'https://example.com');
  assert.deepEqual(searchConfiguration({}), { origin: null, indexable: false });
  assert.deepEqual(searchConfiguration({ NEXT_PUBLIC_SITE_URL: 'https://example.com', NEXT_PUBLIC_SITE_INDEXABLE: 'false' }), { origin: 'https://example.com', indexable: false });
  assert.deepEqual(searchConfiguration({ NEXT_PUBLIC_SITE_URL: 'https://example.com' }), { origin: 'https://example.com', indexable: true });
  for (const flag of ['false', ' FALSE ', 'typo']) assert.equal(searchConfiguration({ NEXT_PUBLIC_SITE_URL: 'https://example.com', NEXT_PUBLIC_SITE_INDEXABLE: flag }).indexable, false);
});

test('canonical, breadcrumb and sitemap URLs share an origin and preserve paths', () => {
  assert.equal(publicUrl(null, '/services'), undefined);
  assert.equal(publicUrl('https://example.com', '/'), 'https://example.com/');
  assert.equal(publicUrl('https://example.com', '/services/network-it#cabling'), 'https://example.com/services/network-it#cabling');
  for (const path of ['//other.test', 'https://other.test', '/\\other.test']) assert.throws(() => publicUrl('https://example.com', path));
});

test('JSON-LD preserves Arabic content while preventing script breakout', () => {
  const value = { name: 'الوافي', text: '</script><script>alert(1)</script>\u2028\u2029' };
  const serialized = serializeJsonLd(value);
  assert.equal(serialized.includes('<'), false);
  assert.equal(serialized.includes('\u2028'), false);
  assert.equal(serialized.includes('\u2029'), false);
  assert.deepEqual(JSON.parse(serialized), value);
});

test('readiness command accepts preview mode and rejects an unconfigured launch', () => {
  const cases = [
    { origin: '', args: [], status: 0, message: 'Preview mode' },
    { origin: '', args: ['--production'], status: 1, message: 'Preview mode' },
    { origin: 'https://localhost', args: [], status: 1, message: 'Invalid NEXT_PUBLIC_SITE_URL' },
    { origin: 'https://example.com', args: ['--production'], status: 0, message: 'Production search configuration ready' },
  ];
  for (const fixture of cases) {
    const result = spawnSync(process.execPath, ['scripts/check-search-config.mjs', ...fixture.args], {
      encoding: 'utf8', env: { ...process.env, NEXT_PUBLIC_SITE_URL: fixture.origin, NEXT_PUBLIC_SITE_INDEXABLE: 'true' },
    });
    assert.equal(result.status, fixture.status, result.stderr);
    assert.ok(`${result.stdout}${result.stderr}`.includes(fixture.message));
  }
});
