import nodevers from 'node-vers';

export const dependencies = [];

export function perform(callback, results) {
	const options = {};
	nodevers.list(options, (err, res) => {
		if (err)
			return callback(null, { err });

		const count = Object.keys(res).length;

		callback(null, {
			summary: `[${count} node versions]`,
			data: res
		});
	});
}
