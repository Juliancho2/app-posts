import axios from 'axios'

const baseUrl =`${ import.meta.env.VITE_API_BASE_URL}/api/users`;

const register = async (credentials) => {
    const { data } = await axios.post(baseUrl, credentials)

    return data
}

export default { register }
