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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL2xpYi9tb2R1bGVzL2Vudi9vYnNlcnZhdGlvbnMvZ2l0LXZlcnNpb24vaW5kZXguanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O1FBR2dCOztBQUZoQjs7Ozs7O0FBRU8sU0FBUyxPQUFULENBQWlCLFFBQWpCLEVBQTJCO0FBQ2pDLEtBQUssT0FBSixDQUFZLENBQUMsT0FBRCxFQUFVLE1BQVYsS0FBcUI7QUFDakMsUUFBTSxpQkFBaUIsK0JBQU0sS0FBTixFQUFhLENBQUMsV0FBRCxDQUFiLENBQWpCLENBRDJCOztBQUdqQyxhQUFXLE1BQU0sT0FBTyxTQUFQLENBQU4sRUFBeUIsSUFBcEMsRUFBMEMsS0FBMUMsR0FIaUM7O0FBS2pDLGlCQUFlLE1BQWYsQ0FBc0IsRUFBdEIsQ0FBeUIsTUFBekIsRUFBaUMsUUFBUTs7O0FBR3hDLFVBQU8sQ0FBQyxLQUFLLElBQUwsQ0FBRCxDQUFZLElBQVosRUFBUCxDQUh3QztBQUl4QyxTQUFNLFVBQVUsS0FBSyxLQUFMLENBQVcsR0FBWCxFQUFnQixLQUFoQixDQUFzQixDQUFDLENBQUQsQ0FBdEIsQ0FBMEIsQ0FBMUIsQ0FBVixDQUprQztBQUt4QyxXQUFRLEdBQVIsQ0FBWSxDQUFDLGFBQUQsR0FBZ0IsT0FBaEIsRUFBd0IsQ0FBcEMsRUFMd0M7QUFNeEMsV0FBUSxPQUFSLEVBTndDO0dBQVIsQ0FBakMsQ0FMaUM7O0FBY2pDLGlCQUFlLE1BQWYsQ0FBc0IsRUFBdEIsQ0FBeUIsTUFBekIsRUFBaUMsUUFBUTtBQUN4QyxXQUFRLEdBQVIsQ0FBWSxDQUFDLFFBQUQsR0FBVyxJQUFYLEVBQWdCLENBQTVCLEVBRHdDO0FBRXhDLFVBQU8sSUFBSSxLQUFKLENBQVUsSUFBVixDQUFQLEVBRndDO0dBQVIsQ0FBakMsQ0FkaUM7O0FBbUJqQyxpQkFBZSxFQUFmLENBQWtCLE9BQWxCLEVBQTJCLFFBQVE7QUFDbEMsV0FBUSxHQUFSLENBQVksQ0FBQywrQkFBRCxHQUFrQyxJQUFsQyxFQUF1QyxDQUFuRCxFQURrQztBQUVsQyxPQUFJLFNBQVMsQ0FBVCxFQUNILE9BQU8sSUFBSSxLQUFKLENBQVUsQ0FBQywrQkFBRCxHQUFrQyxJQUFsQyxFQUF1QyxDQUFqRCxDQUFQLEVBREQ7R0FGMEIsQ0FBM0IsQ0FuQmlDO0VBQXJCLENBQWIsQ0F5QkMsSUF6QkQsQ0EwQkMsV0FBVyxTQUFTLElBQVQsRUFBZSxPQUFmLENBQVgsRUFDQSxTQUFTLFNBQVMsS0FBVCxDQUFULENBM0JELENBRGlDO0NBQTNCOztBQWdDQSxNQUFNLHNDQUFlLEVBQWYiLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbmltcG9ydCBzcGF3biBmcm9tICdjcm9zcy1zcGF3bi1hc3luYyc7XG5cbmV4cG9ydCBmdW5jdGlvbiBwZXJmb3JtKGNhbGxiYWNrKSB7XG5cdChuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG5cdFx0Y29uc3QgZ2l0X3ZlcnNpb25fb3AgPSBzcGF3bignZ2l0JywgWyctLXZlcnNpb24nXSk7XG5cblx0XHRzZXRUaW1lb3V0KCgpID0+IHJlamVjdCgnVGltZW91dCcpLCAzMDAwKS51bnJlZigpO1xuXG5cdFx0Z2l0X3ZlcnNpb25fb3Auc3Rkb3V0Lm9uKCdkYXRhJywgZGF0YSA9PiB7XG5cdFx0XHQvL2NvbnNvbGUubG9nKGBzdGRvdXQ6ICR7ZGF0YX1gKTtcblxuXHRcdFx0ZGF0YSA9ICgnJyArIGRhdGEpLnRyaW0oKTtcblx0XHRcdGNvbnN0IHZlcnNpb24gPSBkYXRhLnNwbGl0KCcgJykuc2xpY2UoLTEpWzBdO1xuXHRcdFx0Y29uc29sZS5sb2coYGdvdCB2ZXJzaW9uOiAke3ZlcnNpb259YCk7XG5cdFx0XHRyZXNvbHZlKHZlcnNpb24pO1xuXHRcdH0pO1xuXG5cdFx0Z2l0X3ZlcnNpb25fb3Auc3RkZXJyLm9uKCdkYXRhJywgZGF0YSA9PiB7XG5cdFx0XHRjb25zb2xlLmxvZyhgc3RkZXJyOiAke2RhdGF9YCk7XG5cdFx0XHRyZWplY3QobmV3IEVycm9yKGRhdGEpKTtcblx0XHR9KTtcblxuXHRcdGdpdF92ZXJzaW9uX29wLm9uKCdjbG9zZScsIGNvZGUgPT4ge1xuXHRcdFx0Y29uc29sZS5sb2coYGNoaWxkIHByb2Nlc3MgZXhpdGVkIHdpdGggY29kZSAke2NvZGV9YCk7XG5cdFx0XHRpZiAoY29kZSAhPT0gMClcblx0XHRcdFx0cmVqZWN0KG5ldyBFcnJvcihgY2hpbGQgcHJvY2VzcyBleGl0ZWQgd2l0aCBjb2RlICR7Y29kZX1gKSk7XG5cdFx0fSk7XG5cdH0pKVxuXHQudGhlbihcblx0XHR2ZXJzaW9uID0+IGNhbGxiYWNrKG51bGwsIHZlcnNpb24pLFxuXHRcdGVycm9yID0+IGNhbGxiYWNrKGVycm9yKVxuXHQpO1xufVxuXG5leHBvcnQgY29uc3QgZGVwZW5kZW5jaWVzID0gW107XG4iXX0=