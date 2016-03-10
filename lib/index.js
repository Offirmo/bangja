
import async from 'async';
import prettyjson from 'prettyjson';

//const core = require('./core');


export default {
	run
};


function run(options) {
	hello();
	console.log('* running with options:', prettyjson.render(options));

	async.waterfall([
		detect_modules,
		load_modules,
		perform_analysis,
	], function(err, res) {
		console.error(err.message);
		console.error(prettyjson.render(err));
	});

	console.log('TODO more !!!');
}




function detect_modules(cb) {
	console.log('TODO detect modules !!!');

	// TODO load default
	// TODO look into named package.json
	// TODO look at params

	cb(null, [ __dirname ]);
}

function load_modules(modules, cb) {
	console.log('TODO load modules !!!');
}

function perform_analysis(modules, cb) {
	console.log('TODO analyze !!!');
}




function hello() {
	console.log(`
Hello O great master !
I'm here to take care of the menial stuff so you can save the world !
`);
}

