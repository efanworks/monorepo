"use strict";

const depApp = require("@efanworks/dep-app");

console.log(depApp());

function hostApp() {
  return "Hello from hostApp";
}

module.exports = hostApp;
