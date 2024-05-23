// button.tsx
import React from "react";

interface ButtonProps {
  onClick: () => void;
  imageUrl: string;
}

const Button: React.FC<ButtonProps> = ({ onClick, imageUrl }) => {
  return (
    <button
      onClick={onClick}
      style={{
        borderRadius: "50%",
        width: "50px",
        height: "50px",
        overflow: "hidden",
        backgroundColor: "transparent",
        border: "none",
        padding: 0,
        cursor: "pointer",
      }}
    >
      <img
        src={imageUrl}
        alt="Random Image"
        style={{ width: "100%", height: "100%", objectFit: "cover" }}
      />
    </button>
  );
};

export default Button;