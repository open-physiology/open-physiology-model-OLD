var webpack = require('webpack');
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
		loaders: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: 'babel-loader'
			},
			{
				test: /node_modules\/utilities\/src\/.*\.js$/,
				loader: 'babel-loader'
			},
			{
				test: /\.json$/,
				loader: 'json-loader'
			},
			{
				test: /icons\/\w+\.png$/,
				loader: 'url-loader'
			}
		]
	},
	plugins: [
		new webpack.optimize.OccurrenceOrderPlugin()
	]
};
