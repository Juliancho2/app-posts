
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import CardPost from '../components/CardPost'
import SpinnerLoader from '../components/SpinnerLoader'
import AddComment from '../components/AddComment'
import CommentsUser from '../components/CommentsUser'
import { useDispatch, useSelector } from 'react-redux'
import { fetchPostComments } from '../thunks/thunks'
import Loader from '../components/Loader'
import styles from './postDetails.module.css'
import InputSearch from '../components/InputSearch'
import Index from '../layout/Index'

const PostDetail = () => {
    const { postComments, posts, isLoading } = useSelector(state => state.posts)
    const [loading, setLoading] = useState(false)
    const { darkMode } = useSelector(state => state.theme)
    const dispatch = useDispatch()
    const { id } = useParams()

    // Utilizamos un efecto para obtener los comentarios del post actual
    useEffect(() => {
        dispatch(fetchPostComments(id))
        
    }, [dispatch, id])
    let postDetail;
    // Encontramos el post  buscándolo en el arreglo de posts
    if (id) {
        postDetail = posts.find(item => item.id === id)
    }
    return (
        <>
            {/* {loading && <Loader />} */}
            {
                !postDetail ?
                    <>
                        <h3>This post not exist</h3>
                        <Link to={'/'}>Home</Link>
                    </>
                    :
                    <Index>
                        <div className={`${styles.container_comments__details} ${darkMode ? 'container-comments-details-dark' : ''}`}>

                            <div className={styles.main}>
                                <div>
                                    <div>
                                        {
                                            postDetail && <CardPost posts={postDetail} />
                                        }
                                    </div>
                                    <div className={styles.container_comments}>
                                        <h3>{postComments.length} comentarios en "{postDetail?.title}"</h3>
                                        {
                                            isLoading && < SpinnerLoader />
                                        }
                                        {
                                            (postComments && !isLoading) && postComments.map((comment,index) => (<CommentsUser post={postDetail} key={comment.id} comment={comment} />))
                                        }
                                        <AddComment />
                                    </div>
                                </div>
                                <div className={styles.grid_right}>
                                    <InputSearch />

                                    <ul>
                                        <h2>Entradas recientes</h2>
                                        {
                                            (postDetail && posts.length > 0) &&
                                            posts.filter(post => post.id !== postDetail.id).slice(0, 5).map((post) => (
                                                <li key={post.id}>
                                                    <Link to={'/post/' + post.id}>
                                                        {post.title}
                                                    </Link>
                                                </li>
                                            ))
                                        }
                                    </ul>
                                </div>
                            </div>
                        </div>


                    </Index>
            }
        </>
    )
}

export default PostDetail
