module.exports = {
  root: true,
  env: {
    browser: true,
    es2020: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  ignorePatterns: ['dist'],
  settings: {
    react: {
      version: 'detect',  // Automatically detect the React version
    },
  },
  plugins: ['react-refresh'],
  rules: {
    'react/jsx-uses-react': 'off', // Disable warning for unused React import in JSX
    'react/react-in-jsx-scope': 'off', // Disable warning for React import in scope
    'react/jsx-no-target-blank': 'off',
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
  },
};
