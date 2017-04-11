/* global describe, it, before */
var fs = require('fs')
require('should')
var jsdom = require('mocha-jsdom')

var geojson = JSON.parse(fs.readFileSync('./examples/basic/crimes_by_district.geojson'))

describe('basic usage', function () {
  jsdom()

  before(function () {
    this.choropleth = require('../src/choropleth')
    this.style = {fillColor: 'lime'}
    this.layer = this.choropleth(geojson, {
      style: this.style,
      valueProperty: 'incidents'
    })
    // console.log(require('util').inspect(this.layer.options, {colors: true, depth: 2}))
  })

  it('returns a layer', function () {
    this.layer.should.have.property('_layers')
  })

  it('sets limits', function () {
    this.layer.options.should.have.property('limits')
    var limits = this.layer.options.limits
    limits.should.have.length(5)
    limits[0].should.be.equal(814)
    limits[4].should.be.equal(45529)
  })

  it('sets colors', function () {
    this.layer.options.should.have.property('colors')
    var colors = this.layer.options.colors
    colors.should.have.length(5)
    colors[0].should.be.equal('#ffffff')
    colors[4].should.be.equal('#ff0000')
  })

  it('sets the color of a feature', function () {
    var style = this.layer.options.style(geojson.features[0])
    style.should.have.property('fillColor', '#ffbfbf')
  })

  it("doesn't modify style object", function () {
    this.style.should.be.eql({fillColor: 'lime'})
  })
})

describe('valueProperty function', function () {
  jsdom()

  before(function () {
    this.choropleth = require('../src/choropleth')
    this.layer = this.choropleth(geojson, {
      valueProperty: function (feature) {
        return feature.properties.incidents
      }
    })
    // console.log(require('util').inspect(this.layer.options, {colors: true, depth: 2}))
  })

  it('sets limits', function () {
    this.layer.options.should.have.property('limits')
    var limits = this.layer.options.limits
    limits.should.have.length(5)
    limits[0].should.be.equal(814)
    limits[4].should.be.equal(45529)
  })

  it('sets the color of a feature', function () {
    var style = this.layer.options.style(geojson.features[0])
    style.should.have.property('fillColor', '#ffbfbf')
  })
})
