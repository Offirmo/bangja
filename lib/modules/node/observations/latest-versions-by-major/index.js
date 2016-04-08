export const declaration = {
	interface: '0.0.2',
	human_description: 'TODO',
	mandatory_dependencies: [
		'observation:node/existing-versions'
	],
	other_dependencies: [
	],
};

export function perform(bangja, module, auto_results) {
	return new Promise((resolve, reject) => {
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
	});

}
