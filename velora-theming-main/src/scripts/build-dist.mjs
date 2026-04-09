import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

/* global console */

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SRC_TOKENS = path.resolve(__dirname, "../tokens");
const SRC_TAILWIND = path.resolve(__dirname, "../tailwind");
const DIST_TOKENS = path.resolve(__dirname, "../../dist/tokens");
const DIST_TAILWIND = path.resolve(__dirname, "../../dist/tailwind");

/**
 * Copy directory recursively
 */
async function copyDir(src, dest) {
  await fs.mkdir(dest, { recursive: true });
  const entries = await fs.readdir(src, { withFileTypes: true });

  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      await copyDir(srcPath, destPath);
    } else {
      await fs.copyFile(srcPath, destPath);
    }
  }
}

/**
 * Build distribution files
 */
async function build() {
  console.log("Building distribution files...");

  // Copy token files to dist/tokens
  console.log("Copying token files...");
  await copyDir(SRC_TOKENS, DIST_TOKENS);
  console.log("✅ Token files copied to dist/tokens");

  // Copy Tailwind preset to dist/tailwind
  console.log("Copying Tailwind preset...");
  await copyDir(SRC_TAILWIND, DIST_TAILWIND);
  console.log("✅ Tailwind preset copied to dist/tailwind");

  console.log("\n✅ Build complete!");
}

build().catch((error) => {
  console.error("Build failed:", error);
  process.exit(1);
});
