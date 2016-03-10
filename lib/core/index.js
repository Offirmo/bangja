module.exports = {
	create
};

function create (options) {

	return {
		options,
		run: function() {
			console.log('TODO RUn !!!');
		}
	};
}

