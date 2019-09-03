`yarn test`冒烟测试
`yarn eslint` 使用 eslint 规范构建脚本

# 功能模块设计

![](./document/1567160041316.jpg)

# 目录结构设计

![](./document/1567160192133.jpg)

## 基础配置

### 构建配置管理的可选方案

-   通过多个配置文件管理不同环境的构建，webpack --config 参数进行控制

    -   [基础配置：webpack.base.js](./builder-webpack/lib/readme.base.md)
    -   [开发环境：webpack.dev.js](./builder-webpack/lib/readme.dev.md)
    -   [生产环境：webpack.prod.js](./builder-webpack/lib/readme.prod.md)
    -   [SSR 环境：webpack.ssr.js](./builder-webpack/lib/readme.ssr.md)
        ......

        通过 webpack-merge 组合配置

        ```javascript
        //合并配置：
        const merge=require('webpack-merge');
        ......
        module.exports=merge(baseConfig,devConfig);
        ```

-   将构建配置设计成一个库，比如：hjx-webpack、Neutrino、webpack-blocks

    -   规范：Git commit 日志、README、ESLint 规范、Semver 规范
    -   质量：冒烟测试、单元测试、测试覆盖率和 CI

-   抽成一个工具进行管理，比如：create-react-app,kyt,nwb
-   将所有的配置放在一个文件，通过 --env 参数控制分支选择

## 使用 ESLint 规范构建脚本

```bash
npm i eslint babel-eslint eslint-config-airbnb-base babel-eslint -D
```

eslint --fix 可以自动处理空格

npm install eslint-plugin-import@latest --save-dev

运行`./node_modules/.bin/eslint lib/`
然后在 pageage.json 里面 ，加上`"eslint": "eslint ./lib --fix"` ,运行`yarn eslint`，报错数量减少
逐个根据提示改进，最后再运行`yarn eslint`，直到没有提示

## 一、[冒烟测试(smoke testing)](./builder-webpack/test/smoke/readme.md)

### 1. 构建是否成功（判断构建是否成功）

### 2. 每次构建完成 build 目录是否有内容输出

## 二、[单元测试和测试覆盖率](./builder-webpack/test/readme.md)

技术选型：Mocha+Chai
测试代码：describe,it,except
测试命令：mocha add.test.js

1、安装 [mocha](https://mochajs.org/) + chai

```bash
npm i mocha chai -D
```

2、新建 test 目录，并增加 xxx.test.js 测试文件
3、在 package.json 中的 scripts 字段增加 test 命令

```json
"scripts":{
    "test":"node_modules/mocha/bin/_mocha"
}
```

4、执行测试命令

```bash
npm riun test
```

```javascript
// add.test.js
```

5、测试覆盖率 安装`npm i istanbul -D`,然后在 pageage.json 里面修改 script

```json
"scripts": {
    "eslint": "eslint ./lib --fix",
    "maoyan": "node test/smoke/index.js",
    "unit": "./node_modules/mocha/bin/_mocha",
    "fugai": "istanbul cover ./node_modules/mocha/bin/_mocha"
}
```

最后再次运行`yarn test` or `npm run test`

## 持续集成和 TravisCI

![](./document/1567474973608.jpg)

## Git 规范和 Changelog 生成

提交格式：

```javascript
<type>(<scope>):<subject>
<BLANK LINE>
<body>
<BLANK LINE>
<footer>
```

对格式的说明如下：

-   type 代表某次提交的类型，比如是修复一个 bug 还是增加一个新的 feature。所有的 type 类型如下：
-   feat: 新增 feature
-   fix: 修复 bug
-   docs:仅仅修改了文档，比如 README，CHANGELOG，CONTRIBUTE 等等
-   style:仅仅修改了空格、格式缩进、都好等等，不改变代码逻辑
-   refactor：代码重构，没有加新功能或者修复 bug
-   perf:优化相关，比如提升性能、体验
-   test:测试用例，包括单元测试、集成测试等
-   chore:改变构建流程、或者增加依赖库、工具等
-   revert：回滚到上一个版本

本地开发阶段增加 precommit 钩子

安装 husky

`npm install husky --save-dev`

通过 commitmsg 钩子校验信息

```javascript
"scripts":{
    "commitmsg":"validate-commit-msg",
    "changelog":"conventional-changelog -p angular -i CHANGELOG.md -s -r 0"
}
"devDependencies":{
    "validate-commit-msg":"",
    "conventional-changelog-cli":"",
    "husky":""
}
```

## 开源版本信息

软件版本通常是由三位组成，形如：X.Y.Z

版本严格递增的，在发布重要版本是，可以发布 alpha,rc 等`先行版本` `16.0.0-beta.5、16.0.0-rc.2`

语义化版本（Semantic Versioning）规范格式

主版本号：当你做了不兼容的 API 修改，
次版本号：当你做了向下兼容的功能性新增
修订号：当你做了向下兼容的问题修正

`先行版本号`
alpha:内部测试版本，一般不向外发布，会有很多 BUG
beta:也是测试版本，这个阶段会一直加入新功能，在 alpha 之后推出
rc： Release Candidate 系统平台上就是发型候选版本。 RC 版本不会加入新功能，主要着重于除错

