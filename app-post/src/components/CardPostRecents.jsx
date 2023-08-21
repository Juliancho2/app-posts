import React from 'react'
import styles from '../pages/homepage.module.css'
import { dateFormatter } from '../utils/dateFormatter'
import { truncateString } from '../utils/truncateString'
import TagItem from './TagItem'

const CardPostRecents = ({post}) => {
    return (
        <div style={{ display: 'flex' }}>
            <div className={styles.container_img}>
                <img style={{ width: "100%" }} src={'https://posts-c4xu.onrender.com/' + post.cover} alt="" />
            </div>
            <div className={styles.post_recents_text} style={{ display: 'flex', gap: '8px', flexDirection: 'column', padding: '20px 30px' }}>
                <small>{post.user.username} | {dateFormatter(post.date)}</small>
                <h2>{post.title}</h2>
                <p dangerouslySetInnerHTML={{ __html: truncateString(post.content, 100) }}></p>
                <div style={{ display: 'flex', gap: '5px', width: '100%' }}>
                    {
                        post.tags.map((tag,index) => (<TagItem key={index} tag={tag} />))
                    }
                </div>
            </div>
        </div>
    )
}

export default CardPostRecents
