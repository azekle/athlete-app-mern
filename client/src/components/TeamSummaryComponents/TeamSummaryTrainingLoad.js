import React, { useState } from "react";
import moment from "moment";
import { AiOutlineArrowRight, AiOutlineArrowLeft } from "react-icons/ai";
import "./TeamSummaryCss/TeamSummaryTrainingLoad.css";
const TeamSummaryTrainingLoad = () => {
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
      <table className="overview-table">
        <thead>
          <tr>
            <th className="table-header-cell athlete">Name</th>
            <th  className="table-header-cell">
              {`${showDate(currentShownWeek, 0)}.0${
                showMonth(currentShownWeek, 0) + 1
              }`}
              <br></br>Sunday</th>
            <th  className="table-header-cell">
              {`${showDate(currentShownWeek, 1)}.0${
                showMonth(currentShownWeek, 1) + 1
              }`}
              <br></br>Monday</th>
            <th  className="table-header-cell">
              {`${showDate(currentShownWeek, 2)}.0${
                showMonth(currentShownWeek, 2) + 1
              }`}
              <br></br>Tuesday</th>
            <th  className="table-header-cell">
              {`${showDate(currentShownWeek, 3)}.0${
                showMonth(currentShownWeek, 3) + 1
              }`}
              <br></br>Wednesday</th>
            <th  className="table-header-cell">
              {`${showDate(currentShownWeek, 4)}.0${
                showMonth(currentShownWeek, 4) + 1
              }`}
              <br></br>Thursday</th>
            <th  className="table-header-cell">
              {`${showDate(currentShownWeek, 5)}.0${
                showMonth(currentShownWeek, 5) + 1
              }`}
              <br></br>Friday</th>
            <th  className="table-header-cell">
            {`${showDate(currentShownWeek, 6)}.0${
                showMonth(currentShownWeek, 6) + 1
              }`}
              <br></br>Saturday
            </th>
            
          </tr>
        </thead>
        <tbody className="tbody-load">
            <tr>
                <td className="table-left-atr"> Session1</td>
                <td>Activity</td>
                <td>Activity</td>
                <td>Activity</td>
                <td>Activity</td>
                <td>Activity</td>
                <td>Activity</td>
                <td>Activity</td>
            </tr>
            <tr>
                <td className="table-left-atr">RPE</td>
                <td>RPE-number</td>
                <td>RPE-number</td>
                <td>RPE-number</td>
                <td>RPE-number</td>
                <td>RPE-number</td>
                <td>RPE-number</td>
                <td>RPE-number</td>
            </tr>
            <tr>
                <td className="table-left-atr">Duration</td>
                <td>Duration-nr</td>
                <td>Duration-nr</td>
                <td>Duration-nr</td>
                <td>Duration-nr</td>
                <td>Duration-nr</td>
                <td>Duration-nr</td>
                <td>Duration-nr</td>
            </tr>
            <tr>
                <td className="table-left-atr">Session2</td>
                <td>Activity</td>
                <td>Activity</td>
                <td>Activity</td>
                <td>Activity</td>
                <td>Activity</td>
                <td>Activity</td>
                <td>Activity</td>
            </tr>
            <tr>
                <td className="table-left-atr">RPE</td>
                <td>RPE-number</td>
                <td>RPE-number</td>
                <td>RPE-number</td>
                <td>RPE-number</td>
                <td>RPE-number</td>
                <td>RPE-number</td>
                <td>RPE-number</td>
            </tr>
            <tr>
                <td className="table-left-atr">Duration</td>
                <td>Duration-nr</td>
                <td>Duration-nr</td>
                <td>Duration-nr</td>
                <td>Duration-nr</td>
                <td>Duration-nr</td>
                <td>Duration-nr</td>
                <td>Duration-nr</td>
            </tr>
            <tr>
                <td className="table-left-atr-bottom">Total Load <br></br>$<br></br>W-TO-W<br></br>$</td>
                <td>Nr</td>
                <td>Nr</td>
                <td>Nr</td>
                <td>Nr</td>
                <td>Nr</td>
                <td>Nr</td>
                <td>Nr</td>
            </tr>
        </tbody>
      </table>
    </div>
  );
};

export default TeamSummaryTrainingLoad;
