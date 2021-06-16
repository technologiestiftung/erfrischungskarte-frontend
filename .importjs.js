module.exports = {
	moduleNameFormatter({ pathToImportedModule }) {
		return pathToImportedModule
			.replace('./src/components/', '@components/')
			.replace('./src/modules/', '@modules/')
			.replace('./src/lib/', '@lib/')
			.replace('./src/layouts/', '@layouts/')
			.replace(/\.ts$/gs, '')
	},
}
