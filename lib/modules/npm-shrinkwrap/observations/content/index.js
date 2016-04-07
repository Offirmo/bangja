import path from 'path';

import {non_throwing_require} from '../../../../core/utils';

export const dependencies = [];

export function perform(callback, results) {
	const package_decl_path = path.resolve(process.cwd(), './npm-shrinkwrap.json');
	const data = non_throwing_require(package_decl_path);
	if (! data)
		return callback(null, { summary: `no "${package_decl_path}" found.`, data: null });

	callback(null, {
		result: true,
		summary: '[npm shrinkwrap content]',
		data
	});
}
