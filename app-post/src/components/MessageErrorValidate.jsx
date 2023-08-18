import React from 'react'
import style from '../pages/register.module.css'

const MessageErrorValidate = ({ message = [] }) => {
    return (
        <div className={style.message_error}>
            {
                message.map((message, index) => (<p key={index}>* {message}</p>))
            }
        </div>
    )
}

export default MessageErrorValidate
