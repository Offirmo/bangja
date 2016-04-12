import _ from 'lodash';

export default function load(module, raw_module) {
	//console.log('* loading a v0.0.2 module...');

	module.human_description      = raw_module.declaration.human_description;
	module.mandatory_dependencies = raw_module.declaration.mandatory_dependencies;
	module.other_dependencies     = raw_module.declaration.other_dependencies;
	module.fn                     = raw_module.perform;

	return module;
}
