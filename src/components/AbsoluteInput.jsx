// src/components/AbsoluteInput.jsx
import React from 'react';

const AbsoluteInput = ({ 
  id,
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

  if (type === 'textarea') {
    style.paddingTop ='45px';
    return (
      <textarea
        id={id}
        style={style}
        className={`field ${className}`}
        placeholder={placeholder}
        defaultValue={value}
        {...props}
      />
    );
  }

  const baseClass = type === 'checkbox' ? 'check-box' : 'field';

  return (
    <input
      id={id}
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