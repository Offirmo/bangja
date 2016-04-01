
export const dependencies = [ 'diagnostic:env/git-version' ];

export function perform(results, callback) {
	console.log('results', results);
	callback();
}

export function fix(callback) {
	console.log('TODO');
	callback();
}
