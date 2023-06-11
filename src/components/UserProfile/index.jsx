import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { TOKEN } from '../../data/constants';
import "../UserProfile/userProfile.css";

const UserProfile = (props) => {
  const { img, nome, hasUserId, onClick } = props;
  const [profileImg, setProfileImg] = useState(img);

  useEffect(() => {
    if (hasUserId) {
      getJogadorImagem(hasUserId);
    }
  }, [hasUserId]);

  const getJogadorImagem = async (jogadorId) => {
    try {
      const response = await axios.get(`/users/${jogadorId}/picture`, {
        headers: {
          Authorization: `Bearer ${TOKEN}`,
        },
        responseType: 'blob', // Indica que a resposta é um Blob
      });

      const blobData = response.data;
      const imageUrl = await convertBlobToBase64(blobData);
      setProfileImg(imageUrl);
    } catch (error) {
      console.log(error);
    }
  };

  const convertBlobToBase64 = (blob) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onloadend = () => {
        resolve(reader.result);
      };

      reader.onerror = reject;

      reader.readAsDataURL(blob);
    });
  };

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