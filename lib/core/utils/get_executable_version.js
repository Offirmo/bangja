// share code identifying an executable version

import semver from 'semver';
import get_command_output from './get_command_output';

export default function get_executable_version(
	executable,
	options
) {
	options = options || {};
	options.params = options.params || [ '--version' ];

	return get_command_output(executable, options)
	.then(data => {
		//console.log(`Exec version output : ${data}`);
		if (options.clean_output) data = options.clean_output(data);
		let version = semver.clean(data);
		//console.log(`Exec version : got version: ${version}`);
		return version;
	})
	.catch(err => {
		if (err.code === 'ENOENT')
			return { ok:undefined, data: null };

		throw err;
	});
}
