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

const submodule_types = [ 'observation',  'diagnostic',  'chore' ];

function perform_analysis(modules, cb) {

	// consolidate modules into an async.auto task
	const readonly_auto_tasks = {};

	[ 'observations',  'diagnostics' ].forEach(type => {
		console.log(`* Consolidating ${type}...`);

		const keys = Object.keys(modules[type]);
		console.log(`* keys = ${keys}...`);
		keys.forEach(key => {
			readonly_auto_tasks[key] = modules[type][key].async_auto_task;
			console.log(util.inspect(modules[type][key], {colors: true}));
		})
	});


	console.log('* Running diagnostics...');

	execute(Object.keys(modules.observations).concat(function(callback, results) {
		callback(null, 'TODO');
	}), readonly_auto_tasks);
	/*
	async.auto(readonly_auto_tasks, (err, results) => {
		console.info('* Diagnostics finished :');
		console.log('  - err = ', err);
		console.log('  - results =\n' + util.inspect(results, {colors: true}));
	});*/
}


function execute(auto_task, readonly_auto_tasks, callback) {
	const auto_tasks = Object.assign({}, readonly_auto_tasks);
	auto_tasks.result = auto_task;

	console.log('* executing auto()\n' + util.inspect(auto_tasks, {colors: true}));

	async.auto(readonly_auto_tasks, (err, results) => {
		console.info('* Task finished :');
		if (err)
			console.error('  - err =', err);
		console.log('  - results =\n' + util.inspect(results, {colors: true}));
	});

}
