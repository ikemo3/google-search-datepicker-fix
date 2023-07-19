const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");

const config = {
  mode: "development",
  entry: {
    google: path.join(__dirname, "apps", "content_script", "google.ts"),
  },
  output: {
    path: path.join(__dirname, "dist"),
    filename: "content_script/[name].js",
    clean: true,
  },
  module: {
    rules: [{ test: /\.ts$/, loader: "ts-loader" }],
  },
  resolve: {
    extensions: [".ts", ".js"],
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        {
          from: "public",
          to: "",
        },
      ],
    }),
  ],
  devtool: "source-map",
};

module.exports = config;
