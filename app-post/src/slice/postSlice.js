import { createSlice } from '@reduxjs/toolkit';
import { addCommentToPost, addPost, deleteComment, deletePost, fetchPostComments, fetchPosts } from '../thunks/thunks.js';

const postsSlice = createSlice({
    name: 'posts',
    initialState: {
        posts: [],
        postComments: [],
        error: null,
        isLoading: false,
    },
    reducers: {
        //Reducer para actualizar el estado global en el cambio de me gusta
        setLikes: (state, action) => {
            const { id } = action.payload
            const postIndex = state.posts.findIndex(post => post.id === id);

            if (state.posts[postIndex].likesBy.includes(action.payload.userId)) {

                state.posts[postIndex].likesNumber--;
                state.posts[postIndex].likesBy = state.posts[postIndex].likesBy.filter(
                    userId => userId !== action.payload.userId
                );
            } else {
                state.posts[postIndex].likesNumber++;
                state.posts[postIndex].likesBy.push(action.payload.userId);
            }
        }
    },
    extraReducers: (builder) => {
        //Extrareducers para agregar posts

        builder.addCase(addPost.pending, (state) => {
            state.isLoading = true;
        })

        builder.addCase(addPost.fulfilled, (state, action) => {
            state.posts.push(action.payload);
            state.error = null;
            state.isLoading = false;
        })
        builder.addCase(addPost.rejected, (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        })

        //Extrareducers para obtener todos los posts

        builder.addCase(fetchPosts.pending, (state, action) => {
            state.isLoading = true;
        })
        builder.addCase(fetchPosts.fulfilled, (state, action) => {
            state.posts = action.payload;
            state.error = null;
            state.isLoading = false;
        })
        builder.addCase(fetchPosts.rejected, (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        })

        //Extrareducers para eliminar post

        builder.addCase(deletePost.pending, (state) => {
            state.isLoading = true;
        })

        builder.addCase(deletePost.fulfilled, (state, action) => {
            state.posts = state.posts.filter(item => item.id !== action.payload)
            state.error = null;
            state.isLoading = false;
        })
        builder.addCase(deletePost.rejected, (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        })
        // Extrareducers para obtener comentarios de un post

        builder.addCase(fetchPostComments.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(fetchPostComments.fulfilled, (state, action) => {
            state.postComments = action.payload;
            state.isLoading = false;
        });
        builder.addCase(fetchPostComments.rejected, (state, action) => {
            state.error = action.error;
            state.isLoading = false;
        });
        // Extrareducers para agregar comentario a un post

        builder.addCase(addCommentToPost.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(addCommentToPost.fulfilled, (state, action) => {
            const { post } = action.payload
            const postIndex = state.posts.findIndex(item => item.id === post)
            state.postComments = state.postComments.concat(action.payload)
            state.posts[postIndex].comments = state.posts[postIndex].comments.concat(action.payload)
            state.isLoading = false;
        });
        builder.addCase(addCommentToPost.rejected, (state, action) => {
            state.error = action.error;
            state.isLoading = false;
        });
        // Extrareducers para eliminar algun comentario

        builder.addCase(deleteComment.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(deleteComment.fulfilled, (state, action) => {
            const { id, postId } = action.payload

            const postIndex = state.posts.findIndex(post => post.id === postId)
            state.postComments = state.postComments.filter(comment => comment.id !== id)
            state.posts[postIndex].comments = state.posts[postIndex].comments.filter(comment => comment.id !== id)
            state.isLoading = false;
        });
        builder.addCase(deleteComment.rejected, (state, action) => {
            state.error = action.error;
            state.isLoading = false;
        });

    }
});

export const { setLikes } = postsSlice.actions;
export default postsSlice.reducer;
