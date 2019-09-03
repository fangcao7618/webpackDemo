/**
 * 基础配置：WEBPACK.BASE.JS
 */
// 三、目录清理
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
// 生成多个html页面的插件
const HtmlWebpackPlugin = require("html-webpack-plugin");
const glob = require("glob");
const path = require("path");
const autoprefixer = require("autoprefixer");
// 命令行显示信息优化插件
const FriendlyErrorsWebpackPlugin = require("friendly-errors-webpack-plugin");
// CSS提取成一个单独的文件插件
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const projectRoot = process.cwd(); // 获取当前目录

/**
 *  四、多页面打包
 * 动态的获取entry
 */
const setMPA = () => {
    const entry = {};
    const htmlWebpackPlugins = [];

    // const entryFiles = glob.sync(path.join(__dirname, './src/*/index.js'));
    const entryFiles = glob.sync(path.join(projectRoot, "./src/*/index.js"));
    Object.keys(entryFiles).map(index => {
        const entryFile = entryFiles[index];
        // '/Users/fangcao/Documents/study/study_webpack/src/index/index.js'
        const match = entryFile.match(/src\/(.*)\/index\.js/);

        const pageName = match && match[1];
        entry[pageName] = entryFile;

        return htmlWebpackPlugins.push(
            new HtmlWebpackPlugin({
                template: path.join(projectRoot, `src/${pageName}/index.html`),
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
// 一、资源解析
/**
 *  1.解析 ES6
 *  2.解析 React
 *  3.解析 CSS
 *  4.解析 Less
 *  5.解析图片
 *  6.解析字体
 */
// 二、样式增强
/**
 *  CSS前缀补齐
 *  CSS px 转化成 rem
 */
module.exports = {
    entry: entry,
    output: {
        path: path.join(projectRoot, "dist"),
        filename: "[name]_[chunkhash:8].js"
    },
    module: {
        rules: [
            {
                test: /.js$/,
                use: ["babel-loader"]
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
                                autoprefixer({
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
                            remUnit: 75, // 75:750px的视觉稿
                            remPrecision: 8 // px转换成rem的小数点的位数 .26666667rem
                        }
                    }
                ]
            },
            {
                test: /.(png|jpg|gif|jpeg|svg)$/,
                use: [
                    {
                        loader: "file-loader",
                        options: {
                            name: "[name]_[hash:8].[ext]"
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
    plugins: [
        // 七、CSS提取成一个单独的文件
        new MiniCssExtractPlugin({
            filename: "[name]_[contenthash:8].css"
        }),
        new CleanWebpackPlugin(),
        // 五、命令行显示信息优化
        new FriendlyErrorsWebpackPlugin(),
        // 六、错误捕获和处理
        function errorPlugin() {
            this.hooks.done.tap("done", stats => {
                if (
                    stats.compilation.errors &&
                    stats.compilation.errors.length &&
                    process.argv.indexOf("--watch") === -1
                ) {
                    console.log("构建失败：", stats.compilation.errors); // eslint-disable-line
                    process.exit(1);
                }
            });
        }
    ].concat(htmlWebpackPlugins),
    stats: "errors-only"
};
