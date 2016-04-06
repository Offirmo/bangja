import path from 'path';
import fs from 'fs';
//import util from 'util';

import _ from 'lodash';
import async from 'async';


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


export function get_directories(srcpath) {
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


/** a non-throwing require aimed to load applicative modules without crashing
 */
export function non_throwing_require(file_path) {
	//console.log('non_throwing_require', file_path);
	try {
		return require(file_path);
	}
	catch(err) {
		console.error('! require error for "' + file_path + '" :', err);
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
