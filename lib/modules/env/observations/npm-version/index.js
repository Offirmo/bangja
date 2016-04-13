import get_executable_version from '../../../../core/utils/get_executable_version';

export const declaration = {
	interface: '0.0.2',
	human_description: 'npm version',
	mandatory_dependencies: [
	],
	other_dependencies: [
	],
};

export function perform(bangja, module, results) {
	return get_executable_version('npm')
	.then(data => {
		return { ok: data ? true : undefined, data };
	});
}
