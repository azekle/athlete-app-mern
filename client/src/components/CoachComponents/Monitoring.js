import moment from 'moment';
import React, { useEffect, useState } from 'react'
import {Bar} from 'react-chartjs-2'
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';

const Monitoring = () => {
    //State START
    const [activeTab,setActiveTab] = useState(true);
    const [injuriesProgress,setInjuriesProgress]= useState([1,1,1,1,1,1,1,1,1,1,1,1]);//array
    const [injuriesAverage,setInjuriesAverage] = useState(.8);//array
    const [injuryLabel,setInjuryLabel] = useState(injuriesProgress.length);
    const [fatigueProgress,setFatigueProgress]= useState(2.2);//0-5
    const [fatigueAverage,setFatigueAverage] = useState(1.5);//0-5
    const [enjoymentProgress,setEnjoymentProgress]= useState(4);//0-5
    const [enjoymentAverage,setEnjoymentAverage] = useState(3);//0-5
    const [sleepingProgress,setSleepingProgress]= useState(3);//0-12
    const [sleepingAverage,setSleepingAverage] = useState(7);//0-12
    const [donutPercent,setDonutPercent] = useState(77)//0-100
    const [selectedActive,setSelectedActive] = useState(true);
    const [alertActive,setAlertActive] = useState(false);
    const [selectedPlayers,setSelectedPlayers] = useState([{name:"Matei Sorin",injury:"Knee Injury"},{name:"Sorin Matei",injury:"Hand Injury"}]);
    const [alertPlayers,setAlertPlayers] = useState([{name:"Alfred John",injury:""},{name:"Josh Smith",injury:"Leg Injury"}]);
    let initialWeightToday=[];
    let initialColorToday=[]
    let totalDays = [];
    let indexOfToday=[]
    //State END
    const today = moment();
    //Functions START
    /*const determineDatePlus = (days) =>{
    const todayDate = today.toDate().getDate();
    const startWeek = today.startOf("week").add(days,"d").toDate().getDate()+"/0"+(today.startOf("week").add(days,"d").toDate().getMonth()+1)
    return startWeek
    }*/
    const findWeek = () =>{
        for (let i = 0; i <7 ; i++) {
           const theDay =  today.startOf("week").add(i,"d").toDate().getDate();
           totalDays.push(theDay)
        }
        totalDays.map((value,index)=>{
            if (value===moment().toDate().getDate()) {initialWeightToday.push(900);indexOfToday=index;}
            initialWeightToday.push(400);
        })
        totalDays.map((value,index)=>{
            if(index<=indexOfToday) initialColorToday.push("black") ; else initialColorToday.push("#8E8E8E")
        })
    }
    findWeek()
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
  
    //Functions END
    useEffect(() => {
      if(injuriesProgress.length>14) {setInjuriesProgress([1,1,1,1,1,1,1,1,1,1,1,1,1,1]);}
      initChart()
    }, [activeTab,injuriesProgress])

    const changeMonitoringTab = () =>{
        setActiveTab(!activeTab)
    }
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
        data: [255, 246, 243, 262, 268, 324, 216, 237, 227, 357, 217, 127],
        maintainAspectRatio: false,
        maxBarThickness: 10,
        borderRadius: 10,
      },
    ],
  };

  var options = {
    responsive: true,
    scales: {
      x: {
        grid: {
         display:false
        },
        ticks: {
            
            font:{
                weight:initialWeightToday,
                size:14
            },
            color:initialColorToday
            
        }
      },
      y: {
        grid: {
            
            display: true,
            drawBorder: false,
        },
        ticks: {
            beginAtZero: true,
            callback: function(value, index, values) {
              return value == 300 ? "300" : null;
            },
            
          }
      }
    }
  }


    return (
      
        <div className="monitoring">
            <label className="title-monitoring">Team Dashboard</label>
            {activeTab? <label className="subtitle-monitoring">Weekly Load</label>:<label className="subtitle-monitoring">Wellness</label>}
            <div className="monitoring-load">
                <button onClick={changeMonitoringTab} className="change-month-btn prev-month-btn"><IoIosArrowBack/></button>
                 {activeTab ? <Bar height="300" options={options} data={chartData}></Bar>:
                     <div className="monitor-wellness">
                         <div onClick={()=> {setInjuriesProgress([...injuriesProgress,1]);initChart()}} className="readiness-circle">
                         <div className="mkCharts" data-percent={donutPercent} data-stroke="3" data-color="#89E894"></div>
                         </div>
                         <div className="wellness-stats">
                             <label className="stats-label">Injuries</label>
                             <div className="wellness-progress-bar">
                                 {injuriesProgress.map((value,index)=>{return(<div key={index} className="injury-bean"></div>)})}
                                 <div style={{width:`${injuriesAverage*8}%`}} className="progress-bar-average"></div>
                             </div>
                             <label className="stats-nr">{injuryLabel}</label>
                             <label className="stats-label">Fatigue</label>
                             <div className="wellness-progress-bar">
                                 <div style={{width:`${fatigueProgress*20}%`}} className="wellness-progress-bar-fill"></div>
                                 <div style={{width:`${fatigueAverage*8.4}%`}} className="progress-bar-average"></div>
                             </div>
                             <label className="stats-nr">{fatigueProgress}/5</label>
                             <label className="stats-label">Enjoyment</label>
                             <div className="wellness-progress-bar">
                                 <div style={{width:`${enjoymentProgress*20}%`}} className="wellness-progress-bar-fill"></div>
                                 <div style={{width:`${enjoymentAverage*8.4}%`}} className="progress-bar-average"></div>
                             </div>
                             <label className="stats-nr">{enjoymentProgress}/5</label>
                             <label className="stats-label">Sleeping T</label>
                             <div className="wellness-progress-bar">
                                 <div style={{width:`${sleepingProgress*8.333}%`}} className="wellness-progress-bar-fill"></div>
                                 <div style={{width:`${sleepingAverage*3.45}%`}} className="progress-bar-average"></div>
                             </div>
                             <label className="stats-nr">{sleepingProgress}</label>
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
                     </div>}
                <button onClick={changeMonitoringTab} style={{marginRight:"5px"}} className="change-month-btn next-month-btn"><IoIosArrowForward/></button>
            </div>
            <div className="monitoring-tabs">
              <div onClick={()=>{setSelectedActive(true);setAlertActive(false)}} style={selectedActive? {color:"#0E1333"}:{}} className="monitoring-tabs-label">Selected</div>
              <div onClick={()=>{setSelectedActive(false);setAlertActive(true)}} style={alertActive? {color:"#0E1333"}:{}} className="monitoring-tabs-label">Alert</div>
            </div>
            {selectedActive?<div className="selected-tab">
                {selectedPlayers.map((value)=>
                <div className="selected-player">
                  <img className="selected-player-img"></img>
                  <div className="injured-player-info">
                      <label className="selected-player-name">{value.name}</label>
                      <label className="injury">{value.injury}</label>
                    </div>
                  <div className={value.injury ? "not-ready selected-player-readiness" : "ready selected-player-readiness"}></div>
                </div>)}
            </div>:""}
            {alertActive?<div className="selected-tab">
                {alertPlayers.map((value)=>
                <div className="selected-player">
                  <img className="selected-player-img"></img>
                    <div className="injured-player-info">
                      <label className="selected-player-name">{value.name}</label>
                      <label className="injury">{value.injury}</label>
                    </div>
                  <div className={value.injury ? "not-ready selected-player-readiness" : "ready selected-player-readiness"}></div>
                </div>)}
            </div>:""}
        </div>
    )
}

export default Monitoring
