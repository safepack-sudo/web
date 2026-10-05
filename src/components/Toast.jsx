import React from 'react';

export default function Toast({ message, visible }) {
  return (
    <div className={`toast ${visible ? 'show' : ''}`} id="toast">
      <i className="fa-solid fa-circle-check"></i> {message}
    </div>
  );
}
