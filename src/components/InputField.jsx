import React from 'react';

const InputField = ({ value, onChange, placeholder, type = 'text' }) => (
    <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="border border-gray-300 rounded-lg px-4 py-2 w-full mb-2"
    />
);

export default InputField;
