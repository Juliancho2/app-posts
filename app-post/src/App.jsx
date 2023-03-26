
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Route, Routes, useLocation, useNavigate } from "react-router-dom"
import { ProtectRoutes } from "./components/ProtectRoutes"
import CommentsDetails from "./pages/CommentsDetails"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Register from "./pages/Register"
import { login } from "./slice/userslice"
import { setToken } from "./services/postServices"
import { fetchPosts } from "./thunks/thunks"
import SearchPosts from "./pages/SearchPosts"
import { setTheme } from "./slice/themeSlice"
import './App.css'


function App() {
  // Obtiene el estado del usuario del almacenamiento global
  const userState = useSelector(state => state.user)
  // Obtiene el estado de las publicaciones del almacenamiento global
  const { posts } = useSelector(state => state.posts)

  // Dispatcher para ejecutar acciones en el almacenamiento global
  const dispatch = useDispatch()
  // Ubicación actual de la aplicación
  const location = useLocation()
  // Función de navegación para cambiar la ruta actual
  const navigation = useNavigate()
  // Obtiene el nombre de la ruta actual
  const { pathname } = location

  useEffect(() => {
    // Obtiene el usuario autenticado almacenado en el almacenamiento local del navegador
    const loggedUserJSON = window.localStorage.getItem('loggedNoteAppUser')
    // Si existe un usuario autenticado
    if (loggedUserJSON) {
      // Convierte el JSON en un objeto de usuario
      const user = JSON.parse(loggedUserJSON)
      // Ejecuta la acción de inicio de sesión en el almacenamiento global
      dispatch(login(user))
      // Establece el token en el servicio de publicaciones
      setToken(user.token)
      // Si la ruta actual es la página principal y el usuario esta logueado, navega a la página de inicio
      if (pathname === '/') navigation('/page')
      // En caso contrario, navega a la ruta actual
      else navigation(`${pathname}`)
    }
  }, [pathname])

  useEffect(() => {
    // Ejecuta la acción de recuperar publicaciones en el almacenamiento global
    dispatch(fetchPosts())
  }, [posts.length])

  useEffect(() => {
    // Obtener el ultimo tema guardado en el localstorage
    let darkMode = window.localStorage.getItem('darkMode')
    //Convertir en valor booleano
    darkMode = JSON.parse(darkMode)
    // Ejecuta la acción de cambio de tema en el almacenamiento global
    dispatch(setTheme(darkMode))

  }, [])


  return (
    <div className="App">

      <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route element={<ProtectRoutes isAllowed={!!userState.isLoggedIn} />}>
          <Route path="/page/" element={<Home />} />

        </Route>
        <Route element={<ProtectRoutes isAllowed={!!userState.isLoggedIn} />}>
          <Route path="/page/post/comments/:idPost" element={<CommentsDetails />} />
        </Route>
        <Route element={<ProtectRoutes isAllowed={!!userState.isLoggedIn} />}>
          <Route path="page/search/:content" element={<SearchPosts />} />
        </Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="*" element={<h2 style={{ "fontSize": "20px", "textAlign": "center" }}>Not found</h2>} />
      </Routes>
    </div>
  )
}

export default App
