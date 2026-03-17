import tls from 'node:tls';

function getArgValue(flag, fallback) {
  const index = process.argv.indexOf(flag);
  if (index === -1 || index === process.argv.length - 1) {
    return fallback;
  }

  return process.argv[index + 1];
}

function readTlsCertificate(host) {
  return new Promise((resolve, reject) => {
    const socket = tls.connect(
      {
        host,
        port: 443,
        servername: host,
        rejectUnauthorized: true,
      },
      () => {
        const certificate = socket.getPeerCertificate();
        const authorizationError = socket.authorized ? null : socket.authorizationError;
        socket.end();
        resolve({ certificate, authorizationError });
      }
    );

    socket.setTimeout(10000);
    socket.on('timeout', () => {
      socket.destroy();
      reject(new Error(`TLS timeout while checking ${host}`));
    });
    socket.on('error', (error) => reject(error));
  });
}

async function main() {
  const host = getArgValue('--host', 'www.robinfrancis.in');
  const minDays = Number(getArgValue('--min-days', '21'));
  if (!Number.isFinite(minDays) || minDays < 0) {
    throw new Error(`Invalid --min-days value: ${minDays}`);
  }

  const { certificate, authorizationError } = await readTlsCertificate(host);
  const validTo = certificate?.valid_to;
  if (!validTo) {
    throw new Error(`No TLS certificate validity data returned for ${host}`);
  }

  const expiresAt = new Date(validTo);
  if (Number.isNaN(expiresAt.getTime())) {
    throw new Error(`Unable to parse certificate expiry for ${host}: ${validTo}`);
  }

  const now = Date.now();
  const daysRemaining = (expiresAt.getTime() - now) / (1000 * 60 * 60 * 24);

  console.log(`TLS check host=${host}`);
  console.log(`Issuer: ${certificate.issuer?.O || 'Unknown'} (${certificate.issuer?.CN || 'Unknown CN'})`);
  console.log(`Subject: ${certificate.subject?.CN || 'Unknown'}`);
  console.log(`Valid from: ${certificate.valid_from}`);
  console.log(`Valid to: ${validTo}`);
  console.log(`Days remaining: ${daysRemaining.toFixed(2)}`);

  if (authorizationError) {
    throw new Error(`TLS chain validation failed for ${host}: ${authorizationError}`);
  }

  if (daysRemaining < minDays) {
    throw new Error(`Certificate for ${host} expires in ${daysRemaining.toFixed(2)} day(s), below threshold ${minDays}.`);
  }
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : String(error));
  process.exit(1);
});
