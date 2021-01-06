#!/usr/bin/env node

const colors = require("colors");
const projectGenerator = require("../lib/project-generator");
const serverGenerator = require("../lib/server-generator");

const [, , ...args] = process.argv;

if (args[1] === "-s") {
  console.log("\nCreating Server File Structure...\n\n".yellow);

  return serverGenerator(args[0])
    .then(() => {
      console.log("Success! Now run npm install.".green);
      return;
    })
    .catch((err) => {
      throw Error(err);
    });
} else {
  console.log("\nCreating Generic File Structure...\n\n\n".yellow);

  return projectGenerator(args[0])
    .then(() => {
      console.log(`Success! ${args[0]} created. `.green);
      return;
    })
    .catch((err) => {
      console.log(err);
    });
}
