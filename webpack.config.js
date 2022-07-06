const path = require("path");
const webpack = require("webpack");
const TerserPlugin = require("terser-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  // devtool: "eval-source-map",
  mode: "production",
  entry: {
    "d-calendar": path.join(__dirname, "src", "d-calendar/d-calendar.js"),
  },
  output: {
    path: path.join(__dirname, "dist"),
    filename: "d-calendar.js",
  },
  resolve: {
    alias: {
      js: path.join(__dirname, "src", "js"),
      root: __dirname,
    },
  },
  module: {
    rules: [
      {
        test: /.js?$/,
        loader: "babel-loader",
        exclude: [/node_modules/],
      },
      {
        test: /.css?$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "postcss-loader"],
        exclude: /node_modules/,
      },
    ],
  },
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    colors: true,
    historyApiFallback: true,
    inline: true,
  },
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin()],
  },
  plugins: [new MiniCssExtractPlugin()],
};
