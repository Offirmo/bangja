import util from 'util';

import {detect_modules, load_modules} from './module_loader';

import _ from 'lodash';
import async from 'async';
import prettyjson from 'prettyjson';

export default {
	run
};


function run(options) {
	console.log('* running with options:', prettyjson.render(options));

	hello();

	detect_modules()
	.then(load_modules)
	.then(perform_analysis)
	.catch(err => {
		console.error('ERROR !');
		console.error(err.message);
		console.error(prettyjson.render(err));
	});
}


function hello() {
	console.log(`
Bangja: Hello O great master !
        I'm here to take care of the menial stuff so you can save the world !
`);
}


function perform_analysis(modules, cb) {
	return;
	const diagnostic_keys = Object.keys(modules.diagnostics);

	console.log('* Running diagnostics...', diagnostic_keys);

	const auto_diagnostic = {};
	diagnostic_keys.forEach(id => {
		auto_diagnostic[id] = modules.diagnostics[id].async_auto_task
	});

	//console.log('* TODO run\n' + util.inspect(auto_diagnostic, {colors: true}));

	async.auto(auto_diagnostic, (err, results) => {
		console.info('* Diagnostics finished :');
		console.log('  - err = ', err);
		console.log('  - results = ', results);
	});
}


function perform_recipe(recipe, diagnostics) {

}
