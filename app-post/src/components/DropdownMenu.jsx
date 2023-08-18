import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../slice/userslice';
import { Link } from 'react-router-dom';
import styles from './dropdownMenu.module.css'

const DropdownMenu = () => {
    // Se utiliza dispatch de la libreria de Redux para despachar acciones
    const [showMenu, setShowMenu] = useState(false)
    const { isLoggedIn } = useSelector(state => state.user)

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
        <div className={styles.dropdown_menu}>
            <div className={styles.dropdown_menu_toggle} onClick={() => setShowMenu(!showMenu)}>

                <img src={userState.avatar} alt="" />

            </div>
            {showMenu && (
                <ul className={styles.dropdown_menu_list}>
                    <Link to={'/'}>Home</Link>
                    <Link to={'/page'}>My blogs</Link>
                    <li className={styles.dropdown_menu_item} onClick={handleLogOut}>Logout</li>

                </ul>
            )}
        </div>
    );
};

export default DropdownMenu;
