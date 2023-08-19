import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { TOKEN } from '../../data/constants';
import "../UserProfile/userProfile.css";
import imgUserProfile from "../../assets/index-page/testeImg.png";

const UserProfile = (props) => {
  const { img, nome, onClick } = props;
  const [profileImg, setProfileImg] = useState(imgUserProfile);

  useEffect(() => {
    setProfileImg(sessionStorage.getItem("IMAGEM"))
  })
  return (
    <div className="userProfile-group-userAvatar" onClick={onClick}>
      {profileImg && (
        <img className="userProfile-userAvatar-image" src={profileImg}/>
      )}
      <span className="userProfile-userAvatar-name">{nome}</span>
    </div>
  );
};

export default UserProfile;