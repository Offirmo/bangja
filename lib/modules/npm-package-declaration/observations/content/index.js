import path from 'path';

import non_throwing_require from '../../../../core/utils/non_throwing_require';

export const declaration = {
	interface: '0.0.2',
	human_description: 'package.json content',
	mandatory_dependencies: [
	],
	other_dependencies: [
	],
};

export function perform(bangja, module, results) {
	return new Promise((resolve, reject) => {
		const package_decl_path = path.resolve(process.cwd(), './package.json');
		const data = non_throwing_require(package_decl_path);
		if (! data)
			return resolve({ ok: false, err: new Error(`"${package_decl_path}" not found !`)});

		resolve({
			ok: true,
			summary: '[package.json content]',
			data
		});
	});
}
