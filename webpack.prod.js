const HtmlWebPack = require('html-webpack-plugin');
const MiniCssExtract = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');

const CssMinimizer = require('css-minimizer-webpack-plugin');
const Terser = require('terser-webpack-plugin');

const FaviconsWebpackPlugin = require('favicons-webpack-plugin')

module.exports = {
  mode: 'production',

  output: {
    filename: "[name].[contenthash].js", 
    clean: true,
  },

  module: {
    rules: [
      {
        test: /\.html$/, //Expresión Regular: /\// Busca todos los archivos html de nuestro proyecto
        loader: 'html-loader',
        options: {
          sources: false,
        }
      },
      {
        test: /\.css$/i,
        exclude: /styles.css$/,
        use: ["style-loader", "css-loader"]
      },
      {
        test: /styles.css$/,
        use: [ MiniCssExtract.loader, "css-loader" ]
      },
      {
        test: /\.(png|jpe?g|gif)$/,
        loader: 'file-loader'
      },
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  },

  optimization: {
    minimize: true,
    minimizer: [
      new CssMinimizer(),
      new Terser(),
    ]
  },

  plugins: [
    new HtmlWebPack({
      title: 'JS Calculator',
      // filename: 'index.html' Opcional  
      template: './src/index.html',
    }),

    new MiniCssExtract({
      filename: '[name].[fullhash].css',
      ignoreOrder: false,
    }),

    new CopyPlugin({
      patterns: [
        {from: 'src/assets', to: 'assets/'}
      ]
    }
    ),

    new FaviconsWebpackPlugin('./calculator.png'),

  ],
}