
import load_modules from './module_loader';
import create_bangja from './bangja';


export default {
	run
};

let bangja;

function run(options) {
	bangja = create_bangja();
	console.log('* running with options:', bangja.libs.pretty(options));

	hello();

	load_modules(bangja)
	.then(perform_analysis)
	.then(() => console.log('* good bye.'))
	.catch(err => {
		console.error('ERROR !');
		console.error(err.message);
		console.error(err.stack);
		console.error(bangja.libs.pretty(err));
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
	setTimeout(function () {
		console.log('*** Safety timeout ended ***');
	}, 5000);
	console.log('*** Safety timeout launched ***');

	//console.log('Modules =\n', bangja.libs.pretty(modules));

	const mode = 2;
	switch(mode) {
		case 1:
			const module = modules.observations['observation:node/existing-versions'];
			return module.fn(bangja, module, {});
		case 2:
		default:
			// consolidate modules into an async.auto task
			const readonly_auto_tasks = {};

			[ 'observations',  'diagnostics' ].forEach(type => {
				console.log(`* Consolidating ${type}...`);

				const keys = Object.keys(modules[type]);
				//console.log(`* keys = ${keys}...`);
				keys.forEach(key => {
					readonly_auto_tasks[key] = modules[type][key].async_auto_task;
					//console.log(bangja.libs.pretty(modules[type][key]));
				})
			});

			console.log('* Running observations and diagnostics...');

			return execute(Object.keys(modules.observations).concat(function(callback, results) {
				console.log('result');
				callback(null, 'TODO');
			}), readonly_auto_tasks);
	}
}


function execute(auto_task, readonly_auto_tasks) {
	const auto_tasks = Object.assign({}, readonly_auto_tasks);
	auto_tasks.result = auto_task;

	console.log('* executing auto()...\n' + bangja.libs.pretty(auto_tasks));

	const results_table = new bangja.libs.CliTable({
		head: ['id', 'result'],
		colWidths: [50, 67] // for a 120 char term
	});

	return new Promise((resolve, reject) => {
		bangja.libs.async.auto(readonly_auto_tasks, (err, results) => {
			console.info('* Task finished :');
			if (err) {
				console.error('  - err =', bangja.libs.pretty(err));
				return reject(err);
			}

			//console.log('  - results =\n' + bangja.libs.pretty(results));
			const keys = Object.keys(results).sort().reverse();
			keys.forEach(result_key => {
				const entry = results[result_key];
				let summary = entry.summary;

				if (entry.err || entry.ok === false)
					summary = bangja.libs.chalk.red(summary);
				else if (! entry.ok )
					summary = bangja.libs.chalk.yellow(summary);
				else
					summary = bangja.libs.chalk.green(summary);

				results_table.push([result_key, summary]);
			});
			console.log(results_table.toString());
			resolve(results);
		});
	});
}
