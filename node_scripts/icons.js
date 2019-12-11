const fetch = require("node-fetch");
const base64 = require("base64url");

const fontAwesomeFiles = ["categories.yml", "icons.yml"];

// Grab Font Awesome YML files from Font Awesome Github repo
const getFontAwesomeIcons = () => {
  return Promise.all(
    fontAwesomeFiles.map(
      fileName =>
        new Promise((resolve, reject) => {
          fetch(
            `https://api.github.com/repos/FortAwesome/Font-Awesome/contents/metadata/${fileName}`
          )
            .then(res => {
              if (res.status === 200) {
                return res.json();
              }
              return reject(res.statusText);
            })
            .then(res => {
              const { name, content } = res;
              const decodedContent = base64.decode(content);
              resolve({
                name,
                decodedContent
              });
            })
            .catch(err => reject(err));
        })
    )
  );
};

module.exports = getFontAwesomeIcons;
