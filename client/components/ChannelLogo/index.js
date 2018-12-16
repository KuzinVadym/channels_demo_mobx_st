import React from 'react';

import { Avatar_Icon } from '../icons'

import style from "./channellogo.css";

const ChannelLogo = ({channel}) => {
  return (
    <div className={style.main}>
      {(channel.logo_token) 
        ? <img className={style.img} src={`https://images.zattic.com/logos/${channel.logo_token}/white/240x135.png`}/>
        : <Avatar_Icon />
      }
    </div>
  )
}

export default ChannelLogo;