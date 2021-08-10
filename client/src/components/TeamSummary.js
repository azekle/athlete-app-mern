import React from 'react'
import { Switch,BrowserRouter, Route} from 'react-router-dom'
import './componentsCss/TeamSummary.css'
import TeamSummaryHeader from './TeamSummaryComponents/TeamSummaryHeader'
import TeamSummaryOverview from'./TeamSummaryComponents/TeamSummaryOverview';
import TeamSummaryTrainingLoad from './TeamSummaryComponents/TeamSummaryTrainingLoad';
import TeamSummaryTest from'./TeamSummaryComponents/TeamSummaryTest';
import TeamSummaryHealth from './TeamSummaryComponents/TeamSummaryHealth';
import TeamSummaryPerformance from './TeamSummaryComponents/TeamSummaryPerformance';
const TeamSummary = (sideBarOnOff) => {
    return (
        <div  className="team-summary" style={{ width: sideBarOnOff.sideBarOnOff }}>
            <BrowserRouter>
            <TeamSummaryHeader/>
            <Switch>
                 <Route path="/dashboard/team-summary/overview"exact>
                     <TeamSummaryOverview/>
                 </Route>
                 <Route path="/dashboard/team-summary/training-load"exact>
                     <TeamSummaryTrainingLoad/>
                 </Route>
                 <Route path="/dashboard/team-summary/test"exact>
                     <TeamSummaryTest/>
                 </Route>
                 <Route path="/dashboard/team-summary/health"exact>
                     <TeamSummaryHealth/>
                 </Route>
            </Switch>
            <TeamSummaryPerformance/>
            </BrowserRouter>
        </div>
    )
}

export default TeamSummary
