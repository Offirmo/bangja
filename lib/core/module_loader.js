import util from 'util';
import path from 'path';

import _ from 'lodash';
import async from 'async';
import prettyjson from 'prettyjson';

import {get_directories, non_throwing_require} from './utils';

const submodule_types = [ 'observation', 'diagnostic', 'chore' ];


export function detect_modules(cb) {
	let module_sources = [
		path.join(__dirname, '../modules')
	];
	// TODO look into named package.json
	// TODO look at params
	console.log('* Detected sources :\n' + util.inspect(module_sources, {colors: true}));

	return Promise.all(module_sources.map(get_directories))
	.then(pathes => {
		pathes = _.flatten(pathes);
		console.log('* Detected modules :\n' + util.inspect(pathes, {colors: true}));
		return pathes;
	});
}

export function load_modules(module_pathes, callback) {
	const modules = {};

	submodule_types.forEach(type => {
		modules[type + 's'] = {};

		const p_submodule_pathes = module_pathes.map(module_path => {
			module_path = path.join(module_path, type + 's');

			return get_directories(module_path);
		});

		Promise.all(p_submodule_pathes)
		.then(p => _.flatten(p))
		.then(submodule_pathes => {
			console.log(`* "${type}" submodules to check :\n` + util.inspect(submodule_pathes, {colors: true}));
			return submodule_pathes.map(load_submodules.bind(null, type));
		});
	});
}




function load_submodules(type, submodule_pathes) {
	return Promise.all(submodule_pathes).then(load_submodule.bind(null, type))
	.then(submodules => {
		console.log('* submodules loaded :\n' + util.inspect(submodules, {colors: true}));
		//console.log('* recipes loaded :\n' + util.inspect(recipes, {colors: true}));

		/*const modules = {
			diagnostics: {},
			recipes: {}
		};
		diagnostics.forEach(diagnostic => modules.diagnostics[diagnostic.id] = diagnostic);
		recipes.forEach(recipe => modules.recipes[recipe.id] = recipe);

		return modules;*/
	});
}

function load_submodule(type, path) {
	console.log(`* TOD load submodule "${type}" from "${path}"...`);
}

function load_typed_modules(radix, pathes) {
	console.log('* found diagnostics :\n' + util.inspect(pathes, {colors: true}));

	return _.compact(pathes.map(load_typed_module));
}

function load_typed_module(radix, mod_path, callback) {
	let id = mod_path.split(path.sep).slice(-3);
	id = 'diagnostic:' + id[0] + '/' + id[2];

	const mod = non_throwing_require(mod_path);
	if (!mod) return;

	//console.log(util.inspect(mod, {colors: true}));
	return {
		id,
		fn: mod.perform,
		dependencies: mod.dependencies,
		async_auto_task: mod.dependencies.concat(mod.perform)
	};
}
