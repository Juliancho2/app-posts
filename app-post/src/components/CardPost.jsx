import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useLocation } from 'react-router-dom'
import { setLikes } from '../slice/postSlice'
import { addLikeToPost, deletePost } from '../thunks/thunks'
import './cardPost.css'

const CardPost = ({ posts }) => {
    const [isActive, setIsActive] = useState(false)
    // Se obtiene el usuario actual desde el store de usuario
    const { username, userId } = useSelector(state => state.user)
    // Se desestructura la información de cada post
    const { id, content, comments, likesBy, user, date, img, likesNumber } = posts
    // Se obtiene el estado del modo oscuro desde el store de tema
    const { darkMode } = useSelector(state => state.theme)
    // Se obtiene la ubicación actual de la página
    const { pathname } = useLocation()
    const dispatch = useDispatch()


    // Se formatea la fecha para su visualización
    const dateFormatted = new Date(date)
    // Se verifica si existe un usuario asociado al post y su nombre de usuario
    if (!user || !user.username) return null;
    // Se formatea el primer caracter del nombre de usuario a mayúscula
    const firstCapitalLetterUsername = user.username.charAt(0).toUpperCase() + user.username.substring(1)

    // Función que maneja la acción de dar like a un post
    const handleLike = (id) => {
        // Se dispacha la acción para agregar un like a un post
        dispatch(addLikeToPost(id))
        // Se dispacha la acción para establecer los likes del post
        dispatch(setLikes({ id, userId }))
        // Se actualiza el estado de isActive
        setIsActive((prev) => !prev)
    }
    // Función que maneja la acción de eliminar un post
    const handleRemovePost = (id) => {
        // Se dispacha la acción para eliminar un post
        dispatch(deletePost(id))
    }

    return (
        <div className={`card ${darkMode ? 'card-dark-mode' : ''}`}>
            <div className={`container-icon-remove ${user.username !== username || pathname !== `/page` ? "hidden-post" : ''}`} onClick={() => handleRemovePost(id)}>
                <FontAwesomeIcon icon="fa-regular fa-square-minus" />
            </div>
            <div className={`user-post ${darkMode ? 'user-post-dark-mode' : ''}`}>
                <img src={user.avatar} alt="" />
                <h5>{firstCapitalLetterUsername}</h5>
                <p>{dateFormatted.getMonth() + 1}/{dateFormatted.getDate()}/{dateFormatted.getFullYear()} {dateFormatted.getHours()}:{dateFormatted.getMinutes().toString().padStart(2, '0')}</p>
            </div>
            <div className='content-total-post'>
                {
                    img && (
                        <div className='container-img-post'>
                            <img src={img} alt="" />
                        </div>
                    )
                }
                <p className={`card-content ${darkMode ? 'card-content-dark' : ''}`}>{content.charAt(0).toUpperCase() + content.substring(1)}</p>

            </div>
            <div className={`card-actions ${darkMode ? 'card-actions-dark' : ''}`}>
                <p className="card-comments">
                    <Link to={`/page/post/comments/${id}`} ><FontAwesomeIcon icon="fa-regular fa-comment" /></Link>
                    <small>{comments.length}</small>
                </p>
                <p onClick={() => handleLike(id)} className={`card-likes ${likesBy.includes(userId) ? 'active-like' : ''}`} >
                    <FontAwesomeIcon icon="fa-solid fa-heart" />
                    <small>{likesNumber}</small>
                </p>
            </div>
        </div>
    )
}

export default CardPost
