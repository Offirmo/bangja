import semver from 'semver';
import {get} from 'object-path';

export const declaration = {
	interface: '0.0.2',
	human_description: 'Check .nvmrc content validity',
	mandatory_dependencies: [
		'observation:nvmrc/content'
	],
	other_dependencies: [
	],
};

export function perform(bangja, module, results) {
	return new Promise((resolve, reject) => {
		const node_requirement_from_nvmrc = results.observations['nvmrc/content'];

		const res = {
			ok: false,
			data: false,
			summary: 'TODO',
			recommended_chores: [],
		};

		if (!semver.valid(node_requirement_from_nvmrc)) {
			res.err = new Error('.nvmrc contains a non-semver string : fix it !');
			return resolve(res);
		}

		res.ok = true;
		res.data = true;
		res.summary = `OK "${node_requirement_from_nvmrc}" seems valid`;
		return resolve(res);
	});
}
