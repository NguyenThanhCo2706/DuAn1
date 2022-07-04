import React, { useState } from 'react';
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from 'react';



const HomePage = (props) => {
    const { students, setStudents } = props
    const [sizePage, setSizePage] = useState(5)
    const [newsList, setNewsList] = useState(students)
    const [pageNumber, setPageNumber] = useState([])
    useEffect(() => {
        setNewsList(students?.slice(0, sizePage))
        let arr = []
        for (let i = 0; i < Math.ceil(students?.length / sizePage); i++) {
            arr.push(i)
        }
        setPageNumber(arr)
    }, [students])
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

    const handleDelete = async (id) => {
        try {
            await axios.delete('/student/', {
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
    const handleChangeSizepage = (e) => {
        setSizePage(e.target.value)
        let arr = []
        for (let i = 0; i < Math.ceil(students?.length / e.target.value); i++) {
            arr.push(i)
        }
        setPageNumber(arr)
    }
    const sendCurrentPage = (item) => {
        setNewsList(students.slice(item * sizePage, (item + 1) * sizePage))
    }
    return (
        <>
            <h1 className="text-center">Student </h1>
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
                    {newsList?.map((item, index) => {
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
            <div>
                <select className="form-select w-25" defaultValue={sizePage} onChange={handleChangeSizepage}>
                    <option value="5">5</option>
                    <option value="7">7</option>
                    <option value="9">9</option>
                </select>
            </div>
            <div className="text-center">
                {

                    pageNumber.map((item, index) => {
                        return (
                            <span key={index} onClick={() => sendCurrentPage(item)}>{item + 1} </span>
                        )
                    })
                }
            </div>
            <div className="d-flex justify-content-end">
                <Link to={`/createstudent/`}><button type="button" className="btn btn-success">Create</button></Link>
            </div>
        </>
    );
}

export default HomePage;