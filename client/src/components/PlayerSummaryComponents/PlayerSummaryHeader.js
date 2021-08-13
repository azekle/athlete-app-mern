import React, { useState,useEffect } from "react";
import{Link} from 'react-router-dom';
import { BsCircleFill } from "react-icons/bs";
import "./PlayerSummaryCss/PlayerSummaryHeader.css"
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import imag from "../../assets/ball.png";
const PlayerSummaryHeader = () => {
    const[activeTab,setActiveTab] = useState('overview');
    const allTabs = ["overview","training_load","health","test"];
     useEffect(() => {
         allTabs.map((el)=> {document.getElementById(el).style.background = ""})
        if(window.location.pathname==="/dashboard/player-summary/overview") {document.getElementById(activeTab).style.background="#1195FF"}
       else if(window.location.pathname==="/dashboard/player-summary/training-load") {document.getElementById(activeTab).style.background="#1195FF"}
       else if(window.location.pathname==="/dashboard/player-summary/health") {document.getElementById(activeTab).style.background="#1195FF"}
       else if(window.location.pathname==="/dashboard/player-summary/test") {document.getElementById(activeTab).style.background="#1195FF"}
    }, [activeTab])
    
  return (
    <div className="team-summary-header">
      <div className="team-summary-title">Player Summary</div>
      <div className="prev-next-buttons">
      <button className="prev-next-button" >
          <AiOutlineArrowLeft />
        </button>
        <button className="prev-next-button" >
          <AiOutlineArrowRight/>
        </button>
        </div>
      <div className="player-info-field">
         
        <div className="player-name-team"> 
            <img className="player-photo" src={imag} ></img>
            <div>
                <div className="player-name-team-atr-name">$Name</div>
                <div className="player-name-team-atr-team">$Team</div>
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
