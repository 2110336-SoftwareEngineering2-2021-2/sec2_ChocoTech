module.exports = {
  singleQuote: true,
  semi: false,
  trailingComma: 'all',
  tabWidth: 2,
  printWidth: 100,
  importOrder: [
    '<THIRD_PARTY_MODULES>',
    '^@frontend/(.*)$',
    '^@backend/(.*)$',
    '^@libs/(.*)$',
    '^[./]',
  ],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
  importOrderParserPlugins: ['decorators-legacy', 'jsx', 'typescript'],
  plugins: [require.resolve('@trivago/prettier-plugin-sort-imports')],
}
