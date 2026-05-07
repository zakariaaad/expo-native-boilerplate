/** @type {import('eslint').Linter.Config} */
module.exports = {
  root: true,

  // ─── Parser ────────────────────────────────────────────────────────────────
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    ecmaFeatures: { jsx: true },
    project: './tsconfig.json',
  },
  env: {
    browser: true,
    es2021: true,
    'react-native/react-native': true,
  },

  // ─── Plugins ───────────────────────────────────────────────────────────────
  plugins: ['@typescript-eslint', 'react', 'react-hooks', 'react-native', 'import', 'prettier'],

  // ─── Extends ───────────────────────────────────────────────────────────────
  // Order matters:
  //   1. expo        — base config (sets import/order, react, etc.)
  //   2. @typescript-eslint/recommended
  //   3. react + react-hooks
  //   4. react-native/all
  //   5. prettier    — MUST be last, disables all formatting rules that
  //                    conflict with Prettier (eslint-config-prettier)
  extends: [
    'expo',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:react-native/all',
    'prettier',
  ],

  settings: {
    react: { version: 'detect' },
    'import/resolver': {
      typescript: {
        project: './tsconfig.json',
      },
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
  },

  // ─── Rules ─────────────────────────────────────────────────────────────────
  rules: {
    // Prettier — formatting violations become ESLint errors
    'prettier/prettier': 'error',

    // ── React ──────────────────────────────────────────────────────────────
    'react/react-in-jsx-scope': 'off', // New JSX transform handles this
    'react/prop-types': 'off', // TypeScript covers prop types
    'react/display-name': 'off',
    'react/self-closing-comp': 'warn',

    // ── React Hooks ────────────────────────────────────────────────────────
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',

    // ── React Native ───────────────────────────────────────────────────────
    'react-native/no-unused-styles': 'error',
    'react-native/split-platform-components': 'warn',
    'react-native/no-inline-styles': 'off', // NativeWind className props
    'react-native/no-color-literals': 'off', // Colors live in Tailwind tokens
    'react-native/no-raw-text': 'off', // Too noisy with NativeWind
    'react-native/sort-styles': 'off', // prettier-plugin-tailwindcss handles this

    // ── TypeScript ─────────────────────────────────────────────────────────
    '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    '@typescript-eslint/no-explicit-any': 'warn',
    '@typescript-eslint/consistent-type-imports': ['error', { prefer: 'type-imports' }],
    '@typescript-eslint/no-floating-promises': 'warn',
    '@typescript-eslint/no-misused-promises': 'warn',

    // ── Import ─────────────────────────────────────────────────────────────
    // NOTE: We intentionally do NOT override import/order here.
    // eslint-config-expo@7.x already configures it with properties specific
    // to its bundled eslint-plugin-import version. Adding our own config on
    // top causes a schema validation error because ESLint merges both objects.
    // The expo default (external → internal, newlines between) is sufficient.
    'import/no-duplicates': 'error',

    // ── General ────────────────────────────────────────────────────────────
    'no-console': ['warn', { allow: ['warn', 'error'] }],
    eqeqeq: ['error', 'always'],
    'prefer-const': 'error',
  },

  // ─── Per-file overrides ────────────────────────────────────────────────────
  overrides: [
    {
      files: ['*.config.js', '*.config.ts', 'babel.config.js', 'metro.config.js'],
      rules: {
        '@typescript-eslint/no-var-requires': 'off',
        'no-undef': 'off',
      },
    },
    {
      files: ['*.d.ts'],
      rules: {
        '@typescript-eslint/no-explicit-any': 'off',
      },
    },
  ],

  ignorePatterns: ['node_modules/', '.expo/', 'dist/', 'web-build/', 'android/', 'ios/'],
};
