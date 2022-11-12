import React, { useEffect } from 'react'
import { db } from '../firebaseConfig';
import { useNavigate } from 'react-router-dom'
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useState } from 'react';
import { collection, onSnapshot, query, } from "firebase/firestore";

const Signin = () => {
    const [user, setUser] = useState([])
    useEffect(() => {
        let unsubscribe = null;

        const getRealtimeData = async () => {
            const q = query(collection(db, "Admins"));
            unsubscribe = onSnapshot(q, (querySnapshot) => {
                const myuser = [];
                querySnapshot.forEach((doc) => {
                    myuser.push({ id: doc.id, ...doc.data() });
                });
                setUser(myuser);
            });
        }
        getRealtimeData();
        return () => {
            unsubscribe();
        }
    }, [])
    const navigate = useNavigate();
    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        validationSchema: yup.object({
            email: yup
                .string('Enter your email')
                .email('Enter a valid email')
                .required('Email is required'),
            password: yup
                .string('Enter your password')
                .min(8, 'Password should be of minimum 8 characters length')
                .required('Password is required'),
        }),
        onSubmit: async (values) => {
            console.log(values)
            console.log(user)
            if (user.length > 0) {
                if (user[0].email === values.email && user[0].password === values.password) {
                    navigate('/home')
                }
                else {
                    alert('Invalid Email or Password')
                }
            }
            else {
                alert("User doesn't Exist");
            }
        }
    })

    return (
        <form className='mysf' onSubmit={formik.handleSubmit}>
            <h2 className="title">Welcome to SMIT Attendance System</h2>
            <h2 className="title">Sign in as Admin</h2>
            <div className="input-field">
                <input name='email' type="email" placeholder="Email" value={formik.values.email} onChange={formik.handleChange} />
            </div>
            <span>{formik.touched.email && formik.errors.email}</span>
            <div className="input-field">
                <input name='password' type="password" placeholder="Password" value={formik.values.password} onChange={formik.handleChange} />
            </div>
            <span>{formik.touched.password && formik.errors.password}</span>
            <input value="Login" type='submit' className="btn" />
        </form>
    )
}
export default Signin;