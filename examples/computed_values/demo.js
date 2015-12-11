var map = L.map('map').setView([39.9897471840457, -75.13893127441406], 11)

// Add basemap
L.tileLayer('http://{s}.tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png', {
  maxZoom: 18,
  attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map)

// Add GeoJSON
$.getJSON('../basic/crimes_by_district.geojson', function (geojson) {
  L.choropleth(geojson, {
    valueProperty: function (feature) {
      return feature.properties.incidents / feature.properties.area_sqmi
    },
    scale: ['white', 'red'],
    steps: 5,
    mode: 'q',
    style: {
      color: '#fff',
      weight: 2,
      fillOpacity: 0.8
    },
    onEachFeature: function (feature, layer) {
      layer.bindPopup('District ' + feature.properties.dist_num + '<br>' +
        feature.properties.incidents.toLocaleString() + ' incidents<br>' +
        Math.round(feature.properties.area_sqmi).toLocaleString() + ' sq mi')
    }
  }).addTo(map)
})
