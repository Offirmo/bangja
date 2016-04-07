// share code identifying an executable version

import fs from 'fs-extra';

export default function load_file_if_exists(
	path,
	options
) {
	options = options || {};
	options.encoding = options.encoding || 'utf8';

	return new Promise((resolve, reject) => {
		fs.readFile(path, options.encoding, (err, res) => {
			if (err)
				return reject(err);

			resolve(res);
		});
	});
}
