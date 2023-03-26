import axios from 'axios'
const baseUrl = 'https://api-posts-production.up.railway.app/api/users'

const register = async (credentials) => {
    const { data } = await axios.post(baseUrl, credentials)

    return data
}

export default { register }