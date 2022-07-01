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
        axios.get('/student/', {
            params: { id: id },
            headers: {
                "token": `Bearer ${getCookie('token')}`,
            }
        }).then((data) => {
            let date = new Date(data.data.birth)
            let day = date.getDate()
            let month = date.getMonth()
            let year = date.getFullYear()
            data.data.birth = year + "-" + month + "-" + day
            setStudent(data.data)
            console.log(student)
        }).catch(() => {
            alert('You not permission')
            navigate('/')
        })
    }, [])

    return (
        <>
            {student ?
                <>
                    <div className="card mb-3" style={{ "maxWidth": "540px;" }}>
                        <div className="row g-0">
                            <div className="col-md-4">
                                <img src={"/public/uploads/" + student?.avatar} className="img-fluid rounded-start" alt="..." />
                            </div>
                            <div className="col-md-8">
                                <div className="card-body">
                                    <h3 className="card-title">{student.name}</h3>
                                    <p className="card-text">Gender: {student.gender ? 'Nam' : 'Nữ'}</p>
                                    <p className="card-text"><small className="text-muted">{student.birth}</small></p>
                                    <p className="card-text">{student.address}</p>

                                </div>
                            </div>
                        </div>
                    </div>
                </>
                :
                <></>
            }
        </>
    );
}

export default Student;