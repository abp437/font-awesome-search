# font-awesome-search
Provides search functionality on Font Awesome icons based on a icon name or category, and also provides filtering based on font style.

### How does the package work?
- The package reads meta-data related to icons from yml files
- As a user of this package, you have an option to either fetch open source files or use your own yml files (if you have purchased an icon pack)
- The package provides a search function that can be imported as a module in your project
- The module function accepts a configuration object and returns a function that can be used to search icons based on the configuration object

# Installation
`npm install font-awesome-search`

After installation, run the bin script in cli where you want to import the package:

## Using Font Awesome open-sourced files
`./node_modules/.bin/font-awesome-search -R`

## Using files you received on purchase
`./node_modules/.bin/font-awesome-search --icons='icons.yml-file-absolute-path' --categories='categories.yml-file-absolute-path'`

### Example:
`./node_modules/.bin/font-awesome-search --icons='/home/john-doe/Projects/font-awesome-search/font_awesome_yml/icons.yml' --categories='/home/john-doe/Projects/font-awesome-search/font_awesome_yml/categories.yml'`

# Usage

Make sure you have followed the installation steps before you start using the function.

#### Basic usage

```
fontAwesomeSearch(<<configuration>>)(<<search text>>)
```

#### Configuration

> `fontStyles` is the only configuration supported as of now.

To filter the results by font style, pass `fontStyles` in the configuration object.

Font styles supported:

1. Regular
2. Solid
3. Light
4. Duotone
5. Brands

#### Example

```
const search = fontAwesomeSearch({ fontStyles: ['regular', 'brands'] });
const results = search('home');
```

> You can skip the configuration to include all styles in the result.
> Skipping search text will fetch all the icons.

#### Integration with React JS:
```
import React, { useState } from 'react';
import fontAwesomeSearch from 'font-awesome-search';

const search = fontAwesomeSearch({
  fontStyles: ['regular', 'brands', 'duotone'],
});

function App() {
  const [icons, setIcons] = useState(search());
  return (
    <div>
      <input onChange={(event) => {
        setIcons(search(event.target.value))
      }} />
      <ul>
        {icons.map((iconClass) => (
          <li key={iconClass}>
            <i className={iconClass}></i>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
```

## Platforms supported

The function has been tested on IE 10+ and is expected to work on most of the modern browsers.

Platforms the package is tested on - Windows, Linux, Mac.

The function can be integrated with most of modern JS frameworks(Angular, React, etc).

## Contributing

Please do contribute if you have any improvements or bug fixes.

To raise a pull request:
- Fork this repository
- Create a topic branch
- Make changes with your feature or bug fix
- Add, commit, and push your changes
- Submit a pull request
