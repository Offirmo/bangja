import semver from 'semver';

const GIT_VERSION_REQUIREMENT = '>=1.6.6';

export const dependencies = [ 'observation:env/git-version' ];

export function perform(callback, results) {
	const current_git_version = results['observation:env/git-version'].data;

	if (semver.satisfies(current_git_version, GIT_VERSION_REQUIREMENT))
		callback(null, { summary: `${current_git_version} ${GIT_VERSION_REQUIREMENT} OK` });
	else
		callback(null, { err: new Error(`need ${GIT_VERSION_REQUIREMENT}`) });
}
