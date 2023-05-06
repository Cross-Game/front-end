import React from "react";
import { RiCloseLine, RiDeleteBinLine } from "react-icons/ri";
import "../../assets/global.css";
import "./style.css";
import Button from '../Button'

function Modal(props) {
  const { onClose, title, clearAll, icon, children, textButton, iconButton, ativarBotao } = props;

  return (
    <div className="modal">
      <div className="modal-content">
        <div className="modal-header">

            <div className="group">
            {icon && icon}
            <p className="title">{title}</p>
            </div>

            <div className="group">
            {clearAll && (
            <div className="clear-all">
              <span>Limpar tudo</span>
              <RiDeleteBinLine />
            </div>
            )}
          <button className="close-btn" onClick={onClose}>
            <RiCloseLine />
          </button>
          </div>
        </div>
        <div className="modal-body">{children}</div>
        <div className="modal-footer">
            {ativarBotao && (
            <Button text={textButton} icon={iconButton} />
            )}
        </div>
      </div>
    </div>
  );
}

export default Modal;