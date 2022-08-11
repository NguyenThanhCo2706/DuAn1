import { configureStore } from '@reduxjs/toolkit'
import loginReducer from './User/loginSlice'

console.log(loginReducer)
export default configureStore({
    reducer: {
        login: loginReducer
    }
})

