import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useParams } from 'react-router-dom'
const Navbar = () => {
    const navigate = useNavigate()
    return (

        <div className='navbar'>
            <button onClick={() => { navigate('/addclass') }}>Add Class</button>
            <button onClick={() => { navigate('/addstudent') }}>Add Student</button>
            <button onClick={() => { navigate('/classeslist') }}>Classes List</button>
            <button onClick={() => { navigate('/') }}>Logout</button>
        </div>
    )
}

export default Navbar