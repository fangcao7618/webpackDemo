import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import { createStore } from "redux";
import rootReducer from "./reducers";
import App from "./app";

const store = createStore(rootReducer);

const rootElement = document.getElementById("root");
render(
    <Provider store={store}>
        <App />
    </Provider>,
    rootElement
);
