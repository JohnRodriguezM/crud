module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: 'airbnb-base',
  overrides: [
    {
      env: {
        node: true,
      },
      files: [
        '.eslintrc.{js,cjs}',
      ],
      parserOptions: {
        sourceType: 'script',
      },
    },
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    'import/extensions': ['error', 'ignorePackages'],
    'no-console': 'off', // Permite console.log y otros
    'class-methods-use-this': 'off', // No requiere que los métodos de clase usen 'this'
    'no-underscore-dangle': 'off', // Permite _id
    'no-plusplus': 'off', // Permite el uso de ++ y --
    'max-len': ['error', { code: 120 }], // Aumenta la longitud máxima de línea a 120 caracteres
  },
};
