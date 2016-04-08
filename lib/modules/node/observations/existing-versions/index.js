import nodevers from 'node-vers';

export const declaration = {
	version: '0.0.2',
	human_description: 'Fetch known node versions',
	mandatory_dependencies: [
	],
	other_dependencies: [
	],
};

export function perform(bangja, module, auto_results) {
	console.log('hello');
	return new Promise((resolve, reject) => {
		console.log('hello');
		const nodevers_options = {};
		nodevers.list(nodevers_options, (err, res) => {
			console.log('hello');
			if (err)
				return resolve({ ok: false, err });

			const count = Object.keys(res).length;

			console.log('resolving...');
			resolve({
				ok: true,
				summary: `[${count} node versions]`,
				data: res
			});
		});
	});
}
