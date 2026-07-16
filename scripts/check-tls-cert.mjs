#!/usr/bin/env node

import tls from "node:tls";
import { parseArgs } from "node:util";

const { values } = parseArgs({
  options: {
    host: { type: "string" },
    port: { type: "string", default: "443" },
    "min-days": { type: "string", default: "21" },
  },
});

const host = values.host;
const port = Number(values.port);
const minDays = Number(values["min-days"]);

if (!host) {
  console.error("Missing required --host option.");
  process.exit(2);
}

if (!Number.isFinite(port) || port <= 0 || !Number.isFinite(minDays) || minDays < 0) {
  console.error("Invalid --port or --min-days option.");
  process.exit(2);
}

const socket = tls.connect(
  {
    host,
    port,
    servername: host,
    rejectUnauthorized: true,
    timeout: 15_000,
  },
  () => {
    const certificate = socket.getPeerCertificate();

    if (!certificate?.valid_to) {
      console.error(`No TLS certificate validity date found for ${host}.`);
      socket.end();
      process.exit(1);
    }

    const expiresAt = new Date(certificate.valid_to);
    const remainingMs = expiresAt.getTime() - Date.now();
    const remainingDays = Math.floor(remainingMs / 86_400_000);

    console.log(`${host} certificate expires at ${expiresAt.toISOString()} (${remainingDays} days remaining).`);

    socket.end();
    process.exit(remainingDays >= minDays ? 0 : 1);
  },
);

socket.on("timeout", () => {
  console.error(`Timed out while checking TLS certificate for ${host}.`);
  socket.destroy();
  process.exit(1);
});

socket.on("error", (error) => {
  console.error(`TLS certificate check failed for ${host}: ${error.message}`);
  process.exit(1);
});
