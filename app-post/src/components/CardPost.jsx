import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { setLikes } from '../slice/postSlice'
import { addLikeToPost, deletePost } from '../thunks/thunks'
import styles from './cardPost.module.css'
import { dateFormatter } from '../utils/dateFormatter'

const CardPost = ({ posts }) => {
    // Se obtiene el usuario actual desde el store de usuario
    const { isLoggedIn, userId } = useSelector(state => state.user)
    // Se desestructura la información de cada post
    const { id, content, comments, likesBy, user, date, cover, likesNumber, title } = posts
    // Se obtiene el estado del modo oscuro desde el store de tema
    const { darkMode } = useSelector(state => state.theme)

    const dispatch = useDispatch()

    // Se verifica si existe un usuario asociado al post y su nombre de usuario
    if (!user || !user.username) return null;
    // Se formatea el primer caracter del nombre de usuario a mayúscula
    // const firstCapitalLetterUsername = user.username.charAt(0).toUpperCase() + user.username.substring(1)

    // Función que maneja la acción de dar like a un post
    const handleLike = (id) => {
        // Se dispacha la acción para agregar un like a un post
        dispatch(addLikeToPost(id));
        // Se dispacha la acción para establecer los likes del post
        dispatch(setLikes({ id, userId }));
    }
    // Función que maneja la acción de eliminar un post
    const handleRemovePost = (id) => {
        dispatch(deletePost(id))
    }

    return (
        <div className={`${styles.card} ${darkMode ? styles.card_dark_mode : ''}`}>
            <div className={styles.content_total__post}>
                <h2>{title}</h2>
                <div className={styles.card_links}>
                    <div>
                        <small>Por: {posts.user.username}</small> /
                        <small>{dateFormatter(posts.date)}</small>
                    </div>
                    {
                        (isLoggedIn && userId === posts.user.id) && <div className={styles.card_btn__edit}>
                            <FontAwesomeIcon onClick={() => handleRemovePost(id)} icon="fa-regular fa-trash-can" />
                            <FontAwesomeIcon icon="fa-regular fa-pen-to-square" />
                        </div>
                    }

                </div>
                {
                    cover && (
                        <div className={styles.container_img__post}>
                            <img src={import.meta.env.VITE_API_BASE_URL + '/' + cover} alt="" />
                        </div>
                    )
                }
                <div className={`${styles.card_content} ${darkMode ? styles.card_content__dark : ''}`} dangerouslySetInnerHTML={{ __html: content }}>

                </div>

            </div>
            <div className={`${styles.card_actions} ${darkMode ? styles.card_actions__dark : ''}`}>
                <p className={styles.card_comments}>
                    <FontAwesomeIcon icon="fa-regular fa-comment" />
                    <small>{comments.length}</small>
                </p>
                {
                    isLoggedIn && (
                        <p onClick={() => handleLike(id)} className={`${styles.card_likes} ${likesBy.includes(userId) ? styles.active_like : ''}`} >
                            <FontAwesomeIcon icon="fa-solid fa-heart" />
                            <small>{likesNumber}</small>
                        </p>
                    )
                }
            </div>
        </div>
    )
}

export default CardPost
