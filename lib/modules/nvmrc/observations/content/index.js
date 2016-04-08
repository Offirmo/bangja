import path from 'path';
import semver from 'semver';
import load_file_if_exists from '../../../../core/utils/load_file_if_exists';

export const declaration = {
	interface: '0.0.1',
};

export const dependencies = [];

export function perform(callback, results) {
	const package_decl_path = path.resolve(process.cwd(), './.nvmrc');

	load_file_if_exists(package_decl_path)
	.then(
		res => callback(null, { result: true, data: semver.clean(res) }),
		err => callback(null, { err: new Error(`"${package_decl_path}" not found !`)})
	);
}
