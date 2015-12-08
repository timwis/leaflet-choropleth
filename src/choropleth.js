var L = require('leaflet')
var chroma = require('chroma-js')
var _ = {
	defaults: require('lodash/object/defaults'),
	extend: require('lodash/object/extend')
}

L.choropleth = module.exports = function(geojson, opts) {
	// Set default options in case any weren't passed
	_.defaults(opts, {
		valueProperty: 'value',
        normProperty: false,
		scale: ['white', 'red'],
		steps: 5,
		mode: 'q'
	})
	
	// Save what the user passed as the style property for later use (since we're overriding it)
	var userStyle = opts.style
	
	// Calculate limits
	var values = geojson.features.map(function(item) {
        // if use supplies a normalizing value then caclculate new value
        if(opts.normProperty){
           return item.properties[opts.valueProperty]/item.properties[opts.normProperty];
        } else {
           return item.properties[opts.valueProperty]; 
        }
		
	})
	var limits = chroma.limits(values, opts.mode, opts.steps - 1)
	
	// Create color buckets
	var colors = opts.colors || chroma.scale(opts.scale).colors(opts.steps)
	
	return L.geoJson(geojson, _.extend(opts, {
		style: function(feature) {
			var style = {}
            
            // same as above
			if(opts.normProperty) {
                var value = feature.properties[opts.valueProperty]/feature.properties[opts.normProperty];
            } else {
                var value = feature.properties[opts.valueProperty];
            }
			if(feature.properties[opts.valueProperty]) {
				// Find the bucket/step/limit that this value is less than and give it that color
				for(var i = 0; i < limits.length; i++) {
					if(value <= limits[i]) {
						style.fillColor = colors[i]
						break
					}
				}
			}
			
			// Return this style, but include the user-defined style if it was passed
			// (this could be a one-liner ? : conditional but it would decrease readability too much)
			switch(typeof userStyle) {
				case 'function':
					return _.extend(userStyle(), style)
					break
				case 'object':
					return _.extend(userStyle, style)
					break
				default:
					return style
			}
		},
		limits: limits,
		colors: colors
	}))
}