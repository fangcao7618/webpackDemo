"use strict";

const TerserWebapckPlugin = require("terser-webpack-plugin"); //并行压缩
const HappyPack = require("happypack"); //并行构建实例插件
const glob = require("glob");
const path = require("path");
const webpack = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin"); //CSS提取成一个单独的文件插件
const PurgecssPlugin = require("purgecss-webpack-plugin"); //擦除无用的css
const OptimizeCssAssetsWebpackPlugin = require("optimize-css-assets-webpack-plugin"); //代码压缩
const HtmlWebpackPlugin = require("html-webpack-plugin"); //生成html页面
const { CleanWebpackPlugin } = require("clean-webpack-plugin"); //清理目录
const HtmlWebpackExternalsPlugin = require("html-webpack-externals-plugin"); //分包插件 设置Externals
const FriendlyErrorsWebpackPlugin = require("friendly-errors-webpack-plugin"); // 显示友好报错信息
const SpeedMeasureWebpackPlugin = require("speed-measure-webpack-plugin"); //速度分析  可以看到每个 loader 的插件执行耗时
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");
const HardSourceWebpackPlugin = require("hard-source-webpack-plugin"); //缓存插件

const PATHS = {
    src: path.join(__dirname, "src")
};

const smp = new SpeedMeasureWebpackPlugin();

/**
 * 动态的获取entry
 */
const setMPA = () => {
    const entry = {};
    const htmlWebpackPlugins = [];

    const entryFiles = glob.sync(path.join(__dirname, "./src/*/index.js"));
    Object.keys(entryFiles).map(index => {
        const entryFile = entryFiles[index];
        //'/Users/fangcao/Documents/study/study_webpack/src/index/index.js'
        const match = entryFile.match(/src\/(.*)\/index\.js/);

        const pageName = match && match[1];
        entry[pageName] = entryFile;

        return htmlWebpackPlugins.push(
            new HtmlWebpackPlugin({
                template: path.join(__dirname, `src/${pageName}/index.html`),
                filename: `${pageName}.html`,
                // chunks: ["vendors", pageName],
                chunks: ["commons", pageName],
                inject: true,
                minify: {
                    html5: true,
                    collapseWhitespace: true,
                    preserveLineBreaks: false,
                    minifyCSS: true,
                    minifyJS: true,
                    removeComments: false
                }
            })
        );
        // console.log("pageName", match, match[1], pageName, entry);
    });

    // console.log("entryFiles", entryFiles);

    return {
        entry,
        htmlWebpackPlugins
    };
};

const { entry, htmlWebpackPlugins } = setMPA();

