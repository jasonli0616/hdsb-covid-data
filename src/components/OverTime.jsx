import React from "react";
import { Line } from "react-chartjs-2";
import GraphTooSmall from "./GraphTooSmall";
import "./../css/OverTime.css";
import Dropdown from "./Dropdown";

export default class OverTime extends React.Component {
    state = {
        json: this.props.json,
        schools: this.props.schools,
        filteredSchool: 'View all schools',
        allData: null,
        confirmedStaffCases: null,
        confirmedStudentCases: null,
        totalConfirmedCases: null,
        gridColor: 'rgb(150, 150, 150)',
        labelColor: 'rgb(0, 0, 0)'
    };

    changeLabelColor = () => {
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches)
            this.setState({labelColor: 'rgb(255, 255, 255)'});
        else
            this.setState({labelColor: 'rgb(100, 100, 100)'});
    };

    changeFilteredSchool = () => {
        this.setState({filteredSchool: document.getElementById('filter-school-dropdown').value});
        this.getData();
    }

    getData = () => {
        let allData = {}

        for (const date in this.state.json) {
            let confirmedStaffCases = 0;
            let confirmedStudentCases = 0;
            let totalConfirmedCases = 0;

            for (const school in this.state.json[date]) {
                if (this.state.filteredSchool !== 'View all schools' && this.state.filteredSchool !== school) continue;
                confirmedStaffCases += this.state.json[date][school].confirmed_staff_cases;
                confirmedStudentCases += this.state.json[date][school].confirmed_student_cases;

                totalConfirmedCases += this.state.json[date][school].confirmed_staff_cases;
                totalConfirmedCases += this.state.json[date][school].confirmed_student_cases;
            }

            allData[date] = {confirmedStaffCases, confirmedStudentCases, totalConfirmedCases};
        }
        this.setState({confirmedStaffCases: Object.keys(allData).map((date) => {return allData[date].confirmedStaffCases})});
        this.setState({confirmedStudentCases: Object.keys(allData).map((date) => {return allData[date].confirmedStudentCases})});
        this.setState({totalConfirmedCases: Object.keys(allData).map((date) => {return allData[date].totalConfirmedCases})});
        this.setState({allData: allData});
    }

    componentDidMount() {
        this.getData();

        this.changeLabelColor();
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', this.changeLabelColor);

        document.getElementById('filter-school-dropdown').addEventListener('change', this.changeFilteredSchool);
    };

    render() {

        return (
            <>
                <Dropdown id="filter-school-dropdown" options={this.state.schools} title="Filter school: " default="View all schools" />
                {this.state.allData ? (
                    <>
                        <Line className="overtime"
                        data={{
                            labels: Object.keys(this.state.allData),
                            datasets: [
                                {
                                    label: 'Confirmed Student Cases',
                                    data: this.state.confirmedStudentCases,
                                    backgroundColor: [
                                        'rgb(219, 112, 55)'
                                    ],
                                    borderColor: [
                                        'rgba(219, 112, 55, 0.5)'
                                    ]
                                },
                                {
                                    label: 'Confirmed Staff Cases',
                                    data: this.state.confirmedStaffCases,
                                    backgroundColor: [
                                        'rgb(55, 184, 219)'
                                    ],
                                    borderColor: [
                                        'rgba(55, 184, 219, 0.5)'
                                    ]
                                },
                                {
                                    label: 'Total Confirmed Cases',
                                    data: this.state.totalConfirmedCases,
                                    backgroundColor: [
                                        'rgb(232, 235, 52)'
                                    ],
                                    borderColor: [
                                        'rgba(232, 235, 52, 0.5)'
                                    ]
                                }
                            ]
                        }}
                        options={{
                            scales: {
                                x: {
                                    ticks: {
                                        color: this.state.labelColor
                                    },
                                    grid: {
                                        color: this.state.gridColor
                                    }
                                },
                                y: {
                                    beginAtZero: true,
                                    suggestedMax: Math.max(
                                        this.state.confirmedStudentCases.reduce((a, b) => { return Math.max(a, b); }),
                                        this.state.confirmedStaffCases.reduce((a, b) => { return Math.max(a, b); }),
                                        this.state.totalConfirmedCases.reduce((a, b) => { return Math.max(a, b); })
                                    ) + 3,
                                    ticks: {
                                        precision: 0,
                                        color: this.state.labelColor
                                    },
                                    grid: {
                                        color: this.state.gridColor
                                    }
                                }
                            },
                            plugins: {
                                legend: {
                                    labels: {
                                        color: this.state.labelColor
                                    }
                                }
                            }
                        }} />
                    </>
                ) : null}
                <GraphTooSmall />
            </>
        );
    };
};