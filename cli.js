#!/usr/bin/env node

const utils = require("./utils");
const downloadIcons = require("./node_scripts/downloadIcons.js");
const { R, icons, categories } = utils.getCliArgs();

if (R) {
  // Generate files from Remote
  downloadIcons();
} else {
  // Generate files from Local
  [icons, categories].forEach(filePath => {
    utils.createJsonFromLocalYml(filePath);
  });
}
