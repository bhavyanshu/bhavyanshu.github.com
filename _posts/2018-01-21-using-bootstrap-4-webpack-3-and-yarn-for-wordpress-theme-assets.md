---
layout: post
title: "Using Bootstrap 4, Webpack 3 and Yarn for WordPress theme assets"
description: "Using modern web development techniques in WordPress theme development and asset management."
tags: ["WordPress"]
change_frequency: "weekly"
priority: 0.8
date: 2018-01-21 11:58:57
---

## Requirements

- yarn
- Webpack
- WordPress Installation and theme

## WP Theme Directory Structure

* In your wordpress theme, create *assets/build/js*, *assets/build/sass*, *assets/dist* and *assets/config* folders.
* Create files *theme.js* in the *assets/build/js* folder.
* Create  *theme.scss* and *_variable.scss* in *assets/build/sass* folder.

```
wp-content/themes/<theme-name>/
├── assets
│   ├── build
│   │   ├── js
│   │   │   └── theme.js
│   │   └── sass
│   │       ├── theme.scss
│   │       └── _variables.scss
│   ├── config
│   │   └── webpack.config.js
│   └── dist
│       ├── css
│       │   └── style.css
│       └── js
│           └── theme.js
├── package.json
├── postcss.config.js
└── yarn.lock
```

## Steps

* Create a package.json file in your WP theme root folder. It already contains the scripts block. We will create the config file later.

**package.json**

```
{
  "name": "REPLACE_THIS",
  "version": "0.0.1",
  "description": "REPLACE_THIS",
  "scripts": {
    "build": "webpack --progress --config assets/config/webpack.config.js",
    "watch": "webpack --hide-modules --watch --config assets/config/webpack.config.js",
    "prod": "webpack --progress -p --config assets/config/webpack.config.js"
  },
  "author": "REPLACE_THIS",
  "license": "MIT"
}
```

* Run the following commands to install dependencies.

```bash
$ yarn add bootstrap-loader jquery popper.js

$ yarn add --dev webpack babel babel-core babel-loader bootstrap copy-webpack-plugin css-loader extract-text-webpack-plugin node-sass postcss-loader resolve-url-loader url-loader style-loader sass-loader
```

It will add the following dependencies to the package.json

```
"dependencies": {
  "bootstrap-loader": "^2.2.0",
  "jquery": "^3.3.1",
  "popper.js": "^1.12.9"
},
"devDependencies": {
  "babel": "^6.23.0",
  "babel-core": "^6.26.0",
  "babel-loader": "^7.1.2",
  "bootstrap": "^4.0.0",
  "copy-webpack-plugin": "^4.3.1",
  "css-loader": "^0.28.9",
  "extract-text-webpack-plugin": "^3.0.2",
  "file-loader": "^1.1.6",
  "node-sass": "^4.7.2",
  "postcss-loader": "^2.0.10",
  "resolve-url-loader": "^2.2.1",
  "sass-loader": "^6.0.6",
  "style-loader": "^0.19.1",
  "url-loader": "^0.6.2",
  "webpack": "^3.10.0"
}
```

* Next create postcss config for the postcss-loader. We won't have to configure this.

**postcss.config.js**

```
module.exports = {};
```

* Next we create the .bootstraprc file in the root folder of our wordpress theme.

**.bootstraprc**

```bash
logLevel: debug
bootstrapVersion: 4
extractStyles: true
useFlexbox: true
styleLoaders:
  - style-loader
  - css-loader
  - sass-loader
  - postcss-loader

## Bootstrap customizations
preBootstrapCustomizations: ./assets/build/sass/_variables.scss
appStyles: ./assets/build/sass/theme.scss


### Bootstrap styles
styles:

  # Mixins
  mixins: true

  # Reset and dependencies
  print: true

  # Core CSS
  buttons: true
  code: true
  forms: true
  grid: true
  images: true
  reboot: true
  tables: true
  type: true

  # Components
  alert: true
  badge: true
  breadcrumb: true
  button-group: true
  card: true
  close: true
  custom-forms: true
  dropdown: true
  input-group: true
  jumbotron: true
  list-group: true
  media: true
  nav: true
  navbar: true
  pagination: true
  progress: true
  transitions: true

  # Components w/ JavaScript
  carousel: true
  modal: true
  popover: true
  tooltip: true

  # Utility classes
  utilities: true

### Bootstrap scripts
scripts:
  alert: true
  button: true
  carousel: true
  collapse: true
  dropdown: true
  modal: true
  popover: true
  scrollspy: true
  tab: true
  tooltip: true
  util: true
```

* Finally, create webpack.config.js file in *assets/config* folder.

**webpack.config.js**

```javascript
const CopyWebpackPlugin = require("copy-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const webpack = require("webpack");
const path = require("path");

// Add more js files here to build
var jsAssets = [
  './assets/build/js/theme.js'
];

module.exports = {
  entry: ['bootstrap-loader'].concat(jsAssets),
  output: {
    path: path.join(__dirname, "../../assets/dist/js"),
    filename: "theme.js"
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
      "window.jQuery": "jquery",
      Tether: "tether",
      "window.Tether": "tether",
      Alert: "exports-loader?Alert!bootstrap/js/dist/alert",
      Button: "exports-loader?Button!bootstrap/js/dist/button",
      Carousel: "exports-loader?Carousel!bootstrap/js/dist/carousel",
      Collapse: "exports-loader?Collapse!bootstrap/js/dist/collapse",
      Dropdown: "exports-loader?Dropdown!bootstrap/js/dist/dropdown",
      Modal: "exports-loader?Modal!bootstrap/js/dist/modal",
      Popover: "exports-loader?Popover!bootstrap/js/dist/popover",
      Scrollspy: "exports-loader?Scrollspy!bootstrap/js/dist/scrollspy",
      Tab: "exports-loader?Tab!bootstrap/js/dist/tab",
      Tooltip: "exports-loader?Tooltip!bootstrap/js/dist/tooltip",
      Util: "exports-loader?Util!bootstrap/js/dist/util",
    }),
    new ExtractTextPlugin({filename: '../css/style.css', allChunks: true})
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      { test: /bootstrap[\/\\]dist[\/\\]js[\/\\]umd[\/\\]/, loader: 'imports-loader?jQuery=jquery' },
      { test: /\.(woff2?|svg)$/, loader: 'url-loader?limit=10000' },
      { test: /\.(ttf|eot)$/, loader: 'file-loader' },
    ],
  },
}

```

* Now run `yarn run build` and it will output the compiled assets in *dist* folder.


****

{% include JB/setup %}
