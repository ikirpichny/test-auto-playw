import eslintPluginPrettier from "eslint-plugin-prettier";

export default [
    {
        // ...other config
        languageOptions: {
            parser: eslintPluginPrettier
        },
        plugins: {eslintPluginPrettier},
        rules: {
            "prettier/prettier": "error"

        }

        // ...other config
    }
];
