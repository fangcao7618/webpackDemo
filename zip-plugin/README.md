## 通过 Compilation 进行文件写入

## 插件扩展：编写插件的插件

## 编写一个压缩构建资源为 zip 包的插件

-   生成的 zip 包文件名称可以通过插件传入
-   需要使用 compiler 对象上的特地 hooks 进行资源的生成

## 准备知识：

-   Node.js 里面将文件压缩为 zip 包

    使用 [jszip](https://www.npmjs.com/package/jszip)

-   怎么把 zip 文件输出出来，Compiler 上负责文件生成的 hooks

    Hooks 是 emit,是一个异步的 hook（AsyncSeriesHook）

    emit 生成文件阶段，读取的是 compilation.assets 对象的值

    可以将 zip 资源包设置到 compilation.assets 对象上
