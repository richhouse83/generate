const fs = require("fs/promises");
const util = require("util");
const exec = util.promisify(require("child_process").exec);
const colors = require("colors");
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
  return fs
    .mkdir(baseDir)
    .then(() => {
      return exec(`npm init -y`, { cwd: baseDir });
    })
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
      return fs.writeFile(
        `${baseDir}/package.json`,
        JSON.stringify(packageObj, null, 2)
      );
    })
    .then(() => {
      console.log("package.json created and updated...".magenta);
      const gitInit = exec(`git init ./${projectName}`).then(() => {
        return;
      });

      const gitIgnore = fs.writeFile(
        `${baseDir}/.gitignore`,
        "node_modules\ndb/config.js\n"
      );

      const readMe = fs.writeFile(
        `./${projectName}/README.md`,
        `# ${projectName}`
      );

      const eslint = fs.writeFile(
        `./${projectName}/.eslintrc.json`,
        esLintInfo
      );

      const listenjs = fs.writeFile(`./${projectName}/listen.js`, listenInfo);

      const serverjs = fs.writeFile(`./${projectName}/server.js`, serverJsInfo);

      const tests = fs.mkdir(`${baseDir}/__tests__`);

      const controllers = fs.mkdir(`${baseDir}/controllers`);

      const routers = fs.mkdir(`${baseDir}/routers`);

      const models = fs.mkdir(`${baseDir}/models`);

      const db = fs.mkdir(`${baseDir}/db`);

      return Promise.all([
        gitInit,
        gitIgnore,
        readMe,
        eslint,
        listenjs,
        serverjs,
        tests,
        controllers,
        routers,
        models,
        db,
      ]);
    })
    .then(() => {
      console.log("git initialised...".magenta);
      console.log(".gitignore created...".magenta);
      console.log("readme created....".magenta);
      console.log("eslintrc.json created...".magenta);
      console.log("server.js created...".magenta);

      const serverTest = fs.writeFile(
        `${baseDir}/__tests__/server.test.js`,
        apiTests
      );
      const data = fs.mkdir(`${baseDir}/db/data`);
      const seedsFile = fs.mkdir(`${baseDir}/db/seeds`);

      return Promise.all([serverTest, data, seedsFile]);
    })
    .then(() => {
      console.log("server.test.js created...".magenta);

      const seed = fs.writeFile(`${baseDir}/db/seeds/seed.sql`, "");
      const seedTest = fs.writeFile(`${baseDir}/db/seeds/seed.test.sql`, "");

      return Promise.all([seed, seedTest]);
    })
    .then(() => {
      console.log("seed.sql and seed.test.sql created...\n\n".magenta);
    })
    .catch((err) => {
      throw err;
    });
};

module.exports = serverGenerator;
