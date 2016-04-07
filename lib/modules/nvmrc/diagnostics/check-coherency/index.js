import semver from 'semver';
import {get} from 'object-path';

export const dependencies = [
	'observation:nvmrc/content',
];

export function perform(callback, results) {
	const node_requirement_from_nvmrc = results['observation:nvmrc/content'].data;

	const diagnostic = {
		result: false,
		summary: 'TODO',
		recommended_chores: [],
	};

	if (results['observation:nvmrc/content'].err || ! node_requirement_from_nvmrc) {
		diagnostic.result = undefined;
		diagnostic.summary = 'N/A no valid .nvmrc, nothing to do';
		return callback(null, diagnostic);
	}

	if (! semver.valid(node_requirement_from_nvmrc)) {
		diagnostic.err = new Error('.nvmrc contains a non-semver string : fix it !');
		return callback(null, diagnostic);
	}

	diagnostic.result = true;
	diagnostic.summary = `OK .nvmrc=${node_requirement_from_nvmrc} seems valid`;
	return callback(null, diagnostic);
}
