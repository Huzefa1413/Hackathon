import React, { useState, useEffect } from 'react'
import { db } from '../firebaseConfig'
import { collection, addDoc, onSnapshot, query } from "firebase/firestore";

const AddClass = () => {

    const [days, setDays] = useState(0)
    const [classStart, setClassStart] = useState('');
    const [classEnd, setclassEnd] = useState('');
    const [teachersName, setTeachersName] = useState('')
    const [sectionName, setSectionName] = useState('')
    const [courseName, setCourseName] = useState('')
    const [batchNumber, setBatchNumber] = useState(0)
    const [courses, setCourses] = useState([])
    const [courseExist, setCourseExist] = useState(false);
    courses.map(eachCourse => {
        if (eachCourse.courseName === courseName) {
            setCourseExist(true)
        }
    })
    var noOfDays = []
    const [classDays, setClassDays] = useState([])
    for (var i = 0; i < days; i++) {
        noOfDays.push(
            <select onChange={(e) => { setClassDays(e.target.value) }}>
                <option value="">Class Schedule</option>
                <option value="monday">Monday</option>
                <option value="tuesday">Tuesday</option>
                <option value="wednesday">Wednesday</option>
                <option value="thursday">Thursday</option>
                <option value="friday">Friday</option>
                <option value="saturday">Saturday</option>
                <option value="sunday">Sunday</option>
            </select>)
    }

    useEffect(() => {
        let unsubscribe = null;

        const getRealtimeData = async () => {
            const q = query(collection(db, "courses"));
            unsubscribe = onSnapshot(q, (querySnapshot) => {
                const mycourses = [];
                querySnapshot.forEach((doc) => {
                    mycourses.push({ id: doc.id, ...doc.data() });
                });
                setCourses(mycourses);
            });
        }
        getRealtimeData();
        return () => {
            unsubscribe();
        }
    }, [])

    const classAddSubmitHandler = async (e) => {
        e.preventDefault()
        console.log('Class Timings :', classStart + '-' + classEnd)
        console.log('Schedule of Classes :', classDays);
        console.log('Teachers Name :', teachersName);
        console.log('Section Name :', sectionName);
        console.log('Course Name :', courseName);
        console.log('Batch Number :', batchNumber);

        try {
            await addDoc(collection(db, 'classes'), {
                ClassTimings: classStart + '-' + classEnd,
                ScheduleOfClasses: classDays,
                TeachersName: teachersName,
                SectionName: sectionName,
                CourseName: courseName,
                BatchNumber: batchNumber,
            });
            if (!courseExist) {
                await addDoc(collection(db, 'courses'), {
                    CourseName: courseName,
                    TeachersName: teachersName
                });
            }
            alert('Class Added')
        }
        catch (errors) {
            console.error(errors)
        }
    }


    return (
        <>
            <h1>Add Class</h1>
            <form onSubmit={classAddSubmitHandler}>
                <div>
                    <label>Class Start Time </label>
                    <select onChange={(e) => { setClassStart(e.target.value) }}>
                        <option value="">Class Start Time</option>
                        <option value="1">1 am</option>
                        <option value="2">2 am</option>
                        <option value="3">3 am</option>
                        <option value="4">4 am</option>
                        <option value="5">5 am</option>
                        <option value="6">6 am</option>
                        <option value="7">7 am</option>
                        <option value="8">8 am</option>
                        <option value="9">9 am</option>
                        <option value="10">10 am</option>
                        <option value="11">11 am</option>
                        <option value="12">12 pm</option>
                        <option value="13">1 pm</option>
                        <option value="14">2 pm</option>
                        <option value="15">3 pm</option>
                        <option value="16">4 pm</option>
                        <option value="17">5 pm</option>
                        <option value="18">6 pm</option>
                        <option value="19">7 pm</option>
                        <option value="20">8 pm</option>
                        <option value="21">9 pm</option>
                        <option value="22">10 pm</option>
                        <option value="23">11 pm</option>
                        <option value="24">12 am</option>
                    </select>
                    <span> - </span>
                    <select onChange={(e) => { setclassEnd(e.target.value) }}>
                        <option value="">Class End Time</option>
                        <option value="1">1 am</option>
                        <option value="2">2 am</option>
                        <option value="3">3 am</option>
                        <option value="4">4 am</option>
                        <option value="5">5 am</option>
                        <option value="6">6 am</option>
                        <option value="7">7 am</option>
                        <option value="8">8 am</option>
                        <option value="9">9 am</option>
                        <option value="10">10 am</option>
                        <option value="11">11 am</option>
                        <option value="12">12 pm</option>
                        <option value="13">1 pm</option>
                        <option value="14">2 pm</option>
                        <option value="15">3 pm</option>
                        <option value="16">4 pm</option>
                        <option value="17">5 pm</option>
                        <option value="18">6 pm</option>
                        <option value="19">7 pm</option>
                        <option value="20">8 pm</option>
                        <option value="21">9 pm</option>
                        <option value="22">10 pm</option>
                        <option value="23">11 pm</option>
                        <option value="24">12 am</option>
                    </select>
                    <label> Class End Time </label>
                </div>
                <div>
                    <label>No Of Days in Week </label>
                    <select onChange={(e) => { setDays(e.target.value) }}>
                        <option value="">No Of Days in Week</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                    </select>
                </div>
                <div>{noOfDays}</div>
                <div>
                    <input type="text" placeholder='Teacher Name' onChange={(e) => { setTeachersName(e.target.value) }} required />
                </div>
                <div>
                    <input type="text" placeholder='Section Name' onChange={(e) => { setSectionName(e.target.value) }} required />
                </div>
                <div>
                    <input type="text" placeholder='Course Name' onChange={(e) => { setCourseName(e.target.value) }} required />
                </div>
                <div>
                    <input type="number" placeholder='Batch Number' onChange={(e) => { setBatchNumber(e.target.value) }} required />
                </div>
                <div>
                    <input value="Add Class" type='submit' className="btn" />
                </div>
            </form>
        </>
    )
}

export default AddClass