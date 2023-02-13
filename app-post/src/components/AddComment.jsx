import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { addCommentToPost } from '../thunks/thunks'
import './commentsUser.css'

const initialState = {
    content: ""
}
// Componente para agregar un nuevo comentario
const AddComment = () => {
    // Estado para el contenido del comentario a agregar
    const [contentToAdd, setContentToAdd] = useState(initialState)
    // Acceder al estado de tema oscuro
    const { darkMode } = useSelector(state => state.theme)
    // Acceder al dispatch para ejecutar acciones
    const dispatch = useDispatch()

    // Obtener el ID del post desde los parámetros de la ruta
    const { idPost } = useParams()

    // Función que maneja el cambio en la entrada de texto para el contenido del comentario
    const handleChange = (e) => setContentToAdd({ content: e.target.value })

    // Función que maneja la presentación del formulario para agregar un comentario
    const handleSubmit = (e) => {
        e.preventDefault()
        // Ejecutar la acción de agregar comentario
        dispatch(addCommentToPost({ idPost, contentToAdd }))
        // Establecer el contenido del comentario de nuevo en su estado inicial
        setContentToAdd(initialState)
    }
    return (
        <div className={`container-add-comment ${darkMode ? 'container-add-comment-dark' : ''}`}>
            <div className='wrapper-comment'>
                <form onSubmit={handleSubmit}>
                    <textarea placeholder='Write a comment...' value={contentToAdd.content} onChange={handleChange} />
                    <button><FontAwesomeIcon icon="fa-solid fa-paper-plane" /></button>
                </form>
            </div>
        </div>
    )
}

export default AddComment
