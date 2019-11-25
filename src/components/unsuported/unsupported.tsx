import * as React from 'react';

import './unsupported.css';

export const Unsupported: React.FC = () => (
    <div className="unsupported-message">
        <h1 className="unsupported-message__title">Sorry, your browser is not supported.</h1>
        <h2 className="unsupported-message__title">
            <span role="img" aria-label="">😥</span>
        </h2>
    </div>
);
