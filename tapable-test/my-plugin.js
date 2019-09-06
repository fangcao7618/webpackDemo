const Compiler = require("./Compiler");

class MyPlugin {
    constructor() {}
    apply(compiler) {
        compiler.hooks.brake.tap("WarningLampPlugin", () =>
            console.log("WarningLampPlugin")
        );

        //绑定同步钩子，并传参
        compiler.hooks.accelerate.tap("LoggerPlugin", newSpeed =>
            console.log(`Accelerating to ${newSpeed}`)
        );

        //绑定一个异步的Promise钩子
        compiler.hooks.calculateRoutes.tapPromise(
            "calculateRoutes tapAsync",
            (source, target, routesList, callback) => {
                console.log("source", source);
                return new Promise((resolve, reject) => {
                    setTimeout(() => {
                        console.log(
                            `tapPromise to ${source}${target}${routesList}`
                        );
                        resolve();
                    }, 1000);
                });
            }
        );
    }
}

/**
 * @description 模拟插件执行
 * @author wfc
 * @date 2019-09-05
 * @class MyPlugin
 */

const myPlugin = new MyPlugin();

const options = {
    plugins: [myPlugin]
};

const compiler = new Compiler();

for (const plugin of options.plugins) {
    if (typeof plugin === "function") {
        plugin.call(compiler, compiler);
    } else {
        plugin.apply(compiler);
    }
}

compiler.run();
