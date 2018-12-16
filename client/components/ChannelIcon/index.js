import React from 'react';
import { inject, observer } from 'mobx-react';

import { Star_Icon, Empty_Star_Icon } from '../icons'
import style from "./channelicon.css";

const ChannelIcon = ({channel}) => {
  return (
    <div className={style.main}>
      {(channel.selected) ? <Star_Icon /> : <Empty_Star_Icon />}
    </div>
  )
}

export default observer(ChannelIcon);