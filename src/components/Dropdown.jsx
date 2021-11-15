import React from "react";
import "./../css/Dropdown.css";

export default class Dropdown extends React.Component {
    render() {
        return (
            <div className="dropdown">
                <label>{this.props.title}</label>
                <select id={this.props.id}>
                    {/* <option value="" disabled selected>{this.props.title}</option> */}
                    {this.props.options.map((option, key) =>
                        <option value={option} key={key}>{option}</option>
                        )}
                </select>
            </div>
        );
    };
};