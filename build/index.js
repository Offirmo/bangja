#!/bin/sh

':'; //# http://sambal.org/?p=1014 ; exec `dirname $0`/node_modules/.bin/babel-node "$0" "$@"
'use strict';

var _core = require('./core');

var _core2 = _interopRequireDefault(_core);

var _commander = require('commander');

var _commander2 = _interopRequireDefault(_commander);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_commander2.default.version('0.0.1').option('-n, --non-interactive', 'Run in non-interactive mode').parse(process.argv);

const options = {
	interactive: !_commander2.default.nonInteractive
};

_core2.default.run(options);