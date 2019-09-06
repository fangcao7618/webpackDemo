const loaderUtils = require("loader-utils");
module.exports = function(source) {
    console.log("Loader a is excuted!");

    const interpolatedName = loaderUtils.interpolateName(
        this,
        "[name].[ext]",
        source
    );
    console.log(interpolatedName, source);
    // this.emitFile("demo.txt", "test");
    this.emitFile(interpolatedName, source);
    return source;
};
