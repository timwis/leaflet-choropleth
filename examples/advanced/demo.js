/**
 * Advanced demo
 * Fetches a geojson file as well as a data file and joins them before passing to L.choropleth
 */
var map = L.map('map').setView([39.9897471840457, -75.13893127441406], 11)

// Add basemap
L.tileLayer('http://{s}.tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png', {
  maxZoom: 18,
  attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map)

// Fetch GeoJSON and data to join to it
$.when(
  $.getJSON('https://data.phila.gov/resource/bbgf-pidf.geojson'),
  $.getJSON('https://data.phila.gov/resource/r24g-zx3n.json?%24select=count(*)%20as%20value%2C%20%3A%40computed_region_bbgf_pidf%20as%20label&%24group=%3A%40computed_region_bbgf_pidf&%24order=value%20desc')
  ).done(function (responseGeojson, responseData) {
    var data = responseData[0]
    var geojson = responseGeojson[0]

    // Create hash table for easy reference
    var dataHash = data.reduce(function (hash, item) {
      if (item.label) {
        hash[item.label] = isNaN(item.value) ? null : +item.value
      }
      return hash
    }, {})

    // Add value from hash table to geojson properties
    geojson.features.forEach(function (item) {
      item.properties.incidents = dataHash[item.properties._feature_id] || null
    })

    L.choropleth(geojson, {
      valueProperty: 'incidents',
      scale: ['white', 'red'],
      steps: 5,
      mode: 'q',
      style: {
        color: '#fff',
        weight: 2,
        fillOpacity: 0.8
      },
      onEachFeature: function (feature, layer) {
        layer.bindPopup('District ' + feature.properties.dist_num + '<br>' + feature.properties.incidents.toLocaleString() + ' incidents')
      }
    }).addTo(map)
  })
  