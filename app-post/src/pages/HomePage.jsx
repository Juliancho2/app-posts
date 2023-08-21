import React from 'react'
import styles from './homepage.module.css'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import InputSearch from '../components/InputSearch'
import Index from '../layout/Index'
import SpinnerLoader from '../components/SpinnerLoader'
import CardPostRecent from '../components/CardPostRecent'
import CardPostRecents from '../components/cardPostRecents'


const HomePage = () => {
    const { posts, isLoading } = useSelector(state => state.posts)

    return (
        <Index>
            <div className={`${styles.container} animate-loadItem`}>
                <div className={styles.hero}>
                    <h2> <span>¡Bienvenido a posthive!</span> <br />  Aquí encontrarás un espacio para compartir ideas, descubrir historias y   <br />conectarte con personas afines.</h2>
                    <small>Únete y comienza a explorar el mundo a través de los ojos de otros!</small>
                    <InputSearch />
                </div>

                <div>
                    <h3>Entradas recientes</h3>
                    <div className={styles.container_grid}>
                        {
                            isLoading && <SpinnerLoader />
                        }
                        {
                            !isLoading && (
                                [...posts].slice(0, 1).map((post,index) => (
                                    <Link key={index} to={`/post/${post.id}`} className={styles.post_recent} >
                                        <CardPostRecent post={post} />
                                    </Link>
                                ))
                            )
                        }
                        {
                            !isLoading && (
                                [...posts].slice(1, 4).map((post,index) => (
                                    <Link key={index} to={`/post/${post.id}`} className={styles.post_recents}>

                                        <CardPostRecents post={post} />
                                    </Link>
                                ))
                            )
                        }

                    </div>
                </div>
            </div>
        </Index>


    )
}

export default HomePage
