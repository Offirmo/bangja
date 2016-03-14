
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

	async.waterfall([
		detect_modules,
		load_modules,
		perform_analysis,
	], function(err, res) {
		if (err) {
			console.error('ERROR !');
			console.error(err.message);
			console.error(prettyjson.render(err));
			return;
		}
	});
}


function async_filter_is_directory(path, cb) {
	// stat = follow symlinks, good
	fs.stat(path, (err, stats) => {
		if (err) return cb(err);

		// no 1st "err" arg, intentional per async doc
		cb(stats.isDirectory());
	});
}

function get_directories(srcpath, cb) {
	fs.readdir(srcpath, (err, files) => {
		if (err) return cb(err);

		files = files.map( _.ary(path.join.bind(path, srcpath), 1) );

		// REM : async filter cb takes no "err" param
		async.filter(files, async_filter_is_directory, dirs => cb(null, dirs));
	});
}

function detect_modules(cb) {
	let module_sources = [
		path.join(__dirname, '../bangja_modules')
	];
	// TODO look into named package.json
	// TODO look at params
	//console.log('* Detected sources :', util.inspect(module_sources, {colors: true}));

	async.map(module_sources, get_directories, (err, pathes) => {
		if (err) return cb(err);

		pathes = _.flatten(pathes);
		//console.log('* Detected modules :', util.inspect(pathes, {colors: true}));
		cb(null, pathes);
	});
}

function load_modules(module_pathes, final_cb) {
	const modules = async.map(module_pathes, (module_path, cb) => {
		let parts = [ 'diagnostics', 'recipes' ];
		parts = parts.map( _.ary(path.join.bind(path, module_path), 1) );

		async.filter(parts, async_filter_is_directory, dirs => {
			cb(null, parts);
		});
	},
	(err, pathes) => {
		pathes = _.flatten(pathes);
		console.log('found parts :', util.inspect(pathes, {colors: true}));
	});
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

