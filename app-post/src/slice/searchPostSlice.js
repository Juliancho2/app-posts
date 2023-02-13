import { createSlice } from "@reduxjs/toolkit";
import { fetctSearchPosts } from "../thunks/thunks";

const searchPostSlice = createSlice({
    name: 'searchPosts',
    initialState: {
        posts: [],
        isLoading: false,
        error: false
    },
    reducers: {},
    extraReducers: (builder) => {
        // Extrareducers para busqueda de algun post

        builder.addCase(fetctSearchPosts.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(fetctSearchPosts.fulfilled, (state, action) => {
            state.posts = action.payload
            state.isLoading = false;
        });
        builder.addCase(fetctSearchPosts.rejected, (state, action) => {
            state.error = action.error;
            state.isLoading = false;
        });
    }

})


export default searchPostSlice.reducer