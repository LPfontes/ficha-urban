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
  checked,
  ...props
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
      defaultValue={value}
      defaultChecked={checked}
      {...props}
    />
  );
};

export default AbsoluteInput;