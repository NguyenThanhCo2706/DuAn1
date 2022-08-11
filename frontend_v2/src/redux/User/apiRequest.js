import { loginStart, loginError, loginSuccess } from "./loginSlice"
import axios from "axios"

export const login = async (user, dispatch) => {
    dispatch(loginStart())
    try {
        const loginFormData = new URLSearchParams();
        loginFormData.append("username", user.username)
        loginFormData.append("password", user.password)
        const res = await axios({
            method: "post",
            url: "/user/login",
            data: loginFormData
        });
        dispatch(loginSuccess(res.data))
    }
    catch (err) {
        dispatch(loginError())
    }
}