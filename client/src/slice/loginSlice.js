import { createSlice } from '@reduxjs/toolkit';


let initialState = { isLoggedIn: {}, user: {}, isCheckedOut: false };

const loginStatusSlice = createSlice({
    name: 'loginStatus',
    initialState: initialState,
    reducers: {
        setLoginStatus: (state, action) => {
            state.isLoggedIn = action.payload
        },
        setUser: (state, action) => {
            state.user = action.payload
        },
        toggleCheckout: (state, action) => {
            state.isCheckedOut = action.payload
        }
    }
})

const { setLoginStatus, setUser, toggleCheckout } = loginStatusSlice.actions;
export { setLoginStatus, setUser, toggleCheckout };
export default loginStatusSlice.reducer