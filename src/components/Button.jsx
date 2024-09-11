import React from 'react';

const Button = ({ onClick, color, children }) => (
    <button
        onClick={onClick}
        className={`text-white px-4 py-2 rounded-lg shadow hover:${color} ${color}`}
    >
        {children}
    </button>
);

export default Button;
