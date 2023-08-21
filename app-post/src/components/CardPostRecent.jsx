import React from 'react'
import styles from '../pages/homepage.module.css'
import { dateFormatter } from '../utils/dateFormatter'
import { truncateString } from '../utils/truncateString'
import TagItem from './TagItem'

const CardPostRecent = ({post}) => {
    return (
        <div >
            <div style={{ gridRow: '1/3' }}>
                <img style={{ width: "100%", height: '100%', objectFit: 'cover' }} src={import.meta.env.VITE_API_BASE_URL + '/' + post.cover} alt="" />
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
    )
}

export default CardPostRecent
