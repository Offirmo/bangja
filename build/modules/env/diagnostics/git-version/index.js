'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.dependencies = undefined;
exports.perform = perform;

var _crossSpawnAsync = require('cross-spawn-async');

var _crossSpawnAsync2 = _interopRequireDefault(_crossSpawnAsync);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function perform(cb) {
	const git_version = (0, _crossSpawnAsync2.default)('git', ['--version']);

	git_version.stdout.on('data', data => {
		console.log(`stdout: ${ data }`);
	});

	git_version.stderr.on('data', data => {
		console.log(`stderr: ${ data }`);
	});

	git_version.on('close', code => {
		console.log(`child process exited with code ${ code }`);
		cb();
	});
}

const dependencies = exports.dependencies = [];