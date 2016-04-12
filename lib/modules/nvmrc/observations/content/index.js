import path from 'path';
import semver from 'semver';
import load_file_if_exists from '../../../../core/utils/load_file_if_exists';

export const declaration = {
	interface: '0.0.2',
	human_description: '.nvmrc content',
	mandatory_dependencies: [
	],
	other_dependencies: [
	],
};

export function perform(bangja, module, results) {
	const package_decl_path = path.resolve(process.cwd(), './.nvmrc');

	return load_file_if_exists(package_decl_path)
	.then(
		res => {
			const data = semver.clean(res);
			return { ok: true, data }
		},
		err => {
			if (err.code === 'ENOENT')
				return { ok: undefined, data: null };

			throw err;
		}
	);
}
