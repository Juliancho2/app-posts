import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addPost } from '../thunks/thunks'

import './createPost.css'
const initialState = {
    content: "",
    imgPost: ""
}
const CreatePost = () => {
    // Estado para almacenar la información del nuevo post
    const [newPost, setNewPost] = useState(initialState)

    // Se obtiene el dispatch de Redux para ejecutar acciones
    const dispatch = useDispatch()

    // Función para manejar el cambio de los inputs
    const handleChange = (e) => {
        setNewPost({
            ...newPost,
            [e.target.name]: e.target.value
        })
    }
    // Función para manejar el envío del formulario
    const handleSubmit = async (e) => {
        e.preventDefault()

        // Se dispacha la acción de agregar el post
        dispatch(addPost(newPost))
        // Se reinicia el estado a su estado inicial
        setNewPost(initialState)
    }
    return (
        <div className='container_post'>
            <div className="wrapper_post">
                <form onSubmit={handleSubmit}>

                    <textarea required name='content' value={newPost.content} onChange={handleChange} placeholder='What do you think?'></textarea>
                    <input type="url" name='imgPost' value={newPost.imgPost} onChange={handleChange} placeholder='https://www.image.com/' />

                    <br />
                    <button>Publish</button>
                </form>
            </div>
        </div>
    )
}

export default CreatePost
