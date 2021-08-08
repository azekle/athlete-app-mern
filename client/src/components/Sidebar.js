import React from 'react';
import "./SideMenu.css";
import { AiFillPieChart, AiOutlineTeam, AiOutlineBarChart } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { BsPerson } from 'react-icons/bs'
import { MdShowChart } from 'react-icons/md'
import { BsCalendar } from 'react-icons/bs'
const SideMenu = () => {
    return (
        <div className="menu-container">
            <div className="logo">LOGO</div>
            <div className="side-menu">
                <Link style={{ textDecoration: "none" }} to={"/dashboard"}> <div id="dashboard" href="#" className="list-menu-anchor"><AiFillPieChart /><div className="list-menu-item">Dashboard</div></div></Link> {/*---Dashboard---*/}
                <Link className="list-menu-anchor" to={"/dashboard"}> <AiOutlineTeam /> <div className="list-menu-item">Team Summary</ div></Link>
                <Link className="list-menu-anchor"  to={"/dashboard"}>   <BsPerson /> <div className="list-menu-item">Player Summmary</ div></Link>
                <Link className="list-menu-anchor" to={"/dashboard"}>   <MdShowChart /> <div className="list-menu-item">Player Drilldown</ div></Link>
                <Link className="list-menu-anchor" to={"/dashboard"}>   <BsCalendar /> <div className="list-menu-item">Calendar</div></Link>
                <Link className="list-menu-anchor" to={"/dashboard"}>   <AiOutlineBarChart /> <div className="list-menu-item">Tests</div></Link>

            </div>
        </div>
    )
}

export default SideMenu
