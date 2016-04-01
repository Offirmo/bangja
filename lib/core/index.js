
import path from 'path';
import fs from 'fs';
import util from 'util';

import _ from 'lodash';
import async from 'async';
import prettyjson from 'prettyjson';

export default {
	run
};


function run(options) {
	console.log('* running with options:', prettyjson.render(options));

	hello();

	detect_modules()
	.then(load_modules)
	.then(perform_analysis)
	.catch(err => {
		console.error('ERROR !');
		console.error(err.message);
		console.error(prettyjson.render(err));
	});
}


function hello() {
	console.log(`
Bangja: Hello O great master !
        I'm here to take care of the menial stuff so you can save the world !
`);
}


// async "is directory"
// *special API* for use in async.filter
function async_filter_is_directory(path, cb) {
	// stat = follow symlinks, good
	fs.stat(path, (err, stats) => {
		if (err) return cb(err);

		// no 1st "err" arg, intentional per async doc
		cb(stats.isDirectory());
	});
}


function get_directories(srcpath) {
	return new Promise(function (fulfill, reject) {
		fs.readdir(srcpath, (err, files) => {
			if (err) {
				if (err.code === 'ENOENT') return fulfill([]);
				return reject(err);
			}

			// make it a full path
			files = files.map( _.ary(path.join.bind(path, srcpath), 1) );

			// REM : async filter cb takes no "err" param
			async.filter(files, async_filter_is_directory, dirs => fulfill(dirs));
		});
	});
}


function detect_modules(cb) {
	let module_sources = [
		path.join(__dirname, '../bangja_modules')
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

function load_modules(module_pathes, callback) {
	let diagnostics = module_pathes.map(module_path => {
		module_path = path.join(module_path, 'diagnostics');

		return get_directories(module_path);
	});

	let recipes = module_pathes.map(module_path => {
		module_path = path.join(module_path, 'recipes');

		return get_directories(module_path);
	});

	return Promise.all([
		Promise.all(diagnostics).then(p => _.flatten(p)).then(load_diagnostics),
		Promise.all(recipes).then(p => _.flatten(p)).then(load_recipes)
	])
		.then(([diagnostics, recipes]) => {
			console.log('* diagnostics loaded :\n' + util.inspect(diagnostics, {colors: true}));
			console.log('* recipes loaded :\n' + util.inspect(recipes, {colors: true}));

			return {
				diagnostics,
				recipes
			};
		});
}

function load_diagnostics(diagnostic_pathes) {
	console.log('* found diagnostics :\n' + util.inspect(diagnostic_pathes, {colors: true}));

	return _.compact(diagnostic_pathes.map(load_diagnostic));
}

function load_diagnostic(diagnostic_path, callback) {
	let id = diagnostic_path.split(path.sep).slice(-3);
	id = id[0] + '/' + id[2];

	const mod = non_throwing_require(diagnostic_path);
	if (!mod) return;

	console.log(util.inspect(mod, {colors: true}));
	return {
		id,
		fn: mod.perform,
		dependencies: mod.dependencies,
		async_auto_task: mod.dependencies.concat(mod.perform)
	};
}

function load_recipes(recipe_pathes) {
	//console.log('* found recipes :\n' + util.inspect(recipe_pathes, {colors: true}));

	return _.compact(recipe_pathes.map(load_recipe));
}

function load_recipe(recipe_path, callback) {
	let id = recipe_path.split(path.sep).slice(-3);
	id = id[0] + '/' + id[2];

	const mod = non_throwing_require(recipe_path);
	if (!mod) return;

	console.log(util.inspect(mod, {colors: true}));
	return {
		id,
		fn: mod.perform,
		dependencies: mod.dependencies,
		async_auto_task: mod.dependencies.concat(mod.perform)
	};
}

/*
 function load_module(module_path, callback) {
 console.log('loading ' + module_path);
 let path_elems = module_path.split(path.sep);
 console.log('found parts :', util.inspect(path_elems, {colors: true}));

 let module = {
 };

 callback(null, module);
 }*/

function perform_analysis(modules, cb) {
	console.log('TODO analyze !!!', util.inspect(modules, {colors: true}));


}


function perform_recipe(recipe, diagnostics) {

}

function non_throwing_require(file_path) {
	//console.log('non_throwing_require', file_path);
	try {
		return require(file_path);
	}
	catch(err) {
		if (   err.code === 'MODULE_NOT_FOUND'
			&& err.message.slice(-file_path.length-1, -1) === file_path) {
			// we tried to import an non-existing file
			// swallow the error, this is just what we want to ignore.
		}
		else {
			// there was an other error,
			// most likely the imported file is syntactically incorrect,
			// in which case it helps *a lot* to display the error :
			console.error('! require error for "' + file_path + '" :', err);
		}

		return null;
	}
}
