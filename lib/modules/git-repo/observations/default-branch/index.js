import get_command_output from '../../../../core/utils/get_command_output';

const REMOTE_HEAD_REGEXP = /HEAD branch: (.*)/gm;

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
		// http://stackoverflow.com/questions/18726037/what-determines-default-branch-after-git-clone
		params: 'remote show origin'.split(' ')
	})
	.then(data => {
		const match = REMOTE_HEAD_REGEXP.exec(data);
		return { ok: data ? true : undefined, data: match[1] };
	});
}
