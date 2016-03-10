#!/bin/sh
':' //# http://sambal.org/?p=1014 ; exec `dirname $0`/node_modules/.bin/babel-node "$0" "$@"
'use strict';

import bangja from './lib';

import program from 'commander';

program
	.version('0.0.1')
	.option('-n, --non-interactive', 'Run in non-interactive mode')
	.parse(process.argv);

const options = {
	interactive: !program.nonInteractive
};

bangja.run(options);
