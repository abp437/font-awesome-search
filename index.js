const fileSystem = require('fs');
const getFontAwesomeIcons = require('./icons.js');

getFontAwesomeIcons()
  .then((decodedContent) => {
    decodedContent.forEach((fileMetaData) => {
      const { name, decodedContent } = fileMetaData;
      fileSystem.writeFile(`./yml_files/${name}`, decodedContent, (err) => {
        if (err) {
          throw err;
        }
        console.log(`Contents inserted in ${name}!`);
      });
    });
  })
  .catch((err) => console.log("in error", err));
