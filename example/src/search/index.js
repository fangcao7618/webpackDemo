"use strict";

import "babel-polyfill";
import React from "react";
import ReactDOM from "react-dom";
import largeNumber from "large-number-wfc";
import "../../common";
import Cat from "./images/cat.svg";
import Fei from "./images/fei.png";
import Svgg from "./images/svgg.svg";
import Bg from "./images/bg.jpg";
import { a } from "./tree-shaking";
import "./search.less";

class Search extends React.Component {
    constructor() {
        super(...arguments);
        this.state = {
            Text: null
        };
    }
    loadComponent() {
        import("./text.js").then(Text => {
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
                <img src={Bg} alt=""></img>
                <div className="search-text">
                    {funcA}
                    <br></br>搜索文字的内容:WFC,汉体书写 九<br></br>
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
ReactDOM.render(<Search />, document.getElementById("root"));
