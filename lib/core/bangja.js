import util from 'util';

import _ from 'lodash';
import async from 'async';
import chalk from 'chalk';
import when from 'when';
import when_monitor from 'when/monitor';
import when_node from 'when/node';
import prettyjson from 'prettyjson';
import observatory from 'observatory';
import CliTable from 'cli-table';


export default function create() {
	const bangja = {};

	bangja.options = {
		terminal_width: 120,
		perform_timeout_ms: 3000
	};

	bangja.observatory = observatory.settings({
		width: bangja.options.terminal_width,
		prefix: chalk.cyan('[Bangja] ')
	});

	bangja.libs = {
		_,
		async,
		chalk,
		when,
		when_monitor,
		when_node,
		CliTable,
		pretty: _.partialRight(util.inspect, {colors: true}),
	};

	return bangja;
}
