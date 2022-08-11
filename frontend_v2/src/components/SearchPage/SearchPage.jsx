import React, { useState } from 'react';
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from 'react';



const SearchPage = (props) => {
    const { listSearch } = props;
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
                    </tr>
                </thead>
                <tbody>
                    {listSearch?.map((item, index) => {
                        return (
                            <tr key={index}>
                                <th scope="row">{index + 1}</th>
                                <td>{item.name}</td>
                                <td>{item.gender ? 'Nam' : 'Nữ'}</td>
                                <td>{item.birth}</td>
                                <td>{item.address}</td>
                                <td><Link to={`/viewstudent/${item._id}`}>view</Link></td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </>
    );
}

export default SearchPage;