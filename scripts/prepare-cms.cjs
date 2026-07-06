const { execFileSync } = require("child_process");
const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..");
const publicCmsPath = path.join(root, "public", "cms");
const bundledCmsPath = path.join(root, "portfolio-cms", "public", "cms");
const sanityDistPath = path.join(root, "portfolio-cms", "dist");

let sourcePath = bundledCmsPath;

if (process.env.BUILD_CMS_FROM_SANITY === "1") {
  execFileSync("npm", ["run", "build", "--prefix", "portfolio-cms"], {
    cwd: root,
    stdio: "inherit",
  });
  sourcePath = sanityDistPath;
}

if (!fs.existsSync(path.join(sourcePath, "index.html"))) {
  throw new Error(`CMS source is missing index.html: ${sourcePath}`);
}

fs.rmSync(publicCmsPath, { recursive: true, force: true });
fs.mkdirSync(publicCmsPath, { recursive: true });
fs.cpSync(sourcePath, publicCmsPath, { recursive: true });

console.log(`Prepared CMS assets from ${path.relative(root, sourcePath)}.`);
