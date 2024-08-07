import React from "react";
import "./Button.css";

function Button({ text, ...props }) {
  return <button {...props}>{text}</button>;
}

export default Button;
