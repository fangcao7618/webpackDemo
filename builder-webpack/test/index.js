const path = require("path");
process.chdir(path.join(__dirname, "smoke/template")); //变更Node.js进程的当前工作目录

describe("build-webpack test case", () => {
    require("./unit/webpack-base-test");
});
