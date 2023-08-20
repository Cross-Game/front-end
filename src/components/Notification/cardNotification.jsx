
import React, { useState } from 'react';
import "../../assets/global.css";
import "../Notification/notification.css";

function CardNotification(props) {
    const {icon, title, message, date, time, temFooter, children} = props;

    const [hover, setHover] = useState(false);
    
    const handleMouseEnter = () => {
      setHover(!hover);
    };

    return (
        <div className="notification-cardNotification"  onClick={handleMouseEnter} >
            <div className="notification-content">
            {icon && <span className="notification-icon">{icon}</span>}
                <div className="notification-group-body">
                    <p className="notification-title-notification">{title}</p>
                    <p className="notification-message">{message}</p>
                </div>
                <div className="notification-datetime">
                <p>{date}</p> <br></br>
                <p>{time}</p>
                </div>
            </div>
            {temFooter &&  hover &&(
            <div className="notification-cardNotification-footer">{children}
            </div>
            )}
        </div>
    );
  }
  
  export default CardNotification;
  