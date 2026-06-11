import js from "@eslint/js";
import globals from "globals";
import { defineConfig } from "eslint/config";

export default defineConfig([
  { files: ["{step_definitions,Page-locators,Page-objects, support}/*.{js,mjs,cjs}"],
    plugins: { js }, extends: ["js/recommended"],
    languageOptions: { globals: globals.browser } },
]);
