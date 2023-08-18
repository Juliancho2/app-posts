import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteComment } from '../thunks/thunks'
import styles from './commentsUser.module.css'

const CommentsUser = ({ comment, post }) => {
    // Se obtiene el nombre de usuario del estado de la aplicación
    const { username } = useSelector(state => state.user)

    // Se obtiene el modo oscuro (dark mode) desde el estado de la aplicación
    const { darkMode } = useSelector(state => state.theme)

    // Se desestructura la información del comentario (id, autor, contenido y fecha)
    const { id, author, content, date } = comment
    const dispatch = useDispatch()

    const handleRemoveComment = (id) => {
        // Se ejecuta la acción para eliminar el comentario, y se le pasa el id y el id del post al que pertenece el comentario
        dispatch(deleteComment({ id, postId: post.id }))
    }
    const dateFormatted = new Date(date)
    return (
        <div className={`${styles.container_comments__user} ${darkMode ? styles.container_comments__user__dark : ''}`}>
            <div className={`${styles.container_icon__remove___comment} ${author !== username ? styles.hidden_post : ''}`} >
                <FontAwesomeIcon onClick={() => handleRemoveComment(id)} icon="fa-regular fa-square-minus" />
            </div>
            <div className={styles.comment_content}>
                <div className={styles.comment_info__user}>
                    <img src='https://secure.gravatar.com/avatar/4c937fcd9d5af30251f03827d87fadfd?s=50&d=mm&r=g' alt="" />
                    <div>
                        <p>{author}</p>
                        <small>{dateFormatted.getMonth() + 1}/{dateFormatted.getDate()}/{dateFormatted.getFullYear()} {dateFormatted.getHours()}:{dateFormatted.getMinutes().toString().padStart(2, '0')}</small>
                    </div>
                </div>
                <p>{content}</p>
            </div>
        </div>
    )
}

export default CommentsUser
