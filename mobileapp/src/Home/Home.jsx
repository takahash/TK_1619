import React from 'react';
import ReactDOM from 'react-dom';
import {Page, Toolbar} from 'react-onsenui';

import './Home.styl'

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: 'ジャイアント白田',
      latest: {
        startTime: new Date(),
        endTime: new Date(),
        count: 0,
      },
    };
  }

  componentDidMount() {
    // fetch(`${api.BASE}/logs/public`, {
    //   method: 'GET',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    // })
    fetch('../dev/log.json')
      .then(response => {
        return response.json();
      })
      .then(json => {
        console.log('parsed json', json);
      })
      .catch(err => {
        console.log('request feiled: ', err);
      });
  }

  getFormattedDatetime(datetime) {
    const str = 'hello';
    return `${datetime.getMonth()}月`;
    // return `${datetime.getFullYear()}年${datetime.getMonth() + 1}月${datetime.getDate()}日 ${datetime.getHours()}:${datetime.getMinutes()}`;
  }

  render() {
    return (
      <Page
        renderToolbar={() =>
          <Toolbar>
            <div className='center'>ほーむ</div>
          </Toolbar>
        }
      >
        <div>
          <span>こんにちは、{this.state.username}さん。</span>
        </div>

        <div className="latest">
          <div className="title">最新の食事</div>
          <div className="detail">
            <div>
              <span className="list-title">日時</span>
              <span className="list-item">{`${this.state.latest.startTime.getFullYear()}/${this.state.latest.startTime.getMonth() + 1}/${this.state.latest.startTime.getDate()} ${this.state.latest.startTime.getHours()}:${this.state.latest.startTime.getMinutes()}`}</span>
 
            </div>
            <div>
              <span className="list-title">食事時間</span>
              <span className="list-item">30:13</span>
            </div>
            <div>
              <span className="list-title">早食いカウント数</span>
              <span className="list-item">{`${this.state.latest.count}回`}</span>
            </div>
          </div>
        </div>
      </Page>
    );
  }
}
