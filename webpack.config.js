const debug = process.env.NODE_ENV !== "production";
const webpack = require('webpack');
const path = require('path');

module.exports = {
  context: path.resolve(__dirname, 'build'),
  devtool: debug ? "inline-sourcemap" : null,
  entry: path.resolve('build','src','index.js'),
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        query: {
          presets: ['react','es2015','stage-0'],
          plugins: ['react-html-attrs','transform-class-properties','transform-decorators-legacy']
        }
      },
      {
        test: /\.css$/,
        loader: "style-loader!css-loader",
      },
      {
        test: /\.(eot|woff|woff2|ttf|svg|png|jpe?g|gif)(\?\S*)?$/,
        loader: 'url-loader?importLoaders=1&limit=100000'
      }
    ]
  },
  output: {
    path: path.resolve(__dirname, 'build', 'dist'),
    filename: 'bundle.min.js'
  },
  plugins: debug ? [] : [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJSPlugin({mangle: false, sourcemap:false})
  ]
}
