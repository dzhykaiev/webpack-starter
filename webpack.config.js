const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const TerserJSPlugin = require("terser-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
// TODO: add copy paste (fonts, imgs)

module.exports = (env, argv) => {
  const devMode = argv.mode !== "production";
  return {
    entry: {
      main: "./src/index.js"
    },
    devtool: devMode ? "inline-source-map" : false,
    devServer: {
      contentBase: "./dist"
    },
    module: {
      rules: [
        {
          test: /\.s[ac]ss$/i,
          use: [
            devMode ? "style-loader" : MiniCssExtractPlugin.loader,
            "css-loader",
            "sass-loader"
          ]
        }
      ]
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: "[name].css",
        chunkFilename: "[id].css"
      }),
      new CleanWebpackPlugin(),
      new HtmlWebpackPlugin({
        template: "./src/index.html",
        hash: true
      }),
      new CopyPlugin([{ from: "./src/assets/img", to: "./img" }])
    ],
    output: {
      filename: "[name].bundle.js",
      path: path.resolve(__dirname, "dist")
    },
    optimization: {
      minimizer: [
        new TerserJSPlugin(),
        new OptimizeCSSAssetsPlugin(),
        new HtmlWebpackPlugin({
          minify: {
            removeAttributeQuotes: true,
            collapseWhitespace: true,
            removeComments: true
          }
        })
      ]
    }
  };
};
