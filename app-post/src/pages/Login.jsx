import React from 'react'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import Loader from '../components/Loader'
import { login } from '../slice/userslice'
import loginServices from '../services/login/loginServices'
import { setToken } from '../services/postServices'
import './login.css'

const Login = () => {
    const [loader, setLoader] = useState(false) // estado para controlar la carga
    const [username, setUsername] = useState('') // estado para controlar el nombre de usuario
    const [password, setPassword] = useState('') // estado para controlar la contraseña
    const [errorMessage, setErrorMessage] = useState(null) // estado para mostrar mensaje de error

    const dispatch = useDispatch()
    const navigate = useNavigate()

    // Esta función actualiza el estado  según el campo que se este editando (username o password)
    const handleChange = (e) => {
        e.target.name === 'password' ? setPassword(e.target.value) : setUsername(e.target.value)
    }

    // Esta función se ejecuta al enviar el formulario de inicio de sesión
    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoader(true)
        try {
            // Llamamos a la función de inicio de sesión y obtenemos el usuario
            const user = await loginServices.login({
                username,
                password
            })
            // Guardamos el usuario en el almacenamiento local para mantener la sesión
            window.localStorage.setItem(
                'loggedNoteAppUser', JSON.stringify(user)
            )
            // Limpiamos los campos de nombre de usuario y contraseña
            setPassword('')
            setUsername('')
            // Disparamos la acción de inicio de sesión con el usuario obtenido
            dispatch(login(user))
            setToken(user.token)
            // Navegamos hacia la página principal
            navigate('/page')
            setLoader(false) // desactivamos la visualización del spinner
        } catch (error) {
            setLoader(false) // desactivamos la visualización del spinner

            const { response } = error
            setErrorMessage(response.data.error)
            setUsername('')
            setPassword('')
            //Despues de 5 segundos el mensaje de error vuelve a null
            setTimeout(() => {
                setErrorMessage(null)
            }, 5000)
        }


    }
    return (
        <div className='container'>
            {
                loader && <Loader />
            }

            <div>
                {
                    errorMessage && <h2 className='message-error-login'> {errorMessage}</h2>
                }
            </div>
            <div className='wrapper'>

                <h2 className='title-login'>PostHive</h2>
                <form onSubmit={handleSubmit}>
                    <input type="text"
                        placeholder='username'
                        autoComplete='username'
                        name='username'
                        value={username}
                        onChange={handleChange} />
                    <br />
                    <input type="password"
                        placeholder='password'
                        autoComplete='current-password'
                        value={password}
                        name='password'
                        onChange={handleChange}
                    />
                    <br />
                    <button>LOGIN IN</button>
                    <p>Are you not registered? <Link to='/register'>Sign up</Link></p>
                </form>
            </div>
        </div>
    )
}

export default Login
