import React from "react";
import { RiCloseLine, RiDeleteBinLine } from "react-icons/ri";
import "../../assets/global.css";
import "./style.css";
import Button from '../Button';

function Modal(props) {
  const { onClose, title, clearAll, icon, children, textButton, iconButton, ativarBotao, temFooter, onClear, onClickButton } = props;

  return (
    <div className="modal-modal">
      <div className="modal-overlay" onClick={onClose} />
      <div className="modal-modal-content">
        <div className="modal-modal-header">
          <div className="modal-modal-group">
            {icon && icon}
            <p className="modal-modal-title">{title}</p>
          </div>
          <div className="modal-modal-group">
            {clearAll && (
              <div className="modal-modal-clear-all" onClick={onClear}>
                <span>Limpar tudo</span>
                <RiDeleteBinLine />
              </div>
            )}
            <button className="modal-close-btn" onClick={onClose}>
              <RiCloseLine />
            </button>
          </div>
        </div>
        <div className="modal-modal-body">{children}</div>
        {temFooter && (
          <div className="modal-modal-footer">
            {ativarBotao && (
              <Button text={textButton} icon={iconButton} onClick={onClickButton} />
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Modal;