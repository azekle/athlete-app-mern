import moment from "moment";
import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { IoBandageOutline } from "react-icons/io5";
import { MdKeyboardArrowLeft,MdKeyboardArrowRight } from "react-icons/md";
import defaultImage from "../../assets/sportsman.svg";
import {BsFillExclamationTriangleFill} from 'react-icons/bs'
import {GiNightSleep} from 'react-icons/gi'
import exhausted from '../../assets/exhausted.svg'
const Monitoring = (props) => {
  var totalPlayers = [];
  props.players.map((value) => {
    if (!value.is_coach) totalPlayers.push(value);
  });

  //State START
  var currentWeekDates = [];
  const [activeTab, setActiveTab] = useState(true);
  const [injuriesProgress, setInjuriesProgress] = useState([
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
  ]); //array
  const [injuriesAverage, setInjuriesAverage] = useState(0.8); //array
  const [injuryLabel, setInjuryLabel] = useState(injuriesProgress.length);
  var fatigueProgress = 0;
  const [fatigueAverage, setFatigueAverage] = useState(1.5); //0-5
  var enjoymentProgress = 0; //0-5
  const [enjoymentAverage, setEnjoymentAverage] = useState(3); //0-5
  var sleepingProgress = 0; //0-12
  const [sleepingAverage, setSleepingAverage] = useState(7); //0-12
  const [donutPercent, setDonutPercent] = useState(77); //0-100
  const [selectedActive, setSelectedActive] = useState(true);
  const [alertActive, setAlertActive] = useState(false);
  const [selectedPlayers, setSelectedPlayers] = useState(totalPlayers);
  const [alertPlayers, setAlertPlayers] = useState(totalPlayers);
  const [playersToDisplay, setPlayersToDisplay] = useState([]);
  const [weeksBefore, setWeeksBefore] = useState(0);
  const [startDay, setStartDay] = useState(
    moment().startOf("week").format("DD.MM")
  );
  const [endDay, setEndDay] = useState(moment().endOf("week").format("DD.MM"));
  let initialWeightToday = [];
  let initialColorToday = [];
  let totalDays = [];
  let indexOfToday = [];
  let averageBars2 = 0
  const [averageBars,setAverageBars] = useState(0);
  //State END
  const today = moment();
  //Functions START
  /*const determineDatePlus = (days) =>{
    const todayDate = today.toDate().getDate();
    const startWeek = today.startOf("week").add(days,"d").toDate().getDate()+"/0"+(today.startOf("week").add(days,"d").toDate().getMonth()+1)
    return startWeek
    }*/
  var universalCounter = 0;
  let load = []
  let itemForLoad = 0
  const determineAverageForEverything = () => {
    totalPlayers.map((value) => {
      value.training.map((value2) => {
        if (currentWeekDates.includes(value2.date)) {
          value2.fatigue = parseInt(value2.fatigue);
          value2.wellness1 = parseInt(value2.wellness1);
          value2.wellness2 = parseInt(value2.wellness2);
          value2.sleep = parseInt(value2.sleep);
          fatigueProgress += value2.fatigue;
          enjoymentProgress += value2.wellness1 + value2.wellness2;
          sleepingProgress += value2.sleep;
          universalCounter++;
        }
      });
    });
    fatigueProgress = fatigueProgress / universalCounter;
    fatigueProgress = Math.round(fatigueProgress * 10) / 10;
    enjoymentProgress = enjoymentProgress / (universalCounter * 2);
    enjoymentProgress = Math.round(enjoymentProgress * 10) / 10;
    sleepingProgress = sleepingProgress / universalCounter;
    sleepingProgress = Math.round(sleepingProgress * 10) / 10;
    //determine data for weekly load↓↓↓
    currentWeekDates.map((date,index)=>{
       
      playersToDisplay.map(player=>{
        player.training.map(train=>{
          if(train.date==date) {itemForLoad+=train.rpe1*train.duration1+train.rpe2*train.duration2;}
        })
       
      }) 
      if(itemForLoad) {load.push(itemForLoad)}
        itemForLoad = 0
      if (index >= load.length) {load.push(0)}
    })
    const reducer = (accumulator, curr) => accumulator + curr;
    let counter = 0;
    load.map((value) => {
      if (value != 0) counter++;
    });
     averageBars2 = load.reduce(reducer) / counter;
  };
useEffect(() => {
  determineAverageForEverything()
  averageBars2 = Math.ceil(averageBars2)
  averageBars2 = averageBars2/100
  averageBars2 = Math.round(averageBars2)
  averageBars2 = averageBars2 * 100
  setAverageBars(averageBars2)
}, [averageBars2,weeksBefore])
useEffect(()=>{
  averageBars2 = Math.ceil(averageBars2)
  averageBars2 = averageBars2/100
  averageBars2 = Math.round(averageBars2)
  averageBars2 = averageBars2 * 100
  setAverageBars(averageBars2)
},[averageBars2,load])
  const findWeek = () => {
    for (let i = 0; i < 7; i++) {
      const theDay = today.startOf("week").add(i, "d").toDate().getDate();
      totalDays.push(theDay);
      currentWeekDates.push(moment().startOf("week").add(i, "d").subtract(weeksBefore*7,"d").format("DD/MM/YY"));
      //currentWeekDates.push(today.startOf("week").add(i, "d").format("DD/MM/YY"));
      
    }
    totalDays.map((value, index) => {
      if (value === moment().toDate().getDate()) {
        initialWeightToday.push(900);
        indexOfToday = index;
      }
      initialWeightToday.push(400);
    });
    totalDays.map((value, index) => {
      if (index <= indexOfToday) initialColorToday.push("black");
      else initialColorToday.push("#8E8E8E");
    });
  };
  findWeek();
  determineAverageForEverything();
  function createCircleChart(percent, color, size, stroke) {
    let svg = `<svg class="mkc_circle-chart" viewbox="0 0 36 36" width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
          <path class="mkc_circle-bg" stroke="#eeeeee" stroke-width="${
            stroke * 0.5
          }" fill="none" d="M18 2.0845
                a 15.9155 15.9155 0 0 1 0 31.831
                a 15.9155 15.9155 0 0 1 0 -31.831"/>
          <path class="mkc_circle" stroke="${color}" stroke-width="${stroke}" stroke-dasharray="${percent},100" stroke-linecap="round" fill="none"
              d="M18 2.0845
                a 15.9155 15.9155 0 0 1 0 31.831
                a 15.9155 15.9155 0 0 1 0 -31.831" />
          <text class="mkc_info" x="50%" y="50%" alignment-baseline="central" text-anchor="middle" font-size="8">${percent}%</text>
      </svg>`;
    return svg;
  }

  const weekGoBack = () => {
    setWeeksBefore(weeksBefore + 1);
    setStartDay(
      moment()
        .startOf("week")
        .subtract(weeksBefore + 1, "w")
        .format("DD.MM")
    );
    setEndDay(
      moment()
        .endOf("week")
        .subtract(weeksBefore + 1, "w")
        .format("DD.MM")
    );
  };
  const weekGoForward = () => {
    if (weeksBefore > 0) {
      setWeeksBefore(weeksBefore - 1);
      setStartDay(
        moment()
          .startOf("week")
          .subtract(weeksBefore - 1, "w")
          .format("DD.MM")
      );
      setEndDay(
        moment()
          .endOf("week")
          .subtract(weeksBefore - 1, "w")
          .format("DD.MM")
      );
    }
  };
  const initChart = () => {
    let charts = document.getElementsByClassName("mkCharts");
    for (let i = 0; i < charts.length; i++) {
      let chart = charts[i];
      let percent = chart.dataset.percent;
      let color = "color" in chart.dataset ? chart.dataset.color : "#2F4F4F";
      let size = "size" in chart.dataset ? chart.dataset.size : "100";
      let stroke = "stroke" in chart.dataset ? chart.dataset.stroke : "1";
      charts[i].innerHTML = createCircleChart(percent, color, size, stroke);
    }
  };
  const changedTeam = () => {
    var playersToDisplayAux = [];
    totalPlayers.map((value) => {
      if (value.team == props.team) playersToDisplayAux.push(value);
    });
    setPlayersToDisplay(playersToDisplayAux);
  };
  useEffect(() => {
    if (props.team) changedTeam();
  }, [props.team]);
  //Functions END
  useEffect(() => {
    if (injuriesProgress.length > 14) {
      setInjuriesProgress([1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]);
    }
    initChart();
    setSelectedPlayers(totalPlayers);
    setPlayersToDisplay(totalPlayers);
  }, [activeTab, injuriesProgress, props.players]);

  const changeMonitoringTab = () => {
    setActiveTab(!activeTab);
  };
  var startOfWeek = moment().startOf("week").toDate();
  const [currentShownWeek, setCurrentShownWeek] = useState(startOfWeek);
  const findSleep = (player) =>{
    var forReturn = 0
    player.training.map(value=>{
      if(value.date==moment().format("DD/MM/YY")) {forReturn=value.sleep}
      else forReturn = undefined
    })
    return forReturn
  }
  const findFatigue = (player) =>{
    var forReturn = 0
    player.training.map(value=>{
      if(value.date==moment().format("DD/MM/YY")) {forReturn=value.fatigue}
      else forReturn = undefined
    })
    return forReturn
  }
  const findACWR = (player) =>{
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
    return((Math.round(loadForCurrenWeek/loadFor4Weeks*100)/100)||0)
  }
  let chartData = {
    labels: [
      `${/*determineDatePlus(0)*/ "Su"}`,
      `${/*determineDatePlus(0)*/ "Mo"}`,
      `${/*determineDatePlus(0)*/ "Tu"}`,
      `${/*determineDatePlus(0)*/ "We"}`,
      `${/*determineDatePlus(0)*/ "Th"}`,
      `${/*determineDatePlus(0)*/ "Fr"}`,
      `${/*determineDatePlus(0)*/ "Sa"}`,
    ],
    datasets: [
      {
        label: "Daily Load",
        backgroundColor: [
          "#1195FF",
          "#1195FF",
          "#1195FF",
          "#1195FF",
          "#1195FF",
          "#1195FF",
          "#1195FF",
          "#1195FF",
          "#1195FF",
          "#DBDADA",
          "#DBDADA",
          "#DBDADA",
        ],
        borderColor: "#1195FF",
        data: load,
        maintainAspectRatio: false,
        maxBarThickness: 10,
        borderRadius: 10,
      },
      {
        label: "                              ",
        maxBarThickness: 0,
        borderRadius: 0,
        borderColor:"#fff",
        backgroundColor:"#fff",
        type:"line"
      },
    ],
  };

  var options = {
    
    plugins: {
      legend:{
        position:"top",
        padding:10,
        maxHeight:0,
        maxWidth:10,
        labels:{
          color:"#ccc",
          boxHeight:10,
          boxWidth:60,

        }
      },
      datalabels: {
        color:"red",
        anchor: 'end',
        align: 'end',
        labels: {
          value: {
            color: 'black',
          }
        }}
   },
    responsive: true,
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          font: {
            weight: initialWeightToday,
            size: 14,
          },
          color: initialColorToday,
        },
      },
      y: {
        grid: {
          display: true,
          drawBorder: false,
        },
        ticks: {
          stepSize:50,
          beginAtZero: true,
          callback: function (value, index, values) {
            return value == averageBars ? averageBars : null;
          },
        },
      },
    },
  };
