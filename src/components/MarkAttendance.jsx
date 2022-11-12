import React, { useState, useEffect } from "react"
import { useParams } from 'react-router-dom'
import { db } from '../firebaseConfig';
import { collection, onSnapshot, query, } from "firebase/firestore";

const MarkAttendance = () => {
    const { id } = useParams()
    const classId = id;
    const [students, setStudents] = useState([])
    const [classes, setClasses] = useState([]);
    const [user, setUser] = useState([])
    useEffect(() => {
        let unsubscribe = null;

        const getRealtimeData1 = async () => {
            const q = query(collection(db, "students"));
            unsubscribe = onSnapshot(q, (querySnapshot) => {
                const mystudents = [];
                querySnapshot.forEach((doc) => {
                    mystudents.push({ id: doc.id, ...doc.data() });
                });
                setStudents(mystudents);
            });
        }
        getRealtimeData1();
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
        getRealtimeData2();

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
    const [searchedRollNo, setSearchedRollNo] = useState('')
    const [studentname, setStudentName] = useState('');
    const [studentpic, setStudentpic] = useState('');
    const [studentFound, setStudentFound] = useState(false)
    const searchHandler = () => {
        console.log('searched roll no', searchedRollNo)
        console.log('all students', students)
        let found = false;
        students.map(eachStudent => {
            if (eachStudent.Class === classId && eachStudent.RollNumber === searchedRollNo) {
                found = true;
                setStudentName(eachStudent.Name)
                setStudentpic(eachStudent.Picture)
            }
        })
        if (found) {
            setStudentFound(true);
            document.getElementById('search').value = ''
        }
        else {
            setStudentFound(false);
            setSearchedRollNo('')
            setStudentName('')
            document.getElementById('search').value = ''
            alert('student not found')
        }
    }
    const [attendance, setAttendance] = useState('present');
    const attendanceHandler = (e) => {
        e.preventDefault()
        const date = new Date()
        let starttime;
        let endtime;
        classes.map(eachClass => {
            if (eachClass.id === classId) {
                starttime = eachClass.ClassTimings.split('-')[0]
                endtime = eachClass.ClassTimings.split('-')[1]
            }
        })
        if (starttime <= date.getHours() && endtime > date.getHours()) {
            console.log('class started');
            if (date.getMinutes() >= 10) {
                if (attendance === 'present') {
                    console.log('you are late signin');
                    if (passChecker(e)) {
                        setAttendance('present')
                    }
                    else {
                        setAttendance('late')
                    }
                }
                else if (attendance === 'leave') {
                    if (passChecker(e)) {
                        setAttendance('leave')
                    }
                    else {
                        setAttendance('absent')
                    }
                }
            }
        }
        else {
            console.log('Class Not Started')
        }
    }

    const passChecker = (e) => {
        e.preventDefault()
        let i = prompt('Enter Admin Password:')
        if (i === user[0].password) {
            return true
        }
        else {
            alert('Invalid Password');
            return false
        }
    }
    console.log()
    return (
        <>
            <h1 className="attendanceheading">Attendance Page</h1>
            <div className="search"><input type="search" id="search" placeholder="Search Roll No" onChange={(e) => { setSearchedRollNo(e.target.value) }} /><button onClick={searchHandler}>search</button></div>
            <form className="card" onSubmit={attendanceHandler}>
                <div className="image"><img src={(studentpic) ? studentpic : 'https://tse2.mm.bing.net/th?id=OIP.Z306v3XdxhOaxBFGfHku7wHaHw&pid=Api&P=0'} alt="" width='100px' /></div>
                <div className="data">
                    <div className="name">{(studentFound) ? studentname : 'DUMMY NAME'}</div>
                    <div className="rollno">{(studentFound) ? searchedRollNo : 'DUMMY ROLL NO'}</div>
                    <div>
                        <select className="present" onChange={(e) => { setAttendance(e.target.value) }} >
                            <option value="present">Present</option>
                            <option value="absent">Absent</option>
                            <option value="late">Late</option>
                            <option value="leave">Leave</option>
                        </select>
                    </div>
                </div>
                <input type="submit" className="mybtn" />
            </form>
        </>
    )
}

export default MarkAttendance