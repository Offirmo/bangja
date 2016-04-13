// share code executing a command and returning its output

import when from 'when';
import spawn from 'cross-spawn-async';

export default function get_command_output(
	executable,
	options
) {
	options = options || {};
	options.exec_opts = options.exec_opts || [];
	options.timeout_ms = options.timeout_ms || 3000;
	options.env = process.env;

	return when(new Promise((resolve, reject) => {
		//console.log(`Exec : spawning ${executable}`, options.exec_opts);
		const spawn_instance = spawn(executable, options.exec_opts, options);

		spawn_instance.on('error', err => {
			//console.log(`Exec : got err:`, err);
			reject(err);
		});

		setTimeout(() => reject(new Error('Exec : timeout')), options.timeout_ms).unref();

		spawn_instance.stdout.on('data', data => {
			//console.log(`Exec : stdout: "${data}"`);
			resolve(('' + data).trim());
		});

		spawn_instance.stderr.on('data', data => {
			//console.log(`Exec : got stderr : "${data}"`);
			reject(new Error(data));
		});

		spawn_instance.on('close', code => {
			//console.log(`Exec : child process exited with code ${code}`);
			if (code !== 0)
				reject(new Error(`Exec : child process exited with code ${code}`));
		});
	}));
}
