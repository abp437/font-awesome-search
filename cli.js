#!/usr/bin/env node

const utils = require("./utils");
const downloadIcons = require("./node_scripts/downloadIcons.js");
const { R, icons, categories } = utils.getCliArgs();

if (R) {
  downloadIcons();
} else {
  [icons, categories].forEach(filePath => {
    utils.createJsonFromLocalYml(filePath);
  });
}
