var webpack = require('webpack');
module.exports = {
	devtool: 'source-map',
	entry: {
		'open-physiology-model': [ 'babel-polyfill', './src/index.js' ]
	},
	output: {
		path: './dist',
		filename: '[name].js',
		library: 'OpenPhysiologyModel',
		libraryTarget: 'umd',
		sourceMapFilename: '[file].map'
	},
	module: {
		loaders: [
			{ test: /\.es6\.js$/, loader: 'babel?compact=false' }
		]
	},
	plugins: [
		new webpack.optimize.OccurenceOrderPlugin()
	]
};
