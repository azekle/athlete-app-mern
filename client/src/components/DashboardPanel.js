import React, { useState } from "react";
import "./componentsCss/DashboardPanel.css";
import imag from "../assets/ball.png";
import { Bar } from "react-chartjs-2";
import {AiOutlineQuestionCircle} from "react-icons/ai"
import ChartDataLabels from 'chartjs-plugin-datalabels';
import {BiEnvelope} from 'react-icons/bi'
import moment from "moment";
import { useEffect } from "react";
import defaultImag from "../assets/sportsman.svg"
import { Link } from "react-router-dom";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
const DashboardPanel = (props) => {
  const today = moment();
  let user = props.user;
  let totalDays = [];
  let indexOfToday = [];
  let initialWeightToday = [];
  let initialColorToday = [];
  var totalPlayerss = []
  
  var currentWeekDates=[]
  props.players.map((value)=>{if(!value.is_coach) totalPlayerss.push(value)})
  var [totalPlayers,setTotalPlayers] = useState(totalPlayerss);
  const [canLogOut,setCanLogOut] = useState(false)
  const [canQuestion,setCanQuestion] = useState(false)
  const [activeTab, setActiveTab] = useState(true);
  const [injuriesProgress, setInjuriesProgress] = useState([
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
  ]); //array
  const [injuriesAverage, setInjuriesAverage] = useState(0.8); //array
  const [injuryLabel, setInjuryLabel] = useState(injuriesProgress.length);
  let fatigueProgress = 0 //0-5
  const [fatigueAverage, setFatigueAverage] = useState(1.5); //0-5
  let enjoymentProgress = 0 //0-5
  const [enjoymentAverage, setEnjoymentAverage] = useState(3); //0-5
 let sleepingProgress = 0 //0-12
  const [sleepingAverage, setSleepingAverage] = useState(7); //0-12
  const [donutPercent, setDonutPercent] = useState(77); //0-100
  const [selectedActive, setSelectedActive] = useState(true);
  const [alertActive, setAlertActive] = useState(false);
  const [weeksBefore, setWeeksBefore] = useState(0);
  const [startDay, setStartDay] = useState(
    moment().startOf("week").format("DD.MM")
  );
  const [endDay, setEndDay] = useState(moment().endOf("week").format("DD.MM"));
  const [firstEffect,setFirstEffect] = useState(true)
  useEffect(()=>{
    initChart();
    if(totalPlayers.length==0&&firstEffect) {setTotalPlayers(totalPlayerss);}
  },[totalPlayerss])
  const findWeek = () => {
    for (let i = 0; i < 7; i++) {
      const theDay = today.startOf("week").add(i, "d").toDate().getDate();
      totalDays.push(theDay);
      currentWeekDates.push(today.startOf("week").subtract(weeksBefore,"w").add(i,"d").format("DD/MM/YY"));
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
  var universalCounter=0;
    let load = []
    const determineAverageForEverything = () =>{
     
      totalPlayers.map((value)=>{value.training.map((value2)=>{;if(currentWeekDates.includes(value2.date)) {
        
        value2.fatigue=parseInt(value2.fatigue);
        value2.wellness1=parseInt(value2.wellness1)
        value2.wellness2=parseInt(value2.wellness2)
        value2.sleep=parseInt(value2.sleep);
        fatigueProgress+=value2.fatigue;
        enjoymentProgress+=value2.wellness1+value2.wellness2;
        sleepingProgress+=value2.sleep;
        universalCounter++
      }})})
      fatigueProgress=fatigueProgress/universalCounter
      fatigueProgress=Math.round(fatigueProgress*10)/10
      enjoymentProgress=enjoymentProgress/(universalCounter*2);
      enjoymentProgress=Math.round(enjoymentProgress*10)/10
      sleepingProgress=sleepingProgress/universalCounter;
      sleepingProgress=Math.round(sleepingProgress*10)/10;
      //determine data for weekly load↓↓↓
     console.log(currentWeekDates)
     currentWeekDates.map((date,index)=>{
       totalPlayers.map(player=>{
         player.training.map(train=>{
           if(train.date==date) {load.push(train.rpe1*train.duration1)}
         })
       })
       if (index >= load.length) load.push(0);
     })
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
const logOutUser = ()=>{
  localStorage.clear();
  window.location.reload();
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
  determineAverageForEverything()
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
        data: load,
        maintainAspectRatio: false,
        maxBarThickness: 15,
        borderRadius: 0,
      },
      {
        label: "                                                                                                             ",
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
      datalabels: {
        color:"red",
        anchor: 'end',
        align: 'end',
        labels: {
          value: {
            color: 'black'
          }
        }}
   },
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
          
        },
      },
    },
  };
  const changePlayers = (e)=>{
    const changedPlayers = []
    setFirstEffect(false)
    totalPlayerss.forEach(value=>{
      if(value.team==e.target.value) {changedPlayers.push(value);console.log("gasit")}
    })
    //console.log(changedPlayers)
    setTotalPlayers(changedPlayers)
    
  }
  return (
    <div style={{ width: props.sideBarOnOff }} className="dashboard-panel">
      <div className="dashboard-panel-title">
        <label >Dashboard panel</label>
        <select onClick={changePlayers} className="team-select">
          <option>Team A</option>
          <option>Team B</option>
          <option>Team C</option>
        </select>
        <div className="user-options">
        < AiOutlineQuestionCircle onClick={()=>setCanQuestion(!canQuestion)} className="question-mark"/>
          {canQuestion?
          <div className="send-email">
            
            <button className="send-email-label">send us an email</button>
            <BiEnvelope style={{fontSize:".9em"}}/>
          </div>:""}
          <div className="can-log" onClick={()=>setCanLogOut(!canLogOut)}>{user.firstName[0]}</div>
          {canLogOut?
          <div className="logout-panel">
             <div style={{marginTop:"10px"}} className="can-log">{user.firstName[0]}</div>
             <label className="options-name">{user.firstName} {user.lastName}</label>
             <div className="separator2"></div>
            <div><button type="submit" onClick={logOutUser} className="logout-button">Log Out</button></div>
          </div>:""}
        </div>
      </div>
      <div className="match-overview">
      <div className="chart">
      <div className="forward-backward-buts">
            <button style={{background:"white"}} onClick={weekGoBack} className="forward-backward-but">
              <MdKeyboardArrowLeft />
            </button>
            <button style={{background:"white"}} onClick={weekGoForward} className="forward-backward-but">
              <MdKeyboardArrowRight />
            </button>
            {startDay}-{endDay}
          </div>
        <Bar height="500" options={options} plugins={[ChartDataLabels]} data={chartData}></Bar>
      </div>
        <div className="readiness">
        <div className="monitor-wellness">
                         <div onClick={()=> {if(injuryLabel<20)setInjuriesProgress([...injuriesProgress,1]);initChart();if(injuryLabel<20)setInjuryLabel(injuriesProgress.length+1);else setInjuryLabel("21+")}} className="readiness-circle">
                         <div className="mkCharts" data-percent={donutPercent} data-stroke="3" data-color="#1195FF"></div>
                         </div>
                         <div className="wellness-stats">
                             <label className="stats-label">Injuries</label>
                             <div style={{border:"none"}} className="wellness-progress-bar">
                                 {injuriesProgress.map((value,index)=>{return(<div key={index} className="injury-bean"></div>)})}
                            
                             </div>
                             <label className="stats-nr">{injuryLabel}</label>
                             <label className="stats-label">Fatigue</label>
                             <div style={{border:"none"}} className="wellness-progress-bar">
                                 <div style={{width:`${fatigueProgress*20}%`}} className="wellness-progress-bar-fill"></div>
                              
                             </div>
                             <label className="stats-nr">{fatigueProgress}/5</label>
                             <label style={{border:"none"}} className="stats-label">Enjoyment</label>
                             <div style={{border:"none"}} className="wellness-progress-bar">
                                 <div style={{width:`${enjoymentProgress*20}%`}} className="wellness-progress-bar-fill"></div>
                                 
                             </div>
                             <label className="stats-nr">{enjoymentProgress}/5</label>
                             <label className="stats-label">Sleeping T</label>
                             <div style={{border:"none"}} className="wellness-progress-bar">
                                 <div style={{width:`${sleepingProgress*8.333}%`}} className="wellness-progress-bar-fill"></div>
                                 
                             </div>
                             <label className="stats-nr">{sleepingProgress}</label>
                         </div>
                     </div>
        </div>
      </div>
      <label className="players-label">Players</label>
      <div className="selected-tab-desktop">
                {totalPlayers.map((value,index)=>
                <Link style={{textDecoration:"none",color:"black"}} to={"/dashboard/player-summary/overview"}><div key={value} className="selected-player-desktop">
                  <img src={value.image!=" "?value.image:defaultImag} className="selected-player-img"></img>
                  <div className="injured-player-info">
                      <label className="selected-player-name-desktop">{value.firstName} {value.lastName}</label>
                      <label className="injury-desktop">{value.injury}</label>
                    </div>
                  <div className={value.injury ? "not-ready selected-player-readiness-desktop" : "ready selected-player-readiness-desktop"}></div>
                </div></Link>)}
            </div>
    </div>
  );
};

export default DashboardPanel;
