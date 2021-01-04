const fs = require("fs");
const { exec } = require("child_process");

const packageInfo = `{
  "name": "template",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "jest",
    "generate": "node ./generate.js",
    "remove-project": "node ./remove-project.js"
  },
  "repository": {
    "type": "git",
    "url": ""
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "bugs": {
    "url": ""
  },
  "homepage": "",
  "devDependencies": {
    "jest": "^24.9.0",
    "jest-extended": "^0.11.2"
  }
}`;

function projectGenerator(projectName, cb) {
  fs.mkdir(`./${projectName}`, (err) => {
    if (err) cb(err);
    else {
      fs.writeFile(`./${projectName}/index.js`, "", (err) => {
        if (err) cb(err);
      });

      fs.writeFile(`./${projectName}/.gitignore`, "node_modules", (err) => {
        if (err) cb(err);
      });

      fs.writeFile(`./${projectName}/README.md`, `# ${projectName}`, (err) => {
        if (err) cb(err);
      });

      fs.writeFile(`./${projectName}/.eslintrc.json`, ``, (err) => {
        if (err) cb(err);
      });

      exec(`git init ./${projectName}`, (err, stdout, stderr) => {
        if (err) {
          console.error(`exec error: ${err}`);
          return;
        }

        console.log(`Successfully created git: ${stdout}`);
      });

      exec(
        `npm init -y`,
        { cwd: `./${projectName}` },
        (err, stdout, stderr) => {
          if (err) {
            console.error(`exec error: ${err}`);
            return;
          }

          console.log(`Successfully created package.json: ${stdout} ${stderr}`);
        }
      );

      fs.mkdir(`./${projectName}/__test__`, (err) => {
        if (err) cb(err);
        else {
          cb(null);
        }
      });
    }
  });
}

module.exports = projectGenerator;
