/**
 * Example Usage:
 * 
 *	L.choropleth(geojson, {
 *		valueProperty: 'value',
 *		scale: ['white', 'red'],
 *		steps: 5,
 *		mode: 'q',
 *		style: {
 *			color: '#fff',
 *			weight: 2,
 *			fillOpacity: 0.8
 *		}
 *	}).addTo(map)
 */
var L = require('leaflet')
var _ = require('underscore')
var chroma = require('chroma-js')

L.choropleth = module.exports = function(geojson, opts) {
	// Set default options in case any weren't passed
	_.defaults(opts, {
		valueProperty: 'value',
		scale: ['white', 'red'],
		steps: 5,
		mode: 'q'
	})
	
	// Calculate limits
	var values = geojson.features.map(function(item) {
		return item.properties[opts.valueProperty]
	})
	var limits = chroma.limits(values, opts.mode, opts.steps - 1)
	
	// Create color scale
	var scale = chroma.scale(opts.scale).colors(opts.steps)
	
	// TODO: Make style work better with _.extend() to provide default L.geoJson styling functionality (object or function)
	return L.geoJson(geojson, _.extend(opts, {
		style: function(feature) {
			if(feature.properties[opts.valueProperty]) {
				var style = {}
				for(var i = 0; i < limits.length; i++) {
					if(feature.properties[opts.valueProperty] <= limits[i]) {
						style.fillColor = scale[i]
						break
					}
				}
				return style
			}
		}
	}))
}