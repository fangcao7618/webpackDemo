const { SyncHook, AsyncSeriesHook } = require("tapable");

class Car {
    constructor() {
        this.hooks = {
            accelerate: new SyncHook(["newspeed"]),
            brake: new SyncHook(),
            calculateRoutes: new AsyncSeriesHook([
                "soure",
                "target",
                "routesList"
            ])
        };
    }
}

const myCar = new Car();

//绑定同步的钩子
myCar.hooks.brake.tap("WarningLampPlugin", () =>
    console.log("WarningLampPlugin")
);

//绑定同步钩子，并传参
myCar.hooks.accelerate.tap("LoggerPlugin", newSpeed =>
    console.log(`Accelerating to ${newSpeed}`)
);

//绑定一个异步的Promise钩子
myCar.hooks.calculateRoutes.tapPromise(
    "calculateRoutes tapPromise",
    (source, target, routesList, callback) => {
        console.log("source", source);
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                console.log(`tapPromise to ${source}${target}${routesList}`);
                resolve();
            }, 1000);
        });
    }
);

//执行
myCar.hooks.brake.call();
myCar.hooks.accelerate.call(10);

console.time("======cost");

//执行异步钩子
myCar.hooks.calculateRoutes.promise("Async", "hook", "demo").then(
    () => {
        console.timeEnd("======cost");
    },
    err => {
        console.error(err);
        console.timeEnd("======cost");
    }
);
