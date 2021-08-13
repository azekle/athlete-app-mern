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
function Dashboard({ userData }) {
  console.log(userData);
  const [showSideBar, setShowSideBar] = useState(true);
  const handleHideShow = () => {
    if (showSideBar) {
      setShowSideBar(false);
    } else {
      setShowSideBar(true);
    }
  };
  return (
    <div className="dash">
      <BrowserRouter>
      {userData.is_coach ?<Sidebar player={userData.is_coach} hidn={showSideBar ? "" : "none"} />:""}
      {userData.is_coach ? <button className="hide-show" onClick={handleHideShow}>
          <span className="spann"></span>
          <span className="spann"></span>
          <span className="spann"></span>
        </button>:""}
        {userData.is_coach ? <Switch>
          {/*sideBarOnOff = {showSideBar ?  : 100%}  is used in order for the right panel to adjust it's dimensions according to the disappeareance of the sidebar*/}
          <Route path="/dashboard/dashboard-panel" exact>
            <DashboardPanel sideBarOnOff={showSideBar ? "" : "100%"} />
          </Route>
          <Route path="/dashboard/team-summary">
            <TeamSummary sideBarOnOff={showSideBar ? "" : "100%"} />
          </Route>
          <Route path="/dashboard/player-summary">
            <PlayerSummary sideBarOnOff={showSideBar ? "" : "100%"} />
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
