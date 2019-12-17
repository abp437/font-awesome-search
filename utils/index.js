const fileSystem = require("fs");
const path = require("path");
const yaml = require("js-yaml");

/**
 * @description Gets arguments from CLI, parses them and returns them as an object
 * @returns {Object} - {{argName: argValue}}
 */
function getCliArgs() {
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
}

/**
 * @description Checks whether a directory is present and if not, then creates it
 * @param {String} directoryPath - Relative Path of the directory to be checked
 * @returns {undefined}
 */
function createDirectoryIfMissing(directoryPath) {
  if (!fileSystem.existsSync(directoryPath)) {
    fileSystem.mkdirSync(directoryPath);
  }
}

/**
 * @description Reads `.yml` file and returns it's content
 * @param {String} absoluteFilePath - Absolute Path of the file to be read
 * @returns {String} - Content of the read file
 */
function readYml(absoluteFilePath) {
  return yaml.safeLoad(fileSystem.readFileSync(absoluteFilePath, "utf8"));
}

/**
 * @description Creates `.json` files from provided `.yml` files from Local
 * @param {String} filePath - Absolute path of the file
 * @returns {undefined}
 */
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
}

/**
 * @description - Creates `.json` files from provided `.yml` files from remote
 * @param {String} ymlFolderName - Folder name of the `.yml` file to be placed in
 * @param {String} ymlFileName - Name of the `.yml` file, along with extension
 * @returns {undefined}
 */
function createJsonFromRemoteYml(ymlFolderName, ymlFileName) {
  const jsonFileName = `${ymlFileName.split(".")[0]}.json`;

  createDirectoryIfMissing(`${path.join(__dirname, "..", "search_icons")}`);
  fileSystem.writeFile(
    `${path.resolve(__dirname, "../search_icons/", jsonFileName)}`,
    JSON.stringify(
      readYml(`${path.resolve(__dirname, `../${ymlFolderName}`, ymlFileName)}`)
    ),
    err => {
      if (err) {
        throw err;
      }
      console.log(`Contents inserted in ${jsonFileName}!`);
    }
  );
}

module.exports = {
  getCliArgs,
  createDirectoryIfMissing,
  createJsonFromLocalYml,
  createJsonFromRemoteYml
};
