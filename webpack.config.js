"use strict"

const path = require('path')

const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin')
// See TODO at the bottom!
// const GoogleFontsPlugin = require('google-fonts-webpack-plugin')

const PUBLIC = path.resolve(__dirname, 'public')
const SRC = path.resolve(__dirname, 'src')

const css_loader = {
    test: /\.css/,
    use: ExtractTextPlugin.extract({
        use: [
            'css-loader',
        ]
    })
}

const sss_loader = {
    test: /\.sss/,
    use: ExtractTextPlugin.extract({
        use: [
            'css-loader',
            'postcss-loader'
        ]
    })
}

const json_loader = {
    test: /\.json$/,
    loader: 'json5-loader'
}

const img_loader = {
    test: /\.(jpe?g|png|svg|ico)$/,
    loader: 'file-loader',
    options: {
        useRelatievePath: false,
        outputPath: "img/",
        name: '[name].[hash].[ext]',
    },
}

const js_loader = {
    test: /\.jsx?$/,
    use: [
        "babel-loader",
        "eslint-loader"
    ]
}

const pug_loader = {
    test: /\.pug?$/,
    include: path.join(SRC, 'templates'),
    use: [
        'pug-loader'
    ]
}

module.exports.entry = {
    app: `${SRC}/main.js`
}

module.exports.output = {
    filename: '[name].bundle.[chunkhash].js',
    path: PUBLIC
}

module.exports.module = {
    rules: [
        css_loader,
        sss_loader,
        img_loader,
        json_loader,
        js_loader,
        pug_loader,
    ]
}

function html_pug_plug(title, template, opts) {
    const options = Object.assign({
        title,
        template: path.join(SRC, template),
        filename: path.basename(template, '.pug') + '.html',
    }, opts)
    return new HtmlWebpackPlugin(options)
}

module.exports.plugins = [
    html_pug_plug("A Tour of C++", "templates/index.pug"),
    new ScriptExtHtmlWebpackPlugin({
        defaultAttribute: 'async'
    }),
    new ExtractTextPlugin('[name].bundle.[chunkhash].css')
    // TODO: Need something to do the same with our own bundled fonts!
    // new GoogleFontsPlugin({
    //   fonts: [
    //     { family: 'Source Sans Pro', variants: [ '600' ] },
    //     { family: 'Merriweather' }
    //   ],
    //   path: 'fonts/'
    // })
]

module.exports.devServer = {
    port: 3333,
    compress: true
}

module.exports.devtool = "cheap-source-map"
