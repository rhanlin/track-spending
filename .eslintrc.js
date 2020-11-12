module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  parserOptions: {
    ecmaVersion: 2020,
    parser: '@typescript-eslint/parser',
    ecmaFeatures: {
      legacyDecorators: true,
    },
  },
  extends: ['plugin:vue/vue3-essential', 'eslint:recommended', '@vue/prettier'],
  plugins: ['prettier'],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'nuxt/no-cjs-in-config': 'off',
    'handle-callback-err': 'off',
    'no-template-curly-in-string': 'off',
    'space-before-function-paren': 'off',
    'arrow-parens': 'off',
    camelcase: 'off',
    curly: 'off',
    'prettier/prettier': 'error',
  },
}
