import { Configuration } from "webpack";
import { join } from "path";
import CopyPlugin from "copy-webpack-plugin";

const config: Configuration = {
  mode: "development",
  entry: {
    google: join(__dirname, "apps", "content_script", "google.ts"),
  },
  output: {
    path: join(__dirname, "dist"),
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

export default config;
