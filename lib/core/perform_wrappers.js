
// TODO observatory

import _ from 'lodash';

export default function wrap(context, perform_fn) {

	// memoize the results
	let is_memoized = false;
	let memo_err, memo_res;
	const type = context.id.split(':')[0];

	const wrapped = function(callback, results) {
		if (is_memoized)
			return callback(memo_err, memo_res);

		function memoize(err, res) {
			if (err) {
				if (! _.isObject(err))
					console.error(context.id + ' didnt returned an error !');
				err.message = '' + context.id + ' - ' + err.message;
			}
			memo_err = err;
			memo_res = res;
			// auto-fill some fields
			memo_res.id = context.id;
			memo_res.type = type;

			is_memoized = true;

			return callback(memo_err, memo_res);
		}

		console.log('Executing ' + context.id + '...');
		perform_fn(memoize, results);
	};

	// allow de-memoization
	wrapped.unmemoize = () => is_memoized = false;

	return wrapped;
}
