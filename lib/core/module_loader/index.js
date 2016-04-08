import util from 'util';
import path from 'path';

import _ from 'lodash';
import async from 'async';
import prettyjson from 'prettyjson';

import get_subdirectories from '../utils/get_subdirectories';
import non_throwing_require from '../utils/non_throwing_require';

import wrap_perform from './perform_wrappers';

const submodule_types = [ 'observation',  'diagnostic',  'chore' ];

export function detect_modules() {
	let module_sources = [
		path.join(__dirname, '../../modules')
	];
	// TODO look into named package.json
	// TODO look at params
	//console.log('* Detected sources :\n' + util.inspect(module_sources, {colors: true}));

	return Promise.all(module_sources.map(get_subdirectories))
	.then(mod_pathes => _.flatten(mod_pathes))
	.then(mod_pathes => {
		//console.log('* Detected modules :\n' + util.inspect(mod_pathes, {colors: true}));
		return mod_pathes;
	});
}


export function load_modules(mod_pathes) {
	//console.log('* Loading modules :\n' + util.inspect(mod_pathes, {colors: true}));
	const base = {};

	return Promise.all(mod_pathes.map(load_module))
	.then(modules => {
		// TODO merge them

		//console.log('* Loaded modules :\n' + util.inspect(modules, {colors: true}));

		submodule_types.forEach(type => {
			const entry = base[type + 's'] = {};

			modules.forEach(module => {
				Object.assign(entry, module[type + 's']);
			});
		});

		//console.log('* Final base :\n' + util.inspect(base, {colors: true}));

		return base;
	});
}


export function load_module(mod_path) {
	const module = {
		id: mod_path.split(path.sep).slice(-1)[0] // for debug
	};
	//console.log(`* loading module "${module.id}"...`);

	return Promise.all(submodule_types.map(type => {
		const submod_entry = module[type + 's'] = {};

		return load_typed_submodules(module.id, type, mod_path)
		.then(submodules => {
			submodules.forEach(submodule => submod_entry[submodule.id] = submodule);
		});
	}))
	.then(submodules => {
		return module;
	});
}

function load_typed_submodules(module_id, type, mod_path) {
	//console.log(`* loading type "${type}" submodules from "${mod_path}"...`);
	const typed_path = path.join(mod_path, type + 's');

	return get_subdirectories(typed_path)
	.then(submod_pathes => {
		//if (submod_pathes.length) console.log('submodule_pathes', submod_pathes);

		return Promise.all(submod_pathes.map(load_typed_submodule.bind(null, module_id, type)));
	});
}

function load_typed_submodule(module_id, type, submod_path) {
	const id = type + ':' + module_id + '/' + submod_path.split(path.sep).slice(-1)[0];
	//console.log(`* loading submodule "${id}" from ${submod_path}...`);

	const mod = non_throwing_require(submod_path);
	if (! mod) return;

	let context = { id };

	const module = {
		id,
		fn: mod.perform,
		dependencies: mod.dependencies,
		async_auto_task: mod.dependencies.concat(wrap_perform(context, mod.perform))
	};
	//console.log(util.inspect(module, {colors: true}));
	return module;
}
