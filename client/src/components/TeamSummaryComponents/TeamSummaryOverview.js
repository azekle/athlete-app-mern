import React, { useState } from "react";
import moment from "moment";
import { AiOutlineArrowRight, AiOutlineArrowLeft } from "react-icons/ai";
import "./TeamSummaryCss/TeamSummaryOverview.css";
import arrow from "../../assets/arrow left-right.svg"
const TeamSummaryOverview = (props) => {
  const players = []
  props.players.map((value)=>{
    if(!value.is_coach) players.push(value)
  })
  var startOfWeek = moment().startOf("week").toDate();
  const [currentShownWeek, setCurrentShownWeek] = useState(startOfWeek);
  const showDate = (date, numberDays) => {
    return moment(date).add(numberDays, "day").toDate().getDate();
  };
  const showMonth = (date, numberDays) => {
    return moment(date).add(numberDays, "day").toDate().getMonth();
  };
  const previousWeek = () => {
    setCurrentShownWeek(moment(currentShownWeek).subtract(7, "day").toDate());
  };
  const nextWeek = () => {
    if (isDateBeforeToday(moment(currentShownWeek).add(7, "day").toDate()))
      setCurrentShownWeek(moment(currentShownWeek).add(7, "day").toDate());
  };
  function isDateBeforeToday(date) {
    return new Date(date.toDateString()) < new Date(new Date().toDateString());
  }
  const findACWR = (player,date) =>{
    const daysForACWR = [];
    var loadFor4Weeks = 0;
    const fourWeekAgo = moment(currentShownWeek).add(date,"day");
    var fourWeekAgoStart = moment(fourWeekAgo).subtract(28,"day");
    for (var i=0;i<28;i++){
      fourWeekAgoStart = moment(fourWeekAgo).subtract(28,"day");
      daysForACWR.push(fourWeekAgoStart.add(i,"d").format("DD/MM/YY"))
    }
    daysForACWR.map((day=>{
     if(player) player.training.map((value)=>{
        if(day===value.date) loadFor4Weeks+=parseInt(value.rpe1)*parseInt(value.duration1)+parseInt(value.rpe2)*parseInt(value.duration2)
      })
    }))
    const currentWeek = currentShownWeek;
    var currentWeekStart = moment(currentWeek)
    var loadForCurrenWeek  = 0
    const daysForCurrentWeekLoad = []
    for(var i = 0 ; i<7; i++){
      currentWeekStart = moment(currentWeek)
      daysForCurrentWeekLoad.push(currentWeekStart.add(i,"d").format("DD/MM/YY"))
    }
    
    daysForCurrentWeekLoad.map((day=>{
     if(player) player.training.map((value)=>{
        if(day===value.date) loadForCurrenWeek+=parseInt(value.rpe1)*parseInt(value.duration1)+parseInt(value.rpe2)*parseInt(value.duration2)
      })
    }))
    loadFor4Weeks=loadFor4Weeks/4
    return((Math.round(loadForCurrenWeek/loadFor4Weeks*100)/100)||0)
  }
  const findDailyLoad=(value,nrDays)=>{
    var trainingSession = {};
    var day = currentShownWeek;
    day = moment(day).add(nrDays,"day");
    value.training.map((value2)=>{if(value2.date===day.format("DD/MM/YY")) trainingSession = value2})
    return(trainingSession.duration1*trainingSession.rpe1 + trainingSession.duration2 * trainingSession.rpe2||"")
  }
  const findMood = (value,nrDays) =>{
    var trainingSession = {};
    var day = currentShownWeek;
    day = moment(day).add(nrDays,"day");
    value.training.map((value2)=>{if(value2.date===day.format("DD/MM/YY")) trainingSession = value2})
    return(trainingSession.wellness1/2+trainingSession.wellness1/2||"")
  }
  const verToday = (days)=>{
    if((showDate(currentShownWeek,days)+".0"+(showMonth(currentShownWeek, days) + 1))==(showDate(moment().toDate(),0)+".0"+(showMonth(moment().toDate(), 0) + 1))) return 1
  }
  return (
    <div className="overview">
      <div className="prev-next-buttons">
          {moment(currentShownWeek).startOf("week").format("DD/MM/YYYY")} - {moment(currentShownWeek).startOf("week").add(6,"d").format("DD/MM/YYYY")}
          <button onClick={previousWeek} className="prev-next">
            <img className="left-arrow" src={arrow}></img>
          </button>
          <button onClick={nextWeek} className="prev-next">
          <img className="right-arrow" src={arrow}></img>
          </button>
        </div>
      <label style={{fontWeight:"500",fontSize:"1.5em",margin:"20px"}}>Squad Dashboard</label>
      <table className="overview-table">
        <thead>
          <tr>
            <th rowSpan="2" colSpan="3" className="table-header-cell athlete">Athlete</th>
            <th colSpan="3" className="table-header-cell">
            <label style={{fontWeight:"500",fontSize:"1.3em"}}> {verToday(0)?"Today ":`${showDate(currentShownWeek, 0)}.0${
                showMonth(currentShownWeek, 0) + 1
              } `}</label>
               Sun</th>
            <th colSpan="3" className="table-header-cell">
            <label style={{fontWeight:"500",fontSize:"1.3em"}}> {verToday(1)?"Today ":`${showDate(currentShownWeek, 1)}.0${
                showMonth(currentShownWeek, 1) + 1
              } `}</label>
               Mon</th>
            <th colSpan="3" className="table-header-cell">
            <label style={{fontWeight:"500",fontSize:"1.3em"}}> {verToday(2)?"Today ":`${showDate(currentShownWeek, 2)}.0${
                showMonth(currentShownWeek, 2) + 1
              } `}</label>
               Tue</th>
            <th colSpan="3" className="table-header-cell">
            <label style={{fontWeight:"500",fontSize:"1.3em"}}>{verToday(3)?"Today ":`${showDate(currentShownWeek, 3)}.0${
                showMonth(currentShownWeek, 3) + 1
              } `}</label>
               Wed</th>
            <th colSpan="3" className="table-header-cell">
            <label style={{fontWeight:"500",fontSize:"1.3em"}}>{verToday(4)?"Today ":`${showDate(currentShownWeek, 4)}.0${
                showMonth(currentShownWeek, 4) + 1
              } `}</label>
               Thu</th>
            <th colSpan="3" className="table-header-cell">
            <label style={{fontWeight:"500",fontSize:"1.3em"}}>{verToday(5)?"Today ":`${showDate(currentShownWeek, 5)}.0${
                showMonth(currentShownWeek, 5) + 1
              } `}</label>
               Friday</th>
            <th colSpan="3" className="table-header-cell">
             <label style={{fontWeight:"500",fontSize:"1.3em"}}> {verToday(6)?"Today ":`${showDate(currentShownWeek, 6)}.0${
                showMonth(currentShownWeek, 6) + 1
              } `}</label>
               Sat
            </th>
          </tr>
          <tr className="overview-sub-table">
            <th className="th-sub-table">ACWR</th>
            <th className="th-sub-table">DL</th>
            <th className="th-sub-table">Mood</th>
            <th className="th-sub-table">ACWR</th>
            <th className="th-sub-table">DL</th>
            <th className="th-sub-table">Mood</th>
            <th className="th-sub-table">ACWR</th>
            <th className="th-sub-table">DL</th>
            <th className="th-sub-table">Mood</th>
            <th className="th-sub-table">ACWR</th>
            <th className="th-sub-table">DL</th>
            <th className="th-sub-table">Mood</th>
            <th className="th-sub-table">ACWR</th>
            <th className="th-sub-table">DL</th>
            <th className="th-sub-table">Mood</th>
            <th className="th-sub-table">ACWR</th>
            <th className="th-sub-table">DL</th>
            <th className="th-sub-table">Mood</th>
            <th className="th-sub-table">ACWR</th>
            <th className="th-sub-table">DL</th>
            <th className="th-sub-table">Mood</th>
          </tr>
        </thead>
        <tbody>
          {players.map((value)=>{return(
          <tr className="row-for-each">
            <td colSpan="3">{value.firstName} {value.lastName}</td>
            <td><div className={(findACWR(value)<.8&&findACWR(value)>0?"attr-team-overview-blue":findACWR(value)>.8&&findACWR(value)<1.3?"attr-team-overview-green":findACWR(value)>1.5?"attr-team-overview-red":"")} >{findACWR(value)?findACWR(value,0):" "}</div></td>
            <td><div className={findDailyLoad(value,0)?"attr-team-overview":" "}>{findDailyLoad(value,0)}</div></td>
            <td><div className={findMood(value,0)?"attr-team-overview":""}>{findMood(value,0)}</div></td>
            <td><div className={(findACWR(value)<.8&&findACWR(value)>0?"attr-team-overview-blue":findACWR(value)>.8&&findACWR(value)<1.3?"attr-team-overview-green":findACWR(value)>1.5?"attr-team-overview-red":"")} >{findACWR(value)?findACWR(value,1):" "}</div></td>
            <td><div className={findDailyLoad(value,1)?"attr-team-overview":""}>{findDailyLoad(value,1)}</div></td>
            <td><div className={findMood(value,1)?"attr-team-overview":""}>{findMood(value,1)}</div></td>
            <td><div className={(findACWR(value)<.8&&findACWR(value)>0?"attr-team-overview-blue":findACWR(value)>.8&&findACWR(value)<1.3?"attr-team-overview-green":findACWR(value)>1.5?"attr-team-overview-red":"")} >{findACWR(value)?findACWR(value,2):" "}</div></td>
            <td><div className={findDailyLoad(value,2)?"attr-team-overview":""}>{findDailyLoad(value,2)}</div></td>
            <td><div className={findMood(value,2)?"attr-team-overview":""}>{findMood(value,2)}</div></td>
            <td><div className={(findACWR(value)<.8&&findACWR(value)>0?"attr-team-overview-blue":findACWR(value)>.8&&findACWR(value)<1.3?"attr-team-overview-green":findACWR(value)>1.5?"attr-team-overview-red":"")} >{findACWR(value)?findACWR(value,3):" "}</div></td>
            <td><div className={findDailyLoad(value,3)?"attr-team-overview":""}>{findDailyLoad(value,3)}</div></td>
            <td><div className={findMood(value,3)?"attr-team-overview":""}>{findMood(value,3)}</div></td>
            <td><div className={(findACWR(value)<.8&&findACWR(value)>0?"attr-team-overview-blue":findACWR(value)>.8&&findACWR(value)<1.3?"attr-team-overview-green":findACWR(value)>1.5?"attr-team-overview-red":"")} >{findACWR(value)?findACWR(value,4):" "}</div></td>
            <td><div className={findDailyLoad(value,4)?"attr-team-overview":""}>{findDailyLoad(value,4)}</div></td>
            <td><div className={findMood(value,4)?"attr-team-overview":""}>{findMood(value,4)}</div></td>
            <td><div className={(findACWR(value)<.8&&findACWR(value)>0?"attr-team-overview-blue":findACWR(value)>.8&&findACWR(value)<1.3?"attr-team-overview-green":findACWR(value)>1.5?"attr-team-overview-red":"")} >{findACWR(value)?findACWR(value,5):" "}</div></td>
            <td><div className={findDailyLoad(value,5)?"attr-team-overview":""}>{findDailyLoad(value,5)}</div></td>
            <td><div className={findMood(value,5)?"attr-team-overview":""}>{findMood(value,5)}</div></td>
            <td><div className={(findACWR(value)<.8&&findACWR(value)>0?"attr-team-overview-blue":findACWR(value)>.8&&findACWR(value)<1.3?"attr-team-overview-green":findACWR(value)>1.5?"attr-team-overview-red":"")} >{findACWR(value)?findACWR(value,6):" "}</div></td>
            <td><div className={findDailyLoad(value,6)?"attr-team-overview":""}>{findDailyLoad(value,6)}</div></td>
            <td><div className={findMood(value,6)?"attr-team-overview":""}>{findMood(value,6)}</div></td>
          </tr>)})}
        </tbody>
      </table>
    </div>
  );
};

export default TeamSummaryOverview;
