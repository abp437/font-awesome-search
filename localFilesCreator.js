const utils = require("./utils");

process.argv.slice(2).forEach((filePath) => {
  utils.createJsonFromLocalYml(filePath);
});
