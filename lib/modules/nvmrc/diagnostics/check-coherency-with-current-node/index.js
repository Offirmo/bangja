import semver from 'semver';
import {get} from 'object-path';

export const declaration = {
	interface: '0.0.1',
};

export const dependencies = [
	'observation:env/node-version',
	'observation:nvmrc/content',
	'diagnostic:nvmrc/check-coherency',
];

export function perform(callback, results) {
	const node_requirement_from_nvmrc = results['observation:nvmrc/content'].data;
	const current_node_version = results['observation:env/node-version'].data;

	const diagnostic = {
		result: false,
		summary: 'TODO',
		recommended_chores: [],
	};

	if (! results['diagnostic:nvmrc/check-coherency'].result) {
		diagnostic.result = undefined;
		diagnostic.summary = 'N/A no valid .nvmrc, nothing to do';
		return callback(null, diagnostic);
	}

	if (! semver.satisfies(current_node_version, node_requirement_from_nvmrc)) {
		// may or may not be an error...
		diagnostic.result = undefined;
		diagnostic.warn = `current node version ${current_node_version} is mismatching .nvmrc.nvmrc=${node_requirement_from_nvmrc}`;
		return callback(null, diagnostic);
	}

	diagnostic.result = true;
	diagnostic.summary = `OK current node version ${current_node_version} is matching .nvmrc.nvmrc=${node_requirement_from_nvmrc}`;
	return callback(null, diagnostic);
}
