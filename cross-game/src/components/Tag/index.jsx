import React from "react";
import "../../assets/global.css";
import "../Tag/tag.css";


function Tag(props) {
  const {text} = props;
  return (
    <p className="tag">{text}</p>
  );
}

export default Tag;