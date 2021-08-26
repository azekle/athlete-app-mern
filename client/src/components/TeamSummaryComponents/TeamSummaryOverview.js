import React, { useState } from "react";
import moment from "moment";
import { AiOutlineArrowRight, AiOutlineArrowLeft } from "react-icons/ai";
import "./TeamSummaryCss/TeamSummaryOverview.css";
const TeamSummaryOverview = () => {
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
    <div className="overview">
      <div className="prev-next-buttons">
        <button className="prev-next-button" onClick={previousWeek}><AiOutlineArrowLeft/></button>
        <button className="prev-next-button" onClick={nextWeek}><AiOutlineArrowRight/></button>
      </div>
      <label style={{fontWeight:"500",fontSize:"1.5em",margin:"20px"}}>Squad Dashboard</label>
      <table className="overview-table">
        <thead>
          <tr>
            <th rowSpan="2" colSpan="3" className="table-header-cell athlete">Athlete</th>
            <th colSpan="3" className="table-header-cell">
            <label style={{fontWeight:"500",fontSize:"1.3em"}}> {`${showDate(currentShownWeek, 0)}.0${
                showMonth(currentShownWeek, 0) + 1
              } `}</label>
               Sun</th>
            <th colSpan="3" className="table-header-cell">
            <label style={{fontWeight:"500",fontSize:"1.3em"}}> {`${showDate(currentShownWeek, 1)}.0${
                showMonth(currentShownWeek, 1) + 1
              } `}</label>
               Mon</th>
            <th colSpan="3" className="table-header-cell">
            <label style={{fontWeight:"500",fontSize:"1.3em"}}> {`${showDate(currentShownWeek, 2)}.0${
                showMonth(currentShownWeek, 2) + 1
              } `}</label>
               Tue</th>
            <th colSpan="3" className="table-header-cell">
            <label style={{fontWeight:"500",fontSize:"1.3em"}}>{`${showDate(currentShownWeek, 3)}.0${
                showMonth(currentShownWeek, 3) + 1
              } `}</label>
               Wed</th>
            <th colSpan="3" className="table-header-cell">
            <label style={{fontWeight:"500",fontSize:"1.3em"}}>{`${showDate(currentShownWeek, 4)}.0${
                showMonth(currentShownWeek, 4) + 1
              } `}</label>
               Thu</th>
            <th colSpan="3" className="table-header-cell">
            <label style={{fontWeight:"500",fontSize:"1.3em"}}>{`${showDate(currentShownWeek, 5)}.0${
                showMonth(currentShownWeek, 5) + 1
              } `}</label>
               Friday</th>
            <th colSpan="3" className="table-header-cell">
             <label style={{fontWeight:"500",fontSize:"1.3em"}}> {`${showDate(currentShownWeek, 6)}.0${
                showMonth(currentShownWeek, 6) + 1
              } `}</label>
               Sat
            </th>
          </tr>
          <tr className="overview-sub-table">
            <th className="th-sub-table">ACWR</th>
            <th className="th-sub-table">DL</th>
            <th className="th-sub-table">Mood</th>
            <th className="th-sub-table">ACWR</th>
            <th className="th-sub-table">DL</th>
            <th className="th-sub-table">Mood</th>
            <th className="th-sub-table">ACWR</th>
            <th className="th-sub-table">DL</th>
            <th className="th-sub-table">Mood</th>
            <th className="th-sub-table">ACWR</th>
            <th className="th-sub-table">DL</th>
            <th className="th-sub-table">Mood</th>
            <th className="th-sub-table">ACWR</th>
            <th className="th-sub-table">DL</th>
            <th className="th-sub-table">Mood</th>
            <th className="th-sub-table">ACWR</th>
            <th className="th-sub-table">DL</th>
            <th className="th-sub-table">Mood</th>
            <th className="th-sub-table">ACWR</th>
            <th className="th-sub-table">DL</th>
            <th className="th-sub-table">Mood</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td colSpan="3">$name</td>
            <td><div className="attr-team-overview-red">1</div></td>
            <td><div className="attr-team-overview-yellow">2</div></td>
            <td><div className="attr-team-overview-blue">3</div></td>
            <td><div className="attr-team-overview-green">1</div></td>
            <td>2</td>
            <td>3</td>
            <td>1</td>
            <td>2</td>
            <td>3</td>
            <td>1</td>
            <td>2</td>
            <td>3</td>
            <td>1</td>
            <td>2</td>
            <td>3</td>
            <td>1</td>
            <td>2</td>
            <td>3</td>
            <td>1</td>
            <td>2</td>
            <td>3</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default TeamSummaryOverview;