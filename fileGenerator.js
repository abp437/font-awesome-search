const fileSystem = require("fs");
const yaml = require("js-yaml");
const getFontAwesomeIcons = require("./icons.js");

const getJSObjectFromYML = relativeFilePath =>
  yaml.safeLoad(fileSystem.readFileSync(relativeFilePath, "utf8"));

const generateYMLFile = (name, decodedContent) => {
  fileSystem.writeFile(`./yml_files/${name}`, decodedContent, err => {
    if (err) {
      throw err;
    }
    console.log(`Contents inserted in ${name}!`);

    generateJSONFile(name);
  });
};

const generateJSONFile = name => {
  const jsonFileName = `${name.split(".")[0]}.json`;
  fileSystem.writeFile(
    `./search_icons/${jsonFileName}`,
    JSON.stringify(getJSObjectFromYML(`./yml_files/${name}`)),
    err => {
      if (err) {
        throw err;
      }
      console.log(`Contents inserted in ${jsonFileName}!`);
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
