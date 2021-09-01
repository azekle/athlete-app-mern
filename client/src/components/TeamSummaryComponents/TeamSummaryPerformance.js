import React, { useEffect, useState } from "react";
import moment from "moment";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import "./TeamSummaryCss/TeamSummaryPerformance.css";
import { Bar } from "react-chartjs-2";
const TeamSummaryPerformance = (props) => {
  var startOfWeek = moment().startOf("week").toDate();
  const [today, setToday] = useState(moment());
  let totalDays = [];
  let indexOfToday = [];
  var currentWeekDates = [];
  var totalPlayers = [];
  props.players.map((value) => {
    if (!value.is_coach) totalPlayers.push(value);
  });
  const [currentShownWeek, setCurrentShownWeek] = useState(startOfWeek);
  const showDate = (date, numberDays) => {
    return moment(date).add(numberDays, "day").toDate().getDate();
  };
  const showMonth = (date, numberDays) => {
    return moment(date).add(numberDays, "day").toDate().getMonth();
  };

  
  const previousWeek = () => {
    {
      setCurrentShownWeek(moment(currentShownWeek).subtract(7, "day").toDate());
      today.subtract(7, "day");
    }
  };
  const nextWeek = () => {
    if (isDateBeforeToday(moment(currentShownWeek).add(7, "day").toDate())) {
      setCurrentShownWeek(moment(currentShownWeek).add(7, "day").toDate());
      today.add(7, "day");
    }
  };
  function isDateBeforeToday(date) {
    return new Date(date.toDateString()) < new Date(new Date().toDateString());
  }

  const findWeek = () => {
    for (let i = 0; i < 7; i++) {
      const theDay = today.startOf("week").add(i, "d").toDate().getDate();
      totalDays.push(theDay);
      currentWeekDates.push(
        today.startOf("week").add(i, "d").format("DD/MM/YY")
      );
    }
  };
  let rpe = [0, 0, 0, 0, 0, 0, 0];
  let load = [0, 0, 0, 0, 0, 0, 0];
  const determineAverageForEverything = () => {
    //determine data for weekly load↓↓↓
    currentWeekDates.map((value, index) => {
      totalPlayers.map((value2) => {
        value2.training.map((value3) => {
          if (value3.date == value) {
            value3.duration1 = parseInt(value3.duration1);
            value3.duration2 = parseInt(value3.duration2);
            value3.rpe1 = parseInt(value3.rpe1);
            value3.rpe2 = parseInt(value3.rpe2);
            rpe[index] = value3.rpe1 + value3.rpe1;
            load[index] +=
              (value3.duration1 + value3.duration2) *
              (value3.rpe1 + value3.rpe2);
          }
        });
      });
    });
  };
  findWeek();
  determineAverageForEverything();
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
        label: "load",
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
        data: load,
        maintainAspectRatio: false,
        maxBarThickness: 20,
        borderRadius: 10,
        order: 2,
      },
      {
        type: "line",
        label: "Injury",
        order: 1,
        borderColor: "#5538F6",
        borderWidth: 2,
        backgroundColor: "#5538F6",
        fill: false,
        data: [400, 800, 500, 600, 1200, 600, 100],
        tension: 0.3,
      },
      {
        type: "line",
        label: "RPE",
        borderColor: "#01B9EE",
        borderWidth: 2,
        backgroundColor: "#01B9EE",
        fill: false,
        data: rpe,
        tension: 0.3,
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
          font: {},
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
            return value == 300 ? "300" : null;
          },
        },
      },
    },
  };
  useEffect(() => {
    findWeek();
  }, [currentShownWeek]);
  return (
    <div style={{ width: props.sideBarOnOff }} className="performance">
      <div className="prev-next-buttons">
        <button className="prev-next-button" onClick={previousWeek}>
          <AiOutlineArrowLeft />
        </button>
        <button className="prev-next-button" onClick={nextWeek}>
          <AiOutlineArrowRight />
        </button>
      </div>
      Performance
      <Bar options={options} data={chartData}></Bar>
    </div>
  );
};

export default TeamSummaryPerformance;
