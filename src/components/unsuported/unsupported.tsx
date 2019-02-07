import * as React from "react";

import "./unsupported.css";

export class Unsupported extends React.PureComponent {
    render() {
        return (
            <div className="unsupported-message">
                <h1 className="unsupported-message__title">Sorry, your browser is not supported.</h1>
                <h1 className="unsupported-message__title">😥</h1>
            </div>
        );
    }
}