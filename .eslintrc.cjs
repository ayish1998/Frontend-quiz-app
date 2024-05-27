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
  'rules': {
    'react/jsx-uses-react': 'off', 
    'react/react-in-jsx-scope': 'off', 
    'react/jsx-no-target-blank': 'off',
    'react/prop-types': [
      'error', // Or 'warn', or 'off'
      { ignore: false, customValidators: [], skipUndeclared: false }
    ],
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
  },  
};
