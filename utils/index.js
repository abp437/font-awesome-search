const fileSystem = require("fs");
const path = require("path");
const yaml = require("js-yaml");

const getJSObjectFromYML = relativeFilePath =>
  yaml.safeLoad(fileSystem.readFileSync(relativeFilePath, "utf8"));

const generateJSONFile = (ymlFolderName, ymlFileName) => {
  const jsonFileName = `${ymlFileName.split(".")[0]}.json`;
  fileSystem.writeFile(
    `${path.resolve("search_icons")}/${jsonFileName}`,
    JSON.stringify(getJSObjectFromYML(`${path.resolve(ymlFolderName)}/${ymlFileName}`)),
    err => {
      if (err) {
        throw err;
      }
      console.log(`Contents inserted in ${jsonFileName}!`);
    }
  );
};

module.exports = {
  getJSObjectFromYML,
  generateJSONFile,
};
