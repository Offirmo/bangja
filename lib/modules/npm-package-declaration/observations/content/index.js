import path from 'path';

import {non_throwing_require} from '../../../../core/utils';

export const declaration = {
	version: '0.0.1',
};

export const dependencies = [];

export function perform(callback, results) {
	const package_decl_path = path.resolve(process.cwd(), './package.json');
	const data = non_throwing_require(package_decl_path);
	if (! data)
		return callback(null, { result: false, err: new Error(`"${package_decl_path}" not found !`)});

	callback(null, {
		result: true,
		summary: '[package.json content]',
		data
	});
}
