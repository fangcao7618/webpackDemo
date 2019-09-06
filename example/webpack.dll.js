const path = require("path");
const webpack = require("webpack");
const { CleanWebpackPlugin } = require("clean-webpack-plugin"); //清理目录
// console.log(__dirname);
// console.log("path.join:", path.join(__dirname, "build/library"));
// console.log("path.resolve:", path.resolve(__dirname, "build/library"));
module.exports = {
    entry: {
        library: ["react", "react-dom"]
    },
    output: {
        filename: "[name]_[hash].dll.js",
        path: path.resolve(__dirname, "build/library"),
        library: "_dll_[name]_[hash]"
    },
    plugins: [
        new CleanWebpackPlugin(),
        new webpack.DllPlugin({
            name: "_dll_[name]_[hash]",
            path: path.join(__dirname, "build/library/[name].manifest.json")
        })
    ]
};
