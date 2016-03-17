
import path from 'path';
import fs from 'fs';
import util from 'util';

import _ from 'lodash';
import async from 'async';
import prettyjson from 'prettyjson';

//const core = require('./core');


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


// async "is directory" for use in async.filter
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
	console.log('* Detected sources :', util.inspect(module_sources, {colors: true}));

	return Promise.all(module_sources.map(get_directories))
	.then(pathes => {
		pathes = _.flatten(pathes);
		console.log('* Detected modules :', util.inspect(pathes, {colors: true}));
		return pathes;
	});
}

function load_modules(module_pathes, callback) {
	let diagnostics = module_pathes.map(module_path => {
		module_path = path.join(module_path, 'diagnostics');

		console.log(module_path);
		return get_directories(module_path);
	});

	let recipes = module_pathes.map(module_path => {
		module_path = path.join(module_path, 'recipes');

		console.log(module_path);
		return get_directories(module_path);
	});

	return Promise.all([
		Promise.all(diagnostics).then(p => _.flatten(p)),
		Promise.all(recipes).then(p => _.flatten(p))
	])
	.then(([diagnostics, recipes]) => {
		console.log('found diagnostics :', util.inspect(diagnostics, {colors: true}));
		console.log('found recipes :', util.inspect(recipes, {colors: true}));
	});
}

function load_module(module_path, callback) {
	console.log('loading ' + module_path);
	let path_elems = module_path.split(path.sep);
	console.log('found parts :', util.inspect(path_elems, {colors: true}));

	let module = {
	};

	callback(null, module);
}

function perform_analysis(modules, cb) {
	console.log('TODO analyze !!!', util.inspect(modules, {colors: true}));
}

function hello() {
	console.log(`
Bangja: Hello O great master !
        I'm here to take care of the menial stuff so you can save the world !
`);
}

