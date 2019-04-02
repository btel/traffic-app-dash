import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import { LineChart, Line } from 'recharts';

class TrafficSeries extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            data: [],
            period: 240}
        this.handlePeriodChange = this.handlePeriodChange.bind(this);
    }

    handlePeriodChange(e) {
        this.fetchData(e.target.value);
    }

    fetchData(period) {
        fetch(process.env.REACT_APP_BACKEND_URL + "/api/traffic?period=" + period)
            .then(res => res.json())
            .then(
                  (result) => {
                      this.setState({
                          isLoaded: true,
                          data: result.data,
                          period : period
                      });
                  },
                  (error) => {
                      this.setState({
                          isLoaded: true,
                          period: period,
                          error: error});
             }
            )

    }

    
    componentDidMount() {
        this.fetchData(this.state.period);
    }

    render() { return (
                <div>
                <LineChart width={400} height={400} data={this.state.data} className='chart'>
                  <Line type="monotone" dataKey="debit" stroke="#8884d8" />
                </LineChart>
                <select id="period" name="period" value={this.state.period} onChange={this.handlePeriodChange}>
                  <option value="24">1 day</option>
                  <option value="240">10 days</option>
                </select>
                </div>
    );
  }
}

class App extends Component {
  render() { return <TrafficSeries></TrafficSeries> }
}

export default App;
