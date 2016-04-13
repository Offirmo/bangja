import get_executable_version from '../../../../core/utils/get_executable_version';

export const declaration = {
	interface: '0.0.2',
	human_description: 'nvm version',
	mandatory_dependencies: [
	],
	other_dependencies: [
	],
};

export function perform(bangja, module, results) {
	// "nvm" is a shell function, need an intermediate script
	return get_executable_version(process.cwd() + '/lib/modules/env/observations/nvm-version/nvm-version.sh')
	.then(data => {
		return { ok: data ? true : undefined, data};
	});
}
