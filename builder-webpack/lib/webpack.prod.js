/**
 * 生产阶段配置：WEBPACK.PROD.JS
 */
const merge = require("webpack-merge");
// 代码压缩
const OptimizeCssAssetsWebpackPlugin = require("optimize-css-assets-webpack-plugin");
// 公共的文件包
const HtmlWebpackExternalsPlugin = require("html-webpack-externals-plugin");
const baseConfig = require("./webpack.base");

const proConfig = {
    mode: "production",
    plugins: [
        // CSS代码压缩
        new OptimizeCssAssetsWebpackPlugin({
            assetNameRegExp: /\.css$/g,
            cssProcessor: require("cssnano")
        }),
        // 公共的文件包.速度优化 基础包 CDN
        new HtmlWebpackExternalsPlugin({
            externals: [
                {
                    module: "react",
                    entry:
                        "https://unpkg.com/react@16.9.0/umd/react.production.min.js",
                    global: "React"
                },
                {
                    module: "react-dom",
                    entry:
                        "https://unpkg.com/react-dom@16.9.0/umd/react-dom.production.min.js",
                    global: "ReactDOM"
                }
            ]
        })
    ],
    //公共的包文件设置 体积优化 代码分割
    optimization: {
        splitChunks: {
            minSize: 0,
            // minSize: 1000, //当有公共的文件小于1000时，就不打包，还是嵌入在文件里
            cacheGroups: {
                commons: {
                    name: "commons",
                    chunks: "all",
                    minChunks: 2 //commons要引入2次以上就打出包来，小于2次不打
                }
            }
        }
    }
};

module.exports = merge(baseConfig, proConfig);
