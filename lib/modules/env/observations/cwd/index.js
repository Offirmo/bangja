
export const declaration = {
	version: '0.0.1',
};

export const dependencies = [];

export function perform(callback, results) {
	const data = process.cwd();
	callback(null, { result: true, data });
}
