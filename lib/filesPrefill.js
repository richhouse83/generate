exports.serverJsInfo = `const express = require("express");
const app = express();
const apiRouter = require("./routers/apirouter");

app.use(express.json());

app.use("/api", apiRouter);

module.exports = app;`;

exports.esLintInfo = `module.exports = {
  extends: 'standard',
  env: {
    jest: true,
  },
  rules: {
    'no-unused-vars': 1,
    'semi': 0
  },
}`;
exports.listenInfo = `const app = require("./server");

app.listen(9090, (err) => {
  if (err) throw err;
  console.log("listening on port 9090");
});`;

exports.configInfo = `const dbConfig = {
  database: "rated_restaurants",
  port: 5432,
};

module.exports = dbConfig;`;

exports.connectionInfo = `const { Client } = require("pg");
const dbConfig = require("./config");

const client = new Client(dbConfig);

console.log(dbConfig);

client.connect().then(() => {
  console.log(\`Connected to \${dbConfig.database}\`);
});

module.exports = client;`;
