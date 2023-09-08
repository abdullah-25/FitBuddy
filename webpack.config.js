// webpack.config.js
const path = require("path");

module.exports = {
  entry: {
    main: "./src/app.js",
  },
  output: {
    filename: "output.bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
  optimization: {
    splitChunks: {
      chunks: "all",
    },
  },
};
