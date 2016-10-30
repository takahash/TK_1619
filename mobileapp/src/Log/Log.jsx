import React from 'react';
import ReactDOM from 'react-dom';
import {Page, Toolbar} from 'react-onsenui';
import {List, ListItem} from 'react-onsenui';
import {Chart} from 'react-google-charts';

export default class Settings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      log: [],
    };
  }

  componentDidMount() {
    fetch(`${api.BASE}/logs/public`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => {
        return response.json();
      })
      .then(json => {
        this.setState({
          log: json,
        });
        console.log(this.state.log);
      })
      .catch(err => {
        console.log('request failed: ', err);
      });
  }

  renderRow(row, index) {
    const startTime = new Date(row.start_time);
    return (
      <ListItem key={index}>
        <div className='center'>
          {`${startTime.getDate()}日 ${startTime.getHours()}:${('0' + startTime.getMinutes()).slice(-2)}`}
        </div>
        <div className="right">
          {row.count}回
        </div>
      </ListItem>
    );
  }

  render() {
    const now = new Date();
    console.log('now', now);

    return (
      <Page
        renderToolbar={() =>
          <Toolbar>
            <div className="center">2016年10月</div>
          </Toolbar>
        }
      >
        <div className={"my-pretty-chart-container"}>
          <Chart
            chartType="LineChart" 
            data={[['Age', 'Weight'], [0, 3], [1, 4], [2, 10], [3, 7], [4, 5], [5, 1], ]}
            options={{}}
            graph_id="BiriBiriChart"
            width="100%"
            height="200px"
          />
        </div>
        <List
          renderRow={this.renderRow}
          dataSource={this.state.log}
        />
      </Page>
    );
  }
}
