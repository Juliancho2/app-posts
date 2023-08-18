import React from 'react'
import styles from './cardPostHome.module.css'
import { dateFormatter } from '../utils/dateFormatter'
import { Link } from 'react-router-dom'
import { addLikeToPost } from '../thunks/thunks'
import { setLikes } from '../slice/postSlice'
import { useDispatch, useSelector } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { truncateString } from '../utils/truncateString'
import TagItem from './TagItem'

const CardPostHome = ({ post }) => {
    const dispatch = useDispatch()
    const { darkMode } = useSelector(state => state.theme)
    const { username, userId } = useSelector(state => state.user)
    const { id,
        content,
        comments,
        likesBy,
        user,
        date,
        cover,
        likesNumber,
        title } = post

    const handleLike = (id) => {
        // Se dispacha la acción para agregar un like a un post
        dispatch(addLikeToPost(id));
        // Se dispacha la acción para establecer los likes del post
        dispatch(setLikes({ id, userId }));
        // Se actualiza el estado de isActive
        setIsActive((prev) => !prev)
    }
    
    return (

        <div className={styles.card}>
            <Link to={`/post/${id}`} style={{ textDecoration: 'none' }}>
                <div className={styles.card_img}>
                    <img src={'http://localhost:3001/' + cover} alt={cover} />
                </div>
            </Link>
            <div className={styles.card_body}>
                <h4>{title}</h4>
                <p dangerouslySetInnerHTML={{__html:truncateString(content,200)}}>
                </p>
            </div>
            <div style={{display:'flex',gap:'5px',padding:'5px 10px'}}>
                {
                    post.tags.length > 0 && post.tags.map((tag)=>(<TagItem tag={tag}/>))
                }
            </div>
            <div className={styles.card_footer}>
                <div className={styles.card_user}>
                    <img src={user.avatar} alt="" />
                    <div>
                        <p>{username}</p>
                        <small>{dateFormatter(date)}</small>
                    </div>
                </div>

                <div className={`${styles.card_actions} ${darkMode ? styles.card_actions__dark : ''}`}>
                    <p className={styles.card_comments}>
                        <FontAwesomeIcon icon="fa-regular fa-comment" />
                        <small>{comments.length}</small>
                    </p>
                    <p onClick={() => handleLike(id)} className={`${styles.card_likes} ${likesBy.includes(userId) ? styles.active_like : ''}`} >
                        <FontAwesomeIcon icon="fa-solid fa-heart" />
                        <small>{likesNumber}</small>
                    </p>
                </div>
            </div>
        </div>

    )
}

export default CardPostHome
