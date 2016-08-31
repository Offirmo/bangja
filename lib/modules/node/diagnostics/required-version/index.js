import semver from 'semver';
import {get} from 'object-path';

export const declaration = {
	interface: '0.0.2',
	human_description: 'required node version',
	mandatory_dependencies: [
		'observation:npm-package-declaration/content',
	],
	other_dependencies: [
		'observation:nvmrc/content',
		'diagnostic:nvmrc/is-valid',
		'observation:env/node-version',
	],
};

export function perform(bangja, module, results) {
	return new Promise((resolve, reject) => {
		const package_json = results.observations['npm-package-declaration/content'];
		const node_requirement_from_engine = get(package_json, 'engines.node');
		const node_requirement_from_nvmrc_ok = results.diagnostics['nvmrc/is-valid'];
		const node_requirement_from_nvmrc = results.observations['nvmrc/content'];
		const node_requirement_from_env = results.observations['node-version'];

		const diagnostic = {
			ok: false,
			summary: 'TODO',
			recommended_chores: [],
		};

		let node_requirement;
		if (node_requirement_from_engine)
			node_requirement = node_requirement_from_engine;
		else if (node_requirement_from_nvmrc_ok)
			node_requirement = node_requirement_from_nvmrc;
		else if (node_requirement_from_env)
			node_requirement = node_requirement_from_env;
		else {
			diagnostic.ok = undefined;
			diagnostic.summary = 'N/A no node specification found';
			return resolve(diagnostic);
		}

		diagnostic.ok = true;
		diagnostic.data = node_requirement;
		diagnostic.summary = `OK ${node_requirement}`;
		return resolve(diagnostic);
	});
}
