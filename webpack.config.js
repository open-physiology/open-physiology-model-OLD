var webpack = require('webpack');
module.exports = {
	devtool: 'source-map',
	entry: {
		'open-physiology-model': [ 'babel-polyfill', './src/index.js' ],
		'open-physiology-model-minimal':           [ './src/index.js' ]
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
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: 'babel'
			},
			{
				test: /\.json$/,
				loader: 'json'
			},
			{
				test: /icons\/\w+\.png$/,
				loader: 'url?limit=20000'
			}
		]
	},
	plugins: [
		new webpack.optimize.OccurenceOrderPlugin()
	]
};
