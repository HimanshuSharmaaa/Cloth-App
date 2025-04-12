import React from 'react';
import './LeftSidebarCard.css';

const LeftSidebarCard = (props) => {
  return (
    <div className='LeftSidebarCard'>
      <img src={props.img} alt="" />
      <p>{props.title}</p>
    </div>
  )
}

export default LeftSidebarCard;