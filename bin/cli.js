#!/usr/bin/env node

const projectGenerator = require("../lib/project-generator");
const serverGenerator = require("../lib/server-generator");

const [, , ...args] = process.argv;

if (args[1] === "-s") {
  return serverGenerator(args[0])
    .then(() => {
      console.log("Success! Now run npm install.");
    })
    .catch((err) => {
      throw Error(err);
    });
} else {
  projectGenerator(args[0], (err) => {
    if (err) throw err;
    else console.log(`${args[0]} files created `);
  });
}
