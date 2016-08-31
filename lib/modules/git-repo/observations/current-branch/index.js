import get_command_output from '../../../../core/utils/get_command_output';

export const declaration = {
	interface: '0.0.2',
	human_description: 'current git branch',
	mandatory_dependencies: [
	],
	other_dependencies: [
	],
};

export function perform(bangja, module, results) {
	return get_command_output('git', {
		params: 'rev-parse --abbrev-ref HEAD'.split(' ')
	})
	.then(data => {
		return { ok: data ? true : undefined, data };
	});
}
