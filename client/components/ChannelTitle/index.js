import React from 'react';

import style from "./channeltitle.css";

const ChannelTitle = ({channel}) => {
  return (
    <div className={style.main}>
      {channel.title}
    </div>
  )
}

export default ChannelTitle;