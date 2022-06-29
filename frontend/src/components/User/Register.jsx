import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";



const Register = () => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [repassword, setRePassword] = useState("")
    let navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (password !== repassword) {
            alert('RePassword incorrect')
            return;
        }
        const registerForm = new URLSearchParams();
        registerForm.append("username", username)
        registerForm.append("password", password)
        try {
            await axios({
                method: "post",
                url: "http://localhost:3001/user/register",
                data: registerForm
            });
            navigate('/login')
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div className="d-flex flex-column align-items-center">
            <form onSubmit={handleSubmit} className="w-50 p-5 bg-light rounded-3">
                <h2 className="text-center mb-2">Register</h2>

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
                <div className="mb-3">
                    <label className="form-label">Re-Password</label>
                    <input
                        type="password"
                        className="form-control"
                        value={repassword}
                        onChange={(e) => setRePassword(e.target.value)}
                    />
                </div>
                <div className="d-flex justify-content-center">
                    <button type="submit" className="btn btn-primary">Submit</button>
                </div>
            </form>
        </div>
    );
}

export default Register;