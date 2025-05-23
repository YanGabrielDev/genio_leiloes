// import js from '@eslint/js';
// import globals from 'globals';
// // import reactRefresh from 'eslint-plugin-react-refresh';
// import tseslint from 'typescript-eslint';
// import opa from '@search-auctions/eslint-config-jsts/src/index.'
// export default tseslint.config(
//   { ignores: ['dist'] },
//   {
//     extends: [js.configs.recommended, ...tseslint.configs.recommended, ...opa ],
//     files: ['**/*.{ts,tsx}'],
//     languageOptions: {
//       ecmaVersion: 2020,
//       globals: globals.browser,
//     },
//     plugins: {
//       'react-hooks': reactHooks,
//       'react-refresh': reactRefresh,
//     },
//     rules: {
//       ...reactHooks.configs.recommended.rules,
//       'react-refresh/only-export-components': [
//         'warn',
//         { allowConstantExport: true },
//       ],
//     },
//   },
// )
// import js from '@eslint/js';
import globals from 'globals'
import tseslint from 'typescript-eslint'
import config from '@search-auctions/eslint-config/react.mjs'
export default tseslint.config(
  ...config,

  {
    ignores: ['node_modules/', 'dist/', 'build/', 'coverage/'],
  },
  {
    extends: [

    ],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2022,
      globals: {
        ...globals.browser,

      },
      parser: tseslint.parser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        projectService: true
      },
    },
    rules: {
      // Regras personalizadas podem ser adicionadas aqui, se necessário
    },
  }
)
