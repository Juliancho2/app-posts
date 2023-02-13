import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import CardPost from '../components/CardPost'
import Header from '../components/Header'
import SpinnerLoader from '../components/SpinnerLoader'
import { fetctSearchPosts } from '../thunks/thunks'
import './searchposts.css'

const SearchPosts = () => {
    const { posts, isLoading } = useSelector(state => state.postSearch)
    const params = useParams()
    const dispatch = useDispatch()
    const { content } = params

    //uso de un efecto para traer los resultados de busqueda segun el contenido del parametro
    useEffect(() => {
        dispatch(fetctSearchPosts(content))
    }, [content, posts.likesNumber])

    return (
        <div className='container-search-posts'>
            <Header />
            <div className='results-search'>
                {
                    isLoading && <SpinnerLoader />
                }
                {
                    posts.length === 0 && <h3>Search not found :(</h3>
                }
                {
                    (posts && !isLoading) && posts.map(post => (<CardPost key={post.id} posts={post} />))
                }
            </div>
        </div>
    )
}

export default SearchPosts
