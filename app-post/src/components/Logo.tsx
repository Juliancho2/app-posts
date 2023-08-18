import React from 'react'
import img from "../assets/Creative_Color_Brushstroke_Lettering_Logo-removebg-preview.png"
import { Link } from 'react-router-dom'

const Logo = () => {
    return (
        <>
            <Link to={'/'}>
                <img src={img} alt="" />
            </Link>
        </>
    )
}

export default Logo
