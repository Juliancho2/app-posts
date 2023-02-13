import axios from 'axios'
const baseUrl = 'http://127.0.0.1:3001/api/users'

const register = async (credentials) => {
    const { data } = await axios.post(baseUrl, credentials)

    return data
}

export default { register }