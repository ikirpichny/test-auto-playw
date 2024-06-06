// eslint.config.js
import js from "@eslint/js";

export default [
    js.configs.recommended,
    {       
        languageOptions: {
          globals: {
            console: "writable",
            __dirname: "readable",
            __filename: "readable",
            process: "readable",
      }
    },
        rules: {
            "no-unused-vars": "warn",
            "no-empty-pattern": "off"
        }
    }
];