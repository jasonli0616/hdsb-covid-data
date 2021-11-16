import React from "react";
import { Line } from "react-chartjs-2";
import GraphTooSmall from "./GraphTooSmall";
import "./../css/OverTime.css";

export default class OverTime extends React.Component {
    state = {
        json: this.props.json,
        schools: this.props.schools,
        gridColor: 'rgb(150, 150, 150)',
        labelColor: 'rgb(0, 0, 0)'
    };

    changeLabelColor = () => {
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches)
            this.setState({labelColor: 'rgb(255, 255, 255)'});
        else
            this.setState({labelColor: 'rgb(100, 100, 100)'});
    };

    componentDidMount() {
        this.changeLabelColor();
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', this.changeLabelColor);
    };

    render() {
        let allData = {}

        for (const date in this.state.json) {
            let confirmedStaffCases = 0;
            let confirmedStudentCases = 0;
            let totalConfirmedCases = 0;

            for (const school in this.state.json[date]) {
                confirmedStaffCases += this.state.json[date][school].confirmed_staff_cases;
                confirmedStudentCases += this.state.json[date][school].confirmed_student_cases;

                totalConfirmedCases += this.state.json[date][school].confirmed_staff_cases;
                totalConfirmedCases += this.state.json[date][school].confirmed_student_cases;
            }

            allData[date] = {confirmedStaffCases, confirmedStudentCases, totalConfirmedCases};
        }
        let confirmedStaffCases = Object.keys(allData).map((date) => {return allData[date].confirmedStaffCases});
        let confirmedStudentCases = Object.keys(allData).map((date) => {return allData[date].confirmedStudentCases});
        let totalConfirmedCases = Object.keys(allData).map((date) => {return allData[date].totalConfirmedCases});

        return (
            <>
                <Line className="overtime"
                    data={{
                        labels: Object.keys(allData),
                        datasets: [
                            {
                                label: 'Confirmed Student Cases',
                                data: confirmedStudentCases,
                                backgroundColor: [
                                    'rgb(219, 112, 55)'
                                ],
                                borderColor: [
                                    'rgba(219, 112, 55, 0.5)'
                                ]
                            },
                            {
                                label: 'Confirmed Staff Cases',
                                data: confirmedStaffCases,
                                backgroundColor: [
                                    'rgb(55, 184, 219)'
                                ],
                                borderColor: [
                                    'rgba(55, 184, 219, 0.5)'
                                ]
                            },
                            {
                                label: 'Total Confirmed Cases',
                                data: totalConfirmedCases,
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
                                        confirmedStudentCases.reduce((a, b) => {return Math.max(a, b)}),
                                        confirmedStaffCases.reduce((a, b) => {return Math.max(a, b)}),
                                        totalConfirmedCases.reduce((a, b) => {return Math.max(a, b)})
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
                    }}
                />
                <GraphTooSmall />
            </>
        );
    };
};