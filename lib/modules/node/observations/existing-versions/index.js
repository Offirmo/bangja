import nodevers from 'node-vers';

export const dependencies = [];

export function perform(callback, results) {
	const options = {};
	nodevers.list(options, callback);
}
