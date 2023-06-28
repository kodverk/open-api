import { defineConfig } from "tsup";

const env = process.env.NODE_ENV;
const isDev = process.env.npm_lifecycle_event === "dev";

export default defineConfig((opts) => ({
  entry: ["src/index.ts"],
  format: ["esm"],
  ignoreWatch: ["**/node_modules/", "**/dist/", "**/git/", "**/__test__/"],
  minify: env === "production",
  clean: !opts.watch,
  dts: true,
  outDir: "dist",
  splitting: false,
  sourcemap: true,
  onSuccess: isDev
    ? "node dist/index.js"
    : "pnpm tsc --project tsconfig.sourcemap.json",
}));
