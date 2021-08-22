import React, { useState } from "react";
import moment from "moment";
import './AthleteFormActual.css'
const AthleteFormActual = (props) => {
  const [today, setToday] = useState(moment(props.today));
  const [dateForForm,setDateForForm] = useState(moment(props.today).format('DD/MM/YY'));
  const [sleepForForm,setSleepForForm]= useState()
  const [fatigueForForm,setFatigueForForm] = useState()
  const [session1ForForm,setSession1ForForm] = useState()
  const [duration1ForForm,setDuration1ForForm] = useState()
  const [rpe1ForForm,setRpe1ForForm] = useState()
  const [wellness1ForForm,setWellness1ForForm] = useState()
  const [session2ForForm,setSession2ForForm] = useState()
  const [duration2ForForm,setDuration2ForForm] = useState()
  const [rpe2ForForm,setRpe2ForForm] = useState()
  const [wellness2ForForm,setWellness2ForForm] = useState()
  

  const updateSleep = (e)=>{
      setSleepForForm(e.target.value)
  }
  const updateFatigue = (e)=>{
    setFatigueForForm(e.target.value)
  }


  const updateSession1 = (e)=>{
    setSession1ForForm(e.target.value)
  }
  const updateDuration1 = (e)=>{
    setDuration1ForForm(e.target.value)
  }
  const updateRpe1 = (e)=>{
    setRpe1ForForm(e.target.value)
  }
  const updateWellness1 = (e)=>{
    setWellness1ForForm(e.target.value)
  }
  const updateSession2 = (e)=>{
    setSession2ForForm(e.target.value)
  }
  const updateDuration2 = (e)=>{
    setDuration2ForForm(e.target.value)
  }
  const updateRpe2 = (e)=>{
    setRpe2ForForm(e.target.value)
  }
  const updateWellness2 = (e)=>{
    setWellness2ForForm(e.target.value)
  }
  return (
    <div className="athlete-fill-form-wrapper">
      {duration2ForForm}-{rpe2ForForm}-{wellness2ForForm}
      <div className="athlete-form-logo">
        <div>LOGO</div>
      </div>
      <label className="fill-form-player-name">$name</label>
      <form className="athlete-fill-form">
        <select className="fill-form-team">
          <option value="Junior">Junior</option>
        </select>
        <div className="fill-form-details">
            <label className="training-date-label">Training Date</label>
            <div className="fill-form-training-date">
                <div className="fill-form-today">Today</div>
                <div className="fill-form-date">{today.format('DD/MM/YY')}</div>
            </div>
            <div className="separator"></div>
            <div className="form-part">
                <label className="form-part-title">Wellness</label>
                <label className="form-part-subtitle">Sleep Time</label>
                <select onChange={updateSleep} className="form-part-select">
                    <option value="1">1 Hour</option>
                    <option value="2">2 Hours</option>
                    <option value="3">3 Hours</option>
                    <option value="4">4 Hours</option>
                    <option value="5">5 Hours</option>
                    <option value="6">6 Hours</option>
                    <option value="7">7 Hours</option>
                    <option value="8">8 Hours</option>
                    <option value="9">9 Hours</option>
                    <option value="10">10 Hours</option>
                    <option value="11">11 Hours</option>
                    <option value="12">12 Hours</option>
                </select>
                <div className="sub-subtitle-field">
                    <label className="form-part-subtitle">Fatigue</label>
                    <label className="form-part-subsubtitle">How tired are you?</label>
                </div>
                <input className="slider" onChange={updateFatigue} type="range" id="fatigue" name="fatigue" min="1" max="5"></input>
                <div className="slider-indexes">
                  <label className="slider-index">Exhausted</label>
                  <label className="slider-index tired">Tired</label>
                  <label className="slider-index">Normal</label>
                  <label className="slider-index fresh">Fresh</label>
                  <label className="slider-index">Very Fresh</label>
                </div>
            </div>
            <div className="separator"></div>
            <div className="form-part">
                <label className="form-part-title">Session1</label>
                <div className="sub-subtitle-field">
                    <label className="form-part-subtitle">Session type</label>
                    <label className="form-part-subsubtitle">Type of Training</label>
                </div>
                <select onChange={updateSession1} className="form-part-select session-type">
                    <option value="basketball">Basketball</option>
                    <option value="gym">Gym</option>
                </select> 
                    <label className="form-part-subtitle">Duration</label>
                    <select onChange={updateDuration1} className="form-part-select">
                    <option value="60">60</option>
                    <option value="70">70</option>
                    <option value="80">80</option>
                    <option value="90">90</option>
                </select>
                <div className="sub-subtitle-field">
                    <label className="form-part-subtitle">RPE</label>
                    <label className="form-part-subsubtitle">How hard was your training?</label>
                </div>
                <input onChange={updateRpe1} className="slider slider2" type="range" id="fatigue" name="fatigue" min="1" max="10"></input>
                <div className="slider-indexes">
                  <label className="slider-index">1</label>
                  <label className="slider-index">2</label>
                  <label className="slider-index">3</label>
                  <label className="slider-index">4</label>
                  <label className="slider-index">5</label>
                  <label className="slider-index">6</label>
                  <label className="slider-index">7</label>
                  <label className="slider-index">8</label>
                  <label className="slider-index">9</label>
                  <label className="slider-index">10</label>
                </div>
                <div className="sub-subtitle-field">
                    <label className="form-part-subtitle">Wellness</label>
                    <label className="form-part-subsubtitle">How was training?</label>
                </div>
                <input onChange={updateWellness1} className="slider" type="range" id="fatigue" name="fatigue" min="1" max="5"></input>
                <div className="slider-indexes2">
                  <label style={{textAlign:"start"}} className="slider-index2">Poor</label>
                  <label style={{textAlign:"start"}} className="slider-index2">Fair</label>
                  <label style={{textAlign:"center"}} className="slider-index2">Good</label>
                  <label style={{textAlign:"end"}} className="slider-index2">Very Good</label>
                  <label style={{textAlign:"end"}} className="slider-index2">Excellent</label>
                </div>
            </div>
            <div className="separator"></div>
            <div className="form-part">
                <label className="form-part-title">Session2</label>
                <div className="sub-subtitle-field">
                    <label className="form-part-subtitle">Session type</label>
                    <label className="form-part-subsubtitle">Type of Training</label>
                </div>
                <select onChange={updateSession2} className="form-part-select session-type">
                    <option value="basketball">Basketball</option>
                    <option value="gym">Gym</option>
                </select> 
                    <label className="form-part-subtitle">Duration</label>
                    <select onChange={updateDuration2} className="form-part-select">
                    <option value="60">60</option>
                    <option value="70">70</option>
                    <option value="80">80</option>
                    <option value="90">90</option>
                </select>
                <div className="sub-subtitle-field">
                    <label className="form-part-subtitle">RPE</label>
                    <label className="form-part-subsubtitle">How hard was your training?</label>
                </div>
                <input onChange={updateRpe2} className="slider slider2" type="range" id="fatigue" name="fatigue" min="1" max="10"></input>
                <div className="slider-indexes">
                  <label className="slider-index">1</label>
                  <label className="slider-index">2</label>
                  <label className="slider-index">3</label>
                  <label className="slider-index">4</label>
                  <label className="slider-index">5</label>
                  <label className="slider-index">6</label>
                  <label className="slider-index">7</label>
                  <label className="slider-index">8</label>
                  <label className="slider-index">9</label>
                  <label className="slider-index">10</label>
                </div>
                <div className="sub-subtitle-field">
                    <label className="form-part-subtitle">Wellness</label>
                    <label className="form-part-subsubtitle">How was training?</label>
                </div>
                <input onChange={updateWellness2} className="slider" type="range" id="fatigue" name="fatigue" min="1" max="5"></input>
                <div className="slider-indexes2">
                  <label style={{textAlign:"start"}} className="slider-index2">Poor</label>
                  <label style={{textAlign:"start"}} className="slider-index2">Fair</label>
                  <label style={{textAlign:"center"}} className="slider-index2">Good</label>
                  <label style={{textAlign:"end"}} className="slider-index2">Very Good</label>
                  <label style={{textAlign:"end"}} className="slider-index2">Excellent</label>
                </div>
            </div>
            <div className="separator"></div>
            <div className="form-part">
                <label className="form-part-title">Session3</label>
                <div className="sub-subtitle-field">
                    <label className="form-part-subtitle">Session type</label>
                    <label className="form-part-subsubtitle">Type of Training</label>
                </div>
                <select className="form-part-select session-type">
                    <option value="basketball">Basketball</option>
                    <option value="gym">Gym</option>
                </select> 
                    <label className="form-part-subtitle">Duration</label>
                    <select className="form-part-select">
                    <option value="60">60</option>
                    <option value="70">70</option>
                    <option value="80">80</option>
                    <option value="90">90</option>
                </select>
                <div className="sub-subtitle-field">
                    <label className="form-part-subtitle">RPE</label>
                    <label className="form-part-subsubtitle">How hard was your training?</label>
                </div>
                <input className="slider slider2" type="range" id="fatigue" name="fatigue" min="1" max="10"></input>
                <div className="slider-indexes">
                  <label className="slider-index">1</label>
                  <label className="slider-index">2</label>
                  <label className="slider-index">3</label>
                  <label className="slider-index">4</label>
                  <label className="slider-index">5</label>
                  <label className="slider-index">6</label>
                  <label className="slider-index">7</label>
                  <label className="slider-index">8</label>
                  <label className="slider-index">9</label>
                  <label className="slider-index">10</label>
                </div>
                <div className="sub-subtitle-field">
                    <label className="form-part-subtitle">Wellness</label>
                    <label className="form-part-subsubtitle">How was training?</label>
                </div>
                <input className="slider" type="range" id="fatigue" name="fatigue" min="1" max="5"></input>
                <div className="slider-indexes2">
                  <label style={{textAlign:"start"}} className="slider-index2">Poor</label>
                  <label style={{textAlign:"start"}} className="slider-index2">Fair</label>
                  <label style={{textAlign:"center"}} className="slider-index2">Good</label>
                  <label style={{textAlign:"end"}} className="slider-index2">Very Good</label>
                  <label style={{textAlign:"end"}} className="slider-index2">Excellent</label>
                </div>
            </div>
        </div>
      </form>
    </div>
  );
};

export default AthleteFormActual;
