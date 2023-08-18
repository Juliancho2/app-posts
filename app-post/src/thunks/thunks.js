import { createAsyncThunk } from '@reduxjs/toolkit';
import { addComent, addLike, createPost, delComment, delPost, getAllCommentsToPost, getAllPosts, searchPosts } from '../services/postServices';
import { setLikes } from '../slice/postSlice';

// Función thunk para agregar un post
export const addPost = createAsyncThunk(
    'posts/addPost',
    async (post) => {
        try {
            // Llamada a la función que crea un post
            const response = await createPost(post)
            if (response.hasOwnProperty('error')) {
                return rejectWithValue(response.error)
            }
            return response;
        } catch (error) {
            throw error;
        }
    }
);
// Función thunk para obtener todos los posts
export const fetchPosts = createAsyncThunk(
    'posts/fetchPosts',
    async () => {
        try {
            // Llamada a la función que obtiene todos los posts
            const response = await getAllPosts();
            if (response.hasOwnProperty('error')) {
                return rejectWithValue(response.error);
            }
            return response
        } catch (error) {
            throw error;
        }
    }
);

// Función thunk para eliminar un post
export const deletePost = createAsyncThunk(
    'posts/deletePost',
    async (id) => {
        try {
            // Llamada a la función que elimina un post
            const response = await delPost(id)
            return response;
        } catch (error) {
            throw error;
        }
    }
);

// Función thunk para obtener todos comentarios de un post

export const fetchPostComments = createAsyncThunk('posts/fetchPostComments',

    async (postId) => {
        try {
            // Llamada a la función que obtiene todos los comentarios de un post
            const response = await getAllCommentsToPost(postId);
            return response;
        } catch (error) {
            throw error
        }
    });
// Función thunk para agregar comentario a un post

export const addCommentToPost = createAsyncThunk(
    'posts/addCommentToPost',
    async (newComment) => {
        try {
            // Llamada a la función para agregar un comentario
            const response = await addComent(newComment)
            return response;
        } catch (error) {
            throw error;
        }
    }
);
// Función thunk para eliminar comentario de un post

export const deleteComment = createAsyncThunk(
    'posts/deleteComment',
    async (infoComment) => {
        try {
            // Llamada a la función que elimina un comentario de  un post
            const response = await delComment(infoComment)
            return response;
        } catch (error) {
            throw error;
        }
    }
);

// Función thunk para agregar me gusta a un post

export const addLikeToPost = createAsyncThunk(
    'posts/addLikeToPost',
    async (idPost) => {
        try {
            // Llamada a la función que agrega like a un post
            const response = await addLike(idPost)
            return response;

        } catch (error) {
            throw error;
        }

    }
);
// Función thunk para buscar posts 
export const fetctSearchPosts = createAsyncThunk(
    'posts/fetctSearchPosts',
    async (content) => {
        try {
            // Llamada a la función que busca un post
            const response = await searchPosts(content)
            return response;
        } catch (error) {
            throw error;
        }

    }
);
