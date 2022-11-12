import React, { useState, useEffect } from 'react'
import { db } from '../firebaseConfig';
import { collection, addDoc, onSnapshot, query, } from "firebase/firestore";

const AddStudent = () => {

    const [classes, setClasses] = useState([]);
    const [courses, setCourses] = useState([]);
    const [name, setName] = useState('');
    const [fathersname, setFathersName] = useState('');
    const [rollNumber, setRollNumber] = useState('');
    const [contactNumber, setContactNumber] = useState('');
    const [cnic, setCnic] = useState('');
    const [picture, setPicture] = useState('');
    const [course, setCourse] = useState('')
    const [className, setClassName] = useState('');


    courses.map(eachCourse => {
        console.log('my', eachCourse)
    })

    useEffect(() => {
        let unsubscribe = null;
        const getRealtimeData1 = async () => {
            const q = query(collection(db, "courses"));
            unsubscribe = onSnapshot(q, (querySnapshot) => {
                const mycourses = [];
                querySnapshot.forEach((doc) => {
                    mycourses.push({ id: doc.id, ...doc.data() });
                });
                setCourses(mycourses);
            });
        }
        const getRealtimeData2 = async () => {
            const q = query(collection(db, "classes"));
            unsubscribe = onSnapshot(q, (querySnapshot) => {
                const myclasses = [];
                querySnapshot.forEach((doc) => {
                    myclasses.push({ id: doc.id, ...doc.data() });
                });
                setClasses(myclasses);
            });
        }
        getRealtimeData1();
        getRealtimeData2();

        return () => {
            unsubscribe();
        }
    }, [])

    const studentAddSubmitHandler = () => {

    }
    return (
        <>
            <h1>Add Student</h1>
            <form onSubmit={studentAddSubmitHandler}>
                <div>
                    <input type="text" placeholder='Students Name' onChange={(e) => { setName(e.target.value) }} required />
                </div>
                <div>
                    <input type="text" placeholder='Fathers Name' onChange={(e) => { setFathersName(e.target.value) }} required />
                </div>
                <div>
                    <input type="text" placeholder='Roll Number' onChange={(e) => { setRollNumber(e.target.value) }} required />
                </div>
                <div>
                    <input type="number" placeholder='Contact Number' onChange={(e) => { setContactNumber(e.target.value) }} required />
                </div>
                <div>
                    <input type="text" placeholder='Cnic Number' onChange={(e) => { setCnic(e.target.value) }} required />
                </div>
                <div>
                    <input type="file" placeholder='Picture' onChange={(e) => { setPicture(e.target.value) }} required />
                </div>
                <div>
                    <select onChange={(e) => { setCourse(e.target.value) }}>
                        <option value="">Course Name</option>
                        {classes.map((eachClass, i) => (
                            <option key={i} value={eachClass.CourseName}>{eachClass.CourseName}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <select onChange={(e) => { setClassName(e.target.value) }} >
                        <option value="">Class</option>
                        {courses.map((eachCourse, i) => (
                            <option key={i} value={eachCourse.TeachersName}>{eachCourse.TeachersName}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <input value="Add Student" type='submit' className="btn" />
                </div>
            </form>
        </>

    )
}

export default AddStudent