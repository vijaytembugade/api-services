module.exports = {
    env: {
        browser: true,
        es2021: true
    },
    extends: "standard-with-typescript",
    overrides: [
        {
            env: {
                node: true
            },
            files: [
                ".eslintrc.{js,cjs}"
            ],
            parserOptions: {
                sourceType: "script"
            }
        }
    ],
    parserOptions: {
        ecmaFeatures: {},
        ecmaVersion: "latest",
        sourceType: "module"
    },
    ignorePatterns: ["node_modules", "./dist/*" ],
    rules: {
        "@typescript-eslint/prefer-nullish-coalescing": "off",
        "@typescript-eslint/strict-boolean-expressions": "off",
    }
}
