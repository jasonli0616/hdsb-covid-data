import React from "react";
import Schools from "./Schools";
import "./../css/App.css";
import Title from "./Title";

export default class App extends React.Component {
    state = {
        json: null,
        schools: null,
        data_last_updated: null
    };

    pullData = async () => {
        this.setState({ json: null, schools: null });

        const response = await fetch('https://hdsb-covid-api.herokuapp.com/api/get-data/');
        const json = await response.json();

        this.setState({ data_last_updated: new Date().toLocaleString() });
        this.setState({json: json});
    };

    componentDidMount() {
        this.pullData();
    };

    render() {
        return (
            <>
                <Title />
                <div className="update-data">
                    <button onClick={this.pullData}>Update data</button>
                    <p>Data last updated: {this.state.data_last_updated}</p>
                    <p>
                        Data retrieved: <a href="https://hdsb-covid-api.herokuapp.com/" target="_blank" rel="noreferrer">HDSB COVID API</a>
                    </p>
                </div>
                {this.state.json ? (
                    <Schools json={this.state.json} />
                ) : (
                    <h1>Fetching data...</h1>
                )}
            </>
        );
    };
};