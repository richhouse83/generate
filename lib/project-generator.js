const fs = require("fs/promises");
const util = require("util");
const exec = util.promisify(require("child_process").exec);
const colors = require("colors");
const { esLintInfo } = require("./filesPrefill");

const projectGenerator = (projectName) => {
  const baseDir = `./${projectName}`;
  return fs
    .mkdir(baseDir)
    .then(() => {
      const package = exec(`npm init -y`, { cwd: baseDir });

      const gitInit = exec(`git init ${baseDir}`);

      const index = fs.writeFile(`${baseDir}/index.js`, "");

      const gitignore = fs.writeFile(`${baseDir}/.gitignore`, "node_modules");

      const readme = fs.writeFile(`${baseDir}/README.md`, `# ${projectName}`);

      const eslint = fs.writeFile(`${baseDir}/eslintrc.json`, esLintInfo);

      const testFile = fs.mkdir(`${baseDir}/__tests__`);

      return Promise.all([
        package,
        gitInit,
        index,
        gitignore,
        readme,
        eslint,
        testFile,
      ]);
    })
    .then(() => {
      console.log("File structure created...\n\n".magenta);
      return;
    });
};

module.exports = projectGenerator;
