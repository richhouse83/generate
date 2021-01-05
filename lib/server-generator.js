const fs = require("fs");
const { exec } = require("child_process");
const {
  esLintInfo,
  serverJsInfo,
  listenInfo,
  configInfo,
  connectionInfo,
  apiTests,
} = require("./filesPrefill");

function serverGenerator(projectName, cb) {
  fs.mkdir(`./${projectName}`, (err) => {
    if (err) cb(err);
    else {
      exec(
        `npm init -y`,
        { cwd: `./${projectName}` },
        (err, stdout, stderr) => {
          if (err) {
            console.error(`exec error: ${err}`);
            return;
          } else {
            fs.readFile(
              `${projectName}/package.json`,
              "utf8",
              (err, package) => {
                if (err) cb(err);
                else {
                  const packageObj = JSON.parse(package);
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
                  fs.writeFile(
                    `${projectName}/package.json`,
                    JSON.stringify(packageObj, null, 2),
                    (err) => {
                      if (err) cb(err);
                      else {
                        console.log("package.JSON updated, run npm install!");
                      }
                    }
                  );
                }
              }
            );
          }

          console.log(`Success: ${stdout} ${stderr}`);
        }
      );

      exec(`git init ./${projectName}`, (err, stdout, stderr) => {
        if (err) {
          console.error(`exec error: ${err}`);
          return;
        }

        console.log(`Success: ${stdout}`);
      });

      fs.writeFile(`./${projectName}/server.js`, serverJsInfo, (err) => {
        if (err) cb(err);
      });

      fs.writeFile(
        `./${projectName}/.gitignore`,
        "node_modules\ndb/config.js\n",
        (err) => {
          if (err) cb(err);
        }
      );

      fs.writeFile(`./${projectName}/README.md`, `# ${projectName}`, (err) => {
        if (err) cb(err);
      });

      fs.writeFile(`./${projectName}/.eslintrc.json`, esLintInfo, (err) => {
        if (err) cb(err);
      });

      fs.writeFile(`./${projectName}/listen.js`, listenInfo, (err) => {
        if (err) cb(err);
      });

      fs.mkdir(`./${projectName}/__tests__`, (err) => {
        if (err) cb(err);
        else {
          fs.writeFile(
            `./${projectName}/__tests__/server.test.js`,
            apiTests,
            (err) => {
              if (err) cb(err);
              else {
                fs.mkdir(`./${projectName}/db`, (err) => {
                  if (err) cb(err);
                  else {
                    fs.writeFile(
                      `./${projectName}/db/config.js`,
                      configInfo,
                      (err) => {
                        if (err) cb(err);
                      }
                    );
                    fs.writeFile(
                      `./${projectName}/db/connection.js`,
                      connectionInfo,
                      (err) => {
                        if (err) cb(err);
                      }
                    );
                    fs.mkdir(`./${projectName}/controllers`, (err) => {
                      if (err) cb(err);
                      else {
                        fs.mkdir(`./${projectName}/routers`, (err) => {
                          if (err) cb(err);
                          else {
                            fs.mkdir(`./${projectName}/models`, (err) => {
                              if (err) cb(err);
                              else {
                                fs.mkdir(`./${projectName}/data`, (err) => {
                                  if (err) cb(err);
                                  else {
                                    fs.writeFile(
                                      `./${projectName}/data/seed.sql`,
                                      "",
                                      (err) => {
                                        if (err) cb(err);
                                      }
                                    );
                                    fs.writeFile(
                                      `./${projectName}/data/seed.test.sql`,
                                      "",
                                      (err) => {
                                        if (err) cb(err);
                                        else {
                                          cb(null);
                                        }
                                      }
                                    );
                                  }
                                });
                              }
                            });
                          }
                        });
                      }
                    });
                  }
                });
              }
            }
          );
        }
      });
    }
  });
}

module.exports = serverGenerator;
