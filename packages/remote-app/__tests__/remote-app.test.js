'use strict';

const remoteApp = require('..');
const assert = require('assert').strict;

assert.strictEqual(remoteApp(), 'Hello from remoteApp');
console.info('remoteApp tests passed');
