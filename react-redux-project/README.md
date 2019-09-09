1. npm i react react-dom redux react-redux -S
2. npm i @babel/core -D
3. npm i builder-webpack-geektime -D --unsafe-perm=true --allow-root

-   浏览器端：

    -   组件户，组件颗粒度尽可能小
    -   直接复用 builder-webpack-geektime 的构建配置，无需关注构建脚本

-   服务端：

    -   MVC 开发方式，数据库基于 Sequelize
    -   Rest API 风格
    -   采用 JWT 进行鉴权

打包成功了，但是打包后老是报错，如果去掉 redux 就不会有错
