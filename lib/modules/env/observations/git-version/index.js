import get_executable_version from '../../../../core/utils/get_executable_version';

export const declaration = {
	interface: '0.0.2',
	human_description: 'git version',
	mandatory_dependencies: [
	],
	other_dependencies: [
	],
};

export function perform(bangja, module, results) {
	return get_executable_version('git', {
		clean_output: data => data.split(' ').slice(-1)[0]
	})
	.then(data => {
		return { ok: data ? true : undefined, data };
	});
}
