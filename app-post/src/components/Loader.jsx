import React from 'react';
import './loader.css';

const Loader = ({ text }) => {
    return (
        <div className="loader-container">
            <div className="loader"></div>
            <small>{text}</small>
        </div>
    );
};

export default Loader;