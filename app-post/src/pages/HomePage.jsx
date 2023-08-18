import React, { useState } from 'react'
import styles from './homepage.module.css'
import Loader from '../components/Loader'
import { useSelector } from 'react-redux'
import Header from '../components/Header'
import { Link } from 'react-router-dom'
import InputSearch from '../components/InputSearch'
import { dateFormatter } from '../utils/dateFormatter'
import { truncateString } from '../utils/truncateString'
import TagItem from '../components/TagItem'
import Index from '../layout/Index'


const HomePage = () => {
    const [loader, setLoader] = useState(false) // estado para controlar la carga
    const { posts, isLoading } = useSelector(state => state.posts)

    return (
        <Index>
            <div className={`${styles.container} animate-loadItem`}>
                <h2>Lorem ipsum dolor sit amet consectetur <br /> adipisicing elit. Qui, optio.</h2>
                <small>Lorem, ipsum dolor sit amet consectetur adipisicing elit. <br /> Maxime voluptatem placeat vitae distinctio aperiam illo sunt voluptatum, dolor reiciendis cum?</small>
                <InputSearch />

                <h3>Recents blogs posts</h3>
                <div className={styles.container_grid}>
                    {
                        loader && <Loader />
                    }
                    {
                        !isLoading && (
                            [...posts].slice(0, 1).map(post => (
                                <Link to={`/post/${post.id}`} className={styles.post_recent} >
                                    <div >
                                        <div style={{ gridRow: '1/3' }}>
                                            <img style={{ width: "100%", height: '100%', objectFit: 'cover' }} src={'http://localhost:3001/' + post.cover} alt="" />
                                        </div>
                                        <div className={styles.post_recent__text}>
                                            <small>{post.user.username} | {dateFormatter(post.date)}</small>
                                            <h2>{post.title}</h2>
                                            <p dangerouslySetInnerHTML={{ __html: truncateString(post.content, 100) }}></p>
                                        </div>
                                        <div style={{ display: 'flex', gap: '5px' }}>
                                            {
                                                post.tags.map((tag) => (<TagItem tag={tag} />))
                                            }
                                        </div>
                                    </div>
                                </Link>
                            ))
                        )
                    }
                    {
                        !isLoading && (
                            [...posts].slice(1, 4).map(post => (
                                <Link to={`/post/${post.id}`} className={styles.post_recents}>
                                    <div style={{ display: 'flex' }}>
                                        <div className={styles.container_img}>
                                            <img style={{ width: "100%" }} src={'http://localhost:3001/' + post.cover} alt="" />
                                        </div>
                                        <div className={styles.post_recents_text} style={{ display: 'flex', gap: '8px', flexDirection: 'column', padding: '20px 30px' }}>
                                            <small>{post.user.username} | {dateFormatter(post.date)}</small>
                                            <h2>{post.title}</h2>
                                            <p dangerouslySetInnerHTML={{ __html: truncateString(post.content, 100) }}></p>
                                            <div style={{ display: 'flex', gap: '5px', width: '100%' }}>
                                                {
                                                    post.tags.map((tag) => (<TagItem tag={tag} />))
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            ))
                        )
                    }

                </div>
            </div>
        </Index>


    )
}

export default HomePage
