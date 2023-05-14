import React, { useState } from "react";
import Modal from '../../components/Modal';
import { FaAmazon as FaAmazon } from 'react-icons/fa';
import { FaSearch as FaSearch } from 'react-icons/fa';
import Button from '../../components/Button'

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
        <Modal
          onClose={handleCloseModal}
          title="Modal Teste"
          clearAll={true}
          icon={<FaAmazon />}
          ativarBotao={true}
          textButton="Action"
          iconButton={<FaSearch/>}
        >
            <div>
            <p>Aqui fica o conteudo</p>
            </div>
        </Modal>
      )}
        <Button text="Search" icon={<FaSearch />} />
    </div>
  );
}

export default Teste;

