import React, { useState,useEffect } from "react";
import{Link} from 'react-router-dom';
import { BsCircleFill } from "react-icons/bs";
import "./TeamSummaryCss/TeamSummaryHeader.css";
const TeamSummaryHeader = () => {
    const[activeTab,setActiveTab] = useState('overview');
    const allTabs = ["overview","training_load","health","test"];
     useEffect(() => {
         allTabs.map((el)=> {document.getElementById(el).style.background = ""})
        if(window.location.pathname==="/dashboard/team-summary/overview") {document.getElementById(activeTab).style.background="#1195FF"}
       else if(window.location.pathname==="/dashboard/team-summary/training-load") {document.getElementById(activeTab).style.background="#1195FF"}
       else if(window.location.pathname==="/dashboard/team-summary/health") {document.getElementById(activeTab).style.background="#1195FF"}
       else if(window.location.pathname==="/dashboard/team-summary/test") {document.getElementById(activeTab).style.background="#1195FF"}
    }, [activeTab])
    
  return (
    <div className="team-summary-header">
      <div className="team-summary-title">Team Summary</div>
      <div className="player-coach">
        <div className="player-number">$</div>
        <div className="player-namee"> $player-name</div>
        <div className="coach-name">
          <BsCircleFill style={{ fontSize: ".5em", color: "#8E8E8E" }} /> $coach-name
        </div>
      </div>
      <div className="next-game-label">
        Next game on ${} with ${} at ${}
      </div>
      
      <div className="team-summary-links">
         <Link onClick={()=>setActiveTab("overview")} style={activeTab==="overview"?{color:"#1195FF"}:{color:""}} className="team-summary-menu-item" to="/dashboard/team-summary/overview">Overview<div style={{transitionDuration:".3s"}} id="overview" className="under-tail"></div></Link>
         <Link onClick={()=>setActiveTab("training_load")} style={activeTab==="training_load"?{color:"#1195FF"}:{color:""}} className="team-summary-menu-item" to="/dashboard/team-summary/training-load">Training Load<div style={{transitionDuration:".3s"}} id="training_load" className="under-tail"></div></Link>
         <Link onClick={()=>setActiveTab("health")} style={activeTab==="health"?{color:"#1195FF"}:{color:""}} className="team-summary-menu-item" to="/dashboard/team-summary/test"> Test<div style={{transitionDuration:".3s"}} id="health" className="under-tail"></div></Link>
         <Link onClick={()=>setActiveTab("test")} style={activeTab==="test"?{color:"#1195FF",transitionDuration:"1s"}:{color:""}} className="team-summary-menu-item" to="/dashboard/team-summary/health">Health<div style={{transitionDuration:".3s"}} id="test" className="under-tail"></div></Link>
      </div>
    </div>
  );
};

export default TeamSummaryHeader;
