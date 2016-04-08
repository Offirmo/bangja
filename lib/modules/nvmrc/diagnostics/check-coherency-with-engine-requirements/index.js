import semver from 'semver';
import {get} from 'object-path';

export const declaration = {
	interface: '0.0.1',
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

	if (! node_requirement_from_engine) {
		diagnostic.result = undefined;
		diagnostic.summary = `N/A no engine requirements`;
		return callback(null, diagnostic);
	}

	if (! semver.satisfies(node_requirement_from_nvmrc, node_requirement_from_engine)) {
		diagnostic.err = new Error('.nvmrc=${node_requirement_from_nvmrc} is mismatching package.json engines.node= ${node_requirement_from_engine} declaration !');
		return callback(null, diagnostic);
	}

	diagnostic.result = true;
	diagnostic.summary = `OK .nvmrc=${node_requirement_from_nvmrc} defined and matching engines.node ${node_requirement_from_engine}`;
	return callback(null, diagnostic);
}
