import React from "react";
import { Bar } from "react-chartjs-2";
import "./../css/Chart.css";



export default class Chart extends React.Component {
    state = {
        json: this.props.json,
        schools: Object.keys(this.props.json),
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
        const confirmedStudentCases = this.state.schools.map((key) => {return this.state.json[key].confirmed_student_cases});
        const confirmedStaffCases = this.state.schools.map((key) => {return this.state.json[key].confirmed_staff_cases});
        const totalClosedClasses = this.state.schools.map((key) => {return this.state.json[key].total_closed_classes});

        return (
            <>
                <Bar className="chart"
                    data={{
                        labels: this.state.schools,
                        datasets: [
                            {
                                label: 'Confirmed Student Cases',
                                data: confirmedStudentCases,
                                backgroundColor: [
                                    'rgb(219, 112, 55)'
                                ],
                            },
                            {
                                label: 'Confirmed Staff Cases',
                                data: confirmedStaffCases,
                                backgroundColor: [
                                    'rgb(55, 184, 219)'
                                ]
                            },
                            {
                                label: 'Total Closed Classes',
                                data: totalClosedClasses,
                                backgroundColor: [
                                    'rgb(232, 235, 52)'
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
                                        totalClosedClasses.reduce((a, b) => {return Math.max(a, b)})
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
                <p className="mobile-text">
                    The chart may appear too small to view properly on mobile devices, and devices with smaller screens.
                    <br />
                    Consider rotating to landscape mode to view.
                </p>
            </>
        );
    };
};