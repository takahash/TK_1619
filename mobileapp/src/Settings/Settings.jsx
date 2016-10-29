import React from 'react';
import ReactDOM from 'react-dom';
import {Page, Toolbar} from 'react-onsenui';
import {List, ListItem} from 'react-onsenui';

export default class Settings extends React.Component {
  constructor(props) {
    super(props);
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

  render() {
    const now = new Date();
    console.log('now', now);

    const data = [
      {
        month: '10',
        day: '21',
      },
      {
        month: '12',
        day: '24',
      },
    ]

    return (
      <Page>
        <List
          renderRow={this.renderRow}
          dataSource={data}
        />
      </Page>
    );
  }
}
