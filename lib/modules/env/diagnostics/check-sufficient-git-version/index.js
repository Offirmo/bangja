import semver from 'semver';

const GIT_VERSION_REQUIREMENT = '>=1.6.6';

export const dependencies = [ 'observation:env/git-version' ];

export function perform(callback, results) {
	const current_git_version = results['observation:env/git-version'].data;

	if (semver.satisfies(current_git_version, GIT_VERSION_REQUIREMENT))
		callback(null, { result: true, summary: `OK current git ${current_git_version} satisfies ${GIT_VERSION_REQUIREMENT}` });
	else
		callback(null, { result: false, err: new Error(`need ${GIT_VERSION_REQUIREMENT}`) });
}
