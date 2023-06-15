import React, { useEffect, useState } from 'react';
import "../../assets/global.css";
import { MdNotificationsActive } from 'react-icons/md';
import "../Notification/notification.css";
import ModalNotification from "../ModalNotification";
import Tag from "../Tag";
import CardNotification from "./cardNotification";
import Button from "../Button";
import { BsPersonHeart } from 'react-icons/bs';
import { BsFillCalendarFill } from 'react-icons/bs';
import { MdGroups } from 'react-icons/md';
import { HiClock } from 'react-icons/hi';
import useFetch from "../../hooks/useFetch";
import moment from 'moment';
import axios from 'axios';
import { USERID, TOKEN, currentURL } from '../../data/constants';
import { useNavigate } from 'react-router-dom';


function Notification(props) {
  const { onClose } = props;
  const [notificacoes, setNotificacoes] = useState([]);
  const [filteredNotifications, setFilteredNotifications] = useState([])

  useEffect(() => {
    const obterMensagens = async () => {
      try {
        const response = await axios.get(`${currentURL}/notifies/${USERID}`, {
          headers: {
            Authorization: `Bearer ${TOKEN}`
          }
        });
        if (response.status === 200) {
          setNotificacoes(response.data);
          filtrarNotificacoes();
        }
      } catch (error) {
        console.error('Erro ao buscar mensagens:', error);
      }
    };

    obterMensagens();
  }, []);



  const [selectedOption, setSelectedOption] = useState('hoje');

  function filtrarNotificacoes() {
    switch (selectedOption) {
      case 'hoje':
        setFilteredNotifications(notificacoes.filter(notification => moment(notification.date).isSame(moment(), 'day')));
        break;
      case 'ultimos7dias':
        setFilteredNotifications(notificacoes.filter(notification => moment(notification.date).isBetween(moment().subtract(7, 'days'), moment())));
        break;
      default:
        setFilteredNotifications(notificacoes);
    }
  }

  useEffect(() => {
    filtrarNotificacoes()
  }, [notificacoes, selectedOption])

  const handleClick = (selectedOption) => {
    setSelectedOption(selectedOption)
    filtrarNotificacoes();
    console.log(selectedOption);
    console.log(filteredNotifications)
  };

  function clearAll() {
    // TODO: Marcar todas as notificações do filtro como lidas 
  }

  function aceitarAmizade(nicknameFriend) {
    axios.patch(`${currentURL}/friends/confirming-friend-request/${USERID}/${String(nicknameFriend)}`, {}, {
      headers: {
        Authorization: `Bearer ${TOKEN}`
      }
    })
      .then(response => {
        console.log(response.data);
        window.location.href = "/users"
      })
      .catch(error => {
        console.error(error);
      });
  }

  function mandarParaSala(nicknameFriend){
    window.location.href = "/rooms"
  }

  function recusarAmizade(nicknameFriend) {
    axios.delete(`${currentURL}/friends/declining-friend-request/${USERID}/${nicknameFriend}`, {}, {
      headers: {
        Authorization: `Bearer ${TOKEN}`
      }
    })
      .then(response => {
        console.log(response.data);
        window.location.href = "/users"
      })
      .catch(error => {
        console.error(error);
      });
  }



  return (
    <ModalNotification
      title="Notificações"
      clearAll={true}
      icon={<MdNotificationsActive />}
      ativarBotao={false}
      onClear={() => clearAll()}
      onClose={onClose}
    >
      <div>
        <div className="notification-subtitle">
          <Tag
            temCursor={true}
            text="Hoje"
            onClick={() => handleClick('hoje')}
            isSelected={selectedOption === 'hoje'}
          />
          <Tag
            temCursor={true}
            text="Últimos 7 dias"
            onClick={() => handleClick('ultimos7dias')}
            isSelected={selectedOption === 'ultimos7dias'}
          />
          <Tag
            temCursor={true}
            text="Todas"
            onClick={() => handleClick('todas')}
            isSelected={selectedOption === 'todas'}
          />
        </div>

        <div className="notification-container">
          {filteredNotifications.length === 0 ? (
            <></>
          ) : (
            filteredNotifications.map((notification) => (
              <React.Fragment key={notification.id}>
                {notification.type === 'FRIEND_REQUEST' && (
                  <CardNotification
                    key={notification.id}
                    title={notification.description}
                    icon={<BsPersonHeart />}
                    message={notification.message}
                    date={moment(notification.date).format('DD/MM/YYYY')}
                    time={moment(notification.date).format('HH:mm')}
                    temFooter={true}
                  >
                    <Tag text="Aceitar" onClick={() => aceitarAmizade(notification.description)} />
                    <Tag text="Recusar" onClick={() => recusarAmizade(notification.description)} />
                  </CardNotification>
                )
                }

                {notification.type === 'EVENT' && (
                  <CardNotification
                    key={notification.id}
                    title={notification.description}
                    icon={<HiClock />}
                    message={notification.message}
                    date={moment(notification.date).format('DD/MM/YYYY')}
                    time={moment(notification.date).format('HH:mm')}
                    temFooter={true}
                    >
                    <Tag text="Aceitar" onClick={() => mandarParaSala(notification.description)} />
                    <Tag text="Recusar" onClick={() => mandarParaSala(notification.description)} />
                  </CardNotification>
                )}

                {notification.type === 'GROUP_INVITE' && (
                  <CardNotification
                    key={notification.id}
                    title={notification.description}
                    icon={<MdGroups />}
                    message={notification.message}
                    date={moment(notification.date).format('DD/MM/YYYY')}
                    time={moment(notification.date).format('HH:mm')}
                    temFooter={true}
                    >
                    <Tag text="Aceitar" onClick={() => mandarParaSala(notification.description)} />
                    <Tag text="Recusar" onClick={() => mandarParaSala(notification.description)} />
                  </CardNotification>
                  
                )
                }
              </React.Fragment>
            ))
          )}
        </div>

      </div>
    </ModalNotification>
  );
}


export default Notification;