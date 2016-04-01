'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _util = require('util');

var _util2 = _interopRequireDefault(_util);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _async = require('async');

var _async2 = _interopRequireDefault(_async);

var _prettyjson = require('prettyjson');

var _prettyjson2 = _interopRequireDefault(_prettyjson);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
	run: run
};


function run(options) {
	console.log('* running with options:', _prettyjson2.default.render(options));

	hello();

	detect_modules().then(load_modules).then(perform_analysis).catch(err => {
		console.error('ERROR !');
		console.error(err.message);
		console.error(_prettyjson2.default.render(err));
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
	_fs2.default.stat(path, (err, stats) => {
		if (err) return cb(err);

		// no 1st "err" arg, intentional per async doc
		cb(stats.isDirectory());
	});
}

function get_directories(srcpath) {
	return new Promise(function (fulfill, reject) {
		_fs2.default.readdir(srcpath, (err, files) => {
			if (err) {
				if (err.code === 'ENOENT') return fulfill([]);
				return reject(err);
			}

			// make it a full path
			files = files.map(_lodash2.default.ary(_path2.default.join.bind(_path2.default, srcpath), 1));

			// REM : async filter cb takes no "err" param
			_async2.default.filter(files, async_filter_is_directory, dirs => fulfill(dirs));
		});
	});
}

function detect_modules(cb) {
	let module_sources = [_path2.default.join(__dirname, '../bangja_modules')];
	// TODO look into named package.json
	// TODO look at params
	console.log('* Detected sources :\n' + _util2.default.inspect(module_sources, { colors: true }));

	return Promise.all(module_sources.map(get_directories)).then(pathes => {
		pathes = _lodash2.default.flatten(pathes);
		console.log('* Detected modules :\n' + _util2.default.inspect(pathes, { colors: true }));
		return pathes;
	});
}

function load_modules(module_pathes, callback) {
	let diagnostics = module_pathes.map(module_path => {
		module_path = _path2.default.join(module_path, 'diagnostics');

		return get_directories(module_path);
	});

	let recipes = module_pathes.map(module_path => {
		module_path = _path2.default.join(module_path, 'recipes');

		return get_directories(module_path);
	});

	return Promise.all([Promise.all(diagnostics).then(p => _lodash2.default.flatten(p)).then(load_diagnostics), Promise.all(recipes).then(p => _lodash2.default.flatten(p)).then(load_recipes)]).then(_ref => {
		var _ref2 = _slicedToArray(_ref, 2);

		let diagnostics = _ref2[0];
		let recipes = _ref2[1];

		console.log('* diagnostics loaded :\n' + _util2.default.inspect(diagnostics, { colors: true }));
		console.log('* recipes loaded :\n' + _util2.default.inspect(recipes, { colors: true }));

		return {
			diagnostics: diagnostics,
			recipes: recipes
		};
	});
}

function load_diagnostics(diagnostic_pathes) {
	console.log('* found diagnostics :\n' + _util2.default.inspect(diagnostic_pathes, { colors: true }));

	return _lodash2.default.compact(diagnostic_pathes.map(load_diagnostic));
}

function load_diagnostic(diagnostic_path, callback) {
	let id = diagnostic_path.split(_path2.default.sep).slice(-3);
	id = id[0] + '/' + id[2];

	const mod = non_throwing_require(diagnostic_path);
	if (!mod) return;

	console.log(_util2.default.inspect(mod, { colors: true }));
	return {
		id: id,
		fn: mod.perform,
		dependencies: mod.dependencies,
		async_auto_task: mod.dependencies.concat(mod.perform)
	};
}

function load_recipes(recipe_pathes) {
	//console.log('* found recipes :\n' + util.inspect(recipe_pathes, {colors: true}));

	return _lodash2.default.compact(recipe_pathes.map(load_recipe));
}

function load_recipe(recipe_path, callback) {
	let id = recipe_path.split(_path2.default.sep).slice(-3);
	id = id[0] + '/' + id[2];

	const mod = non_throwing_require(recipe_path);
	if (!mod) return;

	console.log(_util2.default.inspect(mod, { colors: true }));
	return {
		id: id,
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
	console.log('TODO analyze !!!', _util2.default.inspect(modules, { colors: true }));
}

function perform_recipe(recipe, diagnostics) {}

function non_throwing_require(file_path) {
	//console.log('non_throwing_require', file_path);
	try {
		return require(file_path);
	} catch (err) {
		if (err.code === 'MODULE_NOT_FOUND' && err.message.slice(-file_path.length - 1, -1) === file_path) {
			// we tried to import an non-existing file
			// swallow the error, this is just what we want to ignore.
		} else {
				// there was an other error,
				// most likely the imported file is syntactically incorrect,
				// in which case it helps *a lot* to display the error :
				console.error('! require error for "' + file_path + '" :', err);
			}

		return null;
	}
}