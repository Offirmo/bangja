export const declaration = {
	version: '0.0.1',
};

export const dependencies = [
	'observation:node/existing-versions'
];

export const declaration = {
	version: '0.2',
	human_description: 'TODO',
	mandatory_dependencies: [
		'observation:node/existing-versions'
	],
	other_dependencies: [
		'observation:node/existing-versions'
	],
};

export function perform(callback, results) {
	const options = {};
	nodevers.list(options, (err, res) => {
		if (err)
			return callback(null, { result: false, err });

		const count = Object.keys(res).length;

		callback(null, {
			result: true,
			summary: `[${count} node versions]`,
			data: res
		});
	});
}
