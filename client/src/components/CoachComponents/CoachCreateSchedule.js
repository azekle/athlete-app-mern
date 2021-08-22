import React,{useState,useEffect} from 'react'
import './CoachCreateSchedule.css'
import {ImCancelCircle}from 'react-icons/im'
import {RiCalendarTodoLine} from 'react-icons/ri'
import {GrClock} from 'react-icons/gr'
const CoachCreateSchedule = (props) => { 
    var [displayed,setDisplayed] = useState(props.day)
    useEffect(() => {
        setDisplayed(props.day)
        console.log("render")
    }, [props.day])
    if(displayed==0) return(<div></div>)
    return (
        <div className="coach-create-schedule">
            <div className="schedule-top">
                <label className="schedule-title">Create Schedule</label>
                <ImCancelCircle onClick={()=> setDisplayed(displayed=0)} className="cancel-schedule"/>
            </div>
            <div className="separator-schedule"></div>
            <div className="schedule-inner">
                <label className="schedule-label"> Activity</label>
                <div className="schedule-body">
                    <label className="schedule-activity"></label>
                    <select className="select-activity">
                        <option>Basketball</option>
                    </select>
                    <label className="schedule-label-time">Time</label>
                    <div className="schedule-interval">
                        <div className="interval-date">
                            <label style={{marginRight:"4px"}}>{`${props.day}-${props.month}-${props.year}`}</label>
                            <RiCalendarTodoLine/>
                        </div>
                        <div className="interval-separator"></div>
                        <div className="interval-time">
                            <label>
                                <select style={{background:"none"}} className="interval-start-end-time">
                                    <option>13:00</option>
                                    <option>13:30</option>
                                    <option>14:00</option>
                                    <option>14:30</option>
                                    <option>15:00</option>
                                    <option>15:30</option>
                                    <option>16:00</option>
                                    <option>16:30</option>
                                    <option>17:00</option>
                                </select>
                                -
                                <select style={{background:"none"}} className="interval-start-end-time">
                                    <option>14:00</option>
                                    <option>14:30</option>
                                    <option>15:00</option>
                                    <option>15:30</option>
                                    <option>16:00</option>
                                    <option>16:30</option>
                                    <option>17:00</option>
                                    <option>17:30</option>
                                    <option>18:00</option>
                                </select>
                            </label>
                            <GrClock/>
                        </div>
                    </div>
                </div>
                <button className="schedule-save">Save</button>
            </div>
        </div>
    )
}

export default CoachCreateSchedule
