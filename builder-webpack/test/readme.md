# 单元测试和测试覆盖率

1、新建 unit 文件夹
2、在 unit 文件夹中 新建 webpack-base-test.js 测试 base
3、在 test 文件夹中 建立 index.js 用来调用 unit 文件夹中的文件测试用例
4、安装`sudo npm i assert -D` 断言库
5、测试

6、测试覆盖率 安装`npm i istanbul -D`,然后在 pageage.json 里面修改 script

```json
"scripts": {
    "eslint": "eslint ./lib --fix",
    "maoyan": "node test/smoke/index.js",
    "unit": "./node_modules/mocha/bin/_mocha",
    "fugai": "istanbul cover ./node_modules/mocha/bin/_mocha"
}
```

最后再次运行`yarn fugai` or `npm run fugai`
