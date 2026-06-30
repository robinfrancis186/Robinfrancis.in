import { readFile } from 'node:fs/promises';

const DEFAULT_SITEMAP_PATH = 'public/sitemap.xml';
const DEFAULT_KEY_FILE_PATH = 'public/a3b70c9d8aec4d78a9cae418efcadd37.txt';
const DEFAULT_KEY_LOCATION = 'https://www.robinfrancis.in/a3b70c9d8aec4d78a9cae418efcadd37.txt';
const INDEXNOW_ENDPOINT = 'https://api.indexnow.org/IndexNow';

function getArgValue(flag) {
  const index = process.argv.indexOf(flag);
  if (index === -1) {
    return undefined;
  }

  return process.argv[index + 1];
}

function hasFlag(flag) {
  return process.argv.includes(flag);
}

function getLocEntries(xml) {
  return [...xml.matchAll(/<loc>(.*?)<\/loc>/gsi)]
    .map((match) => match[1]?.trim())
    .filter(Boolean);
}

async function main() {
  const sitemapPath = getArgValue('--sitemap') ?? DEFAULT_SITEMAP_PATH;
  const keyFilePath = getArgValue('--key-file') ?? DEFAULT_KEY_FILE_PATH;
  const keyLocation = getArgValue('--key-location') ?? DEFAULT_KEY_LOCATION;
  const dryRun = hasFlag('--dry-run');

  const [sitemapXml, key] = await Promise.all([
    readFile(sitemapPath, 'utf8'),
    readFile(keyFilePath, 'utf8'),
  ]);

  const urlList = getLocEntries(sitemapXml);
  if (urlList.length === 0) {
    throw new Error(`No URLs found in sitemap: ${sitemapPath}`);
  }

  const host = new URL(urlList[0]).host;
  const trimmedKey = key.trim();

  if (!trimmedKey) {
    throw new Error(`IndexNow key file is empty: ${keyFilePath}`);
  }

  const payload = {
    host,
    key: trimmedKey,
    keyLocation,
    urlList,
  };

  if (dryRun) {
    console.log(JSON.stringify(payload, null, 2));
    return;
  }

  const response = await fetch(INDEXNOW_ENDPOINT, {
    method: 'POST',
    headers: {
      'content-type': 'application/json; charset=utf-8',
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const responseText = await response.text();
    throw new Error(`IndexNow submission failed with ${response.status}: ${responseText}`);
  }

  console.log(`Submitted ${urlList.length} URL(s) to IndexNow for ${host}.`);
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : String(error));
  process.exit(1);
});
