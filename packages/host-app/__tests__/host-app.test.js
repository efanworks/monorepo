'use strict';

const hostApp = require('..');
const assert = require('assert').strict;

assert.strictEqual(hostApp(), 'Hello from hostApp');
console.info('hostApp tests passed');
