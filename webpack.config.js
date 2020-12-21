module.exports = {
  mode: "production",
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
