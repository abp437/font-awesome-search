# font-awesome-search
Provides search functionality on Font Awesome icons based on a search text, and filtering by name or category.

### How does the package work?
- The package reads meta-data related to icons from yml files
- As a user of this package, you have an option to either fetch open source files or use your own files (if you have purchased an icon pack)
- The package provides a search function that can be imported as a module in your project

# Installation
`npm install font-awesome-search`

After installation, run the bin script in cli where you want to import the package:

## Using Font Awesome open-sourced files
`./node_modules/.bin/font-awesome-search -R`

## Using files you received on purchase
`./node_modules/.bin/font-awesome-search --icons='icons.yml-file-absolute-path' --categories='categories.yml-file-absolute-path'`

### Example:
`./node_modules/.bin/font-awesome-search --icons='/home/akshay-pawar/Projects/font-awesome-search/font_awesome_yml/icons.yml' --categories='/home/akshay-pawar/Projects/font-awesome-search/font_awesome_yml/categories.yml'`

# Usage

Make sure you have included meta-data files before you start using the function.

#### React JS:
```
import React from 'react';
import FontAwesomeSearch from 'font-awesome-search';
import logo from './logo.svg';
import './App.css';

function App() {
  console.log(FontAwesomeSearch(''));
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
```
