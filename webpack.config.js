"use strict"

const IS_DEV_SERVER = process.argv.find(arg => arg.includes('webpack-dev-server'))

const path = require('path')

const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin')

const PUBLIC = path.resolve(__dirname, 'public')
const SRC = path.resolve(__dirname, 'src')
const lessons = require('./webpack/get_lessons.js')()

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

const font_loader = {
    test: /\.(eot|ttf|woff|woff2)$/,
    loader: 'file-loader',
    options: {
        outputPath: "fonts/",
        name: '[name].[ext]',
    },
}

// Require returns raw content of files.
const raw_loader = {
    test: /\.(cpp)$/,
    use: 'raw-loader'
}

const asciidoc_loader = {
    test: /\.(adoc)$/,
    use: [
        'html-loader',
        'asciidoctor-loader?attributes=showtitle'
    ]
}

const js_loader = {
    test: /\.jsx?$/,
    exclude: /(node_modules|bower_components)/,
    use: [
        "babel-loader",
    ]
}

// eslint-loader cannot be currently used with dev server with potential bug in object-hash dependency.
// https://github.com/puleos/object-hash/issues/61
if (!IS_DEV_SERVER) {
    js_loader.use.push('eslint-loader')
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
        font_loader,
        js_loader,
        pug_loader,
        raw_loader,
        asciidoc_loader
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
    // Inject lessons index through options.
    // Template can access them through htmlWebpackPlugin.options.lessons
    html_pug_plug("A Tour of C++", "templates/index.pug", {
        lessons
    }),
    new ScriptExtHtmlWebpackPlugin({
        defaultAttribute: 'async'
    }),
    new ExtractTextPlugin('[name].bundle.[chunkhash].css')
]

module.exports.devServer = {
    port: 3333,
    compress: true
}

module.exports.devtool = "cheap-source-map"
