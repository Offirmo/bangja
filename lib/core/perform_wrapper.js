
// TODO observatory

import _ from 'lodash';

export default function wrap(id, perform_fn) {

	// memoize the results
	let is_memoized = false;
	let memo_err, memo_res;

	const wrapped = function(callback, results) {
		if (is_memoized)
			return callback(memo_err, memo_res);

		function memoize(err, res) {
			if (err) {
				if (! _.isObject(err))
					console.error(id + ' didnt returned an error !');
				err.message = '' + id + ' - ' + err.message;
			}
			memo_err = err;
			memo_res = res;
			is_memoized = true;

			return callback(memo_err, memo_res);
		}

		console.log('Executing ' + id + '...');
		perform_fn(memoize, results);
	};

	// allow de-memoization
	wrapped.unmemoize = () => is_memoized = false;

	return wrapped;
}
