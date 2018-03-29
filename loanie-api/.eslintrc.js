module.exports = {
  env: {
    es6: true,
    node: true,
  },
  extends: 'airbnb',
  parserOptions: {
    sourceType: 'module',
  },
  rules: {
    indent: ['error', 2]
    quotes: ['error', 'double'],
    semi: ['error', 'always'],
  },
};
