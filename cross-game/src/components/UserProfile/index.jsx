import React from "react";
import "../UserProfile/userProfile.css"

function UserProfile(props){
    const { img, nome } = props;
   
    return (
      <div className="userProfile-group-userAvatar" >
        <img className="userProfile-userAvatar__image" src={img} />
        <span className="userProfile-userAvatar__name">{nome}</span>
      </div>
  
    )
  }

  export default UserProfile;