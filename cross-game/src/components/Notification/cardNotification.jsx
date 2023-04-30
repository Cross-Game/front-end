
import React from "react";
import "../../assets/global.css";
import "../Notification/notification.css";


function CardNotification(props) {
    const {icon, title, message, date, time, temFooter, children} = props;

    return (
        <div className="cardNotification">
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
            {temFooter && (
            <div className="footer">{children}
            </div>
            )}
        </div>
    );
  }
  
  export default CardNotification;
  