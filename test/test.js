require('should')
var proxyquire = require('proxyquire')

var fakeLeaflet = {
	leaflet: {
		'@noCallThru': true,
		geoJson: function() {
			return arguments
		}
	}
}
var choropleth = proxyquire('../src/choropleth', fakeLeaflet)
var sampleData = require('../demo/crimes_by_district.json')

describe('choropleth', function() {
	it('should extend geojson', function() {
		var layer = choropleth(sampleData)
	})
})