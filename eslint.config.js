import {default as jsonc, parseForESLint} from "eslint-plugin-jsonc";

const parsers = {
  'jsonc-eslint-parser': {
    parseForESLint
  }
}

export default [{
    // files:   ["**/*.json", "**/*.jsonc", "**/*.json5"],
    plugins: {
      jsonc: { ...jsonc, parsers}
      /* same as
      jsonc: {
        parsers: {
          'jsonc-eslint-parser': {
            parseForESLint
          }
        }
      } */
    },
    languageOptions: {
       parser: 'jsonc/jsonc-eslint-parser'
    },
    rules: {
        "prettier/prettier": "error"

    }
  }];
