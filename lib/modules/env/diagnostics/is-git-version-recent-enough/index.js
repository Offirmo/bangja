import semver from 'semver';

// 1.8.5 needed to know the default branch http://stackoverflow.com/a/32503667/587407
const GIT_VERSION_REQUIREMENT = '>=1.8.5';

export const declaration = {
	interface: '0.0.2',
	human_description: 'Check git version recent enough',
	mandatory_dependencies: [
		'observation:env/git-version'
	],
	other_dependencies: [
	],
};

export function perform(bangja, module, results) {
	return new Promise((resolve, reject) => {
		const current_git_version = results.observations['env/git-version'];

		if (semver.satisfies(current_git_version, GIT_VERSION_REQUIREMENT))
			resolve({ ok: true, summary: `OK current git ${current_git_version} satisfies ${GIT_VERSION_REQUIREMENT}` });
		else
			resolve({ ok: false, err: new Error(`need ${GIT_VERSION_REQUIREMENT}`) });
	});
}
