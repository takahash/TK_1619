import React from 'react';
import ReactDOM from 'react-dom';
import {Page, Toolbar} from 'react-onsenui';

export default class Graph extends React.Component {
  render() {
    return (
      <Page
        renderToolbar={() =>
          <Toolbar>
            <div className='center'>Graph Page??</div>
          </Toolbar>
        }
      >
        <div>
          graph page!!??
        </div>
      </Page>
    );
  }
}
