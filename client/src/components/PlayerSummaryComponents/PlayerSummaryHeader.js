import React, { useState,useEffect } from "react";
import{Link} from 'react-router-dom';
import "./PlayerSummaryCss/PlayerSummaryHeader.css"
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import imag from "../../assets/ball.png";
const PlayerSummaryHeader = (props) => {
    var players = props.players;
    var totalPlayers = [];
    const[indexOfActivePlayer,setIndexOfActivePlayer] = useState(0)
    const[activePlayer,setActivePlayer] = useState();
    const[activeTab,setActiveTab] = useState('overview');
    const allTabs = ["overview","training_load","health","test"];
    players.map((value)=>{if(!value.is_coach) totalPlayers.push(value)})
    
    const prevPlayer = () =>{
      if(totalPlayers[indexOfActivePlayer-1]){
        setActivePlayer(totalPlayers[indexOfActivePlayer-1])
        setIndexOfActivePlayer(indexOfActivePlayer-1)
        props.direction("back-player")
      }
    }
    const nextPlayer = () =>{
      if(totalPlayers[indexOfActivePlayer+1]){
        setActivePlayer(totalPlayers[indexOfActivePlayer+1])
        setIndexOfActivePlayer(indexOfActivePlayer+1)
        props.direction("forward-player")
    }}
     useEffect(() => {
       setActivePlayer(players[indexOfActivePlayer]);
       allTabs.map((el)=> {document.getElementById(el).style.background = ""})
        if(window.location.pathname==="/dashboard/player-summary/overview") {document.getElementById(activeTab).style.background="#1195FF"}
       else if(window.location.pathname==="/dashboard/player-summary/training-load") {document.getElementById(activeTab).style.background="#1195FF"}
       else if(window.location.pathname==="/dashboard/player-summary/health") {document.getElementById(activeTab).style.background="#1195FF"}
       else if(window.location.pathname==="/dashboard/player-summary/test") {document.getElementById(activeTab).style.background="#1195FF"}
    }, [activeTab,players])
    
  return (
    <div className="team-summary-header">
      <div className="team-summary-title">Player Summary</div>
      <div className="prev-next-buttons">
      <button onClick={prevPlayer}  className="prev-next-button" >
          <AiOutlineArrowLeft  />
        </button>
        <button onClick={nextPlayer} className="prev-next-button" >
          <AiOutlineArrowRight/>
        </button>
        </div>
      <div className="player-info-field">
         
        <div className="player-name-team"> 
            <img className="player-photo" src={imag} ></img>
            <div>
                <div className="player-name-team-atr-name">{activePlayer?activePlayer.firstName:""} {activePlayer?activePlayer.lastName:""}</div>
                <div className="player-name-team-atr-team">{activePlayer?activePlayer.team:""}</div>
            </div>
        </div>
        <div>
            <div className="player-atr">Age<br></br><label>$Age</label></div>
            <div className="player-atr">Weight<br></br><label>$Weight</label></div>
        </div>
        <div>
            <div className="player-atr">Height<br></br><label>$Height</label></div>
            <div className="player-atr">Fat<br></br><label>$Fat</label></div>
        </div>
      </div>
      <div style={{marginTop:"3%"}} className="team-summary-links">
         <Link onClick={()=>setActiveTab("overview")} style={activeTab==="overview"?{color:"#1195FF"}:{color:""}} className="team-summary-menu-item" to="/dashboard/player-summary/overview">Overview<div style={{transitionDuration:".3s"}} id="overview" className="under-tail"></div></Link>
         <Link onClick={()=>setActiveTab("training_load")} style={activeTab==="training_load"?{color:"#1195FF"}:{color:""}} className="team-summary-menu-item" to="/dashboard/player-summary/training-load">Training Load<div style={{transitionDuration:".3s"}} id="training_load" className="under-tail"></div></Link>
         <Link onClick={()=>setActiveTab("health")} style={activeTab==="health"?{color:"#1195FF"}:{color:""}} className="team-summary-menu-item" to="/dashboard/player-summary/test"> Test<div style={{transitionDuration:".3s"}} id="health" className="under-tail"></div></Link>
         <Link onClick={()=>setActiveTab("test")} style={activeTab==="test"?{color:"#1195FF",transitionDuration:"1s"}:{color:""}} className="team-summary-menu-item" to="/dashboard/player-summary/health">Health<div style={{transitionDuration:".3s"}} id="test" className="under-tail"></div></Link>
      </div>
    </div>
  );
};

export default PlayerSummaryHeader;
