# Leaflet Choropleth [![Build Status](https://travis-ci.org/timwis/leaflet-choropleth.svg?branch=gh-pages)](https://travis-ci.org/timwis/leaflet-choropleth) [![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)

[![NPM](https://nodei.co/npm/leaflet-choropleth.png?compact=true)](https://nodei.co/npm/leaflet-choropleth/)

Choropleth plugin for Leaflet (color scale based on value) - [Demo](http://timwis.com/leaflet-choropleth/examples/basic)

[![screenshot](http://i.imgur.com/5DXlLG8l.jpg)](http://timwis.com/leaflet-choropleth/examples/basic)

This plugin extends `L.geoJson`, giving each feature a `style.fillColor` that corresponds to a specified value 
in its `properties` object. For information on how to use `L.geoJson`, see the Leaflet 
[tutorial](http://leafletjs.com/examples/geojson.html) and [documentation](http://leafletjs.com/reference.html#geojson).

While Leaflet provides a [choropleth tutorial](http://leafletjs.com/examples/choropleth.html), that approach requires you to
specify exact breakpoints and colors. This plugin uses [chroma.js](http://gka.github.io/chroma.js/) to abstract that for you.
Just tell it which property in the GeoJSON to use and some idea of the color scale you want.

## Usage
```javascript
L.choropleth(geojsonData, {
	valueProperty: 'incidents', // which property in the features to use
	scale: ['white', 'red'], // chroma.js scale - include as many as you like
	steps: 5, // number of breaks or steps in range
	mode: 'q', // q for quantile, e for equidistant, k for k-means
	style: {
		color: '#fff', // border color
		weight: 2,
		fillOpacity: 0.8
	},
	onEachFeature: function(feature, layer) {
		layer.bindPopup(feature.properties.value)
	}
}).addTo(map)
```
### Advanced
* **colors**: If you prefer to specify your own exact colors, use `colors: ['#fff', '#777', ...]` instead of `scale`.
Just make sure the number of colors is the same as the number of `steps` specified.
* **valueProperty**: To use computed values (such as [standardizing](http://axismaps.github.io/thematic-cartography/articles/standardize.html)),
you can use a function for `valueProperty` that is passed `(feature)` and returns a number ([example](examples/computed_values/demo.js)).

## Installation
* via NPM: `npm install leaflet-choropleth`
* via Bower: `bower install leaflet-choropleth`

Include `dist/choropleth.js` from this repository on your page after Leaflet:
```html
<script src="path/to/leaflet.js"></script>
<script src="path/to/choropleth.js"></script>
```
Or, if using via CommonJS (Browserify, Webpack, etc.):
```javascript
var L = require('leaflet')
require('leaflet-choropleth')
```

## Examples
* [Basic usage](examples/basic/demo.js)
* [Legend](examples/legend/demo.js)
* [Fetch & join](examples/fetch_join/demo.js)
* [Computed values](examples/computed_values/demo.js) 

## Development
This project uses [webpack](http://webpack.github.io/) to build the JavaScript and 
[standard](https://github.com/feross/standard) for code style linting.

* While developing, use `npm run watch` to automatically rebuild when files are saved
* Use `npm test` to run unit tests and code style linter
* Before committing `dist/`, use `npm run build` to optimize and minify for production use