// module.exports = smp.wrap({
module.exports = {
    watch: true,
    watchOptions: {
        ignored: /node_modules/, //对于某些系统，监听大量文件系统会导致大量的 CPU 或内存占用。这个选项可以排除一些巨大的文件夹
        aggregateTimeout: 300, //当第一个文件更改，会在重新构建前增加延迟。这个选项允许 webpack 将这段时间内进行的任何其他更改都聚合到一次重新构建里。以毫秒为单位
        poll: 1000 //每秒检查一次变动 通过传递 true 开启 polling，或者指定毫秒为单位进行轮询
    },
    entry: entry,
    output: {
        path: path.join(__dirname, "dist"),
        filename: "[name]_[chunkhash:8].js"
    },
    module: {
        rules: [
            {
                test: /.js$/,
                // include: path.resolve("src"),
                use: [
                    // {
                    //     loader: "thread-loader",
                    //     options: {
                    //         workers: 3 //采用3个worker进程
                    //     }
                    // },
                    // "babel-loader"
                    "happypack/loader"
                    // "eslint-loader"
                ]
            },
            {
                test: /.css$/,
                use: [MiniCssExtractPlugin.loader, "css-loader"]
            },
            {
                test: /.less$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                    "less-loader",
                    {
                        loader: "postcss-loader",
                        options: {
                            plugins: () => [
                                require("autoprefixer")({
                                    overrideBrowserslist: [
                                        "last 2 version",
                                        ">1%",
                                        // "Android >= 4.0",
                                        "iOS >= 7"
                                        // "Chrome > 31",
                                        // "ff > 31",
                                        // "ie >= 8"
                                    ]
                                })
                            ]
                        }
                    },
                    {
                        loader: "px2rem-loader",
                        options: {
                            remUnit: 75, //75:750px的视觉稿
                            remPrecision: 8 //px转换成rem的小数点的位数 .26666667rem
                        }
                    }
                ]
            },
            {
                test: /\.(gif|png|jpe?g|svg)$/i,
                use: [
                    {
                        loader: "file-loader",
                        options: {
                            name: "[name]_[hash:8].[ext]"
                        }
                    },
                    {
                        loader: "image-webpack-loader",
                        options: {
                            mozjpeg: {
                                progressive: true,
                                quality: 65
                            },
                            // optipng.enabled: false will disable optipng
                            optipng: {
                                enabled: false
                            },
                            pngquant: {
                                quality: [0.65, 0.9],
                                speed: 4
                            },
                            gifsicle: {
                                interlaced: false
                            },
                            // the webp option will enable WEBP
                            webp: {
                                quality: 75
                            }
                        }
                    }
                ]
            },
            // {
            //     test: /.(png|jpg|gif|jpeg|svg)$/,
            //     use: [
            //         {
            //             loader: "url-loader",
            //             options: {
            //                 name: "[name]_[hash:8].[ext]",
            //                 limit: 10240 //10240===10kb
            //             }
            //         }
            //     ]
            // },
            {
                test: /.(woff|woff2|eot|ttf|otf)$/,
                use: [
                    {
                        loader: "file-loader",
                        options: {
                            name: "[name]_[hash:8].[ext]"
                        }
                    }
                ]
            }
        ]
    },
    mode: "production", //production
    plugins: [
        new MiniCssExtractPlugin({
            filename: "[name]_[contenthash:8].css"
        }),
        new PurgecssPlugin({
            paths: glob.sync(`${PATHS.src}/**/*`, { nodir: true })
        }),
        new OptimizeCssAssetsWebpackPlugin({
            assetNameRegExp: /\.css$/g,
            cssProcessor: require("cssnano")
        }),
        new CleanWebpackPlugin(),
        // 通过CDN引入，不打入bundle中
        // new HtmlWebpackExternalsPlugin({
        //     externals: [
        //         {
        //             module: "react",
        //             entry:
        //                 "https://unpkg.com/react@16.9.0/umd/react.production.min.js",
        //             global: "React"
        //         },
        //         {
        //             module: "react-dom",
        //             entry:
        //                 "https://unpkg.com/react-dom@16.9.0/umd/react-dom.production.min.js",
        //             global: "ReactDOM"
        //         }
        //     ]
        // }),
        // new webpack.optimize.ModuleConcatenationPlugin(), //当mode为production时，这个去掉
        new FriendlyErrorsWebpackPlugin(),
        function errorPlugin() {
            this.hooks.done.tap("done", stats => {
                if (
                    stats.compilation.errors &&
                    stats.compilation.errors.length &&
                    process.argv.indexOf("--watch") == -1
                ) {
                    console.log("build error", stats.compilation.errors);
                    process.exit(1);
                }
            });
        },
        // new BundleAnalyzerPlugin(),
        new HappyPack({
            loaders: ["babel-loader?cacheDirectory=true"]
        }),
        //加了dll分包后，构建速度要快很多
        // new webpack.DllReferencePlugin({
        //     manifest: require("./build/library/library.manifest.json")
        // }),
        new HardSourceWebpackPlugin()
    ].concat(htmlWebpackPlugins)
    // optimization: {
    //     splitChunks: {
    //         cacheGroups: {
    //             commons: {
    //                 test: /(react|react-dom)/,
    //                 name: "vendors",
    //                 chunks: "all"
    //             }
    //         }
    //     }
    // },
    // optimization: {
    //     minimizer: [
    //         new TerserWebapckPlugin({
    //             parallel: true,
    //             cache: true
    //         })
    //     ],
    //     splitChunks: {
    //         minSize: 0,
    //         // minSize: 1000, //当有公共的文件小于1000时，就不打包，还是嵌入在文件里
    //         cacheGroups: {
    //             commons: {
    //                 name: "commons",
    //                 chunks: "all",
    //                 minChunks: 2 //commons要引入2次以上就打出包来，小于2次不打
    //             }
    //         }
    //     }
    // },
    // resolve: {
    //     alias: {
    //         react: path.resolve(
    //             __dirname,
    //             "./node_modules/react/umd/react.production.min.js"
    //         ),
    //         "react-dom": path.resolve(
    //             __dirname,
    //             "./node_modules/react-dom/umd/react-dom.production.min.js"
    //         )
    //     },
    //     extensions: [".js", ".json"],
    //     mainFields: ["loader", "main"]
    // }
    // devtool: "inline-source-map"
    // stats: "errors-only" //只显示错误信息
    // });
};
