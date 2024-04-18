module.exports = {
    root: true,
    extends: "@react-native",
    rules: {
        "prettier/prettier": 0,
        "semi": ["error", "always"],
        "quotes": ["error", "double"],
        "indent": ["error", 4],
        "no-empty": "warn",
        "no-case-declarations": "off",
        "@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
        "@typescript-eslint/no-empty-function": "warn",
        "@typescript-eslint/no-floating-promises": "off",
        "@typescript-eslint/no-explicit-any": "off",
        "@typescript-eslint/require-await": "off",
        "no-useless-escape": "off",
    },
};
