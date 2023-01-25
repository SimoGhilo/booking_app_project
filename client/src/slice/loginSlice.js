import { createSlice } from '@reduxjs/toolkit';


let initialState = { isLoggedIn: {}, user: {} };

const loginStatusSlice = createSlice({
    name: 'loginStatus',
    initialState: initialState,
    reducers: {
        setLoginStatus: (state, action) => {
            state.isLoggedIn = action.payload
        },
        setUser: (state, action) => {
            state.user = action.payload
        }
    }
})

const { setLoginStatus, setUser } = loginStatusSlice.actions;
export { setLoginStatus, setUser };
export default loginStatusSlice.reducer