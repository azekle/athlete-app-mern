import React, { useState } from "react";
import { Switch, Route, BrowserRouter, Redirect } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import DashboardPanel from "../components/DashboardPanel";
import TeamSummary from "../components/TeamSummary";
import "./Dashboard.css";
import Calendar from "../components/Calendar";
import PlayerSummary from "../components/PlayerSummary";
import PlayerDrilldown from "../components/PlayerDrilldown";
import Tests from "../components/Tests";
import AthleteForm from '../components/AthleteComponents/AthleteForm'
import { useEffect } from "react";
import CoachMobile from '../components/CoachComponents/CoachMobile'
import { requests } from "../utils/axios";
import {GiHamburgerMenu} from 'react-icons/gi'
function Dashboard({ userData }) {
  const [showSideBar, setShowSideBar] = useState(false);
  const [mobile,setMobile]= useState(window.innerWidth);
  const [players,setPlayers]=useState([]);
  const handleHideShow = () => {
    if (showSideBar) {
      setShowSideBar(false);
    } else {
      setShowSideBar(true);
    }
  };
  useEffect(() => {
    requests.get("/user/getall")
    .then(res=>{setPlayers([...res.data])})
  }, [])
  
  if(mobile<600 && userData.is_coach) return(
    <CoachMobile user = {userData} players = {players}/>
  )
  return (
    <div className="dash">
      <BrowserRouter>
      {userData.is_coach ?<Sidebar player={userData.is_coach} hidn={showSideBar ? "" : "none"} />:""}
      {userData.is_coach ? <button className="hide-show" onClick={handleHideShow}>
          <GiHamburgerMenu style={{fontSize:"2em"}}/>
        </button>:""}
        {userData.is_coach ? <Switch>
          {/*sideBarOnOff = {showSideBar ?  : 100%}  is used in order for the right panel to adjust it's dimensions according to the disappeareance of the sidebar*/}
          <Route path="/dashboard/dashboard-panel" exact>
            <DashboardPanel user={userData} players = {players} sideBarOnOff={showSideBar ? "" : "100%"} />
          </Route>
          <Route path="/dashboard/team-summary">
            <TeamSummary players={players} user={userData} sideBarOnOff={showSideBar ? "" : "98%"} />
          </Route>
          <Route path="/dashboard/player-summary">
            <PlayerSummary players={players} sideBarOnOff={showSideBar ? "" : "100%"} />
          </Route>
          <Route path="/dashboard/player-drilldown" exact>
            <PlayerDrilldown sideBarOnOff={showSideBar ? "" : "100%"} />
          </Route>
          <Route path="/dashboard/calendar" exact>
            <Calendar sideBarOnOff={showSideBar ? "" : "100%"} />
          </Route>
          <Route path="/dashboard/tests" exact>
            <Tests sideBarOnOff={showSideBar ? "" : "100%"} />
          </Route>
        </Switch> : <AthleteForm user={userData}/>}
      </BrowserRouter>
    </div>
  );
}

export default Dashboard;
