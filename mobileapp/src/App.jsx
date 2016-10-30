import React from 'react';
import ReactDOM from 'react-dom';
import {Tabbar, Tab} from 'react-onsenui';

import Home from './Home/Home';
import Log from './Log/Log';
import Settings from './Settings/Settings';

export default class App extends React.Component {
  constructor(props) {
    super(props);
  }

  renderTabs() {
    return [
      {
        content: <Home />,
        tab: <Tab label='ホーム' icon='md-home' />
      },
      {
        content: <Log />,
        tab: <Tab label='ログ' icon='fa-line-chart' />
      },
      {
        content: <Settings />,
        tab: <Tab label='設定' icon='md-settings' />
      },
    ]
  }

  render() {
    return (
      <Tabbar initialIndex={0} renderTabs={this.renderTabs.bind(this)} />
    );
  }
}
