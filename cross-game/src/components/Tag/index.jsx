import React from "react";
import "../../assets/global.css";
import "../Tag/tag.css";


function Tag(props) {
  const {text, color, backgroundColor, temCursor, onClick, isSelected} = props;
  const cursorPointer = temCursor ? 'pointer' : ''

  const tagClassName = isSelected ? 'tag_selected' : 'tag';
  
  return (
    <>
    <p className={tagClassName} style={{ color: color, backgroundColor: backgroundColor, cursor: cursorPointer}} onClick={onClick}> {text}</p>
    </>
  );
}

export default Tag;