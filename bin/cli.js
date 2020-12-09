#!/usr/bin/env node

const projectGenerator = require("../lib/project-generator");

const [, , ...args] = process.argv;

projectGenerator(args[0], (err) => {
  if (err) throw err;
  else console.log("The magic happened!");
});
