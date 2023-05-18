import React, { useEffect, useMemo, useState } from 'react';
import "../../assets/global.css";
import { MdNotificationsActive as MdNotificationsActive } from 'react-icons/md';
import "../Notification/notification.css";
import Modal from "../Modal";
import Tag from "../Tag";
import CardNotification from "./cardNotification";
import Button from "../Button";
import { BsPersonHeart as BsPersonHeart } from 'react-icons/bs';
import { BsFillCalendarFill } from 'react-icons/bs';
import { MdGroups as MdGroups } from 'react-icons/md';
import { HiClock as HiClock } from 'react-icons/hi';
import useFetch from "../../hooks/useFetch";
import moment from 'moment';

function Notification() {
  const [notificacoes, setNotificacoes] = useState([]);
  const response = [{ "id": 1, "notificationType": "GROUP", "message": "Atenção! Problema detectado.", "description": "Foi identificado um problema no sistema que pode afetar a sua experiência. Por favor, aguarde enquanto trabalhamos para solucioná-lo.", "date": "2023-05-01T10:30:00", "user": { "id": 1, "name": "João da Silva" } }, { "id": 2, "notificationType": "EVENT", "message": "Novo recurso disponível!", "description": "Acabamos de adicionar uma nova funcionalidade ao sistema. Acesse a página de recursos para mais informações.", "date": "2023-04-30T15:20:00", "user": { "id": 2, "name": "Maria Souza" } }, { "id": 3, "notificationType": "FRIEND_REQUEST", "message": "Aviso importante!", "description": "Atenção! Fique atento às mudanças na política de privacidade que entrarão em vigor no próximo mês. Consulte as atualizações na página de privacidade.", "date": "2022-05-01T10:30:00", "user": { "id": 3, "name": "José Santos" } }];

  useEffect(() => {
    setNotificacoes(response);
  }, []);


  // var idUser = 1;
  // useFetch({
  //   url: `notifies/${idUser}`,
  //   method: 'GET',
  //   headers: {
  //     'Content-Type': 'application/json'
  //   }
  // })


  const [selectedOption, setSelectedOption] = useState('hoje');

  const filteredNotifications = useMemo(() => {
    switch (selectedOption) {
      case 'hoje':
        return notificacoes.filter(notification => moment(notification.date).isSame(moment(), 'day'));
      case 'ultimos7dias':
        return notificacoes.filter(notification => moment(notification.date).isBetween(moment().subtract(7, 'days'), moment()));
      default:
        return notificacoes;
    }
  }, [selectedOption, notificacoes]);

  const handleClick = (selectedOption) => {
    setSelectedOption(selectedOption)
    console.log(selectedOption);
  };

  function clearAll(){
    var selectFilter = selectedOption;
    response.map()
    // TO DO Marcar todas as notificações do filtro como lidas 
  }

  function aceitarAmizade(){
    // TODO Aceitar amizade
  }

  function recusarAmizade(){
    // TODO Recusar amizade
  }

  return (
    <Modal
      title="Notificações"
      clearAll={true}
      icon={<MdNotificationsActive />}
      ativarBotao={false}
      onClear={()=> clearAll()}
    >
      <div>
        <div className="subtitle">
          <Tag
            temCursor="true"
            text="Hoje"
            onClick={() => handleClick('hoje')}
            isSelected={selectedOption === 'hoje' ? true : false}
          />
          <Tag
            temCursor="true"
            text="Últimos 7 dias"
            onClick={() => handleClick('ultimos7dias')}
            isSelected={selectedOption === 'ultimos7dias' ? true : false}
          />
          <Tag
            temCursor={true}
            text="Todas"
            onClick={() => handleClick('todas')}
            isSelected={selectedOption === 'todas' ? true : false}
          />
        </div>

        <div className="container">
          {filteredNotifications.map((notification) => (
            <React.Fragment key={notification.id}>

              {notification.notificationType === 'FRIEND_REQUEST' && (
                <CardNotification
                  title={notification.user.name}
                  icon={<BsPersonHeart />}
                  message={notification.message}
                  date={moment(notification.date).format('DD/MM/YYYY')}
                  time={moment(notification.date).format('HH:mm')}
                  temFooter={true}
                >
                  <Tag text="Aceitar" onClick={()=> aceitarAmizade()}/>
                  <Tag text="Recusar" onClick={()=> recusarAmizade()}/>
                </CardNotification>
              )}

              {notification.notificationType === 'EVENT' && (
                <CardNotification
                  title={notification.user.name}
                  icon={<HiClock />}
                  message={notification.message}
                  date={moment(notification.date).format('DD/MM/YYYY')}
                  time={moment(notification.date).format('HH:mm')}
                  temFooter={false}
                />
              )}

              {notification.notificationType === 'GROUP' && (
                <CardNotification
                  title={notification.user.name}
                  icon={<MdGroups />}
                  message={notification.message}
                  date={moment(notification.date).format('DD/MM/YYYY')}
                  time={moment(notification.date).format('HH:mm')}
                  temFooter={false}
                />
              )}

            </React.Fragment>
          ))}
        </div>
      </div>
          </Modal >
        );
}

export default Notification;


