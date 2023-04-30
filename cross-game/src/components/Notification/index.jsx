import React from "react";
import "../../assets/global.css";
import { MdNotificationsActive as MdNotificationsActive } from 'react-icons/md';
import "../Notification/notification.css";
import Modal from "../Modal";
import Tag from "../Tag";
import CardNotification from "./cardNotification";

import {BsPersonHeart as BsPersonHeart } from 'react-icons/bs';
import {BsFillCalendarFill} from 'react-icons/bs';
import {MdGroups as MdGroups} from 'react-icons/md';
import {HiClock as HiClock} from 'react-icons/hi';


function Notification() {
  return (
    <Modal
          // onClose={handleCloseModal}
          title="Notificações"
          clearAll={true}
          icon={<MdNotificationsActive />}
          ativarBotao={false}
        >
            <div>
            <div className="subtitle">
              <Tag text='Hoje'/> <Tag text='Últimos 7 dias'/> <Tag text='Todas'/>
            </div>

            <div className="container">
              <CardNotification title='teste' icon={<BsPersonHeart />} message='Enviou uma solicitação de amizade' date='10/09/2002' time='10:50'/>
              <CardNotification title='teste' icon={<BsPersonHeart />} message='Enviou uma solicitação de amizade' date='10/09/2002' time='10:50'/>
              <CardNotification title='teste' icon={<BsPersonHeart />} message='Enviou uma solicitação de amizade' date='10/09/2002' time='10:50'/>
            </div>
            </div>
        </Modal>
  );
}

export default Notification;

