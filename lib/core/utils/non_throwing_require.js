import path from 'path';

import _ from 'lodash';
import async from 'async';


/** a non-throwing require aimed to load applicative modules without crashing
 */
export default function non_throwing_require(file_path) {
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
