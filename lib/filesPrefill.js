exports.serverJsInfo = `const express = require("express");
const app = express();
const apiRouter = require("./routers/apirouter");
const morgan = require('morgan')

app.use(express.json());
app.use(morgan('dev'));

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

const PORT = process.env.PORT || 9090;

app.listen(PORT, (err) => {
  if (err) throw err;
  console.log("listening on port ", PORT);
});`;

exports.configInfo = `const ENV = process.env.NODE_ENV || "development";

const development = {
  database: "rated_restaurants",
  port: 5432,
};

const test = {
  database: "rated_restaurants_test",
  port: 5432,
};

const dbConfig = { development, test };

module.exports = dbConfig[ENV];`;

exports.connectionInfo = `const { Client } = require("pg");
const dbConfig = require("./config");

const client = new Client(dbConfig);

console.log(dbConfig);

client.connect().then(() => {
  console.log(\`Connected to \${dbConfig.database}\`);
});

module.exports = client;`;

exports.apiTests = `process.env.NODE_ENV = "test";
const request = require("supertest");
const app = require("../server");
const connection = require("../db/connection");

describe('/api', () => {
  describe('Name of the group', () => {
    
    test('should ', () => {
      
    });
  });
});`;
