module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    parser: '@babel/eslint-parser',
    requireConfigFile: false
  },
  extends: [
    '@nuxtjs',
    'plugin:nuxt/recommended'
  ],
  plugins: [
  ],
  // add your custom rules here
  rules: {
    'import/no-extraneous-dependencies': 0,
    'vue/multi-word-component-names': 0,
    'vue/html-self-closing': 0,
    'vue/no-multiple-template-root': 0,
    'vue/no-side-effects-in-computed-properties': 0,
    'eol-last': 0,
    'no-empty': 0,
    ' vue/valid-v-on': 0
  }
}
