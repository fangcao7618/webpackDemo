const JSZip = require("jszip");
const path = require("path");
const RawSource = require("webpack-sources").RawSource;
const zip = new JSZip();

module.exports = class ZipPlugin {
    constructor(options) {
        this.options = options;
    }

    apply(compiler) {
        compiler.hooks.emit.tapAsync("ZipPlugin", (compilation, callback) => {
            const folder = zip.folder(this.options.filename);

            for (let filename in compilation.assets) {
                const source = compilation.assets[filename].source();

                folder.file(filename, source);

                // console.log(source);
            }

            zip.generateAsync({ type: "nodebuffer" }).then(content => {
                console.log(this.options);
                const outputPath = path.join(
                    compilation.options.output.path,
                    this.options.filename + ".zip"
                ); //绝对路径

                //绝对路径转换成相对路径
                const outputRelativePath = path.relative(
                    compilation.options.output.path,
                    outputPath
                );

                compilation.assets[outputRelativePath] = new RawSource(content);
                callback();
                // console.log();
                // see FileSaver.js
                // console.log(content)

                // const outputPath=path
                // saveAs(content, "example.zip");
            });
        });
    }
};
