module.exports = {
  extends: ['next/core-web-vitals'],
  rules: {
    // Disable all problematic rules
    'react/no-unescaped-entities': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-unused-vars': 'off',
    'jsx-a11y/alt-text': 'off',
    'react-hooks/exhaustive-deps': 'off',
  },
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
}
