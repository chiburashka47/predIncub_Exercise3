const path = require("path");
const miniCss = require("mini-css-extract-plugin");
const ASSET_PATH = process.env.ASSET_PATH || "";

module.exports = {
  mode: "development",
  entry: "./src/index.js",
  output: {
    filename: "bundle.js",
    path: __dirname + "/dist/js",
    publicPath: ASSET_PATH,
  },
  watch: true,
  devServer: {
    contentBase: path.join(__dirname, "/dist"),
    port: 8087,
    writeToDisk: true,
    overlay: true,
  },

  devtool: "source-map",
  module: {
    rules: [
      {
        test: /\.(s*)css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(png|jpe?g|gif|svg|eot|ttf|woff|woff2)$/i,
        loader: "url-loader",
        options: {
          limit: 8192,
        },
      },
    ],
  },
  module: {
    rules: [
      {
        test: /\.(s*)css$/,
        use: [miniCss.loader, "css-loader", "sass-loader"],
      },
      {
        test: /\.(ttf|eot|svg|png|jpg|gif|ico)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: "file-loader",
      },
    ],
  },
  plugins: [
    new miniCss({
      filename: "style.css",
    }),
  ],
};
