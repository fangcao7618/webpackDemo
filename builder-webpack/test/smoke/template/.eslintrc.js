module.exports = {
    parser: "babel-eslint",
    extends: "airbnb",
    // extends: "eslint:recommended",
    env: {
        browser: true,
        node: true,
        commonjs: true,
        es6: true
    },
    rules: {
        indent: ["error", 4],
        quotes: [2, "double"],
        semi: ["error", "always"],
        "comma-dangle": [
            "error",
            {
                arrays: "never",
                objects: "never",
                imports: "never",
                exports: "never",
                functions: "never"
            }
        ],
        "no-console": 0,
        "no-unused-vars": "off",
        "react/jsx-indent": "off",
        "react/jsx-filename-extension": "off",
        "react/jsx-indent-props": "off",
        "react/react-in-jsx-scope": "off",
        "react/self-closing-comp": "off",
        "react/jsx-closing-tag-location": "off",
        "jsx-a11y/no-noninteractive-element-interactions": "off",
        "jsx-a11y/click-events-have-key-events": "off",
        "react/jsx-one-expression-per-line": "off",
        "react/jsx-one-expression-per-line": "off",
        "react/jsx-fragments": "off",
        "lines-between-class-members": "off",
        "arrow-parens": "off",
        "import/no-extraneous-dependencies": "off",
        "prefer-rest-params": "off",
        strict: "off",
        "import/newline-after-import": "off",
        "import/prefer-default-export": "off"
    }
};
