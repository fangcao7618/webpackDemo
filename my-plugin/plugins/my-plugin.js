module.exports = class MyPlugin {
    constructor(options) {
        this.options = options;
    }

    apply(compiler) {
        console.log("My plugin is executed!");
        console.log("My plugin options", this.options);
    }
};
