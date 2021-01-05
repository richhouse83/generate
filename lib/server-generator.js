const fs = require("fs/promises");
const util = require("util");
const exec = util.promisify(require("child_process").exec);
const {
  esLintInfo,
  serverJsInfo,
  listenInfo,
  configInfo,
  connectionInfo,
  apiTests,
} = require("./filesPrefill");

const serverGenerator = (projectName) => {
  const baseDir = `./${projectName}`;
  return fs.mkdir(baseDir).then(() => {
    const package = exec(`npm init -y`, { cwd: baseDir })
      .then(() => {
        return fs.readFile(`${projectName}/package.json`, "utf8");
      })
      .then((packageString) => {
        const packageObj = JSON.parse(packageString);
        packageObj.dependencies = {
          express: "^4.17.1",
          pg: "^8.5.1",
        };
        packageObj.devDependencies = {
          morgan: "^1.10.0",
          nodemon: "^2.0.6",
          eslint: "^5.16.0",
          jest: "^23.6.0",
          supertest: "^6.0.1",
        };
        packageObj.scripts = {
          test: "npm run seed-test && jest --watch",
          seed: "psql -f data/seed.sql",
          "seed-test": "psql -f data/seed.test.sql",
          dev: "nodemon listen.js",
          start: "node listen.js",
        };
        return fs
          .writeFile(
            `${baseDir}/package.json`,
            JSON.stringify(packageObj, null, 2)
          )
          .then(() => {
            console.log("package.json created and updated...");
            return;
          });
      })
      .catch((err) => {
        throw Error(err);
      });

    const gitInit = exec(`git init ./${projectName}`).then(() => {
      console.log("git initialised...");
      return;
    });

    const gitIgnore = fs
      .writeFile(`${baseDir}/.gitignore`, "node_modules\ndb/config.js\n")
      .then(() => {
        console.log(".gitignore created...");
        return;
      });

    const readMe = fs
      .writeFile(`./${projectName}/README.md`, `# ${projectName}`)
      .then(() => {
        console.log("readme created....");
        return;
      });

    const eslint = fs
      .writeFile(`./${projectName}/.eslintrc.json`, esLintInfo)
      .then(() => {
        console.log("eslintrc.json created...");
        return;
      });

    const listenjs = fs
      .writeFile(`./${projectName}/listen.js`, listenInfo)
      .then(() => {
        console.log("server.js created...");
        return;
      });

    const serverjs = fs
      .writeFile(`./${projectName}/server.js`, serverJsInfo)
      .then(() => {
        console.log("server.js created...");
        return;
      });

    return Promise.all([
      package,
      gitInit,
      gitIgnore,
      readMe,
      eslint,
      listenjs,
      serverjs,
    ]);
  });
};

module.exports = serverGenerator;
