import React from 'react';
import ReactDOM from 'react-dom';
import {Tabbar, Tab} from 'react-onsenui';

import Home from './Home/Home';
import Graph from './Graph';
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
        content: <Graph />,
        tab: <Tab label='グラフ' icon='fa-line-chart' />
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
