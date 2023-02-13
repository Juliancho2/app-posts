import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isLoggedIn: false,
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        login: (state, action) => {

            return { isLoggedIn: true, ...action.payload }

        },
        logout: (state) => {
            state.isLoggedIn = false;
        },
    },
});

export const { login, logout } = userSlice.actions;

export default userSlice.reducer;