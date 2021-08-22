import React from 'react'
import {BrowserRouter, Link, Route, Switch} from 'react-router-dom'
import './CoachMobile.css'
import Monitoring from './Monitoring.js'
import CoachCalendar from './CoachCalendar.js'
import { useState } from 'react'
const CoachMobile = () => {
    const[monitoringActive,setMonitoringActive] = useState(true)
    const[calendarActive,setCalendarActive] = useState(false)
    return (
        <div className="coach-mobile">
            <BrowserRouter>
            <div className="coach-mobile-header">
                <div className="logo-team">
                    <div className="coach-logo">Y</div>
                    <div className="select-div">
                    <select className="coach-team">
                        <option>Junior</option>
                    </select>
                    </div>
                </div>
                <div className="coach-mobile-tabs">
                    <Link onClick={()=> {setCalendarActive(false);setMonitoringActive(true)}}  to="/dashboard/dashboard-panel/monitoring" className="coach-mobile-tab"><label>Monitoring</label><div style={monitoringActive?{height:"4px",width:"100%",background:"white",marginBottom:"1px",transitionDuration:".2s"}:{height:"4px",marginBottom:"1px",transitionDuration:".2s"}}></div></Link>
                    <div className="coach-mobile-tab-separator"></div>
                    <Link onClick={()=> {setCalendarActive(true);setMonitoringActive(false)}} to="/dashboard/dashboard-panel/calendar" className="coach-mobile-tab"><label>Calendar</label><div style={calendarActive?{height:"4px",width:"100%",background:"white",marginBottom:"1px",transitionDuration:".2s"}:{height:"4px",marginBottom:"1px",transitionDuration:".2s"}}></div></Link>
                </div>
            </div>
            
                <Switch>
                    <Route path="/dashboard/dashboard-panel/monitoring" >
                        <Monitoring/>
                    </Route>
                    <Route path="/dashboard/dashboard-panel/calendar" >
                        <CoachCalendar/>
                    </Route>
                </Switch>
            </BrowserRouter>
        </div>
    )
}

export default CoachMobile
