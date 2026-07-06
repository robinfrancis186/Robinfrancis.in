const { execFileSync } = require("child_process");
const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..");
const bundledStudioPath = path.join(root, "public", "cms");
const distPath = path.join(root, "dist");

if (process.env.BUILD_CMS_FROM_SANITY === "1") {
  const sanityBin = path.join(
    root,
    "node_modules",
    ".bin",
    process.platform === "win32" ? "sanity.cmd" : "sanity",
  );

  execFileSync(sanityBin, ["build"], {
    cwd: root,
    stdio: "inherit",
  });
  process.exit(0);
}

if (!fs.existsSync(path.join(bundledStudioPath, "index.html"))) {
  throw new Error(`Bundled Studio source is missing index.html: ${bundledStudioPath}`);
}

fs.rmSync(distPath, { recursive: true, force: true });
fs.mkdirSync(distPath, { recursive: true });
fs.cpSync(bundledStudioPath, distPath, { recursive: true });

console.log("Prepared Sanity Studio dist from committed public/cms bundle.");
