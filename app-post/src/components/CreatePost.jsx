import React, { useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addPost } from '../thunks/thunks'

import './createPost.css'
import Header from './Header'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const initialState = {
    title: "",
    tag: []
}
const tagsInitial = [
    'Tecnología',
    'Ciencia',
    'Viajes',
    'Estilo de vida',
    'Moda',
    'Salud y bienestar',
    'Comida y cocina',
    'Arte y cultura'
]
const CreatePost = () => {
    // Estado para almacenar la información del nuevo post
    const [newPost, setNewPost] = useState(initialState)
    const [value, setValue] = useState('');
    const [file, setFile] = useState('')
    const [tags, setTags] = useState(tagsInitial)
    const ref = useRef()

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
        const data = new FormData()
        data.set('title', newPost.title)
        data.set('content', value)
        data.set('file', file[0])
        data.set('tags', newPost.tag)
        // console.log(newPost.tag)
        // Se dispacha la acción de agregar el post
        dispatch(addPost(data))
        // Se reinicia el estado a su estado inicial
        setNewPost(initialState)
        setTags(tagsInitial)
        setValue("")
        ref.current.value = null
    }
    const removeTag = (item) => {
        setNewPost({ ...newPost, tag: newPost.tag.filter(tag => tag !== item) })
        setTags([...tags, item])
    }
    const addTag = (item) => {
        const cutTags = tags.filter(tag => tag !== item)
        setNewPost({ ...newPost, tag: [...newPost.tag, item] })
        setTags(cutTags)
    }

    return (
        <div className='container_post'>
            <Header />
            <div className="wrapper_post">
                <h2>Create your post</h2>
                <form onSubmit={handleSubmit}>


                    <label htmlFor="title">Entry</label>
                    <textarea required name='title' value={newPost.title} onChange={handleChange} placeholder='What do you think?'></textarea>
                    <label htmlFor="">Img</label>
                    <input ref={ref} type="file" name='imgPost' onChange={(e) => setFile(e.target.files)} />
                    <label htmlFor="">Tags:</label>
                    <div className='container_tags'>
                        <div className='tag_select'>
                            {newPost.tag.map((item) => (
                                <p onClick={() => removeTag(item)}>{item} <FontAwesomeIcon icon="fa-regular fa-rectangle-xmark" /></p>
                            ))

                            }
                        </div>
                        <div className='tag_list'>
                            {
                                tags.map((item) => (
                                    <p onClick={() => addTag(item)}>{item} <FontAwesomeIcon icon="fa-solid fa-plus" /></p>
                                ))
                            }


                        </div>
                    </div>

                    <ReactQuill className='quill' theme="snow" value={value} onChange={setValue} />;
                        <button>Publish</button>
                </form>
            </div>
        </div>
    )
}

export default CreatePost
