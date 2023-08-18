import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './inputSearch.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { fetctSearchPosts } from '../thunks/thunks'
import { setPosts } from '../slice/searchPostSlice'

const InputSearch = () => {
    const [search, setSearch] = useState("")
    const {posts,error,isLoading}=useSelector(state=>state.postSearch)
    const dispatch= useDispatch();
    const navigate = useNavigate()
    const dispath= useDispatch()

    // Se actualiza el estado local con el valor ingresado en el input
    const handleSearch = (e) => {
        setSearch(e.target.value)
    }
    // Se hace una búsqueda con los datos ingresados y se navega a la página de resultados de búsqueda
    const handleSubmitSearch = (e) => {
        e.preventDefault()
        dispath(fetctSearchPosts(search))
    }
    useEffect(()=>{
        if(posts.length > 0){
            navigate(`/post/${posts[0].id}`)
        }
        return ()=>{
            dispatch(setPosts());
        }
    },[posts.length])
    return (
        <div className={styles.input_header}>
            <form onSubmit={handleSubmitSearch}>
                <input type="text" placeholder='Search publish...' value={search} onChange={handleSearch} />
                <button>Search</button>
            </form>
        </div>
    )
}

export default InputSearch
