import React from "react";

const Button = ({ children }) => {
  return (
    <button style={{ background: "blue", color: "white", padding: "10px" }}>
      来自 App2 的按钮: {children}
    </button>
  );
};

export default Button;
