import _ from 'lodash';

export default function load(module, raw_module_decl) {

	module.fn = function(bangja, module, auto_results) {
		return new Promise((resolve, reject) => {
			raw_module_decl.perform((err, res) => {
				if (err) {
					resolve({
						err,
						ok: false,
						summary: `??? ${module.id}`
					});
				}

				resolve(res);
			}, auto_results);
		});
	};
	module.mandatory_dependencies.concat(raw_module_decl.dependencies);

	return module;
}
