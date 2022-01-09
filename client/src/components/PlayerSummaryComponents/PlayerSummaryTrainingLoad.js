import React, { useState, useEffect } from "react";
import moment from "moment";
import { AiOutlineArrowRight, AiOutlineArrowLeft } from "react-icons/ai";
import arrow from "../../assets/arrow left-right.svg"
import "../TeamSummaryComponents/TeamSummaryCss/TeamSummaryTrainingLoad.css";
const PlayerSummaryTrainingLoad = (props) => {
  const [player,setPlayer] = useState()
  var emp = true   
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
  const findSession1 = (value)=>{
      return(value.session1)
  }
  const findSession2 = (value)=>{
      return(value.session2)
  }
  const findRPE1 = (value)=>{
      return(value.rpe1)
  }
  const findRPE2 = (value) =>{
      return(parseInt(value.rpe2)||"")
  }
  const findDuration1 = (value) =>{
      return(value.duration1)
  }
  const findLoad = (value)=>{
    return (value.rpe1*value.duration1+value.rpe2*value.duration2)
  }
  const findLoadForBar = (value)=>{
    return ((value.rpe1*value.duration1+value.rpe2*value.duration2)/6)
  }
  const findDuration2 = (value) =>{
    return(parseInt(value.duration2)||"")
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
    return(Math.round((loadForCurrenWeek-loadForLastWeek)/((loadForCurrenWeek+loadForLastWeek)/2)*100)+"%")
  }
  const findLoadForCurrentWeek = ()=>{
      
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
    return(loadForCurrenWeek)
  }
  const verToday = (days)=>{
    if((showDate(currentShownWeek,days)+".0"+(showMonth(currentShownWeek, days) + 1))==(showDate(moment().toDate(),0)+".0"+(showMonth(moment().toDate(), 0) + 1))) return 1
  }
  useEffect(() => {
      setPlayer(props.player);
      
      
  }, [props.player])
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
     
      <table className="overview-table">
        <thead>
          <tr>
            <th className="table-header-cell athlete">Name</th>
            <th  className="table-header-cell">
              {verToday(0)?"Today":`${showDate(currentShownWeek, 0)}.0${
                showMonth(currentShownWeek, 0) + 1
              }`}
              <br></br>Sunday</th>
            <th  className="table-header-cell">
              {verToday(1)?"Today":`${showDate(currentShownWeek, 1)}.0${
                showMonth(currentShownWeek, 1) + 1
              }`}
              <br></br>Monday</th>
            <th  className="table-header-cell">
              {verToday(2)?"Today":`${showDate(currentShownWeek, 2)}.0${
                showMonth(currentShownWeek, 2) + 1
              }`}
              <br></br>Tuesday</th>
            <th  className="table-header-cell">
              {verToday(3)?"Today":`${showDate(currentShownWeek, 3)}.0${
                showMonth(currentShownWeek, 3) + 1
              }`}
              <br></br>Wednesday</th>
            <th  className="table-header-cell">
              {verToday(4)?"Today":`${showDate(currentShownWeek, 4)}.0${
                showMonth(currentShownWeek, 4) + 1
              }`}
              <br></br>Thursday</th>
            <th  className="table-header-cell">
              {verToday(5)?"Today":`${showDate(currentShownWeek, 5)}.0${
                showMonth(currentShownWeek, 5) + 1
              }`}
              <br></br>Friday</th>
            <th  className="table-header-cell">
            {verToday(6)?"Today":`${showDate(currentShownWeek, 6)}.0${
                showMonth(currentShownWeek, 6) + 1
              }`}
              <br></br>Saturday
            </th>
            
          </tr>
        </thead>
        <tbody className="tbody-load">
            <tr>
                <td className="table-left-atr"> Session1</td>
                {player
                ? (emp = true, player.training.map((val) => {
                    if (
                      val.date.split("/")[0] == showDate(currentShownWeek, 0) &&
                      val.date.split("/")[1] == showMonth(currentShownWeek, 0) + 1
                    )
                    {emp = false;return <td className="pso-sub2">{findSession1(val)}</td>;}
                    else if(emp&&player.training[player.training.length-1]==val) return <td></td>
                  }))
                : ""
                }
                {player
                ?(emp = true, player.training.map((val) => {
                    if (
                      val.date.split("/")[0] == showDate(currentShownWeek, 1) &&
                      val.date.split("/")[1] == showMonth(currentShownWeek, 1) + 1
                    )
                    {emp = false;return <td className="pso-sub2">{findSession1(val)}</td>;}
                    else if(emp&&player.training[player.training.length-1]==val) return <td></td>
                  }))
                : ""}
                {player
                ? (emp= true, player.training.map((val) => {
                    if (
                      val.date.split("/")[0] == showDate(currentShownWeek, 2) &&
                      val.date.split("/")[1] == showMonth(currentShownWeek, 2) + 1
                    )
                    {emp = false;return <td className="pso-sub2">{findSession1(val)}</td>;}
                    else if(emp&&player.training[player.training.length-1]==val) return <td></td>
                  }))
                  
                : ""}
                {player
                ?(emp= true, player.training.map((val) => {
                    if (
                      val.date.split("/")[0] == showDate(currentShownWeek, 3) &&
                      val.date.split("/")[1] == showMonth(currentShownWeek, 3) + 1
                    )
                    {emp = false;return <td className="pso-sub2">{findSession1(val)}</td>;}
                    else if(emp&&player.training[player.training.length-1]==val) return <td></td>
                  }))
                  
                : ""}
                {player
                ?(emp= true, player.training.map((val) => {
                    if (
                      val.date.split("/")[0] == showDate(currentShownWeek, 4) &&
                      val.date.split("/")[1] == showMonth(currentShownWeek, 4) + 1
                    )
                    {emp = false;return <td className="pso-sub2">{findSession1(val)}</td>;}
                    else if(emp&&player.training[player.training.length-1]==val) return <td></td>
                  }))
                  
                : ""}
                {player
                ?(emp= true, player.training.map((val) => {
                    if (
                      val.date.split("/")[0] == showDate(currentShownWeek, 5) &&
                      val.date.split("/")[1] == showMonth(currentShownWeek, 5) + 1
                    )
                    {emp = false;return <td className="pso-sub2">{findSession1(val)}</td>;}
                    else if(emp&&player.training[player.training.length-1]==val) return <td></td>
                  }))
                  
                : ""}
                {player
                ?(emp= true, player.training.map((val) => {
                    if (
                      val.date.split("/")[0] == showDate(currentShownWeek, 6) &&
                      val.date.split("/")[1] == showMonth(currentShownWeek, 6) + 1
                    )
                    {emp = false;return <td className="pso-sub2">{findSession1(val)}</td>;}
                    else if(emp&&player.training[player.training.length-1]==val) return <td></td>
                  }))
                  
                : ""}
            </tr>
            <tr>
                <td className="table-left-atr">RPE</td>
                {player
                ? (emp = true, player.training.map((val) => {
                    if (
                      val.date.split("/")[0] == showDate(currentShownWeek, 0) &&
                      val.date.split("/")[1] == showMonth(currentShownWeek, 0) + 1
                    )
                    {emp = false;return <td className="pso-sub2">{findRPE1(val)}</td>;}
                    else if(emp&&player.training[player.training.length-1]==val) return <td></td>
                  }))
                : ""
                }
                {player
                ?(emp = true, player.training.map((val) => {
                    if (
                      val.date.split("/")[0] == showDate(currentShownWeek, 1) &&
                      val.date.split("/")[1] == showMonth(currentShownWeek, 1) + 1
                    )
                    {emp = false;return <td className="pso-sub2">{findRPE1(val)}</td>;}
                    else if(emp&&player.training[player.training.length-1]==val) return <td></td>
                  }))
                : ""}
                {player
                ? (emp= true, player.training.map((val) => {
                    if (
                      val.date.split("/")[0] == showDate(currentShownWeek, 2) &&
                      val.date.split("/")[1] == showMonth(currentShownWeek, 2) + 1
                    )
                    {emp = false;return <td className="pso-sub2">{findRPE1(val)}</td>;}
                    else if(emp&&player.training[player.training.length-1]==val) return <td></td>
                  }))
                  
                : ""}
                {player
                ?(emp= true, player.training.map((val) => {
                    if (
                      val.date.split("/")[0] == showDate(currentShownWeek, 3) &&
                      val.date.split("/")[1] == showMonth(currentShownWeek, 3) + 1
                    )
                    {emp = false;return <td className="pso-sub2">{findRPE1(val)}</td>;}
                    else if(emp&&player.training[player.training.length-1]==val) return <td></td>
                  }))
                  
                : ""}
                {player
                ?(emp= true, player.training.map((val) => {
                    if (
                      val.date.split("/")[0] == showDate(currentShownWeek, 4) &&
                      val.date.split("/")[1] == showMonth(currentShownWeek, 4) + 1
                    )
                    {emp = false;return <td className="pso-sub2">{findRPE1(val)}</td>;}
                    else if(emp&&player.training[player.training.length-1]==val) return <td></td>
                  }))
                  
                : ""}
                {player
                ?(emp= true, player.training.map((val) => {
                    if (
                      val.date.split("/")[0] == showDate(currentShownWeek, 5) &&
                      val.date.split("/")[1] == showMonth(currentShownWeek, 5) + 1
                    )
                    {emp = false;return <td className="pso-sub2">{findRPE1(val)}</td>;}
                    else if(emp&&player.training[player.training.length-1]==val) return <td></td>
                  }))
                  
                : ""}
                {player
                ?(emp= true, player.training.map((val) => {
                    if (
                      val.date.split("/")[0] == showDate(currentShownWeek, 6) &&
                      val.date.split("/")[1] == showMonth(currentShownWeek, 6) + 1
                    )
                    {emp = false;return <td className="pso-sub2">{findRPE1(val)}</td>;}
                    else if(emp&&player.training[player.training.length-1]==val) return <td></td>
                  }))
                  
                : ""}
            </tr>
            <tr>
                <td className="table-left-atr">Duration</td>
                {player
                ? (emp = true, player.training.map((val) => {
                    if (
                      val.date.split("/")[0] == showDate(currentShownWeek, 0) &&
                      val.date.split("/")[1] == showMonth(currentShownWeek, 0) + 1
                    )
                    {emp = false;return <td className="pso-sub2">{findDuration1(val)}</td>;}
                    else if(emp&&player.training[player.training.length-1]==val) return <td></td>
                  }))
                : ""
                }
                {player
                ?(emp = true, player.training.map((val) => {
                    if (
                      val.date.split("/")[0] == showDate(currentShownWeek, 1) &&
                      val.date.split("/")[1] == showMonth(currentShownWeek, 1) + 1
                    )
                    {emp = false;return <td className="pso-sub2">{findDuration1(val)}</td>;}
                    else if(emp&&player.training[player.training.length-1]==val) return <td></td>
                  }))
                : ""}
                {player
                ? (emp= true, player.training.map((val) => {
                    if (
                      val.date.split("/")[0] == showDate(currentShownWeek, 2) &&
                      val.date.split("/")[1] == showMonth(currentShownWeek, 2) + 1
                    )
                    {emp = false;return <td className="pso-sub2">{findDuration1(val)}</td>;}
                    else if(emp&&player.training[player.training.length-1]==val) return <td></td>
                  }))
                  
                : ""}
                {player
                ?(emp= true, player.training.map((val) => {
                    if (
                      val.date.split("/")[0] == showDate(currentShownWeek, 3) &&
                      val.date.split("/")[1] == showMonth(currentShownWeek, 3) + 1
                    )
                    {emp = false;return <td className="pso-sub2">{findDuration1(val)}</td>;}
                    else if(emp&&player.training[player.training.length-1]==val) return <td></td>
                  }))
                  
                : ""}
                {player
                ?(emp= true, player.training.map((val) => {
                    if (
                      val.date.split("/")[0] == showDate(currentShownWeek, 4) &&
                      val.date.split("/")[1] == showMonth(currentShownWeek, 4) + 1
                    )
                    {emp = false;return <td className="pso-sub2">{findDuration1(val)}</td>;}
                    else if(emp&&player.training[player.training.length-1]==val) return <td></td>
                  }))
                  
                : ""}
                {player
                ?(emp= true, player.training.map((val) => {
                    if (
                      val.date.split("/")[0] == showDate(currentShownWeek, 5) &&
                      val.date.split("/")[1] == showMonth(currentShownWeek, 5) + 1
                    )
                    {emp = false;return <td className="pso-sub2">{findDuration1(val)}</td>;}
                    else if(emp&&player.training[player.training.length-1]==val) return <td></td>
                  }))
                  
                : ""}
                {player
                ?(emp= true, player.training.map((val) => {
                    if (
                      val.date.split("/")[0] == showDate(currentShownWeek, 6) &&
                      val.date.split("/")[1] == showMonth(currentShownWeek, 6) + 1
                    )
                    {emp = false;return <td className="pso-sub2">{findDuration1(val)}</td>;}
                    else if(emp&&player.training[player.training.length-1]==val) return <td></td>
                  }))
                  
                : ""}
            </tr>
            <tr>
                <td className="table-left-atr">Session2</td>
                {player
                ? (emp = true, player.training.map((val) => {
                    if (
                      val.date.split("/")[0] == showDate(currentShownWeek, 0) &&
                      val.date.split("/")[1] == showMonth(currentShownWeek, 0) + 1
                    )
                    {emp = false;return <td className="pso-sub2">{findSession2(val)}</td>;}
                    else if(emp&&player.training[player.training.length-1]==val) return <td></td>
                  }))
                : ""
                }
                {player
                ?(emp = true, player.training.map((val) => {
                    if (
                      val.date.split("/")[0] == showDate(currentShownWeek, 1) &&
                      val.date.split("/")[1] == showMonth(currentShownWeek, 1) + 1
                    )
                    {emp = false;return <td className="pso-sub2">{findSession2(val)}</td>;}
                    else if(emp&&player.training[player.training.length-1]==val) return <td></td>
                  }))
                : ""}
                {player
                ? (emp= true, player.training.map((val) => {
                    if (
                      val.date.split("/")[0] == showDate(currentShownWeek, 2) &&
                      val.date.split("/")[1] == showMonth(currentShownWeek, 2) + 1
                    )
                    {emp = false;return <td className="pso-sub2">{findSession2(val)}</td>;}
                    else if(emp&&player.training[player.training.length-1]==val) return <td></td>
                  }))
                  
                : ""}
                {player
                ?(emp= true, player.training.map((val) => {
                    if (
                      val.date.split("/")[0] == showDate(currentShownWeek, 3) &&
                      val.date.split("/")[1] == showMonth(currentShownWeek, 3) + 1
                    )
                    {emp = false;return <td className="pso-sub2">{findSession2(val)}</td>;}
                    else if(emp&&player.training[player.training.length-1]==val) return <td></td>
                  }))
                  
                : ""}
                {player
                ?(emp= true, player.training.map((val) => {
                    if (
                      val.date.split("/")[0] == showDate(currentShownWeek, 4) &&
                      val.date.split("/")[1] == showMonth(currentShownWeek, 4) + 1
                    )
                    {emp = false;return <td className="pso-sub2">{findSession2(val)}</td>;}
                    else if(emp&&player.training[player.training.length-1]==val) return <td></td>
                  }))
                  
                : ""}
                {player
                ?(emp= true, player.training.map((val) => {
                    if (
                      val.date.split("/")[0] == showDate(currentShownWeek, 5) &&
                      val.date.split("/")[1] == showMonth(currentShownWeek, 5) + 1
                    )
                    {emp = false;return <td className="pso-sub2">{findSession2(val)}</td>;}
                    else if(emp&&player.training[player.training.length-1]==val) return <td></td>
                  }))
                  
                : ""}
                {player
                ?(emp= true, player.training.map((val) => {
                    if (
                      val.date.split("/")[0] == showDate(currentShownWeek, 6) &&
                      val.date.split("/")[1] == showMonth(currentShownWeek, 6) + 1
                    )
                    {emp = false;return <td className="pso-sub2">{findSession2(val)}</td>;}
                    else if(emp&&player.training[player.training.length-1]==val) return <td></td>
                  }))
                  
                : ""}
            </tr>
            <tr>
                <td className="table-left-atr">RPE</td>
                {player
                ? (emp = true, player.training.map((val) => {
                    if (
                      val.date.split("/")[0] == showDate(currentShownWeek, 0) &&
                      val.date.split("/")[1] == showMonth(currentShownWeek, 0) + 1
                    )
                    {emp = false;return <td className="pso-sub2">{findRPE2(val)}</td>;}
                    else if(emp&&player.training[player.training.length-1]==val) return <td></td>
                  }))
                : ""
                }
                {player
                ?(emp = true, player.training.map((val) => {
                    if (
                      val.date.split("/")[0] == showDate(currentShownWeek, 1) &&
                      val.date.split("/")[1] == showMonth(currentShownWeek, 1) + 1
                    )
                    {emp = false;return <td className="pso-sub2">{findRPE2(val)}</td>;}
                    else if(emp&&player.training[player.training.length-1]==val) return <td></td>
                  }))
                : ""}
                {player
                ? (emp= true, player.training.map((val) => {
                    if (
                      val.date.split("/")[0] == showDate(currentShownWeek, 2) &&
                      val.date.split("/")[1] == showMonth(currentShownWeek, 2) + 1
                    )
                    {emp = false;return <td className="pso-sub2">{findRPE2(val)}</td>;}
                    else if(emp&&player.training[player.training.length-1]==val) return <td></td>
                  }))
                  
                : ""}
                {player
                ?(emp= true, player.training.map((val) => {
                    if (
                      val.date.split("/")[0] == showDate(currentShownWeek, 3) &&
                      val.date.split("/")[1] == showMonth(currentShownWeek, 3) + 1
                    )
                    {emp = false;return <td className="pso-sub2">{findRPE2(val)}</td>;}
                    else if(emp&&player.training[player.training.length-1]==val) return <td></td>
                  }))
                  
                : ""}
                {player
                ?(emp= true, player.training.map((val) => {
                    if (
                      val.date.split("/")[0] == showDate(currentShownWeek, 4) &&
                      val.date.split("/")[1] == showMonth(currentShownWeek, 4) + 1
                    )
                    {emp = false;return <td className="pso-sub2">{findRPE2(val)}</td>;}
                    else if(emp&&player.training[player.training.length-1]==val) return <td></td>
                  }))
                  
                : ""}
                {player
                ?(emp= true, player.training.map((val) => {
                    if (
                      val.date.split("/")[0] == showDate(currentShownWeek, 5) &&
                      val.date.split("/")[1] == showMonth(currentShownWeek, 5) + 1
                    )
                    {emp = false;return <td className="pso-sub2">{findRPE2(val)}</td>;}
                    else if(emp&&player.training[player.training.length-1]==val) return <td></td>
                  }))
                  
                : ""}
                {player
                ?(emp= true, player.training.map((val) => {
                    if (
                      val.date.split("/")[0] == showDate(currentShownWeek, 6) &&
                      val.date.split("/")[1] == showMonth(currentShownWeek, 6) + 1
                    )
                    {emp = false;return <td className="pso-sub2">{findRPE2(val)}</td>;}
                    else if(emp&&player.training[player.training.length-1]==val) return <td></td>
                  }))
                  
                : ""}
            </tr>
            <tr>
                <td className="table-left-atr">Duration</td>
                {player
                ? (emp = true, player.training.map((val) => {
                    if (
                      val.date.split("/")[0] == showDate(currentShownWeek, 0) &&
                      val.date.split("/")[1] == showMonth(currentShownWeek, 0) + 1
                    )
                    {emp = false;return <td className="pso-sub2">{findDuration2(val)}</td>;}
                    else if(emp&&player.training[player.training.length-1]==val) return <td></td>
                  }))
                : ""
                }
                {player
                ?(emp = true, player.training.map((val) => {
                    if (
                      val.date.split("/")[0] == showDate(currentShownWeek, 1) &&
                      val.date.split("/")[1] == showMonth(currentShownWeek, 1) + 1
                    )
                    {emp = false;return <td className="pso-sub2">{findDuration2(val)}</td>;}
                    else if(emp&&player.training[player.training.length-1]==val) return <td></td>
                  }))
                : ""}
                {player
                ? (emp= true, player.training.map((val) => {
                    if (
                      val.date.split("/")[0] == showDate(currentShownWeek, 2) &&
                      val.date.split("/")[1] == showMonth(currentShownWeek, 2) + 1
                    )
                    {emp = false;return <td className="pso-sub2">{findDuration2(val)}</td>;}
                    else if(emp&&player.training[player.training.length-1]==val) return <td></td>
                  }))
                  
                : ""}
                {player
                ?(emp= true, player.training.map((val) => {
                    if (
                      val.date.split("/")[0] == showDate(currentShownWeek, 3) &&
                      val.date.split("/")[1] == showMonth(currentShownWeek, 3) + 1
                    )
                    {emp = false;return <td className="pso-sub2">{findDuration2(val)}</td>;}
                    else if(emp&&player.training[player.training.length-1]==val) return <td></td>
                  }))
                  
                : ""}
                {player
                ?(emp= true, player.training.map((val) => {
                    if (
                      val.date.split("/")[0] == showDate(currentShownWeek, 4) &&
                      val.date.split("/")[1] == showMonth(currentShownWeek, 4) + 1
                    )
                    {emp = false;return <td className="pso-sub2">{findDuration2(val)}</td>;}
                    else if(emp&&player.training[player.training.length-1]==val) return <td></td>
                  }))
                  
                : ""}
                {player
                ?(emp= true, player.training.map((val) => {
                    if (
                      val.date.split("/")[0] == showDate(currentShownWeek, 5) &&
                      val.date.split("/")[1] == showMonth(currentShownWeek, 5) + 1
                    )
                    {emp = false;return <td className="pso-sub2">{findDuration2(val)}</td>;}
                    else if(emp&&player.training[player.training.length-1]==val) return <td></td>
                  }))
                  
                : ""}
                {player
                ?(emp= true, player.training.map((val) => {
                    if (
                      val.date.split("/")[0] == showDate(currentShownWeek, 6) &&
                      val.date.split("/")[1] == showMonth(currentShownWeek, 6) + 1
                    )
                    {emp = false;return <td className="pso-sub2">{findDuration2(val)}</td>;}
                    else if(emp&&player.training[player.training.length-1]==val) return <td></td>
                  }))
                  
                : ""}
            </tr>
            <tr>
                <td className="table-left-atr-bottom">Total Load <br></br><label style={{fontWeight:"700"}}>{findLoadForCurrentWeek()}</label><br/>W-to-W<br></br><label style={{fontWeight:"700"}}>{findWtoW()}</label></td>
                {player
                ?(emp= true, player.training.map((val) => {
                    if (
                      val.date.split("/")[0] == showDate(currentShownWeek, 0) &&
                      val.date.split("/")[1] == showMonth(currentShownWeek, 0) + 1
                    )
                    {emp = false;return <td  className="pso-subb2">
                      <div className="load-cell-container">
                        <label>{findLoad(val)}</label>
                        <div style={{height:findLoadForBar(val)}} className={findLoad(val)<500?"load-cell-bar":"load-cell-bar-red"}></div>
                      </div>
                        </td>;}
                        
                    else if(emp&&player.training[player.training.length-1]==val) return <td></td>
                  }))
                  
                : ""}
                {player
                ?(emp= true, player.training.map((val) => {
                    if (
                      val.date.split("/")[0] == showDate(currentShownWeek, 1) &&
                      val.date.split("/")[1] == showMonth(currentShownWeek, 1) + 1
                    )
                    {emp = false;return <td  className="pso-subb2">
                      <div className="load-cell-container">
                        <label>{findLoad(val)}</label>
                        <div style={{height:findLoadForBar(val)}} className={findLoad(val)<500?"load-cell-bar":"load-cell-bar-red"}></div>
                      </div>
                        </td>;}
                    else if(emp&&player.training[player.training.length-1]==val) return <td></td>
                  }))
                  
                : ""}
                {player
                ?(emp= true, player.training.map((val) => {
                    if (
                      val.date.split("/")[0] == showDate(currentShownWeek, 2) &&
                      val.date.split("/")[1] == showMonth(currentShownWeek, 2) + 1
                    )
                    {emp = false;return <td  className="pso-subb2">
                      <div className="load-cell-container">
                        <label>{findLoad(val)}</label>
                        <div style={{height:findLoadForBar(val)}} className={findLoad(val)<500?"load-cell-bar":"load-cell-bar-red"}></div>
                      </div>
                        </td>;}
                    else if(emp&&player.training[player.training.length-1]==val) return <td></td>
                  }))
                  
                : ""}
                {player
                ?(emp= true, player.training.map((val) => {
                    if (
                      val.date.split("/")[0] == showDate(currentShownWeek, 3) &&
                      val.date.split("/")[1] == showMonth(currentShownWeek, 3) + 1
                    )
                    {emp = false;return <td  className="pso-subb2">
                      <div className="load-cell-container">
                        <label>{findLoad(val)}</label>
                        <div style={{height:findLoadForBar(val)}} className={findLoad(val)<500?"load-cell-bar":"load-cell-bar-red"}></div>
                      </div>
                        </td>;}
                    else if(emp&&player.training[player.training.length-1]==val) return <td></td>
                  }))
                  
                : ""}
                {player
                ?(emp= true, player.training.map((val) => {
                    if (
                      val.date.split("/")[0] == showDate(currentShownWeek, 4) &&
                      val.date.split("/")[1] == showMonth(currentShownWeek, 4) + 1
                    )
                    {emp = false;return <td  className="pso-subb2">
                      <div className="load-cell-container">
                        <label>{findLoad(val)}</label>
                        <div style={{height:findLoadForBar(val)}} className={findLoad(val)<500?"load-cell-bar":"load-cell-bar-red"}></div>
                      </div>
                        </td>;}
                    else if(emp&&player.training[player.training.length-1]==val) return <td></td>
                  }))
                  
                : ""}
                {player
                ?(emp= true, player.training.map((val) => {
                    if (
                      val.date.split("/")[0] == showDate(currentShownWeek, 5) &&
                      val.date.split("/")[1] == showMonth(currentShownWeek, 5) + 1
                    )
                    {emp = false;return <td  className="pso-subb2">
                      <div className="load-cell-container">
                        <label>{findLoad(val)}</label>
                        <div style={{height:findLoadForBar(val)}} className={findLoad(val)<500?"load-cell-bar":"load-cell-bar-red"}></div>
                      </div>
                        </td>;}
                    else if(emp&&player.training[player.training.length-1]==val) return <td></td>
                  }))
                  
                : ""}
                {player
                ?(emp= true, player.training.map((val) => {
                    if (
                      val.date.split("/")[0] == showDate(currentShownWeek, 6) &&
                      val.date.split("/")[1] == showMonth(currentShownWeek, 6) + 1
                    )
                    {emp = false;return <td  className="pso-subb2">
                      <div className="load-cell-container">
                        <label>{findLoad(val)}</label>
                        <div style={{height:findLoadForBar(val)}} className={findLoad(val)<500?"load-cell-bar":"load-cell-bar-red"}></div>
                      </div>
                        </td>;}
                    else if(emp&&player.training[player.training.length-1]==val) return <td></td>
                  }))
                  
                : ""}
            </tr>
        </tbody>
      </table>
    </div>
  );
};

export default PlayerSummaryTrainingLoad;
