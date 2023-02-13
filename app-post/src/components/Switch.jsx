import { useDispatch, useSelector } from "react-redux"
import React, { useState } from 'react';
import './switch.css';
import { setTheme } from '../slice/themeSlice';

const Switch = () => {
    const { darkMode } = useSelector(state => state.theme)
    const dispatch = useDispatch()
    const handleTheme = () => {
        dispatch(setTheme(!darkMode))
        localStorage.setItem('darkMode', !darkMode)
    }


    return (
        <label className="switch">
            <input type="checkbox" checked={darkMode} onChange={handleTheme} />
            <span className="slider"></span>
        </label>
    );
};

export default Switch;