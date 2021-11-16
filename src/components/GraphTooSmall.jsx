import React from "react";
import "./../css/GraphTooSmall.css";

export default class GraphTooSmall extends React.Component {
    render() {
        return (
            <p className="mobile-text">
                The chart may appear too small to view properly on mobile devices, and devices with smaller screens.
                <br />
                Consider rotating to landscape mode to view.
            </p>
        );
    };
};