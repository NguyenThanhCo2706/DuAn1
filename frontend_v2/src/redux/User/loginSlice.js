import { createSlice } from "@reduxjs/toolkit"

export const loginSlice = createSlice({
    name: "login",
    initialState: {
        token: "",
        pending: false,
        error: false,
    },
    reducers: {
        loginStart: (state) => {
            state.pending = true
        },
        loginError: (state) => {
            state.pending = false
            state.error = true
        },
        loginSuccess: (state, action) => {
            state.pending = false
            state.error = false
            state.token = action.payload.token
        }
    }
})

export const { loginStart, loginError, loginSuccess } = loginSlice.actions
export default loginSlice.reducer