import React from "react";
import { BrowserRouter, Link, Route, Switch,Redirect } from "react-router-dom";
import "./CoachMobile.css";
import Monitoring from "./Monitoring.js";
import CoachCalendar from "./CoachCalendar.js";
import PlayerTab from "./PlayerTab";
import { BiEnvelope } from "react-icons/bi";
import { useState,useEffect } from "react";
import {IoMdCalendar} from 'react-icons/io'
import {AiOutlineUser} from 'react-icons/ai'
import {FaUsers} from 'react-icons/fa'
import logo  from '../../assets/logo3.svg'
import logoCoach from '../../assets/coach.jpg'
const CoachMobile = (props) => {
  const [monitoringActive, setMonitoringActive] = useState(false);
  const [calendarActive, setCalendarActive] = useState(false);
  const [team, setTeam] = useState("");
  const [canLogOut, setCanLogOut] = useState(false);
  const [PlayerTabActive,setPlayerTabActive] = useState(false)
  // const[user,setUser] = useState(props.user)
  const user = props.user;
  const changeTeam = (e) => {
    setTeam(e.target.value);
  };
  const goLogOut = () => {
    setCanLogOut(!canLogOut);
  };
  const logOutUser = () => {
    localStorage.clear();
    window.location.reload();
  };
  useEffect(() => {
    if(window.location.pathname.split("/")[window.location.pathname.split("/").length-1]=="monitoring") {setMonitoringActive(true);setPlayerTabActive(false);setCalendarActive(false)}
    if(window.location.pathname.split("/")[window.location.pathname.split("/").length-1]=="playertab") {setMonitoringActive(false);setPlayerTabActive(true);setCalendarActive(false)}
    if(window.location.pathname.split("/")[window.location.pathname.split("/").length-1]=="calendar") {setMonitoringActive(false);setPlayerTabActive(false);setCalendarActive(true)}
  }, [window.location.pathname])
  if(window.location.pathname=="/dashboard/dashboard-panel") return<Redirect to= "/dashboard/dashboard-panel/monitoring" />
  return (
    <div className="coach-mobile">
      <BrowserRouter>
        <div className="coach-mobile-header">
          <div className="logo-team">
            <div className="left-part-header">
              <div onClick={goLogOut} className="coach-logo">
                <img style={{height:"130%",borderRadius:"100px"}} src={logoCoach}></img>
              </div>
              <div className="coach-emek">
                <label className="emek" >{"Emek Hefer"}</label>
                <label className="coach-namee">{user.firstName} {user.lastName}</label>
              </div>
            </div>

            {canLogOut ? (
              <div className="logout-panel2">
                <label onClick={goLogOut} className="options-name2">
                  {user.firstName ? user.firstName : ""}{" "}
                  {user.lastName ? user.lastName : ""}
                </label>
                <div className="separator3"></div>
                <div className="send-email2">
                  <button className="send-email-label2">
                    send us an email
                  </button>
                  <BiEnvelope style={{ fontSize: "1.2em" }} />
                </div>
                <div className="separator3"></div>
                <button
                  style={{ margin: "0" }}
                  onClick={logOutUser}
                  className="logout-button"
                >
                  Log Out
                </button>
              </div>
            ) : (
              ""
            )}
            <img className="logo-header" src={logo}/>
          </div>
          <div className="coach-mobile-tabs">
            <Link
              onClick={() => {
                setCalendarActive(true);
                setMonitoringActive(false);
                setPlayerTabActive(false)
              }}
              to="/dashboard/dashboard-panel/calendar"
              className="coach-mobile-tab"
            >
              <IoMdCalendar className={calendarActive? "tab-active":""}/>
            </Link>
            <Link
              onClick={() => {
                setCalendarActive(false);
                setMonitoringActive(true);
                setPlayerTabActive(false)
              }}
              to="/dashboard/dashboard-panel/monitoring"
              className="coach-mobile-tab"
            >
              <FaUsers className={monitoringActive? "tab-active":""}/>
            </Link>
            <Link
              onClick={() => {
                setCalendarActive(false);
                setMonitoringActive(false);
                setPlayerTabActive(true)
              }}
              to="/dashboard/dashboard-panel/playertab"
              className="coach-mobile-tab"
            >
              <AiOutlineUser className={PlayerTabActive? "tab-active":""}/>
            </Link>
          </div>
        </div>

        <Switch>
          <Route path="/dashboard/dashboard-panel/monitoring">
            <Monitoring changeTeamState = {setTeam} team={team} userData={props.user} players={props.players} />
          </Route>
          <Route path="/dashboard/dashboard-panel/calendar">
            <CoachCalendar />
          </Route>
          <Route path="/dashboard/dashboard-panel/playertab">
            <PlayerTab team = {team} players={props.players} />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
};

export default CoachMobile;
