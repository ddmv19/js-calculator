const HtmlWebPack = require("html-webpack-plugin");
const MiniCssExtract = require("mini-css-extract-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const FaviconsWebpackPlugin = require('favicons-webpack-plugin')

module.exports = {
  mode: "development",

  output: {
    clean: true,
  },

  module: {
    rules: [
      {
        test: /\.html$/, //Expresión Regular: /\// Busca todos los archivos html de nuestro proyecto
        loader: "html-loader",
        options: {
          sources: false,
        },
      },
      {
        test: /\.css$/i,
        exclude: /styles.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /styles.css$/,
        use: [MiniCssExtract.loader, "css-loader"],
      },
      {
        test: /\.(png|jpe?g|gif)$/,
        loader: "file-loader",
      },
    ],
  },

  optimization: {},

  plugins: [
    new HtmlWebPack({
      title: "JS Calculator",
      template: "./src/index.html",
    }),

    new MiniCssExtract({
      filename: "styles.css",
      ignoreOrder: false,
    }),

    new CopyPlugin({
      patterns: [
        {
          from: "src/assets",
          to: "assets/",
          noErrorOnMissing: true,
        },
      ],
    }),

    new FaviconsWebpackPlugin('./calculator.png'),
  ],
};
