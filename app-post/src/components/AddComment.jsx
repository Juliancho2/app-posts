import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { addCommentToPost } from '../thunks/thunks'
import styles from './addComment.module.css'
import Swal from 'sweetalert2'

const initialState = {
    content: ""
}
// Componente para agregar un nuevo comentario
const AddComment = () => {
    // Estado para el contenido del comentario a agregar
    const [contentToAdd, setContentToAdd] = useState(initialState)
    const [excessCharacters, setexcessCharacters] = useState(null)
    const { isLoggedIn } = useSelector(state => state.user)

    // Acceder al estado de tema oscuro
    const { darkMode } = useSelector(state => state.theme)
    // Acceder al dispatch para ejecutar acciones
    const dispatch = useDispatch()
    const navigation = useNavigate()

    // Obtener el ID del post desde los parámetros de la ruta
    const { id } = useParams()
    // Función que maneja el cambio en la entrada de texto para el contenido del comentario
    const handleChange = (e) => setContentToAdd({ content: e.target.value })


    // Función que maneja la presentación del formulario para agregar un comentario
    const handleSubmit = (e) => {
        e.preventDefault()
        if(contentToAdd.content.trim().length === 0 ){
            setexcessCharacters("No puedes un comentario vacio ")
            setTimeout(() => {
                setexcessCharacters(null)
            }, 2000)
        }
        else if (!isLoggedIn) {

            Swal.fire({
                title: 'You must register',
                showCancelButton: true,
                confirmButtonText: 'Go',
                icon: 'warning',
              }).then((result) => {
                if (result.isConfirmed) {
                  navigation('/register')
                } 
              })

        }
        else {
            
            if (contentToAdd.content.length > 60) {
                setexcessCharacters("60 characters have been exceeded")
                setTimeout(() => {
                    setexcessCharacters(null)
                }, 2000)
            }
            else {
                // Ejecutar la acción de agregar comentario
                dispatch(addCommentToPost({ id, contentToAdd }))
                // Establecer el contenido del comentario de nuevo en su estado inicial
                setContentToAdd(initialState)
            }
        }
    }
    return (
        <div id='comment' className={`${styles.container_add__comment} ${darkMode ? styles.container_add__comment___dark : ''}`}>

            <div className={styles.wrapper_comment}>
                <div className={styles.wrapper_comment__text}>
                    <h2>Deja un comentario</h2>
                    <small>Tu dirección de correo electrónico no será publicada. Los campos obligatorios están marcados con *</small>
                </div>
                <form onSubmit={handleSubmit}>
                    <textarea placeholder='Write a comment...' value={contentToAdd.content} onChange={handleChange} />
                    <button>Publicar comentario</button>
                </form>
            </div>
            
            {
                excessCharacters && <p>{excessCharacters}</p>
            }
        </div>
    )
}

export default AddComment
