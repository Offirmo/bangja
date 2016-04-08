import util from 'util';

import load_modules from './module_loader';

import _ from 'lodash';
import async from 'async';
import chalk from 'chalk';
import prettyjson from 'prettyjson';
import observatory from 'observatory';
import Table from 'cli-table';

const results_table = new Table({
	head: ['id', 'result'],
	colWidths: [50, 67] // for a 120 char term
});

export default {
	run
};

const bangja = {};

function run(options) {
	console.log('* running with options:', prettyjson.render(options));

	bangja.options = {
		terminal_width: 120,
	};

	bangja.observatory = observatory.settings({
		width: bangja.options.terminal_width,
		prefix: chalk.cyan('[Bangja] ')
	});

	bangja.libs = {
		_,
		async,
		chalk,
		pretty: _.partialRight(util.inspect, {colors: true})
	};

	hello();

	load_modules(bangja)
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

function perform_analysis(modules) {
	// consolidate modules into an async.auto task
	const readonly_auto_tasks = {};

	[ 'observations',  'diagnostics' ].forEach(type => {
		console.log(`* Consolidating ${type}...`);

		const keys = Object.keys(modules[type]);
		//console.log(`* keys = ${keys}...`);
		keys.forEach(key => {
			readonly_auto_tasks[key] = modules[type][key].async_auto_task;
			//console.log(util.inspect(modules[type][key], {colors: true}));
		})
	});

	console.log('* Running observations and diagnostics...');

	return execute(Object.keys(modules.observations).concat(function(callback, results) {
		console.log('result');
		callback(null, 'TODO');
	}), readonly_auto_tasks);
}


function execute(auto_task, readonly_auto_tasks) {
	const auto_tasks = Object.assign({}, readonly_auto_tasks);
	auto_tasks.result = auto_task;

	console.log('* executing auto()...\n' + util.inspect(auto_tasks, {colors: true}));

	setTimeout(null, 5000);

	return new Promise((resolve, reject) => {
		async.auto(readonly_auto_tasks, (err, results) => {
			console.info('* Task finished :');
			if (err) {
				console.error('  - err =', bangja.libs.pretty(err));
				return reject(err);
			}

			//console.log('  - results =\n' + bangja.libs.pretty(results));
			const keys = Object.keys(results).sort().reverse();
			keys.forEach(result_key => {
				const entry = results[result_key];
				let summary = entry.err ?
					entry.err.message :
				entry.summary || entry.data || entry;

				if (entry.err || entry.result === false)
					summary = chalk.red(summary);
				else if (! entry.result )
					summary = chalk.yellow(summary);
				else
					summary = chalk.green(summary);

				results_table.push([result_key, summary]);
			});
			console.log(results_table.toString());
			resolve(results);
		});
	});
}
