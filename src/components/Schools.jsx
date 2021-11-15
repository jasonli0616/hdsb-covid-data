import React from "react";
import Dropdown from "./Dropdown";
import Chart from "./Chart";
import "./../css/Schools.css";

class School extends React.Component {
    render() {
        return (
            <div className="school">
                <h2>{this.props.children}</h2>
                <h3>Confirmed Staff Cases:</h3><p>{this.props.confirmed_staff_cases}</p>
                <h3>Confirmed Student Cases:</h3><p>{this.props.confirmed_student_cases}</p>
                <h3>School Closed:</h3><p>{this.props.school_closed}</p>
                <h3>Closed Classes:</h3><p>{this.props.total_closed_classes}</p>
            </div>
        );
    };
};

const viewOptions = [
    'Overview (Default)',
    'Chart'
];

export default class Schools extends React.Component {
    state = {
        json: this.props.json,
        mode: viewOptions[0]
    };

    changeMode = () => {
        this.setState({mode: document.getElementById('change-mode').value});
    };

    componentDidMount() {
        document.getElementById('change-mode').addEventListener('change', this.changeMode);
    };
    
    render() {
        return (
            <>
                <div>
                    <Dropdown id="change-mode" title="Change Mode: " options={viewOptions} />
                </div>

                {this.state.mode === viewOptions[0] ? (
                    <div className="schools">
                        {Object.keys(this.state.json).map((school_name, key) =>
                            <School key={key}
                                    confirmed_staff_cases={this.state.json[school_name].confirmed_staff_cases}
                                    confirmed_student_cases={this.state.json[school_name].confirmed_student_cases}
                                    school_closed={this.state.json[school_name].school_closed ? 'Yes' : 'No'}
                                    total_closed_classes={this.state.json[school_name].total_closed_classes} >
                                {school_name}
                            </School>
                        )}
                    </div>
                ) : null}

                {this.state.mode === viewOptions[1] ? (
                    <Chart json={this.state.json} />
                ) : null}

            </>
        );
    };
};