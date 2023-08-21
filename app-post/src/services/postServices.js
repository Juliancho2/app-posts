import axios from "axios";
const apiUrl=import.meta.env.VITE_API_BASE_URL
const baseUrl = `${apiUrl}/api/posts`;

let token = null

const setToken = (newToken) => {
    token = `Bearer ${newToken}`
}

const getAllImgs = async () => {
    try {
        const res = await axios.get(baseUrl +'/images')
        const { data } = res
        return data
    }
    catch (error) {
        console.error(error)
        return { error: 'There was a problem getting the images' }
    }
}
const getAllPosts = async () => {
    try {
        const res = await axios.get(baseUrl)
        const { data } = res
        return data
    }
    catch (error) {
        return { error: 'There was a problem getting the posts' }
    }
}

const getAllCommentsToPost = async (idPost) => {
    try {
        const res = await axios.get(`${baseUrl}/${idPost}/comments`)
        const { data } = res
        return data
    } catch (error) {
        return { error: 'There was a problem getting post comments' }
    }
}

const getOnePost = async (id) => {
    try {
        const res = await axios.get(`${baseUrl}/${id}`)
        const { data } = res
        return data
    } catch (error) {
        return { error: `There was a problem getting the message with id: ${id}` }
    }
}

const createPost = async (post) => {
    console.log(post)
    const config = {
        headers: {
            Authorization: token
        }
    }
    try {
        const res = await axios.post(baseUrl, post, config)
        const { data } = res
        return data
    } catch (error) {
        return { error: 'There was a problem creating the post' }
    }
}

const delPost = async (id) => {
    const config = {
        headers: {
            Authorization: token
        }
    }
    try {
        const res = await axios.delete(`${baseUrl}/${id}`, config)
        return id
    } catch (error) {
        console.error(error)
        return { error: 'There was a problem deleting the post' }
    }
}
const addComent = async (newComment) => {
    const { contentToAdd, id } = newComment
    const config = {
        headers: {
            Authorization: token
        }
    }
    try {
        const res = await axios.post(`${baseUrl}/comments/${id}`, contentToAdd, config)
        const { data } = await res
        return data
    } catch (error) {
        return { error: 'There was a problem adding a comment to the post' }
    }
}

const delComment = async (infoComment) => {
    const { id } = infoComment
    const config = {
        headers: {
            Authorization: token
        }
    }
    try {
        const res = await axios.delete(`${baseUrl}/comments/${id}`, config)
        return infoComment
    } catch (error) {
        return { error: 'There was a problem deleting the post comment' }
    }
}

const addLike = async (idPost) => {
    const config = {
        headers: {
            Authorization: token
        }
    }
    try {
        const res = await axios.post(`${baseUrl}/${idPost}/likes`, {}, config)
        return idPost
    } catch (error) {
        return { error: 'There was a problem adding likes to the post' }
    }
}

const searchPosts = async (content) => {
    const searchUrl = `${apiUrl}/api/search?content=${content}`
    const res = await axios.get(searchUrl)
    const { data } = res
    return data
}

export {
    getAllPosts,
    getOnePost,
    createPost,
    addComent,
    addLike,
    delPost,
    delComment,
    setToken,
    getAllCommentsToPost,
    searchPosts,
    getAllImgs
}
