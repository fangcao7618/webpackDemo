## 冒烟测试(smoke testing)

### 1. 构建是否成功（判断构建是否成功）

```bash
npm i rimraf -D
```

```javascript
// test/smoke/index.js
const path = require("path");
const webpack = require("webpack");
const rimraf = require("rimraf");

// 构建之前，通过下面这句就到这个目录下面了
process.chdir(path.join(__dirname, "template"));

//首先删掉dist
rimraf("./dist", () => {
    const prodConfig = require("../../lib/webpack.prod.js");

    webpack(prodConfig, (err, stats) => {
        if (err) {
            console.error(err);

            process.exit(2); //抛出一个错误码
        }
        //成功的化，也打印出来，有颜色区分
        console.log(
            stats.toString({
                colors: true,
                modules: false,
                children: false
            })
        );
    });
});
```

为了测试到相对的为止
将 lib/webpack.base.js 改动,将有`__dirname`的变量，都换成`projectRoot`

```javascript
const projectRoot = process.cwd(); // 获取当前目录
// const entryFiles = glob.sync(path.join(__dirname, './src/*/index.js'));
const entryFiles = glob.sync(path.join(projectRoot, "./src/*/index.js"));
```

最后将完整的项目复制到 test/smoke/template 下面，进行判断是否构建输出`"test": "node test/smoke/index.js"`

### 2. 每次构建完成 build 目录是否有内容输出 (判断基本功能是否正常)

如：编写 mocha 测试用例

```javascript
// html用例;html-test.js
// css用例 ；css-js-test.js

//然后在index.js  test/smoke/index.js
//添加测试用例
const Mocha = require("mocha");

const mocha = new Mocha({
    timeout: "10000ms"
});
...

//添加测试用例
console.log("Webpack build success,begin run test");
mocha.addFile(path.join(__dirname, "./html-test.js"));
mocha.addFile(path.join(__dirname, "./css-js-test.js"));

mocha.run();
```
