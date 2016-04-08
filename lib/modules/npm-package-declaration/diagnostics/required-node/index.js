import semver from 'semver';
import {get} from 'object-path';

export const declaration = {
	version: '0.0.1',
};

export const dependencies = [
	'observation:npm-package-declaration/content',
	'observation:nvmrc/content',
	'diagnostic:nvmrc/check-coherency',
];

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
