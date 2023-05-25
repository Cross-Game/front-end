
import React, { useState } from 'react';
import "../../assets/global.css";
import "../Notification/notification.css";
import useFetch from '../../hooks/useFetch';

function CardNotification(props) {
    const {icon, title, message, date, time, temFooter, children} = props;

    const [hover, setHover] = useState(false);

    const handleMouseEnter = () => {
      setHover(true);
    };
  
    const handleMouseLeave = () => {
      setHover(false);
    };

    return (
        <div className="cardNotification"  onClick={handleMouseEnter} onMouseLeave={handleMouseLeave}>
            <div className="content">
            {icon && <span className="icon">{icon}</span>}
                <div className="group-body">
                    <p className="title-notification">{title}</p>
                    <p className="message">{message}</p>
                </div>
                <div className="datetime">
                <p>{date}</p> <br></br>
                <p>{time}</p>
                </div>
            </div>
            {temFooter &&  hover &&(
            <div className="cardNotification-footer">{children}
            </div>
            )}
        </div>
    );
  }
  
  export default CardNotification;
  