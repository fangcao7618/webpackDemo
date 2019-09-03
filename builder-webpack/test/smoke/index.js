const path = require("path");
const webpack = require("webpack");
const rimraf = require("rimraf");

//添加测试用例
const Mocha = require("mocha");

const mocha = new Mocha({
    timeout: "10000ms"
});

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

        //添加测试用例
        console.log("Webpack build success,begin run test");
        mocha.addFile(path.join(__dirname, "./html-test.js"));
        mocha.addFile(path.join(__dirname, "./css-js-test.js"));

        mocha.run();
    });
});
