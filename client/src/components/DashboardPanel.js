import React, { useState } from "react";
import "./componentsCss/DashboardPanel.css";
import imag from "../assets/ball.png";
import { Bar } from "react-chartjs-2";
import moment from "moment";
import { useEffect } from "react";
const DashboardPanel = (sideBarOnOff) => {
  const today = moment();
  let totalDays = [];
  let indexOfToday = [];
  let initialWeightToday = [];
  let initialColorToday = [];
  const [activeTab, setActiveTab] = useState(true);
  const [injuriesProgress, setInjuriesProgress] = useState([
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
  ]); //array
  const [injuriesAverage, setInjuriesAverage] = useState(0.8); //array
  const [injuryLabel, setInjuryLabel] = useState(injuriesProgress.length);
  const [fatigueProgress, setFatigueProgress] = useState(2.2); //0-5
  const [fatigueAverage, setFatigueAverage] = useState(1.5); //0-5
  const [enjoymentProgress, setEnjoymentProgress] = useState(4); //0-5
  const [enjoymentAverage, setEnjoymentAverage] = useState(3); //0-5
  const [sleepingProgress, setSleepingProgress] = useState(3); //0-12
  const [sleepingAverage, setSleepingAverage] = useState(7); //0-12
  const [donutPercent, setDonutPercent] = useState(77); //0-100
  const [selectedActive, setSelectedActive] = useState(true);
  const [alertActive, setAlertActive] = useState(false);
  const [selectedPlayers, setSelectedPlayers] = useState([
    { name: "John Doe", injury: "Knee Injury" },
    { name: "Doe John", injury: "" },
    { name: "John Doe", injury: "Knee Injury" },
    { name: "Doe John", injury: "Hand Injury" },
    { name: "John Doe", injury: "Knee Injury" },
    { name: "Doe John", injury: "Hand Injury" },
    { name: "John Doe", injury: "Knee Injury" },
    { name: "Doe John", injury: "Hand Injury" },
    { name: "John Doe", injury: "" },
    { name: "Doe John", injury: "Hand Injury" },
    { name: "John Doe", injury: "Knee Injury" },
    
  ]);
  const [alertPlayers, setAlertPlayers] = useState([
    { name: "Alfred John", injury: "" },
    { name: "Josh Smith", injury: "Leg Injury" },
  ]);
  useEffect(()=>{
    initChart()
  },[])
  const findWeek = () => {
    for (let i = 0; i < 7; i++) {
      const theDay = today.startOf("week").add(i, "d").toDate().getDate();
      totalDays.push(theDay);
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
  function createCircleChart(percent, color, size, stroke) {
    let svg = `<svg class="mkc_circle-chart" viewbox="0 0 36 36" width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
        <path class="mkc_circle-bg" stroke="#eeeeee" stroke-width="${stroke * 0.5}" fill="none" d="M18 2.0845
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


const initChart =  () =>{
  let charts =  document.getElementsByClassName('mkCharts');
  for(let i=0;i<charts.length;i++) {
    let chart = charts[i];
    let percent = chart.dataset.percent;
    let color = ('color' in chart.dataset) ? chart.dataset.color : "#2F4F4F";
    let size = ('size' in chart.dataset) ? chart.dataset.size : "100";
    let stroke = ('stroke' in chart.dataset) ? chart.dataset.stroke : "1";
    charts[i].innerHTML = createCircleChart(percent, color, size, stroke);
}}
  findWeek();

  let chartData = {
      
    labels: [
      `${/*determineDatePlus(0)*/"Su"}`,
      `${/*determineDatePlus(0)*/"Mo"}`,
      `${/*determineDatePlus(0)*/"Tu"}`,
      `${/*determineDatePlus(0)*/"We"}`,
      `${/*determineDatePlus(0)*/"Th"}`,
      `${/*determineDatePlus(0)*/"Fr"}`,
      `${/*determineDatePlus(0)*/"Sa"}`,
      
    ],
    datasets: [
      {
        label: "Weekly Load",
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
        data: [4, 5, 2, 4, 6, 7, 2, 5, 1, 2, 5, 6],
        maintainAspectRatio: false,
        maxBarThickness: 15,
        borderRadius: 10,
      },
    ],
  };
  var options = {
    maintainAspectRatio: false,
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
        },
      },
      y: {
        grid: {
          display: true,
          drawBorder: false,
        },
        ticks: {
          beginAtZero: true,
          callback: function (value, index, values) {
            return value == 5 ? "5" : null;
          },
        },
      },
    },
  };
  return (
    <div style={{ width: sideBarOnOff.sideBarOnOff }} className="dashboard-panel">
      <div className="dashboard-panel-title">
        <label >Dashboard panel</label>
        <select className="team-select">
          <option>Team A</option>
        </select>
      </div>
      <div className="match-overview">
        <div className="chart"><Bar height="500" options={options} data={chartData}></Bar></div>
        <div className="readiness">
        <div className="monitor-wellness">
                         <div onClick={()=> {if(injuryLabel<20)setInjuriesProgress([...injuriesProgress,1]);initChart();if(injuryLabel<20)setInjuryLabel(injuriesProgress.length+1);else setInjuryLabel("21+")}} className="readiness-circle">
                         <div className="mkCharts" data-percent={donutPercent} data-stroke="3" data-color="#89E894"></div>
                         </div>
                         <div className="wellness-stats">
                             <label className="stats-label">Injuries</label>
                             <div className="wellness-progress-bar">
                                 {injuriesProgress.map((value,index)=>{return(<div key={index} className="injury-bean"></div>)})}
                            
                             </div>
                             <label className="stats-nr">{injuryLabel}</label>
                             <label className="stats-label">Fatigue</label>
                             <div className="wellness-progress-bar">
                                 <div style={{width:`${fatigueProgress*20}%`}} className="wellness-progress-bar-fill"></div>
                              
                             </div>
                             <label className="stats-nr">{fatigueProgress}/5</label>
                             <label className="stats-label">Enjoyment</label>
                             <div className="wellness-progress-bar">
                                 <div style={{width:`${enjoymentProgress*20}%`}} className="wellness-progress-bar-fill"></div>
                                 
                             </div>
                             <label className="stats-nr">{enjoymentProgress}/5</label>
                             <label className="stats-label">Sleeping T</label>
                             <div className="wellness-progress-bar">
                                 <div style={{width:`${sleepingProgress*8.333}%`}} className="wellness-progress-bar-fill"></div>
                                 
                             </div>
                             <label className="stats-nr">{sleepingProgress}</label>
                         </div>
                     </div>
        </div>
      </div>
      <label className="players-label">Players</label>
      <div className="selected-tab-desktop">
                {selectedPlayers.map((value,index)=>
                <div className="selected-player-desktop">
                  <img className="selected-player-img"></img>
                  <div className="injured-player-info">
                      <label className="selected-player-name-desktop">{value.name}</label>
                      <label className="injury-desktop">{value.injury}</label>
                    </div>
                  <div className={value.injury ? "not-ready selected-player-readiness-desktop" : "ready selected-player-readiness-desktop"}></div>
                </div>)}
            </div>
    </div>
  );
};

export default DashboardPanel;
