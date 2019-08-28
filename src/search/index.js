"use strict";

import React from "react";
import ReactDOM from "react-dom";
import "../../common";
import "./search.less";
import Cat from "./images/cat.svg";
import Fei from "./images/fei.png";
import Svgg from "./images/svgg.svg";
import { a } from "./tree-shaking";

// if (false) {
//     a();
// }

class Search extends React.Component {
    constructor() {
        super(...arguments);
        this.state = {
            Text: null
        };
    }
    loadComponent() {
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
        return (
            <React.Fragment>
                <div className="search-text">{funcA}搜索文字的内容vvvvv</div>
                {Text ? <Text /> : null}
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
