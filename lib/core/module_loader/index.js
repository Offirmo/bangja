import util from 'util';
import path from 'path';

import _ from 'lodash';
import async from 'async';
import prettyjson from 'prettyjson';

import get_subdirectories from '../utils/get_subdirectories';
import non_throwing_require from '../utils/non_throwing_require';

import build_auto_task from './build_auto_task';

import load_0_0_1 from './load_v0.0.1';
import load_0_0_2 from './load_v0.0.2';

const module_types = [ 'observation',  'diagnostic',  'chore' ];

let bangja;

export default function load_modules(bangja_instance) {
	console.log('* Loading modules...');
	bangja = bangja_instance;

	const modules = {};

	return detect_namespaces()
	.then(mod_pathes => Promise.all(mod_pathes.map(load_namespace)))
	.then(namespaces => {
		//console.log('* Loaded namespaces :\n' + util.inspect(namespaces, {colors: true}));

		module_types.forEach(type => {
			const entry = modules[type + 's'] = {};

			namespaces.forEach(module => {
				Object.assign(entry, module[type + 's']);
			});
		});

		//console.log('* Final base :\n' + util.inspect(modules, {colors: true}));

		bangja.modules = modules;
		return modules;
	});
}

function detect_namespaces() {
	let sources = [
		path.join(__dirname, '../../modules')
	];
	// TODO look into named package.json
	// TODO look at params
	//console.log('* Detected sources :\n' + util.inspect(sources, {colors: true}));

	return Promise.all(sources.map(get_subdirectories))
	.then(pathes => _.flatten(pathes))
	.then(pathes => {
		//console.log('* Detected namespaces :\n' + util.inspect(pathes, {colors: true}));
		return pathes;
	});
}

export function load_namespace(namespace_path) {
	//console.log(`* loading namespace from "${namespace_path}"...`);

	const namespace = {
		id: namespace_path.split(path.sep).slice(-1)[0] // for debug
	};

	return Promise.all(module_types.map(type => {
		const mod_entry = namespace[type + 's'] = {};

		return load_modules_by_type(namespace.id, type, namespace_path)
		.then(modules => {
			modules.forEach(module => mod_entry[module.id] = module);
		});
	}))
	.then(() => namespace);
}

function load_modules_by_type(namespace_id, type, namespace_path) {
	//console.log(`* loading type "${type}" modules for namespace "${namespace_id}"...`);
	const typed_path = path.join(namespace_path, type + 's');

	return get_subdirectories(typed_path)
	.then(mod_pathes => Promise.all(mod_pathes.map(load_module.bind(null, type))))
	.then(modules => _.compact(modules));
}

const WHITELIST = [
	'observation:node/existing-versions'
];

function load_module(type, mod_path) {
	try {
		const [namespace_id,, sub_id] = mod_path.split(path.sep).slice(-3);
		const id = type + ':' + namespace_id + '/' + sub_id;

		if (WHITELIST && WHITELIST.indexOf(id) === -1) {
			//console.log(`* NOT loading module "${id}" since NOT in whitelist.`);
			return;
		}
		//console.log(`* loading module "${id}"...`);

		const raw_mod = non_throwing_require(mod_path);
		if (! raw_mod) throw new Error('Bad module ' + mod_path);

		const module = {
			id,
			type,
			namespace_id,
			sub_id,
			path: mod_path,
			human_description: `TODO description ${id}`,
			mandatory_dependencies: [],
			other_dependencies: [],
		};

		switch(raw_mod.declaration.interface) {
			case '0.0.2':
				load_0_0_2(module, raw_mod);
				break;
			case '0.0.1':
			default:
				load_0_0_1(module, raw_mod);
				break;
		}

		module.async_auto_task = build_auto_task(bangja, module);

		console.log(`module ${id} loaded :\n`, bangja.libs.pretty(module));

		return module;
	}
	catch(err) {
		console.error(`! Error loading module "${mod_path}"`, err);
	}
}
