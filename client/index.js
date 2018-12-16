import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'mobx-react';
import { createChannelStore } from './stores'
import App from './components/App'

const store = createChannelStore({channels: []});

render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById("root")
);