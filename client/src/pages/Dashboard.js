import React,{useState} from "react";
import { Switch, Route, BrowserRouter, Redirect } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import DashboardPanel from "../components/DashboardPanel";
import TeamSummary from "../components/TeamSummary";
import "./Dashboard.css";
import Calendar from "../components/Calendar";
import PlayerSummary from "../components/PlayerSummary";
import PlayerDrilldown from "../components/PlayerDrilldown";
import Tests from "../components/Tests"


function Dashboard({ userData }) {
const [showSideBar,setShowSideBar] = useState(true)
const handleHideShow = ()=>{
  if (showSideBar) { setShowSideBar(false)
  }
  else{setShowSideBar(true)}
}
  return (
    <div className="dash"> <BrowserRouter>
    
      <Sidebar hidn={showSideBar? "" :"none"} />
        <button className="hide-show" onClick={handleHideShow}>
          <span></span>
          <span></span>
          <span></span>
        </button>
        <Switch>
{/*sideBarOnOff = {showSideBar ?  : 100%}  is used in order for the right panel to adjust it's dimensions according to the disappeareance of the sidebar*/}
          <Route path="/dashboard/dashboard-panel" exact >
            <DashboardPanel sideBarOnOff = {showSideBar ? "" : "100%"}/>
          </Route>
          <Route path="/dashboard/team-summary" >
            <TeamSummary sideBarOnOff = {showSideBar ? "" : "100%"}/>
          </Route>
          <Route path="/dashboard/player-summary" >
            <PlayerSummary sideBarOnOff = {showSideBar ? "" : "100%"}/>
          </Route>
          <Route path="/dashboard/player-drilldown" exact>
            <PlayerDrilldown sideBarOnOff = {showSideBar ? "" : "100%"}/>
          </Route>
          <Route path="/dashboard/calendar" exact>
            <Calendar sideBarOnOff = {showSideBar ? "" : "100%"}/>
          </Route>
          <Route path="/dashboard/tests" exact>
            <Tests sideBarOnOff = {showSideBar ? "" : "100%"}/>
            </Route>
        </Switch>
      </BrowserRouter>
      
    </div>
  );
}

export default Dashboard;
