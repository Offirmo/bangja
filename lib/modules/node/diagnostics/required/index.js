import semver from 'semver';
import {get} from 'object-path';

export const declaration = {
	interface: '0.0.2',
	human_description: '.nvmrc content',
	mandatory_dependencies: [
		'observation:npm-package-declaration/content',
	],
	other_dependencies: [
		'observation:nvmrc/content',
		'diagnostic:nvmrc/check-validity',
	],
};

export function perform(bangja, module, results) {
	return new Promise((resolve, reject) => {
		
	});
	
	
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

export function perform(callback, results) {
	const package_json = results['observation:npm-package-declaration/content'].data;
	const node_requirement_from_engine = get(package_json, 'engines.node');
	const node_requirement_from_nvmrc = results['observation:nvmrc/content'].data;
	const node_requirement_from_nvmrc_ok = results['diagnostic:nvmrc/check-coherency'].result;

	const diagnostic = {
		result: false,
		summary: 'TODO',
		recommended_chores: [],
	};

	let node_requirement;
	if (node_requirement_from_engine)
		node_requirement = node_requirement_from_engine;
	else if (node_requirement_from_nvmrc_ok)
		node_requirement = node_requirement_from_nvmrc;
	else {
		diagnostic.result = undefined;
		diagnostic.summary = 'N/A no node specification found';
		return callback(null, diagnostic);
	}

	diagnostic.result = true;
	diagnostic.data = node_requirement;
	diagnostic.summary = `OK ${node_requirement}`;
	return callback(null, diagnostic);
}




