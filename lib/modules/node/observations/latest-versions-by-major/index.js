import semver from 'semver';

export const declaration = {
	interface: '0.0.2',
	human_description: 'Latest version of each major node branch',
	mandatory_dependencies: [
		'observation:node/existing-versions'
	],
	other_dependencies: [
	],
};

export function perform(bangja, module, results) {
	//console.log('* results \n', bangja.libs.pretty(results));
	return new Promise((resolve, reject) => {
		const data = {};

		const versions = results.observations['node/existing-versions']
			.map(version_descr => version_descr.version).map(semver.clean);

		versions.forEach(version => {
			const major_selector = major(version);

			if (!data[major_selector])
				return data[major_selector] = version;

			//console.log(version, data[major_selector], semver.gt(data[major_selector], version));

			if (semver.gt(data[major_selector], version))
				data[major_selector] = version;
		});

		//console.log(data);
		const count = Object.keys(data).length;

		resolve({
			ok: true,
			summary: `[${count} major node versions]`,
			data
		})
	});
}


function major(version) {
	const major = semver.major(version);

	if (major > 0)
		return '^' + major + '.0.0';

	const minor = semver.minor(version);
	return '~' + major + '.' + minor + '.0';
}
