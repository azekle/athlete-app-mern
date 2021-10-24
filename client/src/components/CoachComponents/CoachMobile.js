import React from "react";
import { BrowserRouter, Link, Route, Switch } from "react-router-dom";
import "./CoachMobile.css";
import Monitoring from "./Monitoring.js";
import CoachCalendar from "./CoachCalendar.js";
import { BiEnvelope } from "react-icons/bi";
import { useState } from "react";
const CoachMobile = (props) => {
  const [monitoringActive, setMonitoringActive] = useState(true);
  const [calendarActive, setCalendarActive] = useState(false);
  const [team, setTeam] = useState("");
  const [canLogOut, setCanLogOut] = useState(false);
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
  return (
    <div className="coach-mobile">
      <BrowserRouter>
        <div className="coach-mobile-header">
          <div className="logo-team">
            <div onClick={goLogOut} className="coach-logo">
              Y
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
            <div className="select-div">
              <select onChange={changeTeam} className="coach-team">
                <option style={{ color: "black" }}>Team A</option>
                <option style={{ color: "black" }}>Team B</option>
                <option style={{ color: "black" }}>Team C</option>
              </select>
            </div>
          </div>
          <div className="coach-mobile-tabs">
            <Link
              onClick={() => {
                setCalendarActive(false);
                setMonitoringActive(true);
              }}
              to="/dashboard/dashboard-panel/monitoring"
              className="coach-mobile-tab"
            >
              <label>Monitoring</label>
              <div
                style={
                  monitoringActive
                    ? {
                        height: "4px",
                        width: "100%",
                        background: "white",
                        marginBottom: "1px",
                        transitionDuration: ".2s",
                      }
                    : {
                        height: "4px",
                        marginBottom: "1px",
                        transitionDuration: ".2s",
                      }
                }
              ></div>
            </Link>
            <div className="coach-mobile-tab-separator"></div>
            <Link
              onClick={() => {
                setCalendarActive(true);
                setMonitoringActive(false);
              }}
              to="/dashboard/dashboard-panel/calendar"
              className="coach-mobile-tab"
            >
              <label>Calendar</label>
              <div
                style={
                  calendarActive
                    ? {
                        height: "4px",
                        width: "100%",
                        background: "white",
                        marginBottom: "1px",
                        transitionDuration: ".2s",
                      }
                    : {
                        height: "4px",
                        marginBottom: "1px",
                        transitionDuration: ".2s",
                      }
                }
              ></div>
            </Link>
          </div>
        </div>

        <Switch>
          <Route path="/dashboard/dashboard-panel/monitoring">
            <Monitoring team={team} players={props.players} />
          </Route>
          <Route path="/dashboard/dashboard-panel/calendar">
            <CoachCalendar />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
};

export default CoachMobile;
