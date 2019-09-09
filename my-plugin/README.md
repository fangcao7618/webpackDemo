## 插件的基本结构

```javascript
// class MyPlugin {
//     //1.插件名称
//     apply(compiler) {
//         //2.插件上的apply方法
//         compiler.hooks.done.tap("My Plugin", stats => {
//             //插件的hooks
//             console.log("Hello World"); //插件的处理逻辑
//         });
//     }
// }
// module.exports = MyPlugin;
module.exports = class MyPlugin {
    //通过构造函数传参
    constructor(options) {
        this.options = options;
    }

    apply(compiler) {
        console.log("My plugin is executed!");
        console.log("My plugin options", this.options);
    }
};
```

## 搭建插件的运行环境

```javascript
const path = require("path");
const MyPlugin = require("./plugins/my-plugin");

module.exports = {
    entry: "./src/index.js",
    output: {
        path: path.join(__dirname, "dist"),
        filename: "main.js"
    },
    mode: "production",
    // 插件的使用
    plugins: [
        new MyPlugin({
            name: "my plugin"
        })
    ]
};
```
