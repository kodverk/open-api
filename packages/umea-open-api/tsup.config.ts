import { defineConfig } from "tsup";

const env = process.env.NODE_ENV;
const isDev = process.env.npm_lifecycle_event === "dev";

export default defineConfig((opts) => ({
  entryPoints: ["src/index.ts"],
  entry: ["src/**/*.ts"],
  format: ["esm", "cjs"],
  minify: env === "production",
  clean: !opts.watch,
  dts: true,
  outDir: "dist",
  target: "node16",
  treeshake: true,
  onSuccess: isDev ? "node dist/index.js" : undefined,
}));
