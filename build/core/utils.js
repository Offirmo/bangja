'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.get_directories = get_directories;
exports.non_throwing_require = non_throwing_require;

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _async = require('async');

var _async2 = _interopRequireDefault(_async);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// async "is directory"
// *special API* for use in async.filter

//import util from 'util';

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

/** a non-throwing require aimed to load applicative modules without crashing
 */
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi9jb3JlL3V0aWxzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O1FBcUJnQjtRQW9CQTs7QUF6Q2hCOzs7O0FBQ0E7Ozs7QUFHQTs7OztBQUNBOzs7Ozs7Ozs7OztBQUtBLFNBQVMseUJBQVQsQ0FBbUMsSUFBbkMsRUFBeUMsRUFBekMsRUFBNkM7O0FBRTVDLGNBQUcsSUFBSCxDQUFRLElBQVIsRUFBYyxDQUFDLEdBQUQsRUFBTSxLQUFOLEtBQWdCO0FBQzdCLE1BQUksR0FBSixFQUFTLE9BQU8sR0FBRyxHQUFILENBQVAsQ0FBVDs7O0FBRDZCLElBSTdCLENBQUcsTUFBTSxXQUFOLEVBQUgsRUFKNkI7RUFBaEIsQ0FBZCxDQUY0QztDQUE3Qzs7QUFXTyxTQUFTLGVBQVQsQ0FBeUIsT0FBekIsRUFBa0M7QUFDeEMsUUFBTyxJQUFJLE9BQUosQ0FBWSxVQUFVLE9BQVYsRUFBbUIsTUFBbkIsRUFBMkI7QUFDN0MsZUFBRyxPQUFILENBQVcsT0FBWCxFQUFvQixDQUFDLEdBQUQsRUFBTSxLQUFOLEtBQWdCO0FBQ25DLE9BQUksR0FBSixFQUFTO0FBQ1IsUUFBSSxJQUFJLElBQUosS0FBYSxRQUFiLEVBQXVCLE9BQU8sUUFBUSxFQUFSLENBQVAsQ0FBM0I7QUFDQSxXQUFPLE9BQU8sR0FBUCxDQUFQLENBRlE7SUFBVDs7O0FBRG1DLFFBT25DLEdBQVEsTUFBTSxHQUFOLENBQVcsaUJBQUUsR0FBRixDQUFNLGVBQUssSUFBTCxDQUFVLElBQVYsaUJBQXFCLE9BQXJCLENBQU4sRUFBcUMsQ0FBckMsQ0FBWCxDQUFSOzs7QUFQbUMsa0JBVW5DLENBQU0sTUFBTixDQUFhLEtBQWIsRUFBb0IseUJBQXBCLEVBQStDLFFBQVEsUUFBUSxJQUFSLENBQVIsQ0FBL0MsQ0FWbUM7R0FBaEIsQ0FBcEIsQ0FENkM7RUFBM0IsQ0FBbkIsQ0FEd0M7Q0FBbEM7Ozs7QUFvQkEsU0FBUyxvQkFBVCxDQUE4QixTQUE5QixFQUF5Qzs7QUFFL0MsS0FBSTtBQUNILFNBQU8sUUFBUSxTQUFSLENBQVAsQ0FERztFQUFKLENBR0EsT0FBTSxHQUFOLEVBQVc7QUFDVixNQUFPLElBQUksSUFBSixLQUFhLGtCQUFiLElBQ0gsSUFBSSxPQUFKLENBQVksS0FBWixDQUFrQixDQUFDLFVBQVUsTUFBVixHQUFpQixDQUFsQixFQUFxQixDQUFDLENBQUQsQ0FBdkMsS0FBK0MsU0FBL0MsRUFBMEQ7OztHQUQ5RCxNQUtLOzs7O0FBSUosWUFBUSxLQUFSLENBQWMsMEJBQTBCLFNBQTFCLEdBQXNDLEtBQXRDLEVBQTZDLEdBQTNELEVBSkk7SUFMTDs7QUFZQSxTQUFPLElBQVAsQ0FiVTtFQUFYO0NBTE0iLCJmaWxlIjoidXRpbHMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgcGF0aCBmcm9tICdwYXRoJztcbmltcG9ydCBmcyBmcm9tICdmcyc7XG4vL2ltcG9ydCB1dGlsIGZyb20gJ3V0aWwnO1xuXG5pbXBvcnQgXyBmcm9tICdsb2Rhc2gnO1xuaW1wb3J0IGFzeW5jIGZyb20gJ2FzeW5jJztcblxuXG4vLyBhc3luYyBcImlzIGRpcmVjdG9yeVwiXG4vLyAqc3BlY2lhbCBBUEkqIGZvciB1c2UgaW4gYXN5bmMuZmlsdGVyXG5mdW5jdGlvbiBhc3luY19maWx0ZXJfaXNfZGlyZWN0b3J5KHBhdGgsIGNiKSB7XG5cdC8vIHN0YXQgPSBmb2xsb3cgc3ltbGlua3MsIGdvb2Rcblx0ZnMuc3RhdChwYXRoLCAoZXJyLCBzdGF0cykgPT4ge1xuXHRcdGlmIChlcnIpIHJldHVybiBjYihlcnIpO1xuXG5cdFx0Ly8gbm8gMXN0IFwiZXJyXCIgYXJnLCBpbnRlbnRpb25hbCBwZXIgYXN5bmMgZG9jXG5cdFx0Y2Ioc3RhdHMuaXNEaXJlY3RvcnkoKSk7XG5cdH0pO1xufVxuXG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRfZGlyZWN0b3JpZXMoc3JjcGF0aCkge1xuXHRyZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKGZ1bGZpbGwsIHJlamVjdCkge1xuXHRcdGZzLnJlYWRkaXIoc3JjcGF0aCwgKGVyciwgZmlsZXMpID0+IHtcblx0XHRcdGlmIChlcnIpIHtcblx0XHRcdFx0aWYgKGVyci5jb2RlID09PSAnRU5PRU5UJykgcmV0dXJuIGZ1bGZpbGwoW10pO1xuXHRcdFx0XHRyZXR1cm4gcmVqZWN0KGVycik7XG5cdFx0XHR9XG5cblx0XHRcdC8vIG1ha2UgaXQgYSBmdWxsIHBhdGhcblx0XHRcdGZpbGVzID0gZmlsZXMubWFwKCBfLmFyeShwYXRoLmpvaW4uYmluZChwYXRoLCBzcmNwYXRoKSwgMSkgKTtcblxuXHRcdFx0Ly8gUkVNIDogYXN5bmMgZmlsdGVyIGNiIHRha2VzIG5vIFwiZXJyXCIgcGFyYW1cblx0XHRcdGFzeW5jLmZpbHRlcihmaWxlcywgYXN5bmNfZmlsdGVyX2lzX2RpcmVjdG9yeSwgZGlycyA9PiBmdWxmaWxsKGRpcnMpKTtcblx0XHR9KTtcblx0fSk7XG59XG5cblxuLyoqIGEgbm9uLXRocm93aW5nIHJlcXVpcmUgYWltZWQgdG8gbG9hZCBhcHBsaWNhdGl2ZSBtb2R1bGVzIHdpdGhvdXQgY3Jhc2hpbmdcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIG5vbl90aHJvd2luZ19yZXF1aXJlKGZpbGVfcGF0aCkge1xuXHQvL2NvbnNvbGUubG9nKCdub25fdGhyb3dpbmdfcmVxdWlyZScsIGZpbGVfcGF0aCk7XG5cdHRyeSB7XG5cdFx0cmV0dXJuIHJlcXVpcmUoZmlsZV9wYXRoKTtcblx0fVxuXHRjYXRjaChlcnIpIHtcblx0XHRpZiAoICAgZXJyLmNvZGUgPT09ICdNT0RVTEVfTk9UX0ZPVU5EJ1xuXHRcdFx0JiYgZXJyLm1lc3NhZ2Uuc2xpY2UoLWZpbGVfcGF0aC5sZW5ndGgtMSwgLTEpID09PSBmaWxlX3BhdGgpIHtcblx0XHRcdC8vIHdlIHRyaWVkIHRvIGltcG9ydCBhbiBub24tZXhpc3RpbmcgZmlsZVxuXHRcdFx0Ly8gc3dhbGxvdyB0aGUgZXJyb3IsIHRoaXMgaXMganVzdCB3aGF0IHdlIHdhbnQgdG8gaWdub3JlLlxuXHRcdH1cblx0XHRlbHNlIHtcblx0XHRcdC8vIHRoZXJlIHdhcyBhbiBvdGhlciBlcnJvcixcblx0XHRcdC8vIG1vc3QgbGlrZWx5IHRoZSBpbXBvcnRlZCBmaWxlIGlzIHN5bnRhY3RpY2FsbHkgaW5jb3JyZWN0LFxuXHRcdFx0Ly8gaW4gd2hpY2ggY2FzZSBpdCBoZWxwcyAqYSBsb3QqIHRvIGRpc3BsYXkgdGhlIGVycm9yIDpcblx0XHRcdGNvbnNvbGUuZXJyb3IoJyEgcmVxdWlyZSBlcnJvciBmb3IgXCInICsgZmlsZV9wYXRoICsgJ1wiIDonLCBlcnIpO1xuXHRcdH1cblxuXHRcdHJldHVybiBudWxsO1xuXHR9XG59XG4iXX0=