// src/components/AbsoluteInput.jsx
import React from 'react';

const AbsoluteInput = ({ 
  top, 
  left, 
  width, 
  height, 
  type = "text", 
  className = "", 
  placeholder = "",
  value,
  onChange 
}) => {
  const style = {
    top: `${top}px`,
    left: `${left}px`,
    width: width ? `${width}px` : undefined,
    height: height ? `${height}px` : undefined,
  };

  const baseClass = type === 'checkbox' ? 'check-box' : 'field';

  return (
    <input
      type={type}
      style={style}
      className={`${baseClass} ${className}`}
      placeholder={placeholder}
      // Se você quiser gerenciar o estado (controlado), passe value/onChange
      // Se for apenas visual para impressão, pode deixar sem (não controlado)
    />
  );
};

export default AbsoluteInput;