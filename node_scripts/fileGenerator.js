const fileSystem = require("fs");
const path = require("path");
const utils = require("../utils");
const getFontAwesomeIcons = require("./icons.js");

const generateYMLFile = (name, decodedContent) => {
  fileSystem.writeFile(
    `${path.resolve(__dirname, "../yml_files")}/${name}`,
    decodedContent,
    err => {
      if (err) {
        throw err;
      }
      console.log(`Contents inserted in ${name}!`);

      utils.generateJSONFile("yml_files", name);
    }
  );
};

const generateIconFiles = () => {
  getFontAwesomeIcons()
    .then(decodedContent => {
      decodedContent.forEach(fileMetaData => {
        const { name, decodedContent } = fileMetaData;
        generateYMLFile(name, decodedContent);
      });
    })
    .catch(err => console.log("Error: ", err));
};

module.exports = generateIconFiles;
