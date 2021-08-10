import React from "react";
import "./componentsCss/DashboardPanel.css";
import imag from "../assets/ball.png";
import { Bar} from "react-chartjs-2";
const DashboardPanel = (sideBarOnOff) => {
  const todayDate = new Date();
  function addDays(date, days) {
    var result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  }
  let chartData = {
      
    labels: [
      `${addDays(todayDate, -6).getDate()}/0${
        addDays(todayDate, -6).getMonth() + 1
      }`,
      `${addDays(todayDate, -5).getDate()}/0${
        addDays(todayDate, -5).getMonth() + 1
      }`,
      `${addDays(todayDate, -4).getDate()}/0${
        addDays(todayDate, -4).getMonth() + 1
      }`,
      `${addDays(todayDate, -3).getDate()}/0${
        addDays(todayDate, -3).getMonth() + 1
      }`,
      `${addDays(todayDate, -2).getDate()}/0${
        addDays(todayDate, -2).getMonth() + 1
      }`,
      `${addDays(todayDate, -1).getDate()}/0${
        addDays(todayDate, -1).getMonth() + 1
      }`,
      `Today`,
      `${addDays(todayDate, 1).getDate()}/0${
        addDays(todayDate, 1).getMonth() + 1
      }`,
      `${addDays(todayDate, 2).getDate()}/0${
        addDays(todayDate, 2).getMonth() + 1
      }`,
      `${addDays(todayDate, 3).getDate()}/0${
        addDays(todayDate, 3).getMonth() + 1
      }`,
      `${addDays(todayDate, 4).getDate()}/0${
        addDays(todayDate, 4).getMonth() + 1
      }`,
      `${addDays(todayDate, 5).getDate()}/0${
        addDays(todayDate, 5).getMonth() + 1
      }`,
    ],
    datasets: [
      {
        label: "Match overview",
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
        data: [2, 6, 3, 2, 8, 4, 6, 7, 7, 7, 7, 7],
        maintainAspectRatio: false,
        maxBarThickness: 20,
        borderRadius: 10,
      },
    ],
  };

  return (
    <div
      style={{ width: sideBarOnOff.sideBarOnOff }}
      className="dashboard-panel"
    >
      Dashboard panel
      <div className="match-overview">
        <Bar  options={{maintainAspectRatio:false}} data={chartData}></Bar>
      </div>
      <label className="players-label">Players</label>
      <div className="players-panel">
        <div className="player">
          <img alt="athlete" src={imag} className="player-photo"></img>
          <div className="player-about">
            <label className="player-name">John Doe</label>
            <label className="player-injury">Knee injury</label>
            <label className="player-mood">Tired</label>
          </div>
        </div>
        <div className="player">
          <img alt="athlete" className="player-photo"></img>
          <div className="player-about">
            <label className="player-name"></label>
            <label className="player-injury"></label>
            <label className="player-mood"></label>
          </div>
        </div>
        <div className="player">
          <img alt="athlete" className="player-photo"></img>
          <div className="player-about">
            <label className="player-name"></label>
            <label className="player-injury"></label>
            <label className="player-mood"></label>
          </div>
        </div>
        <div className="player">
          <img alt="athlete" className="player-photo"></img>
          <div className="player-about">
            <label className="player-name"></label>
            <label className="player-injury"></label>
            <label className="player-mood"></label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPanel;
