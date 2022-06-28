import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios"
import { useState } from "react";



const Student = () => {
    const { id } = useParams()
    const [student, setStudent] = useState()
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
        axios.get('http://localhost:3001/student/', {
            params: { id: id },
            headers: {
                "token": `Bearer ${getCookie('token')}`,
            }
        }).then((data) => {
            setStudent(data.data)
            console.log(student)
        }).catch(() => {
            alert('You not permission')
            navigate('/')
        })
    }, [])

    return (
        <>
            <h1>{student?.name}</h1>
            <h3>{student?.gender ? 'Nam' : 'Nữ'}</h3>
            <h3>{student?.birth}</h3>
            <h3>{student?.address}</h3>
            <img src={student?.avatar}></img>

        </>
    );
}

export default Student;