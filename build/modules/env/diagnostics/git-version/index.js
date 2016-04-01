'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.dependencies = undefined;
exports.perform = perform;

var _crossSpawnAsync = require('cross-spawn-async');

var _crossSpawnAsync2 = _interopRequireDefault(_crossSpawnAsync);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function perform(callback) {
	new Promise((resolve, reject) => {
		const git_version_op = (0, _crossSpawnAsync2.default)('git', ['--version']);

		setTimeout(() => reject('Timeout'), 3000).unref();

		git_version_op.stdout.on('data', data => {
			//console.log(`stdout: ${data}`);

			data = ('' + data).trim();
			const version = data.split(' ').slice(-1)[0];
			console.log(`got version: ${ version }`);
			resolve(version);
		});

		git_version_op.stderr.on('data', data => {
			console.log(`stderr: ${ data }`);
			reject(new Error(data));
		});

		git_version_op.on('close', code => {
			console.log(`child process exited with code ${ code }`);
			if (code !== 0) reject(new Error(`child process exited with code ${ code }`));
		});
	}).then(version => callback(null, version), error => callback(error));
}

const dependencies = exports.dependencies = [];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL2xpYi9tb2R1bGVzL2Vudi9kaWFnbm9zdGljcy9naXQtdmVyc2lvbi9pbmRleC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7UUFHZ0I7O0FBRmhCOzs7Ozs7QUFFTyxTQUFTLE9BQVQsQ0FBaUIsUUFBakIsRUFBMkI7QUFDakMsS0FBSyxPQUFKLENBQVksQ0FBQyxPQUFELEVBQVUsTUFBVixLQUFxQjtBQUNqQyxRQUFNLGlCQUFpQiwrQkFBTSxLQUFOLEVBQWEsQ0FBQyxXQUFELENBQWIsQ0FBakIsQ0FEMkI7O0FBR2pDLGFBQVcsTUFBTSxPQUFPLFNBQVAsQ0FBTixFQUF5QixJQUFwQyxFQUEwQyxLQUExQyxHQUhpQzs7QUFLakMsaUJBQWUsTUFBZixDQUFzQixFQUF0QixDQUF5QixNQUF6QixFQUFpQyxRQUFROzs7QUFHeEMsVUFBTyxDQUFDLEtBQUssSUFBTCxDQUFELENBQVksSUFBWixFQUFQLENBSHdDO0FBSXhDLFNBQU0sVUFBVSxLQUFLLEtBQUwsQ0FBVyxHQUFYLEVBQWdCLEtBQWhCLENBQXNCLENBQUMsQ0FBRCxDQUF0QixDQUEwQixDQUExQixDQUFWLENBSmtDO0FBS3hDLFdBQVEsR0FBUixDQUFZLENBQUMsYUFBRCxHQUFnQixPQUFoQixFQUF3QixDQUFwQyxFQUx3QztBQU14QyxXQUFRLE9BQVIsRUFOd0M7R0FBUixDQUFqQyxDQUxpQzs7QUFjakMsaUJBQWUsTUFBZixDQUFzQixFQUF0QixDQUF5QixNQUF6QixFQUFpQyxRQUFRO0FBQ3hDLFdBQVEsR0FBUixDQUFZLENBQUMsUUFBRCxHQUFXLElBQVgsRUFBZ0IsQ0FBNUIsRUFEd0M7QUFFeEMsVUFBTyxJQUFJLEtBQUosQ0FBVSxJQUFWLENBQVAsRUFGd0M7R0FBUixDQUFqQyxDQWRpQzs7QUFtQmpDLGlCQUFlLEVBQWYsQ0FBa0IsT0FBbEIsRUFBMkIsUUFBUTtBQUNsQyxXQUFRLEdBQVIsQ0FBWSxDQUFDLCtCQUFELEdBQWtDLElBQWxDLEVBQXVDLENBQW5ELEVBRGtDO0FBRWxDLE9BQUksU0FBUyxDQUFULEVBQ0gsT0FBTyxJQUFJLEtBQUosQ0FBVSxDQUFDLCtCQUFELEdBQWtDLElBQWxDLEVBQXVDLENBQWpELENBQVAsRUFERDtHQUYwQixDQUEzQixDQW5CaUM7RUFBckIsQ0FBYixDQXlCQyxJQXpCRCxDQTBCQyxXQUFXLFNBQVMsSUFBVCxFQUFlLE9BQWYsQ0FBWCxFQUNBLFNBQVMsU0FBUyxLQUFULENBQVQsQ0EzQkQsQ0FEaUM7Q0FBM0I7O0FBZ0NBLE1BQU0sc0NBQWUsRUFBZiIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuaW1wb3J0IHNwYXduIGZyb20gJ2Nyb3NzLXNwYXduLWFzeW5jJztcblxuZXhwb3J0IGZ1bmN0aW9uIHBlcmZvcm0oY2FsbGJhY2spIHtcblx0KG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcblx0XHRjb25zdCBnaXRfdmVyc2lvbl9vcCA9IHNwYXduKCdnaXQnLCBbJy0tdmVyc2lvbiddKTtcblxuXHRcdHNldFRpbWVvdXQoKCkgPT4gcmVqZWN0KCdUaW1lb3V0JyksIDMwMDApLnVucmVmKCk7XG5cblx0XHRnaXRfdmVyc2lvbl9vcC5zdGRvdXQub24oJ2RhdGEnLCBkYXRhID0+IHtcblx0XHRcdC8vY29uc29sZS5sb2coYHN0ZG91dDogJHtkYXRhfWApO1xuXG5cdFx0XHRkYXRhID0gKCcnICsgZGF0YSkudHJpbSgpO1xuXHRcdFx0Y29uc3QgdmVyc2lvbiA9IGRhdGEuc3BsaXQoJyAnKS5zbGljZSgtMSlbMF07XG5cdFx0XHRjb25zb2xlLmxvZyhgZ290IHZlcnNpb246ICR7dmVyc2lvbn1gKTtcblx0XHRcdHJlc29sdmUodmVyc2lvbik7XG5cdFx0fSk7XG5cblx0XHRnaXRfdmVyc2lvbl9vcC5zdGRlcnIub24oJ2RhdGEnLCBkYXRhID0+IHtcblx0XHRcdGNvbnNvbGUubG9nKGBzdGRlcnI6ICR7ZGF0YX1gKTtcblx0XHRcdHJlamVjdChuZXcgRXJyb3IoZGF0YSkpO1xuXHRcdH0pO1xuXG5cdFx0Z2l0X3ZlcnNpb25fb3Aub24oJ2Nsb3NlJywgY29kZSA9PiB7XG5cdFx0XHRjb25zb2xlLmxvZyhgY2hpbGQgcHJvY2VzcyBleGl0ZWQgd2l0aCBjb2RlICR7Y29kZX1gKTtcblx0XHRcdGlmIChjb2RlICE9PSAwKVxuXHRcdFx0XHRyZWplY3QobmV3IEVycm9yKGBjaGlsZCBwcm9jZXNzIGV4aXRlZCB3aXRoIGNvZGUgJHtjb2RlfWApKTtcblx0XHR9KTtcblx0fSkpXG5cdC50aGVuKFxuXHRcdHZlcnNpb24gPT4gY2FsbGJhY2sobnVsbCwgdmVyc2lvbiksXG5cdFx0ZXJyb3IgPT4gY2FsbGJhY2soZXJyb3IpXG5cdCk7XG59XG5cbmV4cG9ydCBjb25zdCBkZXBlbmRlbmNpZXMgPSBbXTtcbiJdfQ==