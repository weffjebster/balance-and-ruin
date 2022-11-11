module.exports = {
  extends: [
    'eslint:recommended',
    'prettier',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
    'plugin:react/recommended',
    'next/core-web-vitals'
  ],
  // plugins: ['testing-library'],
  overrides: [
    // Only uses Testing Library lint rules in test files
    // {
    //   files: ['**/__tests__/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[jt]s?(x)'],
    //   extends: ['plugin:testing-library/react']
    // }
  ]
};
