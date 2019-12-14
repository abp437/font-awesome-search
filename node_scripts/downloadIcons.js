const fileSystem = require("fs");
const path = require("path");
const fetch = require("node-fetch");
const base64 = require("base64url");
const utils = require("../utils");

const fontAwesomeFiles = ["categories.yml", "icons.yml"];

// Grab Font Awesome YML files from Font Awesome Github repo
function fetchIcons() {
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

function generateYmlFile(name, content) {
  utils.createDirectoryIfMissing(
    `${path.join(__dirname, "..", "remote_yml_files")}`
  );
  fileSystem.writeFile(
    `${path.resolve(__dirname, "../remote_yml_files")}/${name}`,
    content,
    err => {
      if (err) {
        throw err;
      }
      console.log(`Contents inserted in ${name}!`);

      utils.createJsonFromRemoteYml("remote_yml_files", name);
    }
  );
};

function downloadIcons() {
  fetchIcons()
    .then(decodedContent => {
      decodedContent.forEach(fileMetaData => {
        const { name, decodedContent } = fileMetaData;
        generateYmlFile(name, decodedContent);
      });
    })
    .catch(err => console.log("Error: ", err));
};

module.exports = downloadIcons;
