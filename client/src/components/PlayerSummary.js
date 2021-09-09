import moment from "moment";
import React, { useState , useEffect } from "react";
import { Route, Switch } from "react-router";
import { BrowserRouter } from "react-router-dom";
import "./componentsCss/PlayerSummary.css";
import PlayerSummaryHeader from "./PlayerSummaryComponents/PlayerSummaryHeader";
import PlayerSummaryOverview from "./PlayerSummaryComponents/PlayerSummaryOverview";
import TeamSummaryHealth from "./TeamSummaryComponents/TeamSummaryHealth";

import TeamSummaryPerformance from "./TeamSummaryComponents/TeamSummaryPerformance";
import TeamSummaryTest from "./TeamSummaryComponents/TeamSummaryTest";
import PlayerSummaryTrainingLoad from "./PlayerSummaryComponents/PlayerSummaryTrainingLoad";
const PlayerSummary = (props) => {
  const [direction, setDirection] = useState();
  var refToday = moment();
  const [indexOfActivePlayer,setIndexOfActivePlayer] = useState(0)
  var totalPlayers = [];
  var players = props.players;
  players.map((value) => {
    if (!value.is_coach) totalPlayers.push(value);
  });
  const [activePlayer,setActivePlayer] = useState(totalPlayers[0])
  
  const determineDataFor4Weeks = () => {
    const startDay = refToday.startOf("week").subtract(21,"d");
    //continue from here↑↑↑↑↑↑↑↑
  };
  const changePlayer = () =>{
    if(direction==="forward-player") {setIndexOfActivePlayer(indexOfActivePlayer+1)}
    if(direction==="back-player"){setIndexOfActivePlayer(indexOfActivePlayer-1)}
    setDirection("");
  }
  useEffect(() => {
      changePlayer();
    
  }, [direction])

  useEffect(() => {
    determineDataFor4Weeks()
      setActivePlayer(totalPlayers[indexOfActivePlayer]);
  }, [totalPlayers,indexOfActivePlayer])
  return (
    <div className="team-summary" style={{ width: props.sideBarOnOff }}>
      <BrowserRouter>
        <PlayerSummaryHeader player = {activePlayer} activePlayer={setActivePlayer} direction={setDirection} players={players} />
        <Switch>
          <Route path="/dashboard/player-summary/overview" exact>
            <PlayerSummaryOverview player = {activePlayer} />
          </Route>
          <Route path="/dashboard/player-summary/training-load" exact>
            <PlayerSummaryTrainingLoad player = {activePlayer}/>
          </Route>
          <Route path="/dashboard/player-summary/test" exact>
            <TeamSummaryTest players={players} />
          </Route>
          <Route path="/dashboard/player-summary/health" exact>
            <TeamSummaryHealth />
          </Route>
        </Switch>
        <TeamSummaryPerformance players={props.players} />
      </BrowserRouter>
    </div>
  );
};

export default PlayerSummary;
