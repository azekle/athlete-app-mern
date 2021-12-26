import moment from "moment";
import React from "react";
import { useState, useEffect } from "react";
import arrow from "../../assets/arrow left-right.svg"
import "./PlayerSummaryCss/PlayerSummaryOverview.css";
const PlayerSummaryOverview = (props) => {
  const [player, setPlayer] = useState();
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
  const findDailyLoad=(value)=>{
    return(value.duration1*value.rpe1 + value.duration2 * value.rpe2)
  }
  const findACWR=()=>{
    const daysForACWR = [];
    var loadFor4Weeks = 0;
    const fourWeekAgo = currentShownWeek;
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
    return(Math.round(loadForCurrenWeek/loadFor4Weeks*100)/100)
    
  }
  const findWtoW = () =>{
    const daysForWtoW = [];
    var loadForLastWeek = 0;
    const lastWeek = currentShownWeek;
    var lastWeekStart = moment(lastWeek).subtract(7,"day");
    for (var i=0;i<7;i++){
      lastWeekStart = moment(lastWeek).subtract(7,"day");
      daysForWtoW.push(lastWeekStart.add(i,"d").format("DD/MM/YY"))
    }
    daysForWtoW.map((day=>{
     if(player) player.training.map((value)=>{
        if(day===value.date) loadForLastWeek+=parseInt(value.rpe1)*parseInt(value.duration1)+parseInt(value.rpe2)*parseInt(value.duration2)
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
    return(Math.round((loadForCurrenWeek-loadForLastWeek)/((loadForCurrenWeek+loadForLastWeek)/2)*100))
  }
  const findSleep = (value)=>{
    return(value.sleep)
  }
  const findFatigue = (value) =>{
    return(value.fatigue)
  }
  const findMood = (value) =>{
    return(value.wellness1/2+value.wellness1/2)
  }
  const verToday = (days)=>{
    if((showDate(currentShownWeek,days)+".0"+(showMonth(currentShownWeek, days) + 1))==(showDate(moment().toDate(),0)+".0"+(showMonth(moment().toDate(), 0) + 1))) return 1
  }
  useEffect(() => {
    setPlayer(props.player);
    findACWR()
  }, [props.player,currentShownWeek]);
  return (
    <div className="player-summary-overview">
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
        <table className="overview-table">
          <thead>
            <tr>
              <th rowSpan="2" colSpan="3" className="table-header-cell athlete">
                Date
              </th>
              <th colSpan="6" className="table-header-cell pso-header-cell">
                Load
              </th>
              <th colSpan="3" className="table-header-cell pso-header-cell">
                wellness
              </th>
              <th colSpan="3" style={{padding:"0 60px"}} className="table-header-cell pso-header-cell">
                Health
              </th>
            </tr>
            <tr className="overview-sub-table">
              <th className="pso-sub">ACWR</th>
              <th className="pso-sub">DL</th>
              <th className="pso-sub">Monotony</th>
              <th className="pso-sub">W-to-W</th>
              <th className="pso-sub">EWMA</th>
              <th className="pso-sub">Strain</th>
              <th className="pso-sub">Sleep</th>
              <th className="pso-sub">Mood</th>
              <th className="pso-sub">Fatigue</th>
              <th style={{border:"none"}} className="pso-sub"></th>
              <th style={{border:"none"}}  className="pso-sub"></th>
              <th style={{border:"none"}}  className="pso-sub"></th>
              
            </tr>
          </thead>
          <tbody>
          <tr>
              <td className="pso-sub2" colSpan="3">{verToday(0)?"Today": `${showDate(
                currentShownWeek,
                0
              )}.0${showMonth(currentShownWeek, 0) + 1}`}</td>
              <td  className="pso-sub2">  {player
                ? player.training.map((val,index) => {
                    if (
                      val.date.split("/")[0] == showDate(currentShownWeek, 0) &&
                      val.date.split("/")[1] == showMonth(currentShownWeek, 0) + 1
                    )
                    return<div className={(findACWR()<.8?"inside-blue":findACWR()>.8&&findACWR()<1.3?"inside-green":findACWR()>1.5?"inside-red":"")+ " inside-overview"}>{findACWR()}</div>
                  })
                : ""}</td>
                 <td  className="pso-sub2"> {player
                ? player.training.map((val,index) => {
                    if (
                      val.date.split("/")[0] == showDate(currentShownWeek, 0) &&
                      val.date.split("/")[1] == showMonth(currentShownWeek, 0) + 1
                    )
                    return<div className="inside-overview">{findDailyLoad(val)}</div>
                  })
                : ""}</td>
                <td  className="pso-sub2">  {player
                ? player.training.map((val,index) => {
                    if (
                      val.date.split("/")[0] == showDate(currentShownWeek, 0) &&
                      val.date.split("/")[1] == showMonth(currentShownWeek, 0) + 1
                    )
                    return<div className="inside-overview">{findACWR()}</div>
                  })
                : ""}</td>
                 <td  className="pso-sub2"> {player
                ? player.training.map((val,index) => {
                    if (
                      val.date.split("/")[0] == showDate(currentShownWeek, 0) &&
                      val.date.split("/")[1] == showMonth(currentShownWeek, 0) + 1
                    )
                    return<div className={(findWtoW()>10&&findWtoW()<15?"inside-yellow":findWtoW()>15?"inside-red":"")+ " inside-overview"}>{findWtoW()}</div>
          
                  })
                : ""}</td>
                <td  className="pso-sub2">  {player
                ? player.training.map((val,index) => {
                    if (
                      val.date.split("/")[0] == showDate(currentShownWeek, 0) &&
                      val.date.split("/")[1] == showMonth(currentShownWeek, 0) + 1
                    )
                    return<div className="inside-overview">{"ewma"}</div>
                  })
                : ""}</td>
               <td  className="pso-sub2"> {player
                ? player.training.map((val,index) => {
                    if (
                      val.date.split("/")[0] == showDate(currentShownWeek, 0) &&
                      val.date.split("/")[1] == showMonth(currentShownWeek,0) + 1
                    )
                    return<div className="inside-overview">{"strain"}</div>
                  })
                : ""}</td>
                 <td className="pso-sub2">{player
                ? player.training.map((val,index) => {
                    if (
                      val.date.split("/")[0] == showDate(currentShownWeek, 0) &&
                      val.date.split("/")[1] == showMonth(currentShownWeek, 0) + 1
                    )
                    return<div className={(findSleep(val)<7?"inside-red":"")+ " inside-overview"}>{findSleep(val)}</div>
                  })
                : ""}</td>
                <td className="pso-sub2">{player
                ? player.training.map((val,index) => {
                    if (
                      val.date.split("/")[0] == showDate(currentShownWeek, 0) &&
                      val.date.split("/")[1] == showMonth(currentShownWeek, 0) + 1
                    )
                    return<div className="inside-overview">{findMood(val)}</div>
                  })
                : ""}</td>
                <td  className="pso-sub2">  {player
                ? player.training.map((val,index) => {
                    if (
                      val.date.split("/")[0] == showDate(currentShownWeek, 0) &&
                      val.date.split("/")[1] == showMonth(currentShownWeek, 0) + 1
                    )
                    return<div className={(findFatigue(val)<2?"inside-red":"")+ " inside-overview"}>{findFatigue(val)}</div>
                  })
                : ""}</td>
                 <td colSpan="3"  className="pso-sub2"> {player
                ? player.training.map((val,index) => {
                    if (
                      val.date.split("/")[0] == showDate(currentShownWeek, 0) &&
                      val.date.split("/")[1] == showMonth(currentShownWeek, 0) + 1
                    )
                    return<div className={player.injuries.length>0? "inside-health-i":"inside-health-h"}>{player.injuries.length>0?"Injured":"Healthy"}</div>
                    
                  })
                : ""}</td>
            </tr>
            <tr>
              <td className="pso-sub2" colSpan="3">{verToday(1)?"Today": `${showDate(
                currentShownWeek,
                1
              )}.0${showMonth(currentShownWeek, 1) + 1}`}</td>
              <td  className="pso-sub2">  {player
                ? player.training.map((val,index) => {
                    if (
                      val.date.split("/")[0] == showDate(currentShownWeek, 1) &&
                      val.date.split("/")[1] == showMonth(currentShownWeek, 1) + 1
                    )
                    return<div className={(findACWR()<.8?"inside-blue":findACWR()>.8&&findACWR()<1.3?"inside-green":findACWR()>1.5?"inside-red":"")+ " inside-overview"}>{findACWR()}</div>
                  })
                : ""}</td>
                 <td  className="pso-sub2"> {player
                ? player.training.map((val,index) => {
                    if (
                      val.date.split("/")[0] == showDate(currentShownWeek, 1) &&
                      val.date.split("/")[1] == showMonth(currentShownWeek, 1) + 1
                    )
                    return<div className="inside-overview">{findDailyLoad(val)}</div>
                  })
                : ""}</td>
                <td  className="pso-sub2">  {player
                ? player.training.map((val,index) => {
                    if (
                      val.date.split("/")[0] == showDate(currentShownWeek, 1) &&
                      val.date.split("/")[1] == showMonth(currentShownWeek, 1) + 1
                    )
                    return<div className="inside-overview">{findACWR()}</div>
                  })
                : ""}</td>
                 <td  className="pso-sub2"> {player
                ? player.training.map((val,index) => {
                    if (
                      val.date.split("/")[0] == showDate(currentShownWeek, 1) &&
                      val.date.split("/")[1] == showMonth(currentShownWeek, 1) + 1
                    )
                    return<div className={(findWtoW()>10&&findWtoW()<15?"inside-yellow":findWtoW()>15?"inside-red":"")+ " inside-overview"}>{findWtoW()}</div>
          
                  })
                : ""}</td>
                <td  className="pso-sub2">  {player
                ? player.training.map((val,index) => {
                    if (
                      val.date.split("/")[0] == showDate(currentShownWeek, 1) &&
                      val.date.split("/")[1] == showMonth(currentShownWeek, 1) + 1
                    )
                    return<div className="inside-overview">{"ewma"}</div>
                  })
                : ""}</td>
               <td  className="pso-sub2"> {player
                ? player.training.map((val,index) => {
                    if (
                      val.date.split("/")[0] == showDate(currentShownWeek, 1) &&
                      val.date.split("/")[1] == showMonth(currentShownWeek,1) + 1
                    )
                    return<div className="inside-overview">{"strain"}</div>
                  })
                : ""}</td>
                 <td className="pso-sub2">{player
                ? player.training.map((val,index) => {
                    if (
                      val.date.split("/")[0] == showDate(currentShownWeek, 1) &&
                      val.date.split("/")[1] == showMonth(currentShownWeek, 1) + 1
                    )
                    return<div className={(findSleep(val)<7?"inside-red":"")+ " inside-overview"}>{findSleep(val)}</div>
                  })
                : ""}</td>
                <td className="pso-sub2">{player
                ? player.training.map((val,index) => {
                    if (
                      val.date.split("/")[0] == showDate(currentShownWeek, 1) &&
                      val.date.split("/")[1] == showMonth(currentShownWeek, 1) + 1
                    )
                    return<div className="inside-overview">{findMood(val)}</div>
                  })
                : ""}</td>
                <td  className="pso-sub2">  {player
                ? player.training.map((val,index) => {
                    if (
                      val.date.split("/")[0] == showDate(currentShownWeek, 1) &&
                      val.date.split("/")[1] == showMonth(currentShownWeek, 1) + 1
                    )
                    return<div className={(findFatigue(val)<2?"inside-red":"")+ " inside-overview"}>{findFatigue(val)}</div>
                  })
                : ""}</td>
                 <td colSpan="3"  className="pso-sub2"> {player
                ? player.training.map((val,index) => {
                    if (
                      val.date.split("/")[0] == showDate(currentShownWeek, 1) &&
                      val.date.split("/")[1] == showMonth(currentShownWeek, 1) + 1
                    )
                    return<div className={player.injuries.length>0? "inside-health-i":"inside-health-h"}>{player.injuries.length>0?"Injured":"Healthy"}</div>
                    
                  })
                : ""}</td>
            </tr>
            <tr>
              <td className="pso-sub2" colSpan="3">{verToday(2)?"Today": `${showDate(
                currentShownWeek,
                2
              )}.0${showMonth(currentShownWeek, 2) + 1}`}</td>
              <td  className="pso-sub2">  {player
                ? player.training.map((val,index) => {
                    if (
                      val.date.split("/")[0] == showDate(currentShownWeek, 2) &&
                      val.date.split("/")[1] == showMonth(currentShownWeek, 2) + 1
                    )
                    return<div className={(findACWR()<.8?"inside-blue":findACWR()>.8&&findACWR()<1.3?"inside-green":findACWR()>1.5?"inside-red":"")+ " inside-overview"}>{findACWR()}</div>
                  })
                : ""}</td>
                 <td  className="pso-sub2"> {player
                ? player.training.map((val,index) => {
                    if (
                      val.date.split("/")[0] == showDate(currentShownWeek, 2) &&
                      val.date.split("/")[1] == showMonth(currentShownWeek, 2) + 1
                    )
                    return<div className="inside-overview">{findDailyLoad(val)}</div>
                  })
                : ""}</td>
                <td  className="pso-sub2">  {player
                ? player.training.map((val,index) => {
                    if (
                      val.date.split("/")[0] == showDate(currentShownWeek, 2) &&
                      val.date.split("/")[1] == showMonth(currentShownWeek, 2) + 1
                    )
                    return<div className="inside-overview">{findACWR()}</div>
                  })
                : ""}</td>
                 <td  className="pso-sub2"> {player
                ? player.training.map((val,index) => {
                    if (
                      val.date.split("/")[0] == showDate(currentShownWeek, 2) &&
                      val.date.split("/")[1] == showMonth(currentShownWeek, 2) + 1
                    )
                    return<div className={(findWtoW()>10&&findWtoW()<15?"inside-yellow":findWtoW()>15?"inside-red":"")+ " inside-overview"}>{findWtoW()}</div>
          
                  })
                : ""}</td>
                <td  className="pso-sub2">  {player
                ? player.training.map((val,index) => {
                    if (
                      val.date.split("/")[0] == showDate(currentShownWeek, 2) &&
                      val.date.split("/")[1] == showMonth(currentShownWeek, 2) + 1
                    )
                    return<div className="inside-overview">{"ewma"}</div>
                  })
                : ""}</td>
               <td  className="pso-sub2"> {player
                ? player.training.map((val,index) => {
                    if (
                      val.date.split("/")[0] == showDate(currentShownWeek, 2) &&
                      val.date.split("/")[1] == showMonth(currentShownWeek,2) + 1
                    )
                    return<div className="inside-overview">{"strain"}</div>
                  })
                : ""}</td>
                 <td className="pso-sub2">{player
                ? player.training.map((val,index) => {
                    if (
                      val.date.split("/")[0] == showDate(currentShownWeek, 2) &&
                      val.date.split("/")[1] == showMonth(currentShownWeek, 2) + 1
                    )
                    return<div className={(findSleep(val)<7?"inside-red":"")+ " inside-overview"}>{findSleep(val)}</div>
                  })
                : ""}</td>
                <td className="pso-sub2">{player
                ? player.training.map((val,index) => {
                    if (
                      val.date.split("/")[0] == showDate(currentShownWeek, 2) &&
                      val.date.split("/")[1] == showMonth(currentShownWeek, 2) + 1
                    )
                    return<div className="inside-overview">{findMood(val)}</div>
                  })
                : ""}</td>
                <td  className="pso-sub2">  {player
                ? player.training.map((val,index) => {
                    if (
                      val.date.split("/")[0] == showDate(currentShownWeek, 2) &&
                      val.date.split("/")[1] == showMonth(currentShownWeek, 2) + 1
                    )
                    return<div className={(findFatigue(val)<2?"inside-red":"")+ " inside-overview"}>{findFatigue(val)}</div>
                  })
                : ""}</td>
                 <td colSpan="3"  className="pso-sub2"> {player
                ? player.training.map((val,index) => {
                    if (
                      val.date.split("/")[0] == showDate(currentShownWeek, 2) &&
                      val.date.split("/")[1] == showMonth(currentShownWeek, 2) + 1
                    )
                    return<div className={player.injuries.length>0? "inside-health-i":"inside-health-h"}>{player.injuries.length>0?"Injured":"Healthy"}</div>
                    
                  })
                : ""}</td>
            </tr>
            <tr>
              <td className="pso-sub2" colSpan="3">{verToday(3)?"Today": `${showDate(
                currentShownWeek,
                3
              )}.0${showMonth(currentShownWeek, 3) + 1}`}</td>
              <td  className="pso-sub2">  {player
                ? player.training.map((val,index) => {
                    if (
                      val.date.split("/")[0] == showDate(currentShownWeek, 3) &&
                      val.date.split("/")[1] == showMonth(currentShownWeek, 3) + 1
                    )
                    return<div className={(findACWR()<.8?"inside-blue":findACWR()>.8&&findACWR()<1.3?"inside-green":findACWR()>1.5?"inside-red":"")+ " inside-overview"}>{findACWR()}</div>
                  })
                : ""}</td>
                 <td  className="pso-sub2"> {player
                ? player.training.map((val,index) => {
                    if (
                      val.date.split("/")[0] == showDate(currentShownWeek, 3) &&
                      val.date.split("/")[1] == showMonth(currentShownWeek, 3) + 1
                    )
                    return<div className="inside-overview">{findDailyLoad(val)}</div>
                  })
                : ""}</td>
                <td  className="pso-sub2">  {player
                ? player.training.map((val,index) => {
                    if (
                      val.date.split("/")[0] == showDate(currentShownWeek, 3) &&
                      val.date.split("/")[1] == showMonth(currentShownWeek, 3) + 1
                    )
                    return<div className="inside-overview">{findACWR()}</div>
                  })
                : ""}</td>
                 <td  className="pso-sub2"> {player
                ? player.training.map((val,index) => {
                    if (
                      val.date.split("/")[0] == showDate(currentShownWeek, 3) &&
                      val.date.split("/")[1] == showMonth(currentShownWeek, 3) + 1
                    )
                    return<div className={(findWtoW()>10&&findWtoW()<15?"inside-yellow":findWtoW()>15?"inside-red":"")+ " inside-overview"}>{findWtoW()}</div>
          
                  })
                : ""}</td>
                <td  className="pso-sub2">  {player
                ? player.training.map((val,index) => {
                    if (
                      val.date.split("/")[0] == showDate(currentShownWeek, 3) &&
                      val.date.split("/")[1] == showMonth(currentShownWeek, 3) + 1
                    )
                    return<div className="inside-overview">{"ewma"}</div>
                  })
                : ""}</td>
               <td  className="pso-sub2"> {player
                ? player.training.map((val,index) => {
                    if (
                      val.date.split("/")[0] == showDate(currentShownWeek, 3) &&
                      val.date.split("/")[1] == showMonth(currentShownWeek,3) + 1
                    )
                    return<div className="inside-overview">{"strain"}</div>
                  })
                : ""}</td>
                 <td className="pso-sub2">{player
                ? player.training.map((val,index) => {
                    if (
                      val.date.split("/")[0] == showDate(currentShownWeek, 3) &&
                      val.date.split("/")[1] == showMonth(currentShownWeek, 3) + 1
                    )
                    return<div className={(findSleep(val)<7?"inside-red":"")+ " inside-overview"}>{findSleep(val)}</div>
                  })
                : ""}</td>
                <td className="pso-sub2">{player
                ? player.training.map((val,index) => {
                    if (
                      val.date.split("/")[0] == showDate(currentShownWeek, 3) &&
                      val.date.split("/")[1] == showMonth(currentShownWeek, 3) + 1
                    )
                    return<div className="inside-overview">{findMood(val)}</div>
                  })
                : ""}</td>
                <td  className="pso-sub2">  {player
                ? player.training.map((val,index) => {
                    if (
                      val.date.split("/")[0] == showDate(currentShownWeek, 3) &&
                      val.date.split("/")[1] == showMonth(currentShownWeek, 3) + 1
                    )
                    return<div className={(findFatigue(val)<2?"inside-red":"")+ " inside-overview"}>{findFatigue(val)}</div>
                  })
                : ""}</td>
                 <td colSpan="3"  className="pso-sub2"> {player
                ? player.training.map((val,index) => {
                    if (
                      val.date.split("/")[0] == showDate(currentShownWeek, 3) &&
                      val.date.split("/")[1] == showMonth(currentShownWeek, 3) + 1
                    )
                    return<div className={player.injuries.length>0? "inside-health-i":"inside-health-h"}>{player.injuries.length>0?"Injured":"Healthy"}</div>
                    
                  })
                : ""}</td>
            </tr>
            <tr>
              <td className="pso-sub2" colSpan="3">{verToday(4)?"Today": `${showDate(
                currentShownWeek,
                4
              )}.0${showMonth(currentShownWeek, 4) + 1}`}</td>
              <td  className="pso-sub2">  {player
                ? player.training.map((val,index) => {
                    if (
                      val.date.split("/")[0] == showDate(currentShownWeek, 4) &&
                      val.date.split("/")[1] == showMonth(currentShownWeek, 4) + 1
                    )
                    return<div className={(findACWR()<.8?"inside-blue":findACWR()>.8&&findACWR()<1.3?"inside-green":findACWR()>1.5?"inside-red":"")+ " inside-overview"}>{findACWR()}</div>
                  })
                : ""}</td>
                 <td  className="pso-sub2"> {player
                ? player.training.map((val,index) => {
                    if (
                      val.date.split("/")[0] == showDate(currentShownWeek, 4) &&
                      val.date.split("/")[1] == showMonth(currentShownWeek, 4) + 1
                    )
                    return<div className="inside-overview">{findDailyLoad(val)}</div>
                  })
                : ""}</td>
                <td  className="pso-sub2">  {player
                ? player.training.map((val,index) => {
                    if (
                      val.date.split("/")[0] == showDate(currentShownWeek, 4) &&
                      val.date.split("/")[1] == showMonth(currentShownWeek, 4) + 1
                    )
                    return<div className="inside-overview">{findACWR()}</div>
                  })
                : ""}</td>
                 <td  className="pso-sub2"> {player
                ? player.training.map((val,index) => {
                    if (
                      val.date.split("/")[0] == showDate(currentShownWeek, 4) &&
                      val.date.split("/")[1] == showMonth(currentShownWeek, 4) + 1
                    )
                    return<div className={(findWtoW()>10&&findWtoW()<15?"inside-yellow":findWtoW()>15?"inside-red":"")+ " inside-overview"}>{findWtoW()}</div>
          
                  })
                : ""}</td>
                <td  className="pso-sub2">  {player
                ? player.training.map((val,index) => {
                    if (
                      val.date.split("/")[0] == showDate(currentShownWeek, 4) &&
                      val.date.split("/")[1] == showMonth(currentShownWeek, 4) + 1
                    )
                    return<div className="inside-overview">{"ewma"}</div>
                  })
                : ""}</td>
               <td  className="pso-sub2"> {player
                ? player.training.map((val,index) => {
                    if (
                      val.date.split("/")[0] == showDate(currentShownWeek, 4) &&
                      val.date.split("/")[1] == showMonth(currentShownWeek,4) + 1
                    )
                    return<div className="inside-overview">{"strain"}</div>
                  })
                : ""}</td>
                 <td className="pso-sub2">{player
                ? player.training.map((val,index) => {
                    if (
                      val.date.split("/")[0] == showDate(currentShownWeek, 4) &&
                      val.date.split("/")[1] == showMonth(currentShownWeek, 4) + 1
                    )
                    return<div className={(findSleep(val)<7?"inside-red":"")+ " inside-overview"}>{findSleep(val)}</div>
                  })
                : ""}</td>
                <td className="pso-sub2">{player
                ? player.training.map((val,index) => {
                    if (
                      val.date.split("/")[0] == showDate(currentShownWeek, 4) &&
                      val.date.split("/")[1] == showMonth(currentShownWeek, 4) + 1
                    )
                    return<div className="inside-overview">{findMood(val)}</div>
                  })
                : ""}</td>
                <td  className="pso-sub2">  {player
                ? player.training.map((val,index) => {
                    if (
                      val.date.split("/")[0] == showDate(currentShownWeek, 4) &&
                      val.date.split("/")[1] == showMonth(currentShownWeek, 4) + 1
                    )
                    return<div className={(findFatigue(val)<2?"inside-red":"")+ " inside-overview"}>{findFatigue(val)}</div>
                  })
                : ""}</td>
                 <td colSpan="3"  className="pso-sub2"> {player
                ? player.training.map((val,index) => {
                    if (
                      val.date.split("/")[0] == showDate(currentShownWeek, 4) &&
                      val.date.split("/")[1] == showMonth(currentShownWeek, 4) + 1
                    )
                    return<div className={player.injuries.length>0? "inside-health-i":"inside-health-h"}>{player.injuries.length>0?"Injured":"Healthy"}</div>
                    
                  })
                : ""}</td>
            </tr>
            <tr>
              <td className="pso-sub2" colSpan="3">{verToday(5)?"Today": `${showDate(
                currentShownWeek,
                5
              )}.0${showMonth(currentShownWeek, 5) + 1}`}</td>
              <td  className="pso-sub2">  {player
                ? player.training.map((val,index) => {
                    if (
                      val.date.split("/")[0] == showDate(currentShownWeek, 5) &&
                      val.date.split("/")[1] == showMonth(currentShownWeek, 5) + 1
                    )
                    return<div className={(findACWR()<.8?"inside-blue":findACWR()>.8&&findACWR()<1.3?"inside-green":findACWR()>1.5?"inside-red":"")+ " inside-overview"}>{findACWR()}</div>
                  })
                : ""}</td>
                 <td  className="pso-sub2"> {player
                ? player.training.map((val,index) => {
                    if (
                      val.date.split("/")[0] == showDate(currentShownWeek, 5) &&
                      val.date.split("/")[1] == showMonth(currentShownWeek, 5) + 1
                    )
                    return<div className="inside-overview">{findDailyLoad(val)}</div>
                  })
                : ""}</td>
                <td  className="pso-sub2">  {player
                ? player.training.map((val,index) => {
                    if (
                      val.date.split("/")[0] == showDate(currentShownWeek, 5) &&
                      val.date.split("/")[1] == showMonth(currentShownWeek, 5) + 1
                    )
                    return<div className="inside-overview">{findACWR()}</div>
                  })
                : ""}</td>
                 <td  className="pso-sub2"> {player
                ? player.training.map((val,index) => {
                    if (
                      val.date.split("/")[0] == showDate(currentShownWeek, 5) &&
                      val.date.split("/")[1] == showMonth(currentShownWeek, 5) + 1
                    )
                    return<div className={(findWtoW()>10&&findWtoW()<15?"inside-yellow":findWtoW()>15?"inside-red":"")+ " inside-overview"}>{findWtoW()}</div>
          
                  })
                : ""}</td>
                <td  className="pso-sub2">  {player
                ? player.training.map((val,index) => {
                    if (
                      val.date.split("/")[0] == showDate(currentShownWeek, 5) &&
                      val.date.split("/")[1] == showMonth(currentShownWeek, 5) + 1
                    )
                    return<div className="inside-overview">{"ewma"}</div>
                  })
                : ""}</td>
               <td  className="pso-sub2"> {player
                ? player.training.map((val,index) => {
                    if (
                      val.date.split("/")[0] == showDate(currentShownWeek, 5) &&
                      val.date.split("/")[1] == showMonth(currentShownWeek,5) + 1
                    )
                    return<div className="inside-overview">{"strain"}</div>
                  })
                : ""}</td>
                 <td className="pso-sub2">{player
                ? player.training.map((val,index) => {
                    if (
                      val.date.split("/")[0] == showDate(currentShownWeek, 5) &&
                      val.date.split("/")[1] == showMonth(currentShownWeek, 5) + 1
                    )
                    return<div className={(findSleep(val)<7?"inside-red":"")+ " inside-overview"}>{findSleep(val)}</div>
                  })
                : ""}</td>
                <td className="pso-sub2">{player
                ? player.training.map((val,index) => {
                    if (
                      val.date.split("/")[0] == showDate(currentShownWeek, 5) &&
                      val.date.split("/")[1] == showMonth(currentShownWeek, 5) + 1
                    )
                    return<div className="inside-overview">{findMood(val)}</div>
                  })
                : ""}</td>
                <td  className="pso-sub2">  {player
                ? player.training.map((val,index) => {
                    if (
                      val.date.split("/")[0] == showDate(currentShownWeek, 5) &&
                      val.date.split("/")[1] == showMonth(currentShownWeek, 5) + 1
                    )
                    return<div className={(findFatigue(val)<2?"inside-red":"")+ " inside-overview"}>{findFatigue(val)}</div>
                  })
                : ""}</td>
                 <td colSpan="3"  className="pso-sub2"> {player
                ? player.training.map((val,index) => {
                    if (
                      val.date.split("/")[0] == showDate(currentShownWeek, 5) &&
                      val.date.split("/")[1] == showMonth(currentShownWeek, 5) + 1
                    )
                    return<div className={player.injuries.length>0? "inside-health-i":"inside-health-h"}>{player.injuries.length>0?"Injured":"Healthy"}</div>
                    
                  })
                : ""}</td>
            </tr>
            <tr>
              <td className="pso-sub2" colSpan="3">{verToday(6)?"Today": `${showDate(
                currentShownWeek,
                6
              )}.0${showMonth(currentShownWeek, 6) + 1}`}</td>
              <td  className="pso-sub2">  {player
                ? player.training.map((val,index) => {
                    if (
                      val.date.split("/")[0] == showDate(currentShownWeek, 6) &&
                      val.date.split("/")[1] == showMonth(currentShownWeek, 6) + 1
                    )
                    return<div className={(findACWR()<.8?"inside-blue":findACWR()>.8&&findACWR()<1.3?"inside-green":findACWR()>1.5?"inside-red":"")+ " inside-overview"}>{findACWR()}</div>
                  })
                : ""}</td>
                 <td  className="pso-sub2"> {player
                ? player.training.map((val,index) => {
                    if (
                      val.date.split("/")[0] == showDate(currentShownWeek, 6) &&
                      val.date.split("/")[1] == showMonth(currentShownWeek, 6) + 1
                    )
                    return<div className="inside-overview">{findDailyLoad(val)}</div>
                  })
                : ""}</td>
                <td  className="pso-sub2">  {player
                ? player.training.map((val,index) => {
                    if (
                      val.date.split("/")[0] == showDate(currentShownWeek, 6) &&
                      val.date.split("/")[1] == showMonth(currentShownWeek, 6) + 1
                    )
                    return<div className="inside-overview">{findACWR()}</div>
                  })
                : ""}</td>
                 <td  className="pso-sub2"> {player
                ? player.training.map((val,index) => {
                    if (
                      val.date.split("/")[0] == showDate(currentShownWeek, 6) &&
                      val.date.split("/")[1] == showMonth(currentShownWeek, 6) + 1
                    )
                    return<div className={(findWtoW()>10&&findWtoW()<15?"inside-yellow":findWtoW()>15?"inside-red":"")+ " inside-overview"}>{findWtoW()}</div>
          
                  })
                : ""}</td>
                <td  className="pso-sub2">  {player
                ? player.training.map((val,index) => {
                    if (
                      val.date.split("/")[0] == showDate(currentShownWeek, 6) &&
                      val.date.split("/")[1] == showMonth(currentShownWeek, 6) + 1
                    )
                    return<div className="inside-overview">{"ewma"}</div>
                  })
                : ""}</td>
               <td  className="pso-sub2"> {player
                ? player.training.map((val,index) => {
                    if (
                      val.date.split("/")[0] == showDate(currentShownWeek, 6) &&
                      val.date.split("/")[1] == showMonth(currentShownWeek,6) + 1
                    )
                    return<div className="inside-overview">{"strain"}</div>
                  })
                : ""}</td>
                 <td className="pso-sub2">{player
                ? player.training.map((val,index) => {
                    if (
                      val.date.split("/")[0] == showDate(currentShownWeek, 6) &&
                      val.date.split("/")[1] == showMonth(currentShownWeek, 6) + 1
                    )
                    return<div className={(findSleep(val)<7?"inside-red":"")+ " inside-overview"}>{findSleep(val)}</div>
                  })
                : ""}</td>
                <td className="pso-sub2">{player
                ? player.training.map((val,index) => {
                    if (
                      val.date.split("/")[0] == showDate(currentShownWeek, 6) &&
                      val.date.split("/")[1] == showMonth(currentShownWeek, 6) + 1
                    )
                    return<div className="inside-overview">{findMood(val)}</div>
                  })
                : ""}</td>
                <td  className="pso-sub2">  {player
                ? player.training.map((val,index) => {
                    if (
                      val.date.split("/")[0] == showDate(currentShownWeek, 6) &&
                      val.date.split("/")[1] == showMonth(currentShownWeek, 6) + 1
                    )
                    return<div className={(findFatigue(val)<2?"inside-red":"")+ " inside-overview"}>{findFatigue(val)}</div>
                  })
                : ""}</td>
                 <td colSpan="3"  className="pso-sub2"> {player
                ? player.training.map((val,index) => {
                    if (
                      val.date.split("/")[0] == showDate(currentShownWeek, 6) &&
                      val.date.split("/")[1] == showMonth(currentShownWeek, 6) + 1
                    )
                    return<div className={player.injuries.length>0? "inside-health-i":"inside-health-h"}>{player.injuries.length>0?"Injured":"Healthy"}</div>
                    
                  })
                : ""}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PlayerSummaryOverview;
