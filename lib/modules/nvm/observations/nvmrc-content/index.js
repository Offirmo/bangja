import path from 'path';

import {non_throwing_require} from '../../../../core/utils';

export const dependencies = [];

export function perform(callback, results) {
	const package_decl_path = path.resolve(process.cwd(), './.nvmrc');
	const data = non_throwing_require(package_decl_path);
	if (! data)
		return callback(null, { err: new Error(`"${package_decl_path}" not found !`)});

	callback(null, {
		summary: '[nvmrc content]',
		data
	});
}
