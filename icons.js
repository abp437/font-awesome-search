const yaml = require('js-yaml');
const fileSystem = require('fs');

const getJSObjectFromYML = (relativeFilePath) => (
  yaml.safeLoad(fileSystem.readFileSync(relativeFilePath, 'utf8'))
);

let FontIcons, IconCategories;

// Try reading Icon files and Categories of Icons from `.yml` files
try {
  FontIcons = getJSObjectFromYML('./yml_files/icons.yml');
  IconCategories = getJSObjectFromYML('./yml_files/categories.yml');
} catch (error) {
  console.log(error);
}

module.exports = {
  FontIcons,
  IconCategories,
};
