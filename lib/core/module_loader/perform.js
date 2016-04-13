import {set} from 'object-path';

// TODO observatory


export default function wrapped_fn(bangja, module, auto_results) {
	const results = format_results(bangja, module, auto_results);

	return validate_prerequisites(bangja, module, auto_results)
	.then(() => bangja.libs.when(module.fn(bangja, module, results)).timeout(bangja.options.perform_timeout_ms))
	.then(res => {
		if (! bangja.libs._.isObject(res))
			throw new Error(`Module "${module.id}" didn’t return a proper result (!object) !`);
		if (res.ok && res.err)
			throw new Error(`Module "${module.id}" didn’t return a proper result (ok <> err) !`);

		switch(res.ok) {
			case true:
			case false:
			case undefined:
				// OK
				break;
			default:
				throw new Error(`Module "${module.id}" didn’t return a proper result (.ok) !`);
		}

		res.summary = autogen_summary(bangja, module, auto_results, res);
		if (res.err) res.summary = 'ERROR ' + res.summary;

			return res;
	})
	.catch(err => {
		if (! bangja.libs._.isObject(err)) {
			console.error(`Module "${module.id}" didn’t return a proper error (!object) !`);
			err = new Error('Unknown error');
		}

		const res = {
			ok: false,
			err,
			summary: 'ERROR ' + err.message
		};
		return res; // turn into a resolved promise
	})
	.then(res => {
		// auto-fill some common fields
		res.module = module;
		// debug final value
		//console.log(`Module "${module.id}" res =\n`, bangja.libs.pretty(res));
		return res;
	})
}


function autogen_summary(bangja, module, auto_results, res) {
	let summary = res.summary || res.data;
	summary = summary || (res.err ? res.err.message : null);
	summary = summary || 'N/A';
	return summary;
}


function format_results(bangja, module, auto_results) {
	const results = {};

	const dependencies = module.mandatory_dependencies.concat(module.other_dependencies);

	dependencies.forEach(dependency_id => {
		const result = auto_results[dependency_id];
		const module = result.module;

		const path = `${module.type}s.${module.namespace_id}/${module.sub_id}`;
		//console.log('inserting ' + path);
		set(results, path, result.data);
	});
	//console.log('* results \n', bangja.libs.pretty(results));

	return results;
}

function validate_prerequisites(bangja, module, auto_results) {
	return bangja.libs.when.try(() => {
		module.mandatory_dependencies.forEach(dependency_id => {
			const result = auto_results[dependency_id];
			const module = result.module;

			if (!result.ok)
				throw new Error(`N/A missing prerequisite "${result.module.id}"`);
		});
	});
}
