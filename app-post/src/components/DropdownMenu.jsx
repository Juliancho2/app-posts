import React, { useState } from 'react';
import './dropdownMenu.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../slice/userslice';
import Switch from './Switch';
const DropdownMenu = () => {
    // Se utiliza dispatch de la libreria de Redux para despachar acciones
    const [showMenu, setShowMenu] = useState(false)

    const dispatch = useDispatch()
    //Se obtiene el estado del usuaario
    const userState = useSelector(state => state.user)

    // Función para manejar el logout del usuario
    const handleLogOut = () => {
        // Se despacha la acción de logout
        dispatch(logout())
        // Se remueve el usuario del almacenamiento local
        window.localStorage.removeItem('loggedNoteAppUser')
    }

    return (
        <div className="dropdown-menu">
            <div className="dropdown-menu-toggle" onClick={() => setShowMenu(!showMenu)}>

                <img src={userState.avatar} alt="" />

            </div>
            {showMenu && (
                <ul className="dropdown-menu-list">
                    <Switch />
                    <li className="dropdown-menu-item" onClick={handleLogOut}>Logout</li>

                </ul>
            )}
        </div>
    );
};

export default DropdownMenu;