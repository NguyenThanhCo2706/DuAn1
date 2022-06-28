import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";



const Login = (props) => {
    let { setUser } = props
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    let navigate = useNavigate();
    function setCookie(cname, cvalue, exdays) {
        const d = new Date();
        d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
        let expires = "expires=" + d.toUTCString();
        console.log(expires);
        document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
        setUser(username)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const loginFormData = new URLSearchParams();
        loginFormData.append("username", username)
        loginFormData.append("password", password)
        try {
            const response = await axios({
                method: "post",
                url: "http://localhost:3001/user/login",
                data: loginFormData
            });
            setCookie('token', response.data.token, 1)
            navigate('/')
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">UserName</label>
                    <input
                        type="text"
                        className="form-control w-25"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <div className="form-text">We'll never share your username with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label className="form-label">Password</label>
                    <input
                        type="password"
                        className="form-control w-25"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div className="d-flex">
                    <button type="submit" className="btn btn-primary">Submit</button>
                </div>
            </form>
        </>
    );
}

export default Login;