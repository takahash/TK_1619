import React from 'react';
import ReactDOM from 'react-dom';
import {Page, Toolbar} from 'react-onsenui';

export default class Home extends React.Component {
  render() {
    return (
      <Page
        renderToolbar={() =>
          <Toolbar>
            <div className='center'>home Page??</div>
          </Toolbar>
        }
      >
        <div>
          home page!!??
        </div>
      </Page>
    );
  }
}
