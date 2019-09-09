const loaderUtils = require("loader-utils");
const fs = require("fs");
const path = require("path");

module.exports = function(source) {
    const { name } = loaderUtils.getOptions(this);

    this.cacheable(false); //关掉缓存

    const callback = this.async();

    const json = JSON.stringify(source)
        .replace("foo", "wfc")
        .replace(/\u2028/g, "\\u2028")
        .replace(/\u2029/g, "\\u2029");

    fs.readFile(path.join(__dirname, "./async.txt"), "utf-8", (err, data) => {
        if (err) {
            callback(err, "");
        }
        callback(null, data, json, 3, 4, 5);
    });

    // return `export default ${json}`;
    // throw new Error("Error");
    // return `export default ${json}`;
    // this.callback(new Error("Error"), json);
    // this.callback(null, json, 2, 3, 4, 5); //返回多个值
};
