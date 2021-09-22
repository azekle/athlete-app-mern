import React, { useState,useEffect } from "react";
import{Link} from 'react-router-dom';
import "./PlayerSummaryCss/PlayerSummaryHeader.css"
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import imag from "../../assets/sportsman.svg";
const PlayerSummaryHeader = (props) => {
    var players = props.players;
    var totalPlayers = [];
    
    const[activeTab,setActiveTab] = useState('overview');
    const allTabs = ["overview","training_load","health","test"];
    
    players.map((value)=>{if(!value.is_coach) totalPlayers.push(value)})
    const[activePlayer,setActivePlayer] = useState(totalPlayers[0]);
    const changePlayer = (e) =>{
      setActivePlayer(totalPlayers[e.target.value])
    }
    const activeTabPath = window.location.pathname;
    const activeTabPathArray = activeTabPath.split('/')
    useEffect(() => {
      if(totalPlayers) setActivePlayer(totalPlayers[0]);
      if(activeTabPathArray[3]=="overview") setActiveTab("overview")
       if(activeTabPathArray[3]=="training-load") setActiveTab("training_load")
       if(activeTabPathArray[3]=="test") setActiveTab("test")
       if(activeTabPathArray[3]=="health") setActiveTab("health")
    }, [props.players])
     useEffect(() => {
      // console.log(activePlayer)
       props.activePlayer(activePlayer);
       allTabs.map((el)=> {document.getElementById(el).style.background = ""})
        if(window.location.pathname==="/dashboard/player-summary/overview") {document.getElementById(activeTab).style.background="#1195FF"}
       else if(window.location.pathname==="/dashboard/player-summary/training-load") {document.getElementById(activeTab).style.background="#1195FF"}
       else if(window.location.pathname==="/dashboard/player-summary/test") {document.getElementById(activeTab).style.background="#1195FF"}
       else if(window.location.pathname==="/dashboard/player-summary/health") {document.getElementById(activeTab).style.background="#1195FF"}
    }, [activeTab,activePlayer])
    
  return (
    <div className="team-summary-header">
      <div className="team-summary-title">Player Summary</div>
      <div className="prev-next-buttons">
      
        </div>
      <div style={props.sideBarOnOff?{width:"93%"}:{width:"91%"}} className="player-info-field">
         
        <div className="player-name-team"> 
            <img className="player-photo" src={imag} ></img>
            <div>
                <select onChange={changePlayer} defaultValue={"Select"} className="player-name-team-atr-name" >
                {totalPlayers.map((value,index)=>{
                  return(<option key={value.firstName} value={index} >{activePlayer?value.firstName:""} {activePlayer?value.lastName:""}</option>)
              })}
                </select>
                <div className="player-name-team-atr-team">{activePlayer?activePlayer.team:""}</div>
            </div>
        </div>
        <div>
            <div className="player-atr">Age<br></br><label>$Age</label></div>
            <div className="player-atr">Weight<br></br><label>{activePlayer?activePlayer.measurements.weight:""}</label></div>
        </div>
        <div>
            <div className="player-atr">Height<br></br><label>{activePlayer?activePlayer.measurements.height:""}</label></div>
            <div className="player-atr">Fat<br></br><label>{activePlayer?activePlayer.measurements.fat:""}</label></div>
        </div>
      </div>
      <div style={{marginTop:"3%"}} className="team-summary-links">
         <Link onClick={()=>setActiveTab("overview")} style={activeTab==="overview"?{color:"#1195FF"}:{color:""}} className="team-summary-menu-item" to="/dashboard/player-summary/overview">Overview<div style={{transitionDuration:".3s"}} id="overview" className="under-tail"></div></Link>
         <Link onClick={()=>setActiveTab("training_load")} style={activeTab==="training_load"?{color:"#1195FF"}:{color:""}} className="team-summary-menu-item" to="/dashboard/player-summary/training-load">Training Load<div style={{transitionDuration:".3s"}} id="training_load" className="under-tail"></div></Link>
         <Link onClick={()=>setActiveTab("test")} style={activeTab==="test"?{color:"#1195FF"}:{color:""}} className="team-summary-menu-item" to="/dashboard/player-summary/test"> Test<div style={{transitionDuration:".3s"}} id="test" className="under-tail"></div></Link>
         <Link onClick={()=>setActiveTab("health")} style={activeTab==="health"?{color:"#1195FF",transitionDuration:"1s"}:{color:""}} className="team-summary-menu-item" to="/dashboard/player-summary/health">Health<div style={{transitionDuration:".3s"}} id="health" className="under-tail"></div></Link>
      </div>
    </div>
  );
};

export default PlayerSummaryHeader;
