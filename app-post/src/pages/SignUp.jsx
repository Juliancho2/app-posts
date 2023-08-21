import React, { useEffect, useState } from 'react'
import styles from './signUp.module.css'
import imageHome from "../assets/undraw_social_user_re_8cky.svg"
import Loader from '../components/Loader'
import { Link, useLocation } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Login from '../components/Login'
import Register from '../components/Register'

const SignUp = () => {
    const [changeForm, setChangeForm] = useState(false)
    const [loader, setLoader] = useState(false) // estado para controlar la carga
    const { pathname } = useLocation()
    useEffect(() => {
        if (pathname === '/register') setChangeForm(true)
    }, [pathname])
    return (
        <div className={styles.container}>
            <div className={styles.arrow_left} >
                <Link to={'/'}><FontAwesomeIcon icon="fa-solid fa-arrow-left" /></Link>
            </div>
            <div className={styles.left}>
                <div className={styles.wrapper}>
                    <h2>Post<span>Hive</span></h2>
                    <p>Share your thoughts, ideas, and experiences with the world. Publish, interact, and discover on our posts app!</p>
                    <img src={imageHome} alt="" width={500} height={500} />
                </div>
            </div>
            <div className={styles.right}>
                {
                    loader && <Loader />
                }
                {
                    changeForm ? (
                        <Register loader={loader} setLoader={setLoader} setChangeForm={setChangeForm} />
                    ) :
                        <Login loader={loader} setLoader={setLoader} setChangeForm={setChangeForm} />
                }

            </div>
        </div>
    )
}

export default SignUp
