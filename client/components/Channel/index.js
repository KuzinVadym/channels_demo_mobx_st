import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';

import style from "./channel.css";

@observer
class Channel extends Component {
	
	selectChannel = () => {
		this.props.channel.toggle();
	}
	
	render() {
		console.log('render');
		const {children, channel, selectChannel } = this.props;
		return (
			<div className={style.main} onClick={this.selectChannel} >
  			{React.Children.map(children, child => React.cloneElement(child, { channel: channel }))}
      </div>
		);
	}
}

export default Channel;