# Leaflet Choropleth
Choropleth plugin for Leaflet (color scale based on value). **Work in Progress**

This plugin extends `L.geoJson`. ([demo](http://rawgit.com/timwis/leaflet-choropleth/master/demo/index.html))

## Example Usage
```javascript
L.choropleth(geojsonData, {
	valueProperty: 'value', // which property in the features to use
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
