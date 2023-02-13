import React from 'react'

const MessageErrorValidate = ({ message = [] }) => {
    return (
        <div className='message-error'>
            {
                message.map((message, index) => (<p key={index}>* {message}</p>))
            }
        </div>
    )
}

export default MessageErrorValidate
