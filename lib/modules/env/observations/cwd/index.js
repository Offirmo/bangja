export const declaration = {
	interface: '0.0.2',
	human_description: 'current working directory',
	mandatory_dependencies: [
	],
	other_dependencies: [
	],
};

export function perform(bangja, module, results) {
	return bangja.libs.when({ ok:true, data:process.cwd() });
}
