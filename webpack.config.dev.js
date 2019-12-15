const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const PATH = require('path');

module.exports = {

    target : 'web',

    devtool: false,

    context : PATH.resolve(__dirname, 'src'),

    entry : {
        'polyfills': './polyfills.ts',
        'vendor': './vendor.ts',
        'app': './app/main/bootstrap.ts'
    },

    output: {
        path : PATH.resolve(__dirname, 'dist'),
        publicPath:'/',
        filename: '[name].js'
    },

    devServer : {
        stats: 'minimal',
        port: 8080,
        host: "localhost",
        inline: true,
        noInfo: false,
        publicPath: '/',
        historyApiFallback: {
            index : '/index.html',
            rewrites: [
                { from: /\/favicon.ico/, to: './assets/icons/favicon.ico' },
                { from: /\/index/,   to: '/index.html'},
                { from: /\/about/,   to: '/about.html'},
                { from: /\/contact/, to: '/contact.html'},
                { from: /^[^]+$/,    to: '/error.html'}
            ]
           // disableDotRule: false
        },
        watchOptions: {
            aggregateTimeout: 300,
            poll: 1000
        }
    },

    resolve: {
        extensions: ['.ts', '.js', '.jpg', '.jpeg', '.gif', '.png', '.html', '.css'],
        modules: [PATH.resolve(__dirname), 'node_modules']
    },

    module: {
        rules: [
            {
                test: /\.ts$/,
                use: ['awesome-typescript-loader', 'angular2-template-loader']
            },
            // {
            //     test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
            //     loader: 'file-loader?name=assets/[name].[ext]'
            // },
            {
                test: /\.html$/,
                use: 'html-loader'
            },
            {
                test: /\.css$/,
                use: 'raw-loader',
                include : PATH.resolve(__dirname,'src', 'app')
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: "css-loader"
                })
               // exclude: PATH.resolve(__dirname, 'src', 'app') ???
            }
        ]
    },
    plugins: [

        new webpack.ContextReplacementPlugin(
            /angular(\\|\/)core(\\|\/)@angular/,
            PATH.resolve(__dirname, 'src'),
            {}
        ),

        new webpack.DefinePlugin({
            'process.env': {
                'ENVIRONMENT': JSON.stringify('development')
            }
        }),

        new webpack.optimize.CommonsChunkPlugin({
            name: ['app', 'vendor', 'polyfills']
        }),

        new CleanWebpackPlugin("dist", {
            root: __dirname
        }),

        new ExtractTextPlugin("[name].css"),

        new HtmlWebpackPlugin({
            title : 'index',
            filename : 'index.html',
            template: './pages/index.ejs',
            chunks: ['polyfills', 'vendor', 'app'],
            baseUrl: '/app/'
            //chunksSortMode: 'dependency'
        }),

        new HtmlWebpackPlugin({
            title : 'about',
            filename : 'about.html',
            template: './pages/about.ejs',
            chunks: ['polyfills', 'vendor', 'app']
        }),

        new CopyWebpackPlugin([
              {
                  from: './assets/icons/favicon.ico',
                  to: 'assets/icons/[name].[ext]'
              }
        ],{
            copyUnmodified: true
        })
    ]
};
