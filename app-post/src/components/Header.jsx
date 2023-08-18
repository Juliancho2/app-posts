import React from 'react'
import DropdownMenu from './DropdownMenu'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

import styles from './header.module.css'
import Logo from './Logo'
const Header = () => {
    const { isLoggedIn } = useSelector(state => state.user)


    return (
        <div className={styles.containe_header}>
            <div className={styles.wrapper_header}>
                <div className={styles.content_left}>
                    <Logo/>

                </div>
                <div className={styles.content_right}>
                    {
                        isLoggedIn && <DropdownMenu />
                    }
                    {
                        !isLoggedIn && (
                            <>
                                <Link to={'/login'}><h5>Log in</h5></Link>
                                <Link to={'/register'}><h5>Sign up</h5></Link>
                            </>
                        )

                    }
                </div>
            </div>
        </div>
    )
}

export default Header
