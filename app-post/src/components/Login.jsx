import React from 'react'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import {  useNavigate } from 'react-router-dom'
import Loader from './Loader'
import { login } from '../slice/userslice'
import loginServices from '../services/login/loginServices'
import { setToken } from '../services/postServices'
import style from './login.module.css'
import user from '../assets/usuario.png'
import passwordIcon from '../assets/contraseña.png'

const Login = ({setChangeForm,setLoader}) => {
    
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
        <div className={style.container}>
            
            
            <div className={style.wrapper}>

                <h2 className={style.title_login}>Log In</h2>
                <form onSubmit={handleSubmit}>
                    <div>
                        <span>
                            <img src={user} alt="" width={20} height={20} />
                        </span>
                        <input type="text"
                            placeholder='username'
                            autoComplete='username'
                            name='username'
                            value={username}
                            onChange={handleChange} />
                    </div>
                    <br />
                    <div>
                        <span>
                            <img src={passwordIcon} alt="" width={20} height={20} />
                        </span>
                        <input type="password"
                            placeholder='password'
                            autoComplete='current-password'
                            value={password}
                            name='password'
                            onChange={handleChange}
                        />
                    </div>
                    <br />
                    <button>Log in</button>
                    <p>Are you not registered? <span onClick={()=>setChangeForm(true)}>Sign up</span></p>
                </form>
            </div>
            <div>
                {
                    errorMessage && <h2 className='message-error-login'> {errorMessage}</h2>
                }
            </div>
            
        </div>
    )
}

export default Login
