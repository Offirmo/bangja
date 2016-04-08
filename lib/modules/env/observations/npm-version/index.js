import get_executable_version from '../../../../core/get_exec_version';

export const declaration = {
	version: '0.0.1',
};

export const dependencies = [];

export function perform(callback, results) {
	get_executable_version('npm')
	.then(
		version => callback(null, {
			result: true,
			data: version
		}),
		err => callback(null, {
			result: false,
			err
		})
	);
}
