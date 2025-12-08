'use strict';

const depApp = require('..');
const assert = require('assert').strict;

assert.strictEqual(depApp(), 'Hello from depApp');
console.info('depApp tests passed');
