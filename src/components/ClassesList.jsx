import React, { useState, useEffect } from "react"
import { db } from '../firebaseConfig';
import { collection, onSnapshot, query, } from "firebase/firestore";
import { useNavigate } from 'react-router-dom'

const ClassesList = () => {
    const [classes, setClasses] = useState([]);
    const navigate = useNavigate()
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
    return (
        <>
            <h1 className="allclassestitle">All Classes</h1>
            <table className="allclasstable">
                <tr>
                    <th>Course Name</th>
                    <th>Teachers Name</th>
                    <th>Section</th>
                    <th>Batch</th>
                    <th>Class Schedule</th>
                    <th>Class Timings</th>
                </tr>
                {classes.map((eachClass, i) => (
                    <tr key={i}>
                        <td>{eachClass.CourseName}</td>
                        <td>{eachClass.TeachersName}</td>
                        <td>{eachClass.SectionName}</td>
                        <td>{eachClass.BatchNumber}</td>
                        <td>{eachClass.ScheduleOfClasses}</td>
                        <td>{eachClass.ClassTimings}</td>
                        <td><button onClick={() => { navigate(`/markattendance/${eachClass.id}`) }}>Mark Attendance</button></td>
                    </tr>))}
            </table>
        </>
    )
}

export default ClassesList