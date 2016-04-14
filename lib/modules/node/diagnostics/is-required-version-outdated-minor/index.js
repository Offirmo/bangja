import _ from 'lodash';
import semver from 'semver';

export const declaration = {
	interface: '0.0.2',
	human_description: 'required node version',
	mandatory_dependencies: [
		'observation:node/latest-versions-by-major',
		'diagnostic:node/required-version',
	],
	other_dependencies: [
	],
};

export function perform(bangja, module, results) {
	return new Promise((resolve, reject) => {

		const major_versions = results.observations['node/latest-versions-by-major'];
		const current_required_version = results.diagnostics['node/required-version'];

		const range = Object.keys(major_versions).find(semver.satisfies.bind(semver, current_required_version));
		const recommended_version_in_branch = major_versions[range];

		//console.log(major_versions);
		//console.log(current_required_version, range, recommended_version);

		const diagnostic = {
			recommended_chores: []
		};
		diagnostic.ok = current_required_version === recommended_version_in_branch;
		diagnostic.summary = diagnostic.ok ?
			`OK ${current_required_version} is the latest of the ${range} node` :
			`ERROR outdated ${current_required_version} should be upgraded to ${recommended_version_in_branch}`;
		if (! diagnostic.ok)
			diagnostic.recommended_chores.push('chore:node/upgrade-required-node');

		return resolve(diagnostic);
	});
}
