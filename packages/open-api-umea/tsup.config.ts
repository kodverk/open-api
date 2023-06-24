import { defineConfig } from "tsup";

const env = process.env.NODE_ENV;

export default defineConfig((opts) => ({
  entryPoints: ["src/index.ts"],
  entry: ["src/**/*.ts"],
  format: ["esm", "cjs"],
  minify: env === "production",
  bundle: env === "production",
  skipNodeModulesBundle: true,
  clean: !opts.watch,
  dts: true,
  outDir: "dist",
  target: "es2020",
  treeshake: true,
}));
