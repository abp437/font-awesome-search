const path = require("path");
const SRC_DIR = path.resolve(__dirname, "src");
const SEARCH_ICONS = path.resolve(__dirname, "search_icons");
const UTILS = path.resolve(__dirname, "utils");

module.exports = {
  entry: "./index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js"
  },
  resolve: {
    alias: {
      Src: SRC_DIR,
      SearchIcons: SEARCH_ICONS,
      Utils: UTILS
    },
    extensions: [".js", ".json"]
  }
};
