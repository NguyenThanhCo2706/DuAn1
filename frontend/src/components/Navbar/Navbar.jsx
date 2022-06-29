// import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios"
import { useEffect } from "react";
import jwt_decode from "jwt-decode";





const Navbar = (props) => {
    let navigate = useNavigate()
    const { username, setUser, students, setStudents } = props
    let listStudent = students
    console.log(listStudent)
    useEffect(() => {
        const token = getCookie('token')
        if (token) {
            const decoded = jwt_decode(token);

            setUser(decoded.username)
        }
    }, [])

    useEffect(() => {

    }, [])

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


    function deleteAllCookies() {
        var cookies = document.cookie.split(";");

        for (var i = 0; i < cookies.length; i++) {
            var cookie = cookies[i];
            var eqPos = cookie.indexOf("=");
            var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
            document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
        }
    }

    const handleLogout = async () => {
        await axios.get('http://localhost:3001/user/logout')
        setUser('')
        deleteAllCookies()
        navigate('/')
    }
    const handleSearch = async (e) => {
        axios.get('http://localhost:3001/student/search', {
            params: { name: e.target.value }
        }).then((data) => {
            setStudents(data.data);
        })
    }
    return (
        <div className="mb-5">
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container">
                    <Link className="navbar-brand" to="/">Navbar</Link>
                    <form className="d-flex">
                        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"
                            onChange={handleSearch} />
                        <button className="btn btn-outline-success" type="submit">Search</button>
                    </form>
                    <div className="">
                        {username === "" ?
                            <div>
                                <Link className="navbar-brand" to="/login">Login</Link>
                            </div>
                            :
                            <div>
                                <span className="navbar-brand">{`Hi, ${username}`}</span>
                                <span className="navbar-brand" onClick={handleLogout}>Logout</span>
                            </div>
                        }
                    </div>
                </div>
            </nav>
        </div>
    );
}

export default Navbar;