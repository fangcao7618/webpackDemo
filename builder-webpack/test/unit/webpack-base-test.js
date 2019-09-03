const assert = require("assert");
describe("webpack.base.js test case", () => {
    const baseConfig = require("../../lib/webpack.base.js");

    it("entry", () => {
        assert.equal(
            baseConfig.entry.index,
            "/Users/fangcao/Documents/study/study_webpack/builder-webpack/test/smoke/template/src/index/index.js"
        );
        assert.equal(
            baseConfig.entry.search,
            "/Users/fangcao/Documents/study/study_webpack/builder-webpack/test/smoke/template/src/search/index.js"
        );
    });
});
