var map = L.map('map').setView([39.9897471840457, -75.13893127441406], 11)

// Add basemap
L.tileLayer('http://{s}.tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png', {
  maxZoom: 18,
  attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map)

// Add GeoJSON
$.getJSON('../basic/crimes_by_district.geojson', function (geojson) {
  var choroplethLayer = L.choropleth(geojson, {
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

  // Add legend (don't forget to add the CSS from index.html)
  var legend = L.control({ position: 'bottomright' })
  legend.onAdd = function (map) {
    var div = L.DomUtil.create('div', 'info legend')
    var limits = choroplethLayer.options.limits
    var colors = choroplethLayer.options.colors
    var labels = []

    // Add min & max
    div.innerHTML = '<div class="labels"><div class="min">' + limits[0] + '</div> \
			<div class="max">' + limits[limits.length - 1] + '</div></div>'

    limits.forEach(function (limit, index) {
      labels.push('<li style="background-color: ' + colors[index] + '"></li>')
    })

    div.innerHTML += '<ul>' + labels.join('') + '</ul>'
    return div
  }
  legend.addTo(map)
})
