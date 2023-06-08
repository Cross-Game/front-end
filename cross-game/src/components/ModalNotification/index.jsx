import React, { useEffect, useRef } from "react";
import { RiCloseLine, RiDeleteBinLine } from "react-icons/ri";
import "../../assets/global.css";
import "./style.css";
import Button from "../Button";

function ModalNotification(props) {
  const {
    onClose,
    title,
    clearAll,
    icon,
    children,
    textButton,
    iconButton,
    ativarBotao,
    temFooter,
    onClear,
    onClickButton,
  } = props;

  const modalRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  return (
    <div className="modal-modalNotification">
      <div className="modal-modalNotification-content" ref={modalRef}>
        <div className="modal-modalNotification-header">
          <div className="modal-modalNotification-group">
            {icon && icon}
            <p className="modal-modalNotification-title">{title}</p>
          </div>
          <div className="modal-modalNotification-group">
            {clearAll && (
              <div className="modal-modalNotification-clear-all" onClick={onClear}>
                <span>Limpar tudo</span>
                <RiDeleteBinLine />
              </div>
            )}
            <button className="modal-close-btn" onClick={onClose}>
              <RiCloseLine />
            </button>
          </div>
        </div>
        <div className="modal-modalNotification-body">{children}</div>
        {temFooter && (
          <div className="modal-modalNotification-footer">
            {ativarBotao && (
              <Button text={textButton} icon={iconButton} onClick={onClickButton} />
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default ModalNotification;