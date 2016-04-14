import _ from 'lodash';
import semver from 'semver';
import {get} from 'object-path';

export const declaration = {
	interface: '0.0.2',
	human_description: 'check if package.json has a correct "engines" section',
	mandatory_dependencies: [
		'observation:npm-package-declaration/content',
		'diagnostic:node/required-version',
	],
	other_dependencies: [
	],
};

export function perform(bangja, module, results) {
	return new Promise((resolve, reject) => {
		const package_json = results.observations['npm-package-declaration/content'];

		const has_engine = _.isObject(package_json.engines);
		const has_node_requirement = _.isString(get(package_json, 'engines.node'));

		const diagnostic = {
			ok: has_engine && has_node_requirement,
			summary: 'OK',
			recommended_chores: [],
		};

		if (! diagnostic.ok) {
			diagnostic.summary = `ERROR package.json should have a correct "engines.node" entry`;
			diagnostic.recommended_chores.push('chore:npm-package-declaration/set-engines-node');
		}

		return resolve(diagnostic);
	});
}
