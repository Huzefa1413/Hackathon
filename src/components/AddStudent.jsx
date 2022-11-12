import React, { useState, useEffect } from 'react'
import { db } from '../firebaseConfig';
import { collection, addDoc, onSnapshot, query, } from "firebase/firestore";
import axios from 'axios';

const AddStudent = () => {

    const [classes, setClasses] = useState([]);
    const [name, setName] = useState('');
    const [fathersname, setFathersName] = useState('');
    const [rollNumber, setRollNumber] = useState('');
    const [contactNumber, setContactNumber] = useState('');
    const [cnic, setCnic] = useState('');
    const [picture, setPicture] = useState('');
    const [course, setCourse] = useState('')
    const [className, setClassName] = useState('');

    let coursesArray = []
    classes.map((eachClass, i) => (
        coursesArray.push(eachClass.CourseName)
    ))
    function removeDuplicateUsingSet(c) {
        let unique_array = Array.from(new Set(c))
        return unique_array
    }

    coursesArray = removeDuplicateUsingSet(coursesArray);

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

    const studentAddSubmitHandler = async (e) => {
        e.preventDefault()
        if (picture.type.slice(0, 5) === 'image') {
            const cloudinaryData = new FormData();
            cloudinaryData.append("file", picture);
            cloudinaryData.append("upload_preset", "myFacebookPictures")
            cloudinaryData.append("cloud_name", "huzefa")
            axios.post(`https://api.cloudinary.com/v1_1/huzefa/image/upload`, cloudinaryData, { headers: { 'Content-Type': 'multipart/form-data' } })
                .then(async res => {
                    try {
                        await addDoc(collection(db, 'students'), {
                            Name: name,
                            FathersName: fathersname,
                            RollNumber: rollNumber,
                            ContactNumber: contactNumber,
                            CNIC: cnic,
                            Picture: res?.data?.url,
                            Course: course,
                            Class: className,
                        });
                        alert('Student Added')
                    }
                    catch (errors) {
                        console.error(errors)
                    }
                })
        }
        else {
            alert('Only Images are allowed to upload! Invalid Image');
        }

    }
    return (
        <>

            <form className='stdform' onSubmit={studentAddSubmitHandler}>
                <h1>Add Student</h1>
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
                    <input type="file" className='file' placeholder='Picture' onChange={(e) => { setPicture(e.currentTarget.files[0]) }} required />
                </div>
                <div>
                    <select className='drop' onChange={(e) => { setCourse(e.target.value) }}>
                        <option value="">Course Name</option>
                        {coursesArray.map((eachCourse, i) => (
                            <option key={i} value={eachCourse}>{eachCourse}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <select onChange={(e) => { setClassName(e.target.value) }} >
                        <option value="">Class</option>
                        {classes.map((eachClass, i) => (
                            <option key={i} value={eachClass.id}>{(eachClass.CourseName) + ' - ' + (eachClass.TeachersName)}</option>
                        ))}
                    </select>
                </div>
                <div className='btnstd'>
                    <input value="Add Student" type='submit' className="btn2" />
                    <input type='reset' className='btn2' value='Reset' name='reset'></input>
                </div>
            </form>
        </>

    )
}

export default AddStudent