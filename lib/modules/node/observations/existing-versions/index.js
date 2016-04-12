import nodevers from 'node-vers';

export const declaration = {
	interface: '0.0.2',
	human_description: 'All known node versions',
	mandatory_dependencies: [
	],
	other_dependencies: [
	],
};

export function perform(bangja, module, results) {
	const nodevers_options = {};
	return bangja.libs.when_node.call(nodevers.list, nodevers_options)
	.then(res => {
		const count = Object.keys(res).length;
		return {
			ok: true,
			summary: `[${count} node versions]`,
			data: res
		};
	});
}
