export const dependencies = [];

export function perform(callback, results) {
	const data = process.cwd();
	callback(null, { data });
}
