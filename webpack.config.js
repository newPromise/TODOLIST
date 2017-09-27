/**
 * Created by dell-dell on 2017/9/19.
 */

const webpack = require("webpack");
var OpenBrowserPlugin = require('open-browser-webpack-plugin');

module.exports = {
    entry: {
        main: "./app/main.js",//已多次提及的唯一入口文件
        list: "./app/list.js",//已多次提及的唯一入口文件
    },
    output: {
        path: __dirname + "/public",//打包后的文件存放的地方
        filename: "[name].js"//打包后输出文件的文件名
    },
    devServer: {
        contentBase: "./public",
        historyApiFallback: true,
        inline: true,
        progress: true,
        hot: true
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel-loader'
            },
            {
                test: /\.css$/,
                loader: ['style-loader', 'css-loader']
            },
            {
                test: /\.html$/,
                loader: "raw-loader" // loaders: ['raw-loader'] is also perfectly acceptable.
            }
        ]
    },
    plugins: [
        new OpenBrowserPlugin({ url: 'http://localhost:8080' })
    ]
};