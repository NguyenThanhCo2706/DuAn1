import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux"
import { login } from "../../redux/User/apiRequest"


const Login = () => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const dispatch = useDispatch()
    let navigate = useNavigate();

    const token = useSelector((state) => state)
    console.log(token)

    function setCookie(cname, cvalue, exdays) {
        const d = new Date();
        d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
        let expires = "expires=" + d.toUTCString();
        console.log(expires);
        document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const user = {
            username: username,
            password: password
        }
        login(user, dispatch)
        // try {
        //     const response = await axios({
        //         method: "post",
        //         url: "/user/login",
        //         data: loginFormData
        //     });
        //     setCookie('token', response.data.token, 1)
        //     navigate('/')
        // } catch (error) {
        //     alert('Wrong account')
        // }
    }
    return (
        <div className="d-flex flex-column align-items-center">
            <img src="/public/uploads/1.jpg" alt="" />
            <form onSubmit={handleSubmit} className="w-50 p-5 bg-light rounded-3">
                <h2 className="text-center mb-2">Login</h2>
                <div className="mb-3">
                    <label className="form-label">UserName</label>
                    <input
                        type="text"
                        className="form-control"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Password</label>
                    <input
                        type="password"
                        className="form-control"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div className="d-flex justify-content-center">
                    <button type="submit" className="btn btn-primary">Submit</button>
                </div>
            </form>
            <div>
                <span>You don't have an account? </span>
                <Link className="navbar-brand" to="/register">Register</Link>
            </div>
        </div>
    );
}

export default Login;