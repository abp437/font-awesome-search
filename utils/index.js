const fileSystem = require("fs");
const path = require("path");
const yaml = require("js-yaml");

function getArgs() {
  const args = {};
  process.argv.slice(2, process.argv.length).forEach(arg => {
    // File Path Arguments
    if (arg.slice(0, 2) === "--") {
      const longArg = arg.split("=");
      const longArgFlag = longArg[0].slice(2, longArg[0].length);
      const longArgValue = longArg.length > 1 ? longArg[1] : true;
      args[longArgFlag] = longArgValue;
    }
    // Remote Flag
    else if (arg[0] === "-") {
      const flags = arg.slice(1, arg.length).split("");
      flags.forEach(flag => {
        args[flag] = true;
      });
    }
  });
  return args;
};

function createDirectoryIfMissing(directoryPath) {
  if (!fileSystem.existsSync(directoryPath)) {
    fileSystem.mkdirSync(directoryPath);
  }
};

function readYml(absoluteFilePath) {
  return yaml.safeLoad(fileSystem.readFileSync(absoluteFilePath, "utf8"));
}

function createJsonFromLocalYml(filePath) {
  const jsonFileName = filePath
    .split("/")
    .pop()
    .split(".")[0];

  createDirectoryIfMissing(`${path.join(__dirname, "..", "search_icons")}`);
  fileSystem.writeFile(
    `${path.join(__dirname, "..", "search_icons")}/${jsonFileName}.json`,
    JSON.stringify(readYml(filePath)),
    err => {
      if (err) {
        throw err;
      }
      console.log(`Contents inserted in ${jsonFileName}!`);
    }
  );
};

function createJsonFromRemoteYml(ymlFolderName, ymlFileName) {
  const jsonFileName = `${ymlFileName.split(".")[0]}.json`;

  createDirectoryIfMissing(`${path.join(__dirname, "..", "search_icons")}`);
  fileSystem.writeFile(
    `${path.resolve(__dirname, "../search_icons/", jsonFileName)}`,
    JSON.stringify(
      readYml(
        `${path.resolve(__dirname, `../${ymlFolderName}`, ymlFileName)}`
      )
    ),
    err => {
      if (err) {
        throw err;
      }
      console.log(`Contents inserted in ${jsonFileName}!`);
    }
  );
};

module.exports = {
  getArgs,
  createDirectoryIfMissing,
  createJsonFromLocalYml,
  createJsonFromRemoteYml
};
