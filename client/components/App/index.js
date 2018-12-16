import React, { Component } from 'react';
import { Provider } from 'mobx-react';
import { hot } from 'react-hot-loader'

import { createChannelStore } from '../../stores'
import Channels from '../Channels'
import Favorites from '../Favorites'
import style from "./app.css";

const store = createChannelStore({channels: []});

class App extends Component {
  
  componentDidMount() {
    store.loadChannels();
  }
  
  render() {
    return (
        <Provider store={store}>
          <div className={style.app}>
            <Channels title="My Channels" />
            <Favorites title="Favorites" />
          </div>
        </Provider>
    );
  }
}

export default hot(module)(App)