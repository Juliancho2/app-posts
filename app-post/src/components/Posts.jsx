import React from 'react'
import { useSelector } from 'react-redux'
import CardPost from './CardPost'
import './posts.css'
import SpinnerLoader from './SpinnerLoader'

const Posts = () => {
    const { posts, isLoading } = useSelector(state => state.posts)

    if (!posts) return

    return (
        <div className='container_posts'>
            {
                isLoading && <SpinnerLoader />
            }
            {
                posts.length === 0 && <h3>No hay posts</h3>
            }
            {
                (posts && !isLoading) && posts.map(post => (<CardPost key={post.id} posts={post} />))
            }
        </div>
    )
}

export default Posts
