// share code identifying an executable version

import fs from 'fs-extra';

export default function load_file_if_exists(
	path,
	options
) {
	options = options || {};

	return new Promise((resolve, reject) => {
		const spawn_instance = spawn(executable, options.exec_opts);

		setTimeout(() => reject(new Error('Exec version : timeout')), options.timeout_ms).unref();

		spawn_instance.stdout.on('data', data => {
			//console.log(`stdout: ${data}`);

			let version = ('' + data).trim();

			if (options.clean_output) version = options.clean_output(version);

			version = semver.clean(version);

			//console.log(`got version: ${version}`);
			resolve(version);
		});

		spawn_instance.stderr.on('data', data => {
			console.log(`Exec version : got stderr : ${data}`);
			reject(new Error(data));
		});

		spawn_instance.on('close', code => {
			//console.log(`child process exited with code ${code}`);
			if (code !== 0)
				reject(new Error(`Exec version : child process exited with code ${code}`));
		});
	});
}
