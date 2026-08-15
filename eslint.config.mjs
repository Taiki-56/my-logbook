/**
 * ESLint configuration.
 *
 * Sets up linting rules for the Next.js project, integrating core web vitals
 * and TypeScript strictness. Also defines global ignore patterns for build outputs.
 */

import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import { defineConfig, globalIgnores } from "eslint/config";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // * Override default ignores to exclude build artifacts and environment typings
  globalIgnores([".next/**", "out/**", "build/**", "next-env.d.ts"])
]);

export default eslintConfig;
