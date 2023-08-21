import React from 'react'
import { useSelector } from 'react-redux'
import styles from './posts.module.css'
import SpinnerLoader from './SpinnerLoader'
import CardPostHome from "./CardPostHome.jsx";
import { Link } from 'react-router-dom';

const Posts = () => {
    const { posts, isLoading } = useSelector(state => state.posts)
    const { username,userId } = useSelector(state => state.user)

    if (!posts) return

    return (
        <div className={styles.container_posts}>
            <div className={styles.hero} >
                <h1>¡Bienvenido {username}!</h1>
                <Link to={'/create-post'}>New entry</Link>
            </div>
            <h2>Mis blogs</h2>
            <div className={styles.wrapper_posts}>
                {
                    isLoading && <SpinnerLoader />
                }
                
                {
                    (posts && !isLoading) && posts.filter(post=>post.user.id === userId ).map((post,index) => (<CardPostHome key={index} post={post} />))
                }
            </div>
        </div >
    )
}

export default Posts
