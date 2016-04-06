import get_executable_version from '../../../../core/get_exec_version';

export const dependencies = [];

export function perform(callback, results) {
	get_executable_version('git', {
		clean_output: data => data.split(' ').slice(-1)[0]
	})
	.then(
		version => callback(null, version),
		error => callback(error)
	);
}
