const app = require("express")();
const assert = require("assert");
const database = require("../config/database.js");
const github = require("../services/github.js");

app.db = database;

describe("connectGithub", () => {
  it("It must successfully return a request with the url", (done) => {
    github(app).connectGithub("https://github.com/nodejs/node", (result) => {
      assert.equal(result, true);
      done();
    });
  });
});
