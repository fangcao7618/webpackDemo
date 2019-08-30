## 基础配置

### 构建配置管理的可选方案

-   通过多个配置文件管理不同环境的构建，webpack --config 参数进行控制

    -   基础配置：webpack.base.js
    -   开发环境：webpack.dev.js
    -   生产环境：webpack.prod.js
    -   SSR 环境：webpack.ssr.js
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
