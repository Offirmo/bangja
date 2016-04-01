'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.perform = perform;
exports.fix = fix;
const dependencies = exports.dependencies = ['env/git-version'];

function perform(results, callback) {
	console.log('results', results);
	callback();
}

function fix(callback) {
	console.log('TODO');
	callback();
}