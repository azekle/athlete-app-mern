import React from 'react'
import { Switch,BrowserRouter, Route} from 'react-router-dom'
import './componentsCss/TeamSummary.css'
import TeamSummaryHeader from './TeamSummaryComponents/TeamSummaryHeader'
import TeamSummaryOverview from'./TeamSummaryComponents/TeamSummaryOverview';
import TeamSummaryTrainingLoad from './TeamSummaryComponents/TeamSummaryTrainingLoad';
import TeamSummaryTest from'./TeamSummaryComponents/TeamSummaryTest';
import TeamSummaryHealth from './TeamSummaryComponents/TeamSummaryHealth';
import TeamSummaryPerformance from './TeamSummaryComponents/TeamSummaryPerformance';
const TeamSummary = (props) => {
    return (
        <div  className="team-summary" style={{ width: props.sideBarOnOff }}>
            <BrowserRouter>
            <TeamSummaryHeader user={props.user} players={props.players}/>
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
            <TeamSummaryPerformance players={props.players} sideBarOnOff={props.sideBarOnOff}/>
            </BrowserRouter>
        </div>
    )
}

export default TeamSummary
