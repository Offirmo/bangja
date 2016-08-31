import _ from 'lodash';
import semver from 'semver';

export const declaration = {
	interface: '0.0.2',
	human_description: 'recommended node version',
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

		const ranges = Object.keys(major_versions);
		const current_range = ranges.find(semver.satisfies.bind(semver, current_required_version));
		let most_recent_range = null; // so far
		let incremental_range = null; // so far

		ranges.forEach(range => {
			const version = major_versions[range];
			if (range === current_range) return;

			if (semver.lte(version, current_required_version)) return;

			if (!major_versions[incremental_range] || semver.lte(version, major_versions[incremental_range]))
				incremental_range = range;

			if (!major_versions[most_recent_range] || semver.gt(version, major_versions[most_recent_range]))
				most_recent_range = range;
		});
		incremental_range = incremental_range || current_range;
		most_recent_range = most_recent_range || current_range;

		//console.log(current_range, incremental_range, most_recent_range);

		const diagnostic = {
			ok: current_range === most_recent_range ? true : undefined,
			summary: '',
			recommended_chores: []
		};

		diagnostic.summary = diagnostic.ok ?
			`OK you are using the latest major node version ${current_range}` :
			`consider upgrading node to ${most_recent_range} or at last to next : ${incremental_range}`;
		if (! diagnostic.ok)
			diagnostic.recommended_chores.push('chore:node/upgrade-required-node');

		return resolve(diagnostic);
	});
}
