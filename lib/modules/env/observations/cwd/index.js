export const dependencies = [];

export function perform(callback, results) {
	callback(null, process.cwd());
}
