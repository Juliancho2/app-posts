import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import AddComment from '../components/AddComment'
import CardPost from '../components/CardPost'
import CommentsUser from '../components/CommentsUser'
import Header from '../components/Header'
import Loader from '../components/Loader'
import SpinnerLoader from '../components/SpinnerLoader'
import { fetchPostComments } from '../thunks/thunks'
import './commentsDetails.css'


const CommentsDetails = () => {
    const { postComments, posts, isLoading } = useSelector(state => state.posts)
    const { darkMode } = useSelector(state => state.theme)
    const dispatch = useDispatch()
    const { idPost } = useParams()

    // Utilizamos un efecto para obtener los comentarios del post actual
    useEffect(() => {
        dispatch(fetchPostComments(idPost))
    }, [dispatch, idPost])

    // Encontramos el post  buscándolo en el arreglo de posts
    const postDetail = posts.find(item => item.id === idPost)

    return (
        <div className={`container-comments-details ${darkMode ? 'container-comments-details-dark' : ''}`}>
            <Header />
            <div className='arrow-left'>
                <Link to={'/page'}><FontAwesomeIcon icon="fa-solid fa-arrow-left" /></Link>
            </div>
            {
                !postDetail && <Loader />
            }
            <main>
                <div>
                    {
                        postDetail && <CardPost posts={postDetail} />
                    }
                </div>
                <div className='container-comments'>
                    <h3>Comments:</h3>
                    {
                        (postComments.length === 0 && !isLoading) && <h2>See the first to comment</h2>
                    }
                    {
                        isLoading && < SpinnerLoader />
                    }
                    {
                        (postComments && !isLoading) && postComments.map(comment => (<CommentsUser post={postDetail} key={comment.id} comment={comment} />))
                    }
                    <AddComment />
                </div>
            </main>
        </div>
    )
}

export default CommentsDetails
