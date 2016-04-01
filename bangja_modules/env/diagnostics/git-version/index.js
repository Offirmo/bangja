
import spawn from 'cross-spawn-async';

export function perform(cb) {
	const git_version = spawn('git', ['--version']);

	git_version.stdout.on('data', (data) => {
		console.log(`stdout: ${data}`);
	});

	git_version.stderr.on('data', (data) => {
		console.log(`stderr: ${data}`);
	});

	git_version.on('close', (code) => {
		console.log(`child process exited with code ${code}`);
		cb();
	});
}

export const dependencies = [];
