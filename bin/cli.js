#!/usr/bin/env node

const projectGenerator = require("../lib/project-generator");
const serverGenerator = require("../lib/server-generator");

const [, , ...args] = process.argv;

if (args[1] === "-s") {
  serverGenerator(args[0], (err) => {
    if (err) throw err;
    else console.log(`${args[0]} server files created - run npm install!`);
  });
} else {
  projectGenerator(args[0], (err) => {
    if (err) throw err;
    else console.log(`${args[0]} files created - run npm install!`);
  });
}
