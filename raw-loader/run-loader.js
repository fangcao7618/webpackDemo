const { runLoaders } = require("loader-runner");
const fs = require("fs");
const path = require("path");

runLoaders(
    {
        resource: path.join(__dirname, "./src/demo.txt"),
        // loaders: [path.join(__dirname, "./src/raw-loader.js")],
        loaders: [
            {
                loader: path.join(__dirname, "./src/raw-loader.js"),
                options: {
                    name: "test"
                }
            }
        ],
        context: {
            minimize: true
        },
        readResource: fs.readFile.bind(fs)
    },
    (err, result) => {
        err ? console.log(err) : console.log(result);
    }
);
