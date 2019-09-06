# 一个最简单的 loader 代码结构

定义：loader 只是一个导出为函数的 JavaScript 模块

```javascript
module.exports = function(source) {
    return source;
};
```

# 多 loader 时的执行顺序

多个 Loader 串行执行

顺序从后到前

```javascript
module.exports = {
    entry: "./src/index.js",
    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, "dist")
    },
    module: {
        rules: [
            {
                test: /\.less$/,
                use: ["style-loader", "css-loader", "less-loader"]
            }
        ]
    }
};
```

Unix 中的 pipline(从左往右)
Compose(webpack 采取的是这种)--(从右往左)

```javascript
compose = (f, g) => (...args) => f(g(...args));
```

```bash
yarn build loader执行顺序就出来了
```


# loader