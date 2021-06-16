module.exports = {
	// Run ESLint on changes to JavaScript/TypeScript files
	'(pages|src|testss)/**/*.(ts)?(x)': (filenames) => [
		`eslint --fix ${filenames.join(' ')}`,
		`scripts/tsc-lint.sh ${filenames.join(' ')}`,
		`jest --bail --findRelatedTests  ${filenames.join(' ')}`,
	],
}
