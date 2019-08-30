"use strict";

const React = require("react");
const largeNumber = require("large-number-wfc");
const Cat = require("./images/cat.svg");
const Fei = require("./images/fei.png");
const Svgg = require("./images/svgg.svg");
const { a } = require("./tree-shaking");
require("./search.less");

class Search extends React.Component {
    constructor() {
        super(...arguments);
        this.state = {
            Text: null
        };
    }
    loadComponent() {
        console.log("ggggggggggg");
        import("./text.js").then(Text => {
            console.log(Text);
            this.setState({
                Text: Text.default
            });
        });
    }
    render() {
        const funcA = a();
        const { Text } = this.state;
        const addResult = largeNumber("999", "1");
        return (
            <React.Fragment>
                <div className="search-text">
                    {funcA}
                    <br></br>搜索文字的内容<br></br>
                </div>
                {Text ? <Text /> : null}
                {addResult}
                <img
                    src={Cat}
                    alt=""
                    onClick={this.loadComponent.bind(this)}
                ></img>
                <img src={Svgg} alt=""></img>
                <img src={Fei} alt=""></img>
            </React.Fragment>
        );
    }
}
module.exports = <Search />;
