import React, { useEffect, useState } from 'react';
import { FiAlertCircle, FiCheckCircle, FiInfo, FiLoader } from 'react-icons/fi';
import './style.css';

const Toast = ({ type, message, onClose }) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(true);
    const timer = setTimeout(() => {
      setShow(false);
      onClose();
    }, 7000);

    return () => {
      clearTimeout(timer);
    };
  }, [onClose]);

  var icon;
  switch (type) {
    case 'sucesso':
      icon = <FiCheckCircle className="toast-icon" />;
      break;
    case 'erro':
      icon = <FiAlertCircle className="toast-icon" />;
      break;
    case 'carregando':
      icon = <FiLoader className="toast-icon toast-icon--spin" />;
      break;
    default:
      icon = <FiInfo className="toast-icon" />;
  }

  return (
    <div className={`toast toast--${type} ${show ? 'show' : ''}`}>
      <div className="toast-icon-wrapper">{icon}</div>
      <div className="toast-message">{message}</div>
    </div>
  );
};

export default Toast;