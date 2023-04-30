import React, { useState } from "react";
import Modal from '../../components/Modal';
import { FaSearch as FaSearch } from 'react-icons/fa';
import Button from '../../components/Button'
import Tag from '../../components/Tag'
import { MdNotificationsActive as MdNotificationsActive } from 'react-icons/md';
import Notification from '../../components/Notification';


function Teste() {
  const [showModal, setShowModal] = useState(false);

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div>
      <button onClick={handleOpenModal}>Open Modal</button>
      {showModal && (
        <Notification/>
        // <Modal
        //   onClose={handleCloseModal}
        //   title="Notificações"
        //   clearAll={true}
        //   icon={<MdNotificationsActive />}
        //   ativarBotao={true}
        //   textButton="Action"
        //   iconButton={<FaSearch/>}
        // >
        //     <div>Teste</div>
        //     <div>
        //     <p>Aqui fica o conteudo</p>
        //     </div>
        // </Modal>
      )}
        <Button text="Search" icon={<FaSearch />} />
        <Tag text='Hello'/> <Tag text='Hello'/>
    </div>
  );
}

export default Teste;

