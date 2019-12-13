#!/usr/bin/env node

const fileSystem = require("fs");
const yaml = require("js-yaml");
const generateIconFiles = require("./node_scripts/fileGenerator.js");
// const utils = require("./utils");

const getJSObjectFromYML = relativeFilePath =>
  yaml.safeLoad(fileSystem.readFileSync(relativeFilePath, "utf8"));

if (process.argv[2] === "true") {
  // Generate files from Remote
  generateIconFiles();
} else {
  // Generate files from Local
  process.argv.slice(2).forEach(filePath => {
    fileSystem.writeFile(
      `${__dirname}/search_icons/${
        filePath
          .split("/")
          .pop()
          .split(".")[0]
      }.json`,
      JSON.stringify(getJSObjectFromYML(filePath)),
      () => {
        console.log("Kamerad Da Gibt es Kein Zuruck");
      }
    );
  });
}

console.log(process.argv.slice(2));
