import React from 'react';
import ReactDOM from 'react-dom';
import {Page, Toolbar} from 'react-onsenui';
import {List, ListItem} from 'react-onsenui';

export default class Settings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      chopsticks: false,
    };
  }

  componentDidMount() {
    console.log('setting');
  }

  renderRow(row, index) {
    return (
      <ListItem key={index}>
        <div className='center'>
          {`${row.month}月${row.day}日`}
        </div>
      </ListItem>
    );
  }

  handleOpenChopsticksSettings() {
    this.setState({
      chopsticks: true,
    });
  }

  render() {
    return (
      <Page
        renderToolbar={() =>
          <Toolbar>
            <div className="center">設定</div>
          </Toolbar>
        }
      >
        <List>
          <ListItem key={0} tappable>
            ユーザ情報
          </ListItem>
          <ListItem
            key={1}
            onClick={this.handleOpenChopsticksSettings}
            tappable
          >
            箸の登録
          </ListItem>
          {this.state.chopsticks &&
            <div>
              Hello
            </div>
          }
        </List>
      </Page>
    );
  }
}
