import React, { useState } from 'react'
import { db } from '../firebaseConfig'
import { collection, addDoc } from "firebase/firestore";

const AddClass = () => {
    const [classStart, setClassStart] = useState('');
    const [classEnd, setclassEnd] = useState('');
    const [teachersName, setTeachersName] = useState('')
    const [sectionName, setSectionName] = useState('')
    const [courseName, setCourseName] = useState('')
    const [batchNumber, setBatchNumber] = useState(0)
    const [classDays, setClassDays] = useState('')
    // var noOfDays = []
    // const [classDays, setClassDays] = useState([])
    // const [class1, setClass1] = useState('');
    // console.log()
    // let j;
    // for (var i = 0; i < days; i++) {

    //     noOfDays.push(
    //         <div>
    //             <div>Class {i + 1}</div>
    //             j = {`setClass${1}(e.target.value)`}
    //             <input type='radio' name={`class${i + 1}`} onChange={(e) => { j }} value='Monday' />Monday
    //             <input type='radio' name={`class${i + 1}`} onChange={(e) => { setClass1(e.target.value) }} value='Tuesday' />Tuesday
    //             <input type='radio' name={`class${i + 1}`} onChange={(e) => { setClass1(e.target.value) }} value='Wednesday' />Wednesday
    //             <input type='radio' name={`class${i + 1}`} onChange={(e) => { setClass1(e.target.value) }} value='Thursday' />Thursday
    //             <input type='radio' name={`class${i + 1}`} onChange={(e) => { setClass1(e.target.value) }} value='Friday' />Friday
    //             <input type='radio' name={`class${i + 1}`} onChange={(e) => { setClass1(e.target.value) }} value='Saturday' />Saturday
    //             <input type='radio' name={`class${i + 1}`} onChange={(e) => { setClass1(e.target.value) }} value='Sunday' />Sunday
    //         </div>
    //     )
    // }
    // console.log(classDays);
    const classAddSubmitHandler = async (e) => {
        e.preventDefault()

        try {
            await addDoc(collection(db, 'classes'), {
                ClassTimings: classStart + '-' + classEnd,
                ScheduleOfClasses: classDays,
                TeachersName: teachersName,
                SectionName: sectionName,
                CourseName: courseName,
                BatchNumber: batchNumber,
            });
            alert('Class Added')
        }
        catch (errors) {
            console.error(errors)
        }
    }

    return (
        <>
            <form className='addclassform' onSubmit={classAddSubmitHandler}>
                <h1 className='title'>Add Class</h1>
                <div className='timing'>

                    <select className='add' onChange={(e) => { setClassStart(e.target.value) }}>
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
                    <select className='add' onChange={(e) => { setclassEnd(e.target.value) }}>
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

                </div>
                <div>

                    <select className='add' onChange={(e) => { setClassDays(e.target.value) }}>
                        <option value="">Class Day</option>
                        <option value="Monday">Monday</option>
                        <option value="Tuesday">Tuesday</option>
                        <option value="Wednesday">Wednesday</option>
                        <option value="Thurday">Thursday</option>
                        <option value="Friday">Friday</option>
                        <option value="Saturday">Saturday</option>
                        <option value="Sunday">Sunday</option>
                    </select>
                </div>
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
                <div className='addclassbtnbox'>
                    <input value="Add Class" type='submit' className="btn1" />
                    <input type='reset' value='Reset' className="btn1" name='reset'></input>
                </div>
            </form>
        </>
    )
}

export default AddClass