import React from 'react';

const Input = ({ label, type, name, ...rest }) => (
  <div style={{ width: '100%', marginBottom: '16px' }}>
    <label style={{ display: 'block', marginBottom: '8px' }}>{label}</label>
    <input
      type={type}
      name={name}
      style={{
        width: '100%',
        padding: '8px',
        fontSize: '16px',
        border: '1px solid #ccc',
        borderRadius: '4px',
      }}
      {...rest}
    />
  </div>
);

export default Input;
