import React from 'react'
import { Route, Switch } from 'react-router'
import { BrowserRouter } from 'react-router-dom'
import './componentsCss/PlayerSummary.css'
import PlayerSummaryHeader from './PlayerSummaryComponents/PlayerSummaryHeader'
import PlayerSummaryOverview from './PlayerSummaryComponents/PlayerSummaryOverview'
import TeamSummaryHealth from './TeamSummaryComponents/TeamSummaryHealth'

import TeamSummaryPerformance from './TeamSummaryComponents/TeamSummaryPerformance'
import TeamSummaryTest from './TeamSummaryComponents/TeamSummaryTest'
import TeamSummaryTrainingLoad from './TeamSummaryComponents/TeamSummaryTrainingLoad'
const PlayerSummary = (sideBarOnOff) => {
    return (
        <div  className="team-summary" style={{ width: sideBarOnOff.sideBarOnOff }}>
            <BrowserRouter>
            <PlayerSummaryHeader/>
            <Switch>
                 <Route path="/dashboard/player-summary/overview"exact>
                     <PlayerSummaryOverview/>
                 </Route>
                 <Route path="/dashboard/player-summary/training-load"exact>
                     <TeamSummaryTrainingLoad/>
                 </Route>
                 <Route path="/dashboard/player-summary/test"exact>
                     <TeamSummaryTest/>
                 </Route>
                 <Route path="/dashboard/player-summary/health"exact>
                     <TeamSummaryHealth/>
                 </Route>
            </Switch>
            <TeamSummaryPerformance/>
            </BrowserRouter>
        </div>
    )
}

export default PlayerSummary
