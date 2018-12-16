import React from 'react';

import style from "./channel_number.css";

const ChannelNumber = ({index}) => {
  return (
    <div className={style.main}>
      <div className={style.number}>
        {index}
      </div>
    </div>
  )
}

export default ChannelNumber;