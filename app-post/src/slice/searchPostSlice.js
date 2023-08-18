import { createSlice } from "@reduxjs/toolkit";
import { fetctSearchPosts } from "../thunks/thunks";

const searchPostSlice = createSlice({
    name: 'searchPosts',
    initialState: {
        posts: [],
        isLoading: false,
        error: false
    },
    reducers: {
        setPosts:(state)=>{
           state.posts=[] 
        }
    },
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

export const {setPosts}=searchPostSlice.actions
export default searchPostSlice.reducer
