#!/bin/sh
':' //# http://sambal.org/?p=1014 ; exec `dirname $0`/../../../../../node_modules/.bin/babel-node "$0" "$@"
'use strict';

import create_bangja from '../../../../core/bangja';
import {declaration as module, perform as fn} from './index';

const bangja = create_bangja();

console.log('hello world');

const promise = fn(bangja, module);

console.log('...');

promise
.then(res => {
	console.log('hello Then', res.data.length);
})
.catch(err => {
	console.log('hello Catch', err);
});

console.log('...');
