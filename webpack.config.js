/* global process, module, __dirname */
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
// const CleanWebpackPlugin = require('clean-webpack-plugin')
const {optimize, SourceMapDevToolPlugin} = require('webpack')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const isProd = process.env.NODE_ENV === 'production'

// build list of plugins, depending on environment
const plugins = (() => {
	const plugins = []

	if (isProd) {
		plugins.push(
			new UglifyJsPlugin({
				test: /\.js$/
			})
		)
	} else {
		// only produce source maps for app code
		plugins.push(
			new SourceMapDevToolPlugin({
				filename: '[name].js.map',
				exclude: ['vendor.bundle.js']
			})
		)
	}

	return [
		...plugins
		// new optimize.CommonsChunkPlugin({
		// 	name: 'vendor', // Specify the common bundle's name.
		// 	minChunks: function (module) {
		// 		return module.context && module.context.includes('node_modules')
		// 	}
		// })
	]
})()

function getLoaders () {
	return [
		{
			test: /\.(ts|tsx)$/,
			exclude: /node_modules|dist/,
			loaders: ['babel-loader', 'awesome-typescript-loader']
		},
		{
			test: /\.(js|jsx)$/,
			exclude: /node_modules|dist/,
			loaders: ['babel-loader', 'eslint-loader']
		}
	]
}

function getRules () {
	return [
		{
			test: /\.css$/,
			// exclude: [/global\.css/],
			use: [
				{
					loader: 'style-loader',
					options: {
						sourceMap: true
					}
				},
				{
					loader: 'css-loader',
					options: {
						importLoaders: 1,
						modules: true,
						localIdentName:
              process.env.NODE_ENV !== 'production'
              	? '[path]___[name]__[local]___[hash:base64:5]'
              	: '[hash:base64:5]'
					}
				},
				{loader: 'postcss-loader'}
			]
		},
		...getLoaders()
	]
}

module.exports = {
	entry: {
		index: './src/index.ts'
	},
	// output: {
	// 	filename: 'bundle.js',
	// 	path: path.resolve(__dirname, 'dist')
	// },
	output: {
		filename: '[name].js',
		path: path.resolve(__dirname, 'dist'),
		libraryTarget: 'commonjs2'
	},
	externals: {
		react: 'commonjs react',
		reactDom: 'commonjs react-dom',
		propTypes: 'commonjs prop-types',
		lodash: 'commonjs lodash'
	},
	resolve: {
		extensions: ['.ts', '.tsx', '.js', '.jsx', '.json']
	},
	module: {
		rules: getRules()
	},
	plugins
}
