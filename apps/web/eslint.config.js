import { globalIgnores } from "eslint/config";
import { nextJsConfig } from "@repo/eslint-config/next-js";

/** @type {import("eslint").Linter.Config[]} */
export default [
  ...nextJsConfig,
  // Build output of opennextjs-cloudflare, wrangler and sanity.
  globalIgnores([".open-next/**", ".wrangler/**", ".sanity/**"]),
];
