const FontIcons = require("../search_icons/icons.json");
const IconCategories = require("../search_icons/categories.json");

const searchTokens = {};

/**
 * @description Adds a Search Term and the corresponding Icon to `searchTokens` object
 * @param {String} searchTerm - The 'key' of a key-value pair to be added to `searchTokens` object
 * @param {String} icon -The 'value' of a key-value pair to be added to `searchTokens` object
 * @returns {undefined}
 */
function addToFinalObject(searchTerm, icon) {
  if (!Array.isArray(searchTokens[searchTerm])) {
    searchTokens[searchTerm] = [];
  }
  searchTokens[searchTerm].push(icon);
}

for (const category in IconCategories) {
  if (IconCategories.hasOwnProperty(category)) {
    IconCategories[category]["icons"].forEach(icon => {
      addToFinalObject(category, icon);
    });
  }
}

for (const icon in FontIcons) {
  if (FontIcons.hasOwnProperty(icon)) {
    searchTokens[icon] = icon;
    searchTokens[FontIcons[icon]["label"].toLowerCase()] = FontIcons[icon][
      "label"
    ]
      .toLowerCase()
      .split(" ")
      .join("-");
    FontIcons[icon]["search"]["terms"].forEach(searchTerm => {
      addToFinalObject(searchTerm, icon);
    });
  }
}

/**
 * @description Builds a regex in the format /a[^b]*b[^c]*c/ for abc
 * @param {String} query - The query to construct Regex from
 * @returns {RegExp} in the format /a[^b]*b[^c]*c/ for abc
 */
function getRegex(query) {
  let regex = query.charAt(0);
  for (let i = 1; i < query.length; i++) {
    const character = query.charAt(i);
    regex = `${regex}[^${character}]*${character}`;
  }
  return new RegExp(`${regex}`, "i");
}

/**
 * @description Searches the `searchTokens` object and returns Search results
 * @param {String} searchQuery - The query to be applied upon `searchTokens` object
 * @returns {Array} - of search results
 */
function search(searchQuery = "") {
  if (searchQuery.length) {
    const searchResults = new Set();
    const regex = getRegex(searchQuery);
    const filteredResult = Object.keys(searchTokens).filter(item =>
      regex.test(item)
    );
    filteredResult.forEach(item => {
      if (Array.isArray(searchTokens[item])) {
        searchTokens[item].forEach(itemClass => {
          searchResults.add(itemClass);
        });
      } else {
        searchResults.add(item);
      }
    });
    return [...searchResults];
  }
  return Object.keys(FontIcons);
}

export default search;
