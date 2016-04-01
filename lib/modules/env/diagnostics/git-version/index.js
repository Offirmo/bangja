
import spawn from 'cross-spawn-async';

export function perform(callback) {
	(new Promise((resolve, reject) => {
		const git_version_op = spawn('git', ['--version']);

		setTimeout(() => reject('Timeout'), 3000).unref();

		git_version_op.stdout.on('data', data => {
			//console.log(`stdout: ${data}`);

			data = ('' + data).trim();
			const version = data.split(' ').slice(-1)[0];
			console.log(`got version: ${version}`);
			resolve(version);
		});

		git_version_op.stderr.on('data', data => {
			console.log(`stderr: ${data}`);
			reject(new Error(data));
		});

		git_version_op.on('close', code => {
			console.log(`child process exited with code ${code}`);
			if (code !== 0)
				reject(new Error(`child process exited with code ${code}`));
		});
	}))
	.then(
		version => callback(null, version),
		error => callback(error)
	);
}

export const dependencies = [];
