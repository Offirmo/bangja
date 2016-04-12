import _ from 'lodash';
import perform from './perform';


export default function build_auto_task(bangja, module) {
	return []
		.concat(module.mandatory_dependencies)
		.concat(module.other_dependencies)
		.concat(get_memoizing_auto_task(bangja, module));
}


function get_memoizing_auto_task(bangja, module) {
	// memoize the results
	let memo;

	// return a function compatible with async.auto
	const auto_fn = function(callback, auto_results) {
		console.log(`* async.auto - "${module.id}" - 1. execution...`);

		if (! memo)
			memo = perform(bangja, module, auto_results);

		memo
		.then(res => {
			console.log(`* async.auto - "${module.id}" - 2. callbacking : res`);
			callback(null, res)
		})
		.catch(err => {
			// should never happen
			console.error(`* async.auto - "${module.id}" - 2. callbacking : ERR !`);
			callback(err)
		})
		.finally(() => console.log(`* async.auto - "${module.id}" - 3. executed.`));
	};

	// allow de-memoization
	//auto_fn.unmemoize = () => memo = null;

	return auto_fn;
}
