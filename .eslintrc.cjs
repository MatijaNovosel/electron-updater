module.exports = {
  root: true,
  parserOptions: {
    parser: require.resolve("@typescript-eslint/parser"),
    extraFileExtensions: [".vue"]
  },
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  extends: ["plugin:@typescript-eslint/recommended", "plugin:vue/vue3-essential", "prettier"],
  plugins: ["@typescript-eslint", "vue"],
  globals: {
    ga: "readonly",
    cordova: "readonly",
    __statics: "readonly",
    __QUASAR_SSR__: "readonly",
    __QUASAR_SSR_SERVER__: "readonly",
    __QUASAR_SSR_CLIENT__: "readonly",
    __QUASAR_SSR_PWA__: "readonly",
    process: "readonly",
    Capacitor: "readonly",
    chrome: "readonly"
  },
  rules: {
    "prefer-promise-reject-errors": "off",
    quotes: ["warn", "double", { avoidEscape: true }],
    semi: "off",
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/no-var-requires": "off",
    "@typescript-eslint/no-unused-vars": "warn",
    "no-unused-vars": "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
    // TODO: Ovo pravilo isključiti kad se naprave pravilni Vuetify tipovi
    "@typescript-eslint/no-explicit-any": "off",
    "vue/multi-word-component-names": "off"
  },
  overrides: [
    {
      files: ["serviceWorker.ts"],

      env: {
        serviceworker: true
      }
    }
  ]
};
