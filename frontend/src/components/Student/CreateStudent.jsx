import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios"
import { useState } from "react";



const UpdateStudent = () => {

    const [name, setName] = useState("")
    const [gender, setGender] = useState(false)
    const [birth, setBirth] = useState("")
    const [address, setAddress] = useState("")
    const [avatar, setAvatar] = useState("")
    let navigate = useNavigate()

    function getCookie(cname) {
        let name = cname + "=";
        let decodedCookie = decodeURIComponent(document.cookie);
        let ca = decodedCookie.split(';');
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) === ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) === 0) {
                return c.substring(name.length, c.length);
            }
        }
        return "";
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log(birth)
        const dataForm = new URLSearchParams();
        dataForm.append("name", name)
        dataForm.append("gender", gender)
        dataForm.append("birth", birth)
        dataForm.append("address", address)
        dataForm.append("avatar", avatar)
        try {
            const response = await axios({
                method: "post",
                url: "http://localhost:3001/student",
                headers: {
                    "token": `Bearer ${getCookie('token')}`,
                },
                data: dataForm
            });
            console.log(response)
            navigate('/')
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Name</label>
                    <input
                        type="text"
                        className="form-control w-25"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <div className="form-text">We'll never share your username with anyone else.</div>
                </div>
                <div className="form-check">
                    <input className="form-check-input" type="radio" name='Gender'
                        onChange={(e) => setGender(true)}
                    />
                    <label className="form-check-label">
                        Nam
                    </label>
                </div>
                <div className="form-check">
                    <input className="form-check-input" type="radio" name='Gender'
                        onChange={(e) => setGender(false)}
                    />
                    <label className="form-check-label">
                        Nữ
                    </label>
                </div>
                <div className="mb-3">
                    <label className="form-label">Birth</label>
                    <input
                        type="date"
                        className="form-control w-25"
                        value={birth}
                        onChange={(e) => setBirth(e.target.value)}
                    />
                    <div className="form-text">We'll never share your username with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label className="form-label">Address</label>
                    <input
                        type="text"
                        className="form-control w-25"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                    />
                    <div className="form-text">We'll never share your username with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label className="form-label">Avatar</label>
                    <input
                        type="text"
                        className="form-control w-25"
                        value={avatar}
                        onChange={(e) => setAvatar(e.target.value)}
                    />
                    <div className="form-text">We'll never share your username with anyone else.</div>
                </div>
                <div className="d-flex">
                    <button type="submit" className="btn btn-primary">Submit</button>
                </div>
            </form>
        </>
    );
}

export default UpdateStudent;