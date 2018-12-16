import React from 'react';
import { inject, observer } from 'mobx-react';
import uniqid from "../../utils/uniqid";

import Channel from "../Channel";
import ChannelNumber from "../ChannelNumber";
import ChannelLogo from "../ChannelLogo";
import ChannelTitle from "../ChannelTitle";
import ChannelIcon from "../ChannelIcon";

import style from "./channels.css";

@inject('store')
@observer
class Channels extends React.Component{

    constructor(props) {
        super(props);
    }
    
    render(){
      const { title, store } = this.props;
        return (
          <div className={style.main}>
            <div className={style.title} >{title}</div>
            <div 
              className={style.content} >
              {store.channels.map((channel, index) => {
                return <Channel key={`channel_${uniqid()}`} channel={channel}>
                          <ChannelNumber index={index + 1}/>
                          <ChannelLogo />
                          <ChannelTitle />
                          <ChannelIcon />
                       </Channel>
              })}
            </div>
          </div>
        )
    }
}

export default Channels;