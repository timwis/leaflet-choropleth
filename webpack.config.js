module.exports = {
  entry: './src/choropleth.js',
  output: {
    path: __dirname + '/dist',
    filename: 'choropleth.js'
  },
  externals: {
    'leaflet': 'L'
  }
}