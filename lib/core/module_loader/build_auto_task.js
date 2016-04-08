import _ from 'lodash';

export default function build_auto_task(bangja, module) {
	return []
		.concat(module.mandatory_dependencies)
		.concat(module.other_dependencies)
		.concat(get_memoizing_auto_task(bangja, module));
}

// TODO observatory


function get_memoizing_auto_task(bangja, module) {
	let fn = module.fn; //get_fn_wrapped_with_interface_checks(bangja, module);

	// memoize the results
	let memo;

	// return a function compatible with async.auto
	const auto_fn = function(callback, auto_results) {
		console.log(`Executing "${module.id}"...`);

		if (! memo)
			memo = module.fn(bangja, module, auto_results);

		memo.then(
			res => {
				console.log(`callbacking "${module.id}"....`)
				callback(null, res)
			},
			err => {
				console.log(`callbacking "${module.id}"....`)
				callback(err)
			}
		)
		.then(() => console.log(`"${module.id}" executed.`));
	};

	// allow de-memoization
	auto_fn.unmemoize = () => memo = null;

	return auto_fn;
}

function get_fn_wrapped_with_interface_checks(bangja, module) {
	return function(bangja, module, auto_results) {
		return module.fn(bangja, module, auto_results)
		.then(
			res => {
				// auto-fill some fields
				res.module = module;
				return res;
			},
			err => {
				"use strict";
				if (! _.isObject(err))
					console.error(module.id + ' didnt return an error !');
				err.message = '' + module.id + ' - ' + err.message;
				throw err;
			}
		);
	}
}
