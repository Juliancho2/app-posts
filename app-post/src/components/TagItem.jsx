import React from 'react'
import styles from './tagItem.module.css'

const TagItem = ({ tag }) => {
    return (
            <div className={styles.tag_item}>{tag}</div>
    )
}

export default TagItem
