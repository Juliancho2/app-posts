import React, { useState } from 'react'
import DropdownMenu from './DropdownMenu'
import './header.css'
import { Link, useNavigate } from 'react-router-dom'

const Header = () => {
    const [search, setSearch] = useState("")
    const navigate = useNavigate()

    // Se actualiza el estado local con el valor ingresado en el input
    const handleSearch = (e) => {
        setSearch(e.target.value)
    }
    // Se hace una búsqueda con los datos ingresados y se navega a la página de resultados de búsqueda
    const handleSubmitSearch = (e) => {
        e.preventDefault()
        navigate(`/page/search/${search}`)
    }


    return (
        <div className='containe_header'>
            <div className='content-left'>
                <Link to={'/page'}><h5>PostHive</h5></Link>
                <div className='input-header'>
                    <form onSubmit={handleSubmitSearch}>
                        <input type="text" placeholder='Search publish...' value={search} onChange={handleSearch} />
                    </form>
                </div>
            </div>
            <div className='content-right'>
                <DropdownMenu />
            </div>
        </div>
    )
}

export default Header
