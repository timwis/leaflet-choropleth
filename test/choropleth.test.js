/* global describe, it, before */
var fs = require('fs')
require('should')
var jsdom = require('mocha-jsdom')

var geojson = JSON.parse(fs.readFileSync('./examples/basic/crimes_by_district.geojson'))

describe('basic usage', function () {
  jsdom()

  before(function () {
    this.choropleth = require('../src/choropleth')
    this.layer = this.choropleth(geojson, {
      valueProperty: 'incidents'
    })
    // console.log(require('util').inspect(this.layer.options, {colors: true, depth: 2}))
  })

  it('returns a layer', function () {
    this.layer.should.have.property('_layers')
  })

  it('sets limits', function () {
    this.layer.options.should.have.property('limits', [
      814,
      18597.5,
      26984,
      36140.5,
      45529
    ])
  })

  it('sets colors', function () {
    this.layer.options.should.have.property('colors', [
      '#ffffff',
      '#ffbfbf',
      '#ff7f7f',
      '#ff3f3f',
      '#ff0000'
    ])
  })

  it('sets the color of a feature', function () {
    var style = this.layer.options.style(geojson.features[0])
    style.should.have.property('fillColor', '#ffbfbf')
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
    this.layer.options.limits.should.eql([
      814,
      18597.5,
      26984,
      36140.5,
      45529
    ])
  })

  it('sets the color of a feature', function () {
    var style = this.layer.options.style(geojson.features[0])
    style.should.have.property('fillColor', '#ffbfbf')
  })
})
