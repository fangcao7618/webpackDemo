/**
 * SSR 配置：WEBPACK.SSR.JS
 */
const merge = require('webpack-merge');
// 代码压缩
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');
const cssnano = require('cssnano');
// 公共的文件包
const HtmlWebpackExternalsPlugin = require('html-webpack-externals-plugin');
const baseConfig = require('./webpack.base');

const proConfig = {
    mode: 'production',
    module: {
        rules: [
            {
                test: /\.css$/,
                use: 'ignore-loader',
            },
            {
                test: /\.less$/,
                use: 'ignore-loader',
            },
        ],
    },
    plugins: [
        // 代码压缩
        new OptimizeCssAssetsWebpackPlugin({
            assetNameRegExp: /\.css$/g,
            cssProcessor: cssnano,
        }),
        // 公共的文件包
        new HtmlWebpackExternalsPlugin({
            externals: [
                {
                    module: 'react',
                    entry:
                        'https://unpkg.com/react@16.9.0/umd/react.production.min.js',
                    global: 'React',
                },
                {
                    module: 'react-dom',
                    entry:
                        'https://unpkg.com/react-dom@16.9.0/umd/react-dom.production.min.js',
                    global: 'ReactDOM',
                },
            ],
        }),
    ],
    // 公共的包文件设置
    optimization: {
        splitChunks: {
            minSize: 0,
            // minSize: 1000, //当有公共的文件小于1000时，就不打包，还是嵌入在文件里
            cacheGroups: {
                commons: {
                    name: 'commons',
                    chunks: 'all',
                    minChunks: 2, // commons要引入2次以上就打出包来，小于2次不打
                },
            },
        },
    },
};

module.exports = merge(baseConfig, proConfig);
