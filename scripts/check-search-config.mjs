import nextEnv from '@next/env';
import { searchConfiguration, resolveSiteOrigin } from '../src/lib/search-utils.ts';

// Match Next's production env loading, including .env.local, without printing secrets.
nextEnv.loadEnvConfig(process.cwd(), false);
const configured = process.env.NEXT_PUBLIC_SITE_URL;
const config = searchConfiguration(process.env);
const flag = process.env.NEXT_PUBLIC_SITE_INDEXABLE?.trim().toLowerCase();
if (flag && !['true', 'false'].includes(flag)) {
  console.error('Invalid NEXT_PUBLIC_SITE_INDEXABLE: use true or false. Indexing remains disabled.');
  process.exitCode = 1;
} else if (configured?.trim() && !resolveSiteOrigin(configured)) {
  console.error('Invalid NEXT_PUBLIC_SITE_URL: use a public HTTPS origin without a path, query, credentials, or port.');
  process.exitCode = 1;
} else if (!config.indexable) {
  console.log('Preview mode: noindex, robots disallow, and no public sitemap entries.');
  console.log('Add the owned production domain and enable indexing when ready, then rebuild.');
  if (process.argv.includes('--production')) process.exitCode = 1;
} else {
  console.log(`Production search configuration ready: ${config.origin}`);
  console.log('Deploy, verify domain ownership, and submit /sitemap.xml in Google Search Console and Bing Webmaster Tools.');
}
