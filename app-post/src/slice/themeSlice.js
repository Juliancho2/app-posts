import { createSlice } from '@reduxjs/toolkit';

const themeSlice = createSlice({
    name: 'theme',
    initialState: {
        darkMode: false
    },
    reducers: {
        setTheme: (state, action) => {
            state.darkMode = action.payload
        }
    }

})

export const { setTheme } = themeSlice.actions
export default themeSlice.reducer