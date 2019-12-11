import FontIcons from "SearchIcons/icons";
import IconCategories from "SearchIcons/categories";

function addToFinalObject(searchTerm, icon) {
  if (!Array.isArray(manipulatedObject[searchTerm])) {
    manipulatedObject[searchTerm] = [];
  }
  manipulatedObject[searchTerm].push(icon);
}

const manipulatedObject = {};

for (const category in IconCategories) {
  if (IconCategories.hasOwnProperty(category)) {
    IconCategories[category]["icons"].forEach(icon => {
      addToFinalObject(category, icon);
    });
  }
}

for (const icon in FontIcons) {
  if (FontIcons.hasOwnProperty(icon)) {
    manipulatedObject[icon] = icon;
    manipulatedObject[FontIcons[icon]["label"].toLowerCase()] = FontIcons[icon][
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

const filterIconsList = searchQuery => {
  if (searchQuery.length) {
    const searchResult = [];
    const uniqueSearchResult = new Set();
    const filteredResult = Object.keys(manipulatedObject).filter(item =>
      new RegExp(`${searchQuery}`, "ig").test(item)
    );
    filteredResult.forEach(item => {
      if (Array.isArray(manipulatedObject[item])) {
        manipulatedObject[item].forEach(itemClass => {
          uniqueSearchResult.add(itemClass);
        });
      } else {
        uniqueSearchResult.add(item);
      }
    });
    for (const itemClass of uniqueSearchResult) {
      searchResult.push(itemClass);
    }
    return searchResult;
  }
  return Object.keys(FontIcons);
};

export default filterIconsList;
