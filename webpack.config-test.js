var webpack = require('webpack');

module.exports = {
	devtool: 'source-map',
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
	output: {
		// source-map support for IntelliJ/WebStorm
		devtoolModuleFilenameTemplate:         '[absolute-resource-path]',
		devtoolFallbackModuleFilenameTemplate: '[absolute-resource-path]?[hash]'
	},
	target: 'node',
	externals: [require('webpack-node-externals')()],
	plugins: [
		new webpack.NormalModuleReplacementPlugin(/\.(gif|png|scss|css)$/, 'node-noop')
	]
};
