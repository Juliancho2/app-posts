import axios from 'axios'

const baseUrl = `${import.meta.env.VITE_API_BASE_URL}/api/login`;
const login = async (credentials) => {
    const { data } = await axios.post(baseUrl, credentials)

    return data
}

export default { login }
