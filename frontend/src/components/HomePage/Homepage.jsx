import React, { useState, useEffect } from 'react';
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";



const HomePage = () => {
    const [students, setStudents] = useState()
    console.log(students)
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
    useEffect(() => {
        axios.get('http://localhost:3001/student/list').then((data) => {
            setStudents(data.data);
        })

    }, [])
    const handleDelete = async (id) => {
        try {
            await axios.delete('http://localhost:3001/student/', {
                params: { id: id },
                headers: {
                    "token": `Bearer ${getCookie('token')}`,
                }
            })
            setStudents(students.filter(student => student._id !== id))
        }
        catch (e) {
            alert('You not Permission')
        }
        navigate('/')
    }
    return (
        <>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Name</th>
                        <th scope="col">Gender</th>
                        <th scope="col">Birth</th>
                        <th scope="col">Address</th>
                        <th scope="col">View</th>
                        <th scope="col">Update</th>
                        <th scope="col">Delete</th>

                    </tr>
                </thead>
                <tbody>
                    {students?.map((item, index) => {
                        return (
                            <tr key={index}>
                                <th scope="row">{index + 1}</th>
                                <td>{item.name}</td>
                                <td>{item.gender ? 'Nam' : 'Nữ'}</td>
                                <td>{item.birth}</td>
                                <td>{item.address}</td>
                                <td><Link to={`/viewstudent/${item._id}`}>view</Link></td>
                                <td><Link to={`/updatestudent/${item._id}`}>update</Link></td>
                                <td><p onClick={() => handleDelete(item._id)}>delete</p></td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            <div className="d-flex justify-content-end">
                <Link to={`/createstudent/`}><button type="button" className="btn btn-success">Create</button></Link>
            </div>
        </>
    );
}

export default HomePage;