import React from 'react'
import { useSelector } from 'react-redux'
import Header from '../components/Header'
import Posts from '../components/Posts'
import './home.css'
const Home = () => {
    const { darkMode } = useSelector(state => state.theme)
    return (
        <div className={`container_home ${darkMode ? 'home-dark-mode' : ''}`}>
            <Header />
            <Posts />
        </div>
    )
}

export default Home
