import get_executable_version from '../../../../core/get_exec_version';

export const dependencies = [];

export function perform(callback, results) {
	get_executable_version('node')
	.then(
		version => callback(null, {
			data: version
		}),
		error => callback(error)
	);
}
