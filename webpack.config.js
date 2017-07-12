const webpack = require('webpack');
const loaders = require('./webpack.loaders.js');

module.exports = {
	devtool: 'source-map',
	context: __dirname + '/src',
	entry: {
		'open-physiology-model': [ 'babel-polyfill', './index.js' ],
		'open-physiology-model-minimal':           [ './index.js' ]
	},
	output: {
		path: __dirname + '/dist',
		filename: '[name].js',
		library: 'OpenPhysiologyModel',
		libraryTarget: 'umd',
		sourceMapFilename: '[file].map'
	},
	module: {
		loaders: loaders
	},
	plugins: [
		new webpack.optimize.OccurrenceOrderPlugin()
	]
};
