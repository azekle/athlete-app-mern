import React, { useState } from "react";
import moment from "moment";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import "./TeamSummaryCss/TeamSummaryPerformance.css";
import { Bar} from "react-chartjs-2";
const TeamSummaryPerformance = (sideBarOnOff) => {
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
  let chartData = {
     
    labels: [
      `${showDate(currentShownWeek, 0)}.0${showMonth(currentShownWeek, 0) + 1}`,
      `${showDate(currentShownWeek, 1)}.0${showMonth(currentShownWeek, 1) + 1}`,
      `${showDate(currentShownWeek, 2)}.0${showMonth(currentShownWeek, 2) + 1}`,
      `${showDate(currentShownWeek, 3)}.0${showMonth(currentShownWeek, 3) + 1}`,
      `${showDate(currentShownWeek, 4)}.0${showMonth(currentShownWeek, 4) + 1}`,
      `${showDate(currentShownWeek, 5)}.0${showMonth(currentShownWeek, 5) + 1}`,
      `${showDate(currentShownWeek, 6)}.0${showMonth(currentShownWeek, 6) + 1}`,
    ],
    datasets: [
      {
        label: "RPE",
        backgroundColor: [
          "#1195FF",
          "#1195FF",
          "#1195FF",
          "#1195FF",
          "#1195FF",
          "#1195FF",
          "#1195FF",
        ],
        borderColor: "#1195FF",
        data: [2, 6, 3, 2, 8, 4, 6, 7, 7, 7, 7, 7],
        maintainAspectRatio: false,
        maxBarThickness: 20,
        borderRadius: 10,
      },
      {
        type: 'line',
        label: 'Injury',
        borderColor: '#5538F6',
        borderWidth: 2,
        backgroundColor:"#5538F6",
        fill: false,
        data: [4,8,5,6,12,6,10],
        tension:.3,
      },
      {
        type: 'line',
        label: 'Load',
        borderColor: '#01B9EE',
        borderWidth: 2,
        backgroundColor:"#01B9EE",
        fill: false,
        data: [5,6,10,4,5,8,1],
        tension:.3,
      },
    ],
  };
  var options = {
    maintainAspectRatio:false,
    scales: {
      x: {
        grid: {
         display:false
        },
        ticks: {
            
            font:{
               
                
            },
            
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
    <div style={{ width: sideBarOnOff.sideBarOnOff }} className="performance">
      
      <div className="prev-next-buttons">
        <button className="prev-next-button" onClick={previousWeek}>
          <AiOutlineArrowLeft />
        </button>
        <button className="prev-next-button" onClick={nextWeek}>
          <AiOutlineArrowRight />
        </button>
      </div>Performance
      <Bar options={options} data={chartData}></Bar>
    </div>
  );
};

export default TeamSummaryPerformance;
