# 基础配置：WEBPACK.BASE.JS

## 一、资源解析

-   1.解析 ES6

```bash
npm i babel-loader -D
```

-   2.解析 React

```bash
npm i babel-loader -D
```

-   3.解析 CSS

```bash
npm i css-loader -D
```

-   4.解析 Less

```bash
npm i less less-loader -D
```

-   5.解析图片

```bash
npm i file-loader -D or npm i url-loader -D
```

-   6.解析字体

```bash
npm i file-loader -D
```

## 二、样式增强

-   CSS 前缀补齐

```bash
npm i postcss-loader autoprefixer -D
```

-   CSS px 转化成 rem

```bash
npm i px2rem-loader -D
```

## 三、目录清理

```bash
npm i clean-webpack-plugin -D
```

## 四、多页面打包

```bash
npm i html-webpack-plugin -D
```

## 五、命令行显示信息优化

```bash
npm i friendly-errors-webpack-plugin -D
```

## 六、错误捕获和处理

## 七、CSS 提取成一个单独的文件

```bash
npm i mini-css-extract-plugin -D
```
