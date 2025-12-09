"use strict";

const depApp = require("@efanworks/dep-app");

console.log(depApp());

module.exports = remoteApp;

function remoteApp() {
  return "Hello from remoteApp";
}
