import React,{useState,useEffect} from 'react';
import "./componentsCss/Sidebar.css";
import { AiFillPieChart, AiOutlineTeam, AiOutlineBarChart } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { BsPerson } from 'react-icons/bs'
import { MdShowChart } from 'react-icons/md'
import { BsCalendar } from 'react-icons/bs'
const SideMenu = (hidn) => {
    const[activeTab,setActiveTab] = useState('dashboard');
    const allTabs = ["dashboard","team_summary","player_summary","player_drilldown","calendar","tests"];
     useEffect(() => {
         allTabs.map((el)=> {document.getElementById(el).style.color = ""})
        if(window.location.pathname==="/dashboard/dashboard-panel") {document.getElementById(activeTab).style.color="white"}
       else if(window.location.pathname==="/dashboard/team-summary/overview") {document.getElementById(activeTab).style.color="white"}
       else if(window.location.pathname==="/dashboard/player-summary") {document.getElementById(activeTab).style.color="white"}
       else if(window.location.pathname==="/dashboard/player-drilldown") {document.getElementById(activeTab).style.color="white"}
       else if(window.location.pathname==="/dashboard/calendar") {document.getElementById(activeTab).style.color="white"}
       else if(window.location.pathname==="/dashboard/tests") {document.getElementById(activeTab).style.color="white"}
    }, [activeTab])

    return (
        <div style={{display:hidn.hidn}}   className="menu-container">
            <div className="logo">LOGO</div>
            {console.log(document.getElementById("main-container"))}
            <div className="side-menu">
                <Link onClick={()=>setActiveTab("dashboard")} className="list-menu-anchor" to={"/dashboard/dashboard-panel"}><div id="dashboard"   className="list-menu-item"><AiFillPieChart /> Dashboard</div></Link> {/*---Dashboard---*/}
                <Link onClick={()=>setActiveTab("team_summary")} className="list-menu-anchor" to={"/dashboard/team-summary/overview"}><div  id="team_summary" className="list-menu-item" ><AiOutlineTeam/> Team Summary</ div></Link>
                <Link onClick={()=>setActiveTab("player_summary")} className="list-menu-anchor" to={"/dashboard/player-summary"}><div className="list-menu-item" id="player_summary"  className="list-menu-item"> <BsPerson/> Player Summmary</ div></Link>
                <Link onClick={()=>setActiveTab("calendar")} className="list-menu-anchor" to={"/dashboard/calendar"}><div className="list-menu-item" id="calendar"  className="list-menu-item"> <BsCalendar/> Calendar</div></Link>
                <Link onClick={()=>setActiveTab("player_drilldown")} className="list-menu-anchor" to={"/dashboard/player-drilldown"}><div className="list-menu-item" id="player_drilldown"  className="list-menu-item"> <MdShowChart/> Player Drilldown</ div></Link>
                <Link onClick={()=>setActiveTab("tests")} className="list-menu-anchor" to={"/dashboard/tests"}><div className="list-menu-item" id="tests" className="list-menu-item"> <AiOutlineBarChart/> Tests</div></Link>
                
            </div>
        </div>
    )
}

export default SideMenu
