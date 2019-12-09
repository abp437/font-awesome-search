const fileSystem = require('fs');
const { getFontAwesomeIcons, fontAwesomeFiles } = require('./icons.js');

getFontAwesomeIcons()
  .then((decodedContent) => {
    fontAwesomeFiles.forEach((fileName) => {
      fileSystem.writeFile(`./yml_files/${fileName}`, decodedContent, (err) => {
        if (err) {
          throw err;
        }
        console.log(`Contents inserted in ${fileName}!`);
      })
    });
  })
  .catch((err) => console.log("in error", err));
