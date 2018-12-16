import React, { Component } from 'react';
import { hot } from 'react-hot-loader'
import { inject, observer } from 'mobx-react';
import Channels from '../Channels'
import Favorites from '../Favorites'
import style from "./app.css";

@inject('store')
@observer
class App extends Component {
  
  componentDidMount() {
    this.props.store.loadChannels();
  }
  
  render() {
    return (
      <div className={style.app}>
        <Channels title="My Channels" />
        <Favorites title="Favorites" />
      </div>
    );
  }
}

export default hot(module)(App)