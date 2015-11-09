var map = L.map('map').setView([39.95, -75.1667], 11)

// Add basemap
L.tileLayer('http://{s}.tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png', {
	maxZoom: 18,
	attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map)

// Add GeoJSON
$.when(
	$.getJSON('https://data.phila.gov/resource/bbgf-pidf.geojson'),
	$.getJSON('https://data.phila.gov/resource/r24g-zx3n.json?%24select=count(*)%20as%20value%2C%20%3A%40computed_region_bbgf_pidf%20as%20label&%24group=%3A%40computed_region_bbgf_pidf&%24order=value%20desc')
).done(function(responseGeojson, responseData) {
	var data = responseData[0]
	var geojson = responseGeojson[0]
	
	// Create hash table for easy reference
	var dataHash = {}
	data.forEach(function(item) {
		if(item.label) dataHash[item.label] = item.value
	})
	
	// Add value from hash table to geojson properties
	geojson.features.forEach(function(item) {
		item.properties.value = dataHash[item.properties._feature_id] || null 
	})
	
	// Calculate limits
	var values = _.pluck(data, 'value').map(function(item) { return +item })
	var limits = chroma.limits(values, 'q', 4)
	
	// Create color scale
	var scale = chroma.scale(['white', 'red']).colors(5)
	console.log(limits, scale)
	
	L.geoJson(geojson, {
		style: function(feature) {
			if(feature.properties.value) {
				var color
				for(var i = 0; i < limits.length; i++) {
					if(feature.properties.value <= limits[i]) {
						color = scale[i]
						break
					}
				}
				return {
					fillColor: color,
					color: '#fff',
					weight: 2,
					fillOpacity: 0.8
				}
			}
		},
		onEachFeature: function(feature, layer) {
			layer.bindPopup(feature.properties.value)
		}
	}).addTo(map)
})
