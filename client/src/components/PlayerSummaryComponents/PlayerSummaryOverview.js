import moment from "moment";
import React from "react";
import { useState } from "react";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import "./PlayerSummaryCss/PlayerSummaryOverview.css";
const PlayerSummaryOverview = () => {
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
  return (
    <div className="player-summary-overview">
      <div className="overview">
        <div className="prev-next-buttons">
          <button onClick={previousWeek} className="prev-next-button">
            <AiOutlineArrowLeft  />
          </button>
          <button onClick={nextWeek} className="prev-next-button">
            <AiOutlineArrowRight   />
          </button>
        </div>
        <table className="overview-table">
          <thead>
            <tr>
              <th rowSpan="2" colSpan="3" className="table-header-cell athlete">
                Date
              </th>
              <th colSpan="6" className="table-header-cell pso-header-cell">Load</th>
              <th colSpan="3" className="table-header-cell pso-header-cell">wellness</th>
              
        
            </tr>
            <tr className="overview-sub-table">
              <th className="pso-sub">ACWR</th>
              <th className="pso-sub">DL</th>
              <th className="pso-sub">Mood</th>
              <th className="pso-sub">W-to-W</th>
              <th className="pso-sub">EWMA</th>
              <th className="pso-sub">Strain</th>
              <th className="pso-sub">Sleep</th>
              <th className="pso-sub">Mood</th>
              <th className="pso-sub">Fatigue</th>
              
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="pso-sub2" colSpan="3">{`${showDate(currentShownWeek,0)}.0${showMonth(currentShownWeek,0)+1}`}</td>
              <td className="pso-sub2">1</td>
              <td className="pso-sub2">2</td>
              <td className="pso-sub2">3</td>
              <td className="pso-sub2">1</td>
              <td className="pso-sub2">2</td>
              <td className="pso-sub2">3</td>
              <td className="pso-sub2">1</td>
              <td className="pso-sub2">2</td>
              <td className="pso-sub2">3</td>
            </tr>
            <tr>
              <td className="pso-sub2" colSpan="3">{`${showDate(currentShownWeek,1)}.0${showMonth(currentShownWeek,1)+1}`}</td>
              <td className="pso-sub2">1</td>
              <td className="pso-sub2">2</td>
              <td className="pso-sub2">3</td>
              <td className="pso-sub2">1</td>
              <td className="pso-sub2">2</td>
              <td className="pso-sub2">3</td>
              <td className="pso-sub2">1</td>
              <td className="pso-sub2">2</td>
              <td className="pso-sub2">3</td>
            </tr>
            <tr>
              <td className="pso-sub2" colSpan="3">{`${showDate(currentShownWeek,2)}.0${showMonth(currentShownWeek,2)+1}`}</td>
              <td className="pso-sub2">1</td>
              <td className="pso-sub2">2</td>
              <td className="pso-sub2">3</td>
              <td className="pso-sub2">1</td>
              <td className="pso-sub2">2</td>
              <td className="pso-sub2">3</td>
              <td className="pso-sub2">1</td>
              <td className="pso-sub2">2</td>
              <td className="pso-sub2">3</td>
            </tr>
            <tr>
              <td className="pso-sub2" colSpan="3">{`${showDate(currentShownWeek,3)}.0${showMonth(currentShownWeek,3)+1}`}</td>
              <td className="pso-sub2">1</td>
              <td className="pso-sub2">2</td>
              <td className="pso-sub2">3</td>
              <td className="pso-sub2">1</td>
              <td className="pso-sub2">2</td>
              <td className="pso-sub2">3</td>
              <td className="pso-sub2">1</td>
              <td className="pso-sub2">2</td>
              <td className="pso-sub2">3</td>
            </tr>
            <tr>
              <td className="pso-sub2" colSpan="3">{`${showDate(currentShownWeek,4)}.0${showMonth(currentShownWeek,4)+1}`}</td>
              <td className="pso-sub2">1</td>
              <td className="pso-sub2">2</td>
              <td className="pso-sub2">3</td>
              <td className="pso-sub2">1</td>
              <td className="pso-sub2">2</td>
              <td className="pso-sub2">3</td>
              <td className="pso-sub2">1</td>
              <td className="pso-sub2">2</td>
              <td className="pso-sub2">3</td>
            </tr>
            <tr>
              <td className="pso-sub2" colSpan="3">{`${showDate(currentShownWeek,5)}.0${showMonth(currentShownWeek,5)+1}`}</td>
              <td className="pso-sub2">1</td>
              <td className="pso-sub2">2</td>
              <td className="pso-sub2">3</td>
              <td className="pso-sub2">1</td>
              <td className="pso-sub2">2</td>
              <td className="pso-sub2">3</td>
              <td className="pso-sub2">1</td>
              <td className="pso-sub2">2</td>
              <td className="pso-sub2">3</td>
            </tr>
            <tr>
              <td className="pso-sub2" colSpan="3">{`${showDate(currentShownWeek,6)}.0${showMonth(currentShownWeek,6)+1}`}</td>
              <td className="pso-sub2">1</td>
              <td className="pso-sub2">2</td>
              <td className="pso-sub2">3</td>
              <td className="pso-sub2">1</td>
              <td className="pso-sub2">2</td>
              <td className="pso-sub2">3</td>
              <td className="pso-sub2">1</td>
              <td className="pso-sub2">2</td>
              <td className="pso-sub2">3</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PlayerSummaryOverview;