const changeTeam = (e) =>{
  props.changeTeamState(e.target.value)
}
  return (
    <div className="monitoring">
      {activeTab ? (
        <div className="subtitle-monitoring">
          <div className="select-div">
              <select  onChange={changeTeam} disabled={props.userData.team!="Manager"?true:false} defaultValue={props.userData?props.userData.team:""} className="coach-team">
                <option style={{ color: "black" }}>Team A</option>
                <option style={{ color: "black" }}>Team B</option>
                <option style={{ color: "black" }}>Team C</option>
              </select>
            </div>
          <div className="forward-backward-buts">
            <button onClick={weekGoBack} className="forward-backward-but">
              <MdKeyboardArrowLeft />
            </button>
            <button onClick={weekGoForward} className="forward-backward-but">
              <MdKeyboardArrowRight />
            </button>
          </div>
          <label>{startDay}-{endDay}</label>
        </div>
        
      ) : (
        <div className="subtitle-monitoring">
          <label>Wellness</label>
          <div className="forward-backward-buts">
            <button onClick={weekGoBack} className="forward-backward-but">
              <MdKeyboardArrowLeft />
            </button>
            <button onClick={weekGoForward} className="forward-backward-but">
              <MdKeyboardArrowRight />
            </button>
          </div>{" "}
          {startDay}-{endDay}{" "}
        </div>
      )}
      <div className="monitoring-load">
        <button
          onClick={changeMonitoringTab}
          className="change-month-btn prev-month-btn"
        >
          <IoIosArrowBack />
        </button>
        {activeTab ? (
          <Bar height="300" options={options} plugins={[ChartDataLabels]} data={chartData}></Bar>
        ) : (
          <div className="monitor-wellness">
            <div
              onClick={() => {
                setInjuriesProgress([...injuriesProgress, 1]);
                initChart();
              }}
              className="readiness-circle"
            >
              <div
                className="mkCharts"
                data-percent={donutPercent}
                data-stroke="3"
                data-color="#89E894"
              ></div>
            </div>
            <div className="wellness-stats">
              <label className="stats-label">Injuries</label>
              <div className="wellness-progress-bar">
                {injuriesProgress.map((value, index) => {
                  return <div key={index} className="injury-bean"></div>;
                })}
                <div
                  style={{ width: `${injuriesAverage * 8}%` }}
                  className="progress-bar-average"
                ></div>
              </div>
              <label className="stats-nr">{injuryLabel}</label>
              <label className="stats-label">Fatigue</label>
              <div className="wellness-progress-bar">
                <div
                  style={{ width: `${fatigueProgress?fatigueProgress * 20:0}%` }}
                  className="wellness-progress-bar-fill"
                ></div>
                <div
                  style={{ width: `${fatigueAverage * 8.4}%` }}
                  className="progress-bar-average"
                ></div>
              </div>
              <label className="stats-nr">{fatigueProgress?fatigueProgress:0}/5</label>
              <label className="stats-label">Enjoyment</label>
              <div className="wellness-progress-bar">
                <div
                  style={{ width: `${enjoymentProgress?enjoymentProgress * 20:0}%` }}
                  className="wellness-progress-bar-fill"
                ></div>
                <div
                  style={{ width: `${enjoymentAverage * 8.4}%` }}
                  className="progress-bar-average"
                ></div>
              </div>
              <label className="stats-nr">{enjoymentProgress?enjoymentProgress:0}/5</label>
              <label className="stats-label">Sleeping T</label>
              <div className="wellness-progress-bar">
                <div
                  style={{ width: `${sleepingProgress?sleepingProgress * 8.333:0}%` }}
                  className="wellness-progress-bar-fill"
                ></div>
                <div
                  style={{ width: `${sleepingAverage * 3.45}%` }}
                  className="progress-bar-average"
                ></div>
              </div>
              <label className="stats-nr">{sleepingProgress?sleepingProgress:0}</label>
            </div>
            <div className="wellness-legend">
              <div className="legend">
                <label className="legend-label">Current week</label>
                <div className="legend-square"></div>
              </div>
              <div className="legend">
                <label className="legend-label">4 weeks average</label>
                <div className="legend-dashed"></div>
              </div>
            </div>
          </div>
        )}
        <button
          onClick={changeMonitoringTab}
          style={{ marginRight: "5px" }}
          className="change-month-btn next-month-btn"
        >
          <IoIosArrowForward />
        </button>
      </div>
      <div className="monitoring-tabs">
        <div
          onClick={() => {
            setSelectedActive(true);
            setAlertActive(false);
          }}
          style={selectedActive ? { color: "#0E1333" } : {}}
          className="monitoring-tabs-label"
        >
          Players
        </div>
      </div>
      {selectedActive ? (
        <div className="selected-tab">
          {playersToDisplay.map((value) => (
            <div className="selected-player">
              <div
                className={
                  !findSleep(value)?"not-filled selected-player-readiness":
                  value.injuries.length > 0
                    ? "not-ready selected-player-readiness"
                    : "ready selected-player-readiness"
                }
              ></div>
              <img
                src={value.image.length > 1 ? value.image : defaultImage}
                className="selected-player-img"
              ></img>
              <div className="injured-player-info">
                <label className="selected-player-name">
                  {value.firstName} {value.lastName}
                </label>
                <label className="injury">
                  {value.injuries.length > 0 ? (
                    <div>
                      <IoBandageOutline className="player-info-icon" />
                      <label>{value.injuries[0].name}</label>
                    </div>
                  ) : (
                    ""
                  )}
                  {findACWR(value)>1.5?<div>
                    <BsFillExclamationTriangleFill className="player-info-icon"/>
                    <label>ACWR {findACWR(value)}</label>
                    </div>:"" }
                    {findSleep(value)<7?<div>
                    <GiNightSleep className="player-info-icon"/>
                    <label>{findSleep(value)} hours</label>
                    </div>:"" }
                    {findFatigue(value)<3?<div>
                    <img src={exhausted} className="player-info-icon2"/>
                    <label>{"Exhausted"} </label>
                    </div>:"" }
                </label>
              </div>
            </div>
          ))}
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default Monitoring;
