import React, { useState, useEffect } from "react";
import moment from "moment";
import { Bar } from "react-chartjs-2";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { MdKeyboardArrowRight, MdKeyboardArrowLeft } from "react-icons/md";
const PlayerTab = (props) => {
  const [activeTab, setActiveTab] = useState(false);
  const [activePlayer, setActivePlayer] = useState();
  var team = props.team
  var totalPlayers = [];
  let load = [];
  var counter = 0;
  var totalPlayers2 = []
  const [startDay,setStartDay] = useState(moment().startOf("week").format("DD.MM"));
  const [endDay,setEndDay] = useState(moment().endOf("week").format("DD.MM"));
  var daysOfWeek = [];
  const daysOf4Weeks = [];
  const [totalPlayersState,setTotalPlayersState] = useState()
  const [weeksBefore, setWeeksBefore] = useState(0);
  const [averageBars,setAverageBars] = useState(0)
  let averageBars2 = 0
  const determineDaysOfWeek = () => {
    daysOfWeek = [];
    for (let i = 0; i < 7; i++) {
      daysOfWeek.push(moment().startOf("week").add(i, "d").subtract(weeksBefore*7,"d").format("DD/MM/YY"));
    }
    for (let i = 0; i < 28; i++) {
      daysOf4Weeks.push(
        moment()
          .startOf("week")
          .subtract(21, "d")
          .add(i, "d")
          .format("DD/MM/YY")
      );
    }
  };
  
  useEffect(() => {
   team = props.team;
   if(team){
    totalPlayers = []
    props.players.map((value) => {
      if (!value.is_coach&&value.team==team) {totalPlayers.push(value);}
    });
    setTotalPlayersState(totalPlayers)
    totalPlayers2 = totalPlayers
   }

   initPlayerAfterTeamChange()
  }, [props.team])
  determineDaysOfWeek();
  const donutPercent = 77;
  const [changedPlayer, setChangedPlayer] = useState(false);
  const [injuries, setInjuries] = useState();
  const [fatigue, setFatigue] = useState();
  const [enjoyment, setEnjoyment] = useState();
  const [sleeping, setSleeping] = useState();
  const [fatigueAvg, setFatigueAvg] = useState();
  const [enjoymentAvg, setEnjoymentAvg] = useState();
  const [sleepingAvg, setSleepingAvg] = useState();
  const [injuryActive, setInjuryActive] = useState();
  const [measurementActive, setMeasurementActive] = useState(true);
  const [fireAfterLoad,setFireAfterLoad] = useState(false);

  props.players.map((value) => {
    if (!value.is_coach) totalPlayers.push(value);
  });
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
  const changeMonitoringTab = () => {
    setActiveTab(!activeTab);
  };
  let load2 = []
  const initLoad = () => {
    if (activePlayer) {
      daysOfWeek.map((date, index) => {
        for (let i = 0; i < activePlayer.training.length; i++) {
          if (activePlayer.training[i].date == date) {
            load.push(
              activePlayer.training[i].rpe1 * activePlayer.training[i].duration1
            );
            load2.push(
              activePlayer.training[i].rpe1 * activePlayer.training[i].duration1
            );
            break;
          }
        }
        if (index >= load.length) load.push(0);
      });
    }
    averageBars2 = 0
    counter = 0;
    load2.map(value=>{
      if(value) {averageBars2+=value;
      counter++}
    })
    averageBars2/=counter
    averageBars2 = Math.ceil(averageBars2)
    averageBars2 = averageBars2/100
    averageBars2 = Math.round(averageBars2)
    averageBars2 = averageBars2 * 100
    console.log(averageBars2);
  };
  const determineAverageLine = () =>{
    averageBars2 = 0
    counter = 0;
    load2.map(value=>{
      if(value) {averageBars2+=value;
      counter++}
    })
    averageBars2/=counter
    averageBars2 = Math.ceil(averageBars2)
    averageBars2 = averageBars2/100
    averageBars2 = Math.round(averageBars2)
    averageBars2 = averageBars2 * 100
    if(fireAfterLoad) setAverageBars(averageBars2)
  }
  initLoad();
  useEffect(() => {}, [activePlayer]);
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
          display: false,
        },
        ticks: {
          font: {
            weight: 200,
            size: 14,
          },
          color: "#ccc",
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
            return value == averageBars2 ? averageBars2 : null;
          },
        },
      },
    },
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
  let fatigue2 = 0;
  let enjoyment2 = 0;
  let sleeping2 = 0;
  const selectPlayer = (e) => {
    setChangedPlayer(true);
    if (e) {
      fatigue2 = 0;
      enjoyment2 = 0;
      sleeping2 = 0;
      counter = 0
      totalPlayers.map((value) => {
        if (value.firstName == e.target.value) {
          if (value.injuries) setInjuries(value.injuries);
          value.training.map((train) => {
            if (daysOfWeek.includes(train.date)) {
              counter++;
              fatigue2 = fatigue2 + parseInt(train.fatigue);
              enjoyment2 = enjoyment2 + parseInt(train.wellness1);
              sleeping2 = sleeping2 + parseInt(train.sleep);
            }
          });
         
          setFatigue(fatigue2 / counter);
          setEnjoyment(enjoyment2 / counter);
          setSleeping(sleeping2 / counter);
          if (counter == 0) {
            setFatigue(0);
            setEnjoyment(0);
            setSleeping(0);
          }
          counter = 0;
          setActivePlayer(value);
        }
      });
      totalPlayers.map((value) => {
        fatigue2 = 0;
        enjoyment2 = 0;
        sleeping2 = 0;
        if (value.firstName == e.target.value) {
          value.training.map((train) => {
            if (daysOf4Weeks.includes(train.date)) {
              counter++;
              fatigue2 = fatigue2 + parseInt(train.fatigue);
              enjoyment2 = enjoyment2 + parseInt(train.wellness1);
              sleeping2 = sleeping2 + parseInt(train.slee);
            }
          });

          if (counter == 0) {
            setFatigueAvg(0);
            setEnjoymentAvg(0);
            setSleepingAvg(0);
          } else {
            setFatigueAvg(fatigue2 / counter);
            setEnjoymentAvg(enjoyment2 / counter);
            setSleepingAvg(sleeping2 / counter);
          }
        }
      });
    }
  };
  const initCurrentPlayerAfterWeekChange = (player,ie) =>{
    counter = 0;
    let daysOfWeek2 = []
    if (player) {
      for (let i = 0; i < 7; i++) {
        daysOfWeek2.push(moment().startOf("week").add(i, "d").subtract((weeksBefore+ie)*7,"d").format("DD/MM/YY"));
      }
      setActivePlayer(player);
      player.training.map((train) => {
        if (daysOfWeek2.includes(train.date)) {
          counter++;
          fatigue2 = fatigue2 + parseInt(train.fatigue);
          enjoyment2 = enjoyment2 + parseInt(train.wellness1);
          sleeping2 = sleeping2 + parseInt(train.sleep);
        }
      });
      setFatigue(fatigue2 / counter);
      setEnjoyment(enjoyment2 / counter);
      setSleeping(sleeping2 / counter);
      if (counter == 0) {
        setFatigue(0);
        setEnjoyment(0);
        setSleeping(0);
      }
      counter = 0;
    }
    fatigue2 = 0;
    enjoyment2 = 0;
    sleeping2 = 0;
    if (player) {
      player.training.map((train) => {
        if (daysOf4Weeks.includes(train.date)) {
          counter++;
          fatigue2 = fatigue2 + parseInt(train.fatigue);
          enjoyment2 = enjoyment2 + parseInt(train.wellness1);
          sleeping2 = sleeping2 + parseInt(train.sleep);
        }
      });

      if (counter == 0) {
        setFatigueAvg(0);
        setEnjoymentAvg(0);
        setSleepingAvg(0);
      } else {
        setFatigueAvg(fatigue2 / counter);
        setEnjoymentAvg(enjoyment2 / counter);
        setSleepingAvg(sleeping2 / counter);
        fatigue2 = 0;
        enjoyment2 = 0;
        sleeping2 = 0;
      }
    }
  }
  useEffect(() => {
    initChart();
  }, [activeTab]);
  const initFirstPlayer = () => {

    if (!changedPlayer) {
      counter = 0;
      if (totalPlayers[0]) {
        setActivePlayer(totalPlayers[0]);
        totalPlayers[0].training.map((train) => {
          if (daysOfWeek.includes(train.date)) {
            counter++;
            fatigue2 = fatigue2 + parseInt(train.fatigue);
            enjoyment2 = enjoyment2 + parseInt(train.wellness1);
            sleeping2 = sleeping2 + parseInt(train.sleep);
          }
        });
        setFatigue(fatigue2 / counter);
        setEnjoyment(enjoyment2 / counter);
        setSleeping(sleeping2 / counter);
        if (counter == 0) {
          setFatigue(0);
          setEnjoyment(0);
          setSleeping(0);
        }
        counter = 0;
      }
      fatigue2 = 0;
      enjoyment2 = 0;
      sleeping2 = 0;
      if (totalPlayers[0]) {
        totalPlayers[0].training.map((train) => {
          if (daysOf4Weeks.includes(train.date)) {
            counter++;
            fatigue2 = fatigue2 + parseInt(train.fatigue);
            enjoyment2 = enjoyment2 + parseInt(train.wellness1);
            sleeping2 = sleeping2 + parseInt(train.sleep);
          }
        });

        if (counter == 0) {
          setFatigueAvg(0);
          setEnjoymentAvg(0);
          setSleepingAvg(0);
        } else {
          setFatigueAvg(fatigue2 / counter);
          setEnjoymentAvg(enjoyment2 / counter);
          setSleepingAvg(sleeping2 / counter);
          fatigue2 = 0;
          enjoyment2 = 0;
          sleeping2 = 0;
        }
      }
    }
  };
  const initPlayerAfterTeamChange = () =>{
    fatigue2 = 0;
    enjoyment2 = 0;
    sleeping2 = 0
    if(totalPlayers2[0]) {
      setInjuries(totalPlayers[0].injuries)
      setActivePlayer(totalPlayers2[0]);
        totalPlayers2[0].training.map((train) => {
          if (daysOfWeek.includes(train.date)) {
            counter++;
            fatigue2 = fatigue2 + parseInt(train.fatigue);
            enjoyment2 = enjoyment2 + parseInt(train.wellness1);
            sleeping2 = sleeping2 + parseInt(train.sleep);
          }
        });
        setFatigue(fatigue2 / counter);
        setEnjoyment(enjoyment2 / counter);
        setSleeping(sleeping2 / counter);
        if (counter == 0) {
          setFatigue(0);
          setEnjoyment(0);
          setSleeping(0);
        }
        counter = 0;
        fatigue2 = 0;
        enjoyment2 = 0;
        sleeping2 = 0
        totalPlayers2[0].training.map((train) => {
        if (daysOf4Weeks.includes(train.date)) {
          counter++;
          fatigue2 = fatigue2 + parseInt(train.fatigue);
          enjoyment2 = enjoyment2 + parseInt(train.wellness1);
          sleeping2 = sleeping2 + parseInt(train.sleep);
        }
      });

      if (counter == 0) {
        setFatigueAvg(0);
        setEnjoymentAvg(0);
        setSleepingAvg(0);
      } else {
        setFatigueAvg(fatigue2 / counter);
        setEnjoymentAvg(enjoyment2 / counter);
        setSleepingAvg(sleeping2 / counter);
        fatigue2 = 0;
        enjoyment2 = 0;
        sleeping2 = 0;
      }
    }
  }
  useEffect(() => {
    initFirstPlayer();
  }, [totalPlayers]);

  useEffect(() => {
    if (!changedPlayer)
      if (totalPlayers[0]) setInjuries(totalPlayers[0].injuries);
  }, [fatigue]);
  initChart();
  const weekGoBack = () => {
    setWeeksBefore(weeksBefore + 1);
    setStartDay(moment().startOf("week").subtract(weeksBefore+1,"w").format("DD.MM"));
    setEndDay(moment().endOf("week").subtract(weeksBefore+1,"w").format("DD.MM"))
    initCurrentPlayerAfterWeekChange(activePlayer,+1);
    determineAverageLine()
  };
  const weekGoForward = () => {
    if(weeksBefore>0){
      setWeeksBefore(weeksBefore -1);
      setStartDay(moment().startOf("week").subtract(weeksBefore-1,"w").format("DD.MM"));
      setEndDay(moment().endOf("week").subtract(weeksBefore-1,"w").format("DD.MM"))
      initCurrentPlayerAfterWeekChange(activePlayer,-1);
      determineAverageLine()
  }
   
  };
  return (
    <div className="option-week-field">
      <div className="option-week">
        <div className="select-div2">
          <select
            onChange={selectPlayer}
            style={{ color: "black" }}
            className="coach-team2"
          >
            {!totalPlayersState? totalPlayers.map((player) => (
              <option style={{ color: "black" }}>{player.firstName}</option>
            )):totalPlayersState.map(player=>(<option style={{ color: "black" }}>{player.firstName}</option>))}
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
        <div className="week-div">
          <label className="week-label">
            {startDay}-{endDay}
          </label>
        </div>
      </div>
      <div className="monitoring-load">
        <button
          onClick={changeMonitoringTab}
          className="change-month-btn prev-month-btn"
        >
          <IoIosArrowBack />
        </button>
        {activeTab ? (
          <Bar height="300" options={options} data={chartData}></Bar>
        ) : (
          <div className="monitor-wellness readiness-field">
            <div className="readiness-circle">
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
                {injuries
                  ? injuries.map((value, index) => {
                      return <div key={index} className="injury-bean"></div>;
                    })
                  : ""}
              </div>
              <label className="stats-nr">
                {injuries ? injuries.length : ""}
              </label>
              <label className="stats-label">Fatigue</label>
              <div className="wellness-progress-bar">
                <div
                  style={{ width: `${fatigue * 20}%` }}
                  className="wellness-progress-bar-fill"
                ></div>
                <div
                  style={{ width: `${fatigueAvg * 8.4}%` }}
                  className="progress-bar-average"
                ></div>
              </div>
              <label className="stats-nr">
                {Math.ceil(fatigue * 10) / 10}/5
              </label>
              <label className="stats-label">Enjoyment</label>
              <div className="wellness-progress-bar">
                <div
                  style={{ width: `${enjoyment * 20}%` }}
                  className="wellness-progress-bar-fill"
                ></div>
                <div
                  style={{ width: `${enjoymentAvg * 8.4}%` }}
                  className="progress-bar-average"
                ></div>
              </div>
              <label className="stats-nr">
                {Math.ceil(enjoyment * 10) / 10}/5
              </label>
              <label className="stats-label">Sleeping T</label>
              <div className="wellness-progress-bar">
                <div
                  style={{ width: `${sleeping * 8.333}%` }}
                  className="wellness-progress-bar-fill"
                ></div>
                <div
                  style={{ width: `${sleepingAvg * 3.45}%` }}
                  className="progress-bar-average"
                ></div>
              </div>
              <label className="stats-nr">
                {Math.ceil(sleeping * 10) / 10}
              </label>
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
      <div className="measurements-injury-buttons">
        <button
          onClick={() => {
            setMeasurementActive(true);
            setInjuryActive(false);
          }}
          style={measurementActive ? { color: "black" } : {}}
          className="m-i-but"
        >
          Measurements
        </button>
        <button
          onClick={() => {
            setInjuryActive(true);
            setMeasurementActive(false);
          }}
          style={injuryActive ? { color: "black" } : {}}
          className="m-i-but"
        >
          Injury
        </button>
      </div>
      {measurementActive ? (
        <div className="athlete-body-measurements">
          <label className="athlete-training-title">Body measurements</label>

          <div className="athlete-body-measurements-attributes">
            <div className="athlete-body-measurements-labels">
              <label className="athlete-body-measurements-label">Height</label>
              <label className="athlete-body-measurements-label">Weight</label>
              <label className="athlete-body-measurements-label">Fat</label>
              <label className="athlete-body-measurements-label"> BMI </label>
            </div>
            <div className="athlete-body-measurements-values">
              <label
                placeholder="Meters"
                className="athlete-body-measurements-value"
              >
                {activePlayer
                  ? activePlayer.measurements[
                      activePlayer.measurements.length - 1
                    ].height
                  : ""}{" "}
                m
              </label>
              <label
                placeholder="Kg"
                className="athlete-body-measurements-value"
              >
                {activePlayer
                  ? activePlayer.measurements[
                      activePlayer.measurements.length - 1
                    ].weight
                  : ""}{" "}
                kg
              </label>
              <label
                placeholder="%"
                className="athlete-body-measurements-value"
              >
                {activePlayer
                  ? activePlayer.measurements[
                      activePlayer.measurements.length - 1
                    ].fat
                  : ""}{" "}
                %
              </label>
              <label className="athlete-body-measurements-value">
                {activePlayer
                  ? activePlayer.measurements[
                      activePlayer.measurements.length - 1
                    ].weight /
                    activePlayer.measurements[
                      activePlayer.measurements.length - 1
                    ].height /
                    activePlayer.measurements[
                      activePlayer.measurements.length - 1
                    ].height
                  : ""}
              </label>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default PlayerTab;
