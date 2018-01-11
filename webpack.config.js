const webpack = require('webpack');
const path = require('path');

// Webpack Plugins
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const DashboardPlugin = require('webpack-dashboard/plugin');

const isProduction = process.env.NODE_ENV === 'production';
const isDevelopment = process.env.NODE_ENV === 'development';

console.log('====================================');
console.log('Production', isProduction);
console.log('====================================');

console.log('====================================');
console.log('Development', isDevelopment);
console.log('====================================');

const webpackConfig = {
  entry: {
    app: './src/js/client.js',
    styles: './src/js/styles.js',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].bundle.js',
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      {
        test: /\.css$/,
        use: isProduction
          ? ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: ['css-loader', 'sass-loader'],
          })
          : ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.scss$/,
        use: isProduction
          ? ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: ['css-loader', 'sass-loader'],
          })
          : ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        use: 'file-loader?name=[name].[ext]&outputPath=image/',
      },
    ],
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    // compress: true,
    hot: true,
    port: 8080,
    stats: 'errors-only',
    open: true,
    publicPath: '/',
    historyApiFallback: true,
  },
  devtool: 'inline-source-map',
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Alpha Insights',
      // minify: {
      //     collapseWhitespace: true
      // },
      hash: true,
      template: './src/index.html',
    }),
    new ExtractTextPlugin({
      filename: 'app.css',
      disable: process.env.NODE_ENV === 'development',
      allChunks: true,
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
      },
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    // isProduction
    //   ? new webpack.optimize.UglifyJsPlugin()
    //   : null,
    new DashboardPlugin(),
  ],
};

// // PRODUCTION
// if (process.env.NODE_ENV === 'production') {
//   webpackConfig.module.rules.forEach((rule) => {
//     if (rule.test.toString() === /\.css$/.toString()) {
//       rule.use = ExtractTextPlugin.extract({
//         fallback: 'style-loader',
//         use: ['css-loader', 'sass-loader'],
//       });
//     }
//     if (rule.test.toString() === /\.scss$/.toString()) {
//       rule.use = ExtractTextPlugin.extract({
//         fallback: 'style-loader',
//         use: ['css-loader', 'sass-loader'],
//       });
//     }
//   });
//   webpackConfig.plugins.push(
//         new webpack.DefinePlugin({
//           'process.env': {
//             NODE_ENV: JSON.stringify(process.env.NODE_ENV),
//           },
//         }),
//         new webpack.optimize.UglifyJsPlugin(),
//     );
// }

// // DEVELOPMENT
// if (process.env.NODE_ENV === 'development') {
//   webpackConfig.module.rules.forEach((rule) => {
//     if (rule.test.toString() === /\.css$/.toString()) {
//       rule.use = ['style-loader', 'css-loader', 'sass-loader'];
//     }
//   });
//     // webpackConfig.devtool = "cheap-eval-source-map";
//   webpackConfig.plugins.push(
//         new webpack.DefinePlugin({
//           'process.env': {
//             NODE_ENV: JSON.stringify(process.env.NODE_ENV),
//           },
//         }),
//     );
// }

module.exports = webpackConfig;
