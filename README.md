# Leaflet Choropleth
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
Note: If you prefer to specify your own exact colors, use `colors: ['#fff', '#777', ...]` instead of `scale`.
Just make sure the number of colors is the same as the number of `steps` specified.

## Installation
* via NPM: `npm install leaflet-choropleth`
* via Bower: `bower install leaflet-choropleth`

Include `dist/choropleth.js` on your page after Leaflet:
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
* [Basic usage](https://github.com/timwis/leaflet-choropleth/blob/gh-pages/examples/basic/demo.js)
* [Legend](https://github.com/timwis/leaflet-choropleth/blob/gh-pages/examples/legend/demo.js)
* [Advanced usage](https://github.com/timwis/leaflet-choropleth/blob/gh-pages/examples/advanced/demo.js) 
(fetch geojson and data file via AJAX and join them on common property)

## Development
Use `webpack` to compile `src/` to `dist/`. During development, `webpack --watch` will automatically
rebuild. Before committing `dist/`, use `webpack -p` to optimize and minify for production use.