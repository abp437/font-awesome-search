const utils = require("./utils");

["icons.yml", "categories.yml"].forEach((fileName) => {
  utils.generateJSONFile("local_icons", fileName);
});
