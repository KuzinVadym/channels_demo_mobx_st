import React, { Component } from 'react';
import { hot } from 'react-hot-loader'

import style from "./app.css";

class App extends Component {
  render() {
    return (
        <div className={style.app}>
          App
        </div>
    );
  }
}

export default hot(module)(App)