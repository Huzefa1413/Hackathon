import React, { useState, useEffect } from 'react'
import { db } from '../firebaseConfig';
import { collection, addDoc, onSnapshot, query, } from "firebase/firestore";

const AddStudent = () => {

    const [classes, setClasses] = useState([]);
    const [teachersList, setTeachersList] = useState([])
    const [course, setCourse] = useState('')
    useEffect(() => {
        let unsubscribe = null;

        const getRealtimeData = async () => {
            const q = query(collection(db, "classes"));
            unsubscribe = onSnapshot(q, (querySnapshot) => {
                const myclasses = [];
                querySnapshot.forEach((doc) => {
                    myclasses.push({ id: doc.id, ...doc.data() });
                });
                setClasses(myclasses);
            });
        }
        getRealtimeData();
        return () => {
            unsubscribe();
        }
    }, [])
    console.log(classes);

    const studentAddSubmitHandler = () => {

    }
    return (
        <>
            <h1>Add Student</h1>
            <form onSubmit={studentAddSubmitHandler}>
                {/* <div>
                    <input type="text" placeholder='Students Name' onChange={(e) => { setTeachersName(e.target.value) }} required />
                </div>
                <div>
                    <input type="text" placeholder='Fathers Name' onChange={(e) => { setSectionName(e.target.value) }} required />
                </div>
                <div>
                    <input type="text" placeholder='Roll Number' onChange={(e) => { setCourseName(e.target.value) }} required />
                </div>
                <div>
                    <input type="number" placeholder='Contact Number' onChange={(e) => { setBatchNumber(e.target.value) }} required />
                </div>
                <div>
                    <input type="text" placeholder='Roll Number' onChange={(e) => { setCourseName(e.target.value) }} required />
                </div>
                <div>
                    <input type="text" placeholder='Cnic Number' onChange={(e) => { setCourseName(e.target.value) }} required />
                </div>
                <div>
                    <input type="file" placeholder='Picture' onChange={(e) => { setCourseName(e.target.value) }} required />
                </div> */}
                {/*  */}
                <div>
                    <select onChange={(e) => { setCourse(e.target.value) }}>
                        <option value="">Course Name</option>
                        {classes.map((eachClass, i) => (
                            <option key={i} value={eachClass.CourseName}>{eachClass.CourseName}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <select>
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