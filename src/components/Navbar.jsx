import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useFormik } from 'formik';
import * as yup from 'yup';
const Navbar = () => {
    const navigate = useNavigate()
    return (
        <>
            <button onClick={() => { navigate('/addclass') }}>Add Class</button>
            <button onClick={() => { navigate('/addstudent') }}>Add Student</button>
            <button onClick={() => { navigate('/markattendance') }}>Mark Students Attendance</button>
            <button onClick={() => { navigate('/') }}>Logout</button>
        </>
    )
}

export default Navbar