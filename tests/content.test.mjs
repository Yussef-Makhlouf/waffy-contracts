import test from 'node:test';
import assert from 'node:assert/strict';
import { phoneHref, whatsappHref, socialHref, contactLinks, contact } from '../src/config/contact.ts';
import { services, networkCategories, serviceGroups } from '../src/content/services.ts';

test('missing and malformed numbers never produce live contact destinations', () => {
  for (const number of [null, '', '0551234567', '+966 551234567', '+00012345678', '+123', 'javascript:alert(1)']) {
    assert.equal(phoneHref(number), null);
    assert.equal(whatsappHref(number), null);
  }
  assert.equal(contactLinks.phone, null);
  assert.equal(contactLinks.whatsapp, null);
});
test('social slots remain unlinked until valid official HTTPS destinations are configured', () => {
  assert.equal(contact.socialLinks.length, 4);
  assert.equal(new Set(contact.socialLinks.map(profile => profile.platform)).size, 4);
  for (const profile of contact.socialLinks) assert.equal(socialHref(profile.url), null);
  for (const value of [null, '', '#', 'javascript:alert(1)', 'http://example.com', 'https://user:password@example.com']) assert.equal(socialHref(value), null);
  assert.equal(socialHref('https://example.com/company'), 'https://example.com/company');
});

test('international numbers produce correct telephone and encoded WhatsApp links', () => {
  // Reserved fictional NANP test range, used in tests only.
  const number = '+12025550123';
  const message = 'السلام عليكم، أريد مناقشة مشروع & تفاصيله';
  assert.equal(phoneHref(number), 'tel:+12025550123');
  const url = new URL(whatsappHref(number, message));
  assert.equal(url.hostname, 'wa.me');
  assert.equal(url.pathname, '/12025550123');
  assert.equal(url.searchParams.get('text'), message);
  assert.equal(whatsappHref(number), 'https://wa.me/12025550123');
});
test('every service has a unique anchor, an existing group, and explicit pending approval', () => {
  assert.equal(services.length, 10);
  assert.equal(new Set(services.map(s => s.id)).size, services.length);
  for (const service of services) {
    assert.match(service.id, /^[a-z]+(?:-[a-z]+)*$/);
    assert.ok(serviceGroups.some(group => group.id === service.group));
    assert.equal(service.approvalStatus, 'pending');
    assert.ok(service.description.length > service.short.length);
  }
  assert.equal(new Set(networkCategories.map(s => s.id)).size, 6);
});
