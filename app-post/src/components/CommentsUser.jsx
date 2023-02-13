import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteComment } from '../thunks/thunks'
import './commentsUser.css'

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
        <div className={`container-comments-user ${darkMode ? 'container-comments-user-dark' : ''}`}>
            <div className={`container-icon-remove-comment ${author !== username ? "hidden-post" : ''}`} >
                <FontAwesomeIcon onClick={() => handleRemoveComment(id)} icon="fa-regular fa-square-minus" />
            </div>
            <div className='comment-content'>
                <div className='comment-info-user'>
                    <img src='https://cdn4.iconfinder.com/data/icons/small-n-flat/24/user-alt-512.png' alt="" />
                    <p>{author}</p>
                </div>
                <p>{content}</p>
                <small>{dateFormatted.getMonth() + 1}/{dateFormatted.getDate()}/{dateFormatted.getFullYear()} {dateFormatted.getHours()}:{dateFormatted.getMinutes().toString().padStart(2, '0')}</small>
            </div>
        </div>
    )
}

export default CommentsUser
