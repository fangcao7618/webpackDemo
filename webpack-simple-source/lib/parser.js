//1.将代码转换成AST语法树，
//将AST转换成代码，ES6转换成ES5
const fs = require("fs");
const babylon = require("babylon");
const { default: traverse } = require("babel-traverse");
const { transformFromAst } = require("babel-core");

module.exports = {
    /**
     * [解析]1.将代码转换成AST语法树（从ES6转换成AST）
     */
    getAST: path => {
        const source = fs.readFileSync(path, "utf-8");

        return babylon.parse(source, { sourceType: "module" });
    },
    /**
     * [转换]2.获取依赖
     */
    getDependencies: ast => {
        const dependencies = [];
        traverse(ast, {
            ImportDeclaration: ({ node }) => {
                dependencies.push(node.source.value);
            }
        });
        return dependencies;
    },
    /**
     * 3.AST再转换成 我们的源码
     */
    transform: ast => {
        const { code } = transformFromAst(ast, null, {
            presets: ["env"] //babel-preset-env ,可以直接用
        });

        // const { code } = transformFromAst(ast, null, {
        //     presets: ["env"] //@babel/preset-env ,不可以直接用,会提示Couldn't find preset "env",必须建立.babelrc,再次配置{"presets": ["@babel/preset-env"]}
        // });

        return code;
    }
};
