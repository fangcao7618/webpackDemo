const { getAST, getDependencies, transform } = require("./parser");
const path = require("path");
const fs = require("fs");

module.exports = class Compiler {
    constructor(options) {
        const { entry, output } = options;

        this.entry = entry;
        this.output = output;

        this.modules = [];
    }
    /**
     * @description 运行模块
     * @author wfc
     * @date 2019-09-06
     */
    run() {
        const entryModule = this.buildModule(this.entry, true);

        // console.log(entryModule);
        this.modules.push(entryModule);

        this.modules.map(_module => {
            _module.dependencies.map(dependency => {
                this.modules.push(this.buildModule(dependency));
            });
        });
        // console.log(this.modules);

        this.emitFiles();
    }

    /**
     * @description 模块的构建
     * @author wfc
     * @date 2019-09-06
     */
    buildModule(filename, isEntry) {
        let ast;
        if (isEntry) {
            ast = getAST(filename);
        } else {
            // process.cwd() 根目录
            const absolutePath = path.join(process.cwd(), "./src", filename);
            ast = getAST(absolutePath);
        }

        return {
            filename,
            dependencies: getDependencies(ast),
            source: transform(ast)
        };
    }

    /**
     * @description 输出文件
     * @author wfc
     * @date 2019-09-06
     */
    emitFiles() {
        const outputPath = path.join(this.output.path, this.output.filename);

        let modules = ""; //模块的代码

        this.modules.map(_module => {
            modules += `"${_module.filename}": 
    function(require, module, exports) 
    { 
        ${_module.source} 
    },`;
        });

        const bundle = `(function(modules){
    function require(filename){
        var fn = modules[filename];
        var module = { exports: {} };

        fn(require,module,module.exports);

        return module.exports;
    };

    require("${this.entry}");
})({
    ${modules}
})`;

        fs.writeFileSync(outputPath, bundle, "utf-8");
    }
};
