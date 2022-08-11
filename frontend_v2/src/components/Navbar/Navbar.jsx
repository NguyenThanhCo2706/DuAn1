import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios"
import { useEffect } from "react";
import jwt_decode from "jwt-decode";





const Navbar = () => {
    let navigate = useNavigate()
    const [listSearch, setListSearch] = useState()
    useEffect(() => {
        const token = getCookie('token')
        if (token) {
            const decoded = jwt_decode(token);
        }
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
        await axios.get('/user/logout')
        deleteAllCookies()
        navigate('/')
    }
    const handleSearch = async (e) => {
        if (e.target.value === '') {
            setListSearch([])
        }
        else {
            axios.get('/student/search', {
                params: { name: e.target.value }
            }).then((data) => {
                setListSearch(data.data)
            })
        }
    }
    const viewStudent = (id) => {
        navigate(`/viewstudent/${id}`)
    }
    return (
        <div className="mb-5">
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container">
                    <Link className="navbar-brand" to="/">Navbar</Link>
                    <div className="position-relative">
                        <div className="d-flex">
                            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"
                                onChange={handleSearch} />
                            <Link className="btn btn-outline-success" to="/listsearch">Search</Link>
                        </div>
                        <div className="position-absolute border bg-white w-100">
                            {listSearch?.map((item, index) => {
                                return (
                                    <div key={index} className="bg-light p-2 m-1" onClick={() => viewStudent(item._id)}>{item.name}</div>
                                )
                            })}
                        </div>
                    </div>
                    <div className="">
                        <div>
                            <Link className="navbar-brand" to="/login">Login</Link>
                        </div>
                        {/* {username === "" ?
                            <div>
                                <Link className="navbar-brand" to="/login">Login</Link>
                            </div>
                            :
                            <div>
                                <span className="navbar-brand">{`Hi, ${username}`}</span>
                                <span className="navbar-brand" onClick={handleLogout}>Logout</span>
                            </div>
                        } */}
                    </div>
                </div>
            </nav>
        </div>
    );
}

export default Navbar;