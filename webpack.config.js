module.exports = {
  mode: "development",
  devtool: "source-map",
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: "ts-loader",
      },
    ],
  },
  resolve: {
    extensions: [".ts"],
  },
  output: {
    filename: "main.js",
    libraryTarget: "commonjs",
  },
}
