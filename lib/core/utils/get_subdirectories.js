import path from 'path';
import fs from 'fs';

import _ from 'lodash';
import async from 'async';

/** Get immediate subdirectories of given directory
 *
 * @param srcpath
 * @returns {Promise}
 */
export default function get_subdirectories(srcpath) {
	return new Promise((fulfill, reject) => {
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
