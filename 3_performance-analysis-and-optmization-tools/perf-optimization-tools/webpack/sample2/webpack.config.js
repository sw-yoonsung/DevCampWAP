var path = require('path');
var MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'none',
    entry: './app/index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [{
            test: /\.css$/,
            // use: ['style-loader', 'css-loader']
            use: [
                {
                    loader: MiniCssExtractPlugin.loader
                },
                "css-loader"
            ]
        }]
    },
    plugins:[
        new MiniCssExtractPlugin(),
        new HtmlWebpackPlugin()
    ]
}