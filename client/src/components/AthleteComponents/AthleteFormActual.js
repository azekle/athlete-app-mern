import React, { useState } from "react";
import moment from "moment";
import {requests} from '../../utils/axios';
import {Redirect } from "react-router-dom";
import './AthleteFormActual.css'
import human from '../../assets/human-body.svg'
import logo from'../../assets/logo.svg'
import {HiOutlineArrowCircleLeft} from 'react-icons/hi'
const AthleteFormActual = (props) => {
  const user = props.user;
  const [formSubmitted,setFormSubmitted] = useState(false);
  const [today, setToday] = useState(moment(props.today));
  const [dateForForm,setDateForForm] = useState(props.theDayForForm);
  const [sleepForForm,setSleepForForm]= useState(1)
  const [fatigueForForm,setFatigueForForm] = useState(5)
  const [session1ForForm,setSession1ForForm] = useState("basketball")
  const [duration1ForForm,setDuration1ForForm] = useState(0)
  const [rpe1ForForm,setRpe1ForForm] = useState(10)
  const [wellness1ForForm,setWellness1ForForm] = useState(5)
  const [session2ForForm,setSession2ForForm] = useState(" ")
  const [duration2ForForm,setDuration2ForForm] = useState(0)
  const [rpe2ForForm,setRpe2ForForm] = useState(0)
  const [wellness2ForForm,setWellness2ForForm] = useState(0)
  const [session3ForForm,setSession3ForForm] = useState()
  const [duration3ForForm,setDuration3ForForm] = useState()
  const [rpe3ForForm,setRpe3ForForm] = useState()
  const [wellness3ForForm,setWellness3ForForm] = useState()
  const [hasTraining, setHasTraining] = useState(false)
  
{// UPDATE FUNCTIONS ---START---
}
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
    const updateSession3 = (e)=>{
      setSession3ForForm(e.target.value)
    }
    const updateDuration3 = (e)=>{
      setDuration3ForForm(e.target.value)
    }
    const updateRpe3 = (e)=>{
      setRpe3ForForm(e.target.value)
    }
    const updateWellness3 = (e)=>{
      setWellness3ForForm(e.target.value)
    }
  {// UPDATE FUNCTIONS ---END---
}

    const submitForm = (e,reque) =>{
     
      e.preventDefault()
      
      reque={username:user.username,
      details:{
              date:dateForForm,
              sleep:sleepForForm,
              fatigue:fatigueForForm,
              session1: session1ForForm,
              duration1:duration1ForForm,
              rpe1:rpe1ForForm,
              wellness1: wellness1ForForm,
              session2: session2ForForm,
              duration2:duration2ForForm,
              rpe2:rpe2ForForm,
              wellness2:wellness2ForForm,
              }}
              console.log(reque.details)
             
     return(requests.post("/form/post",reque)
      .then(res => console.log(res)))
      .then(()=>setFormSubmitted(true))
      

    }
    const playerHasTraining = () =>{
      setHasTraining(!hasTraining);
      if(hasTraining){
        setSession1ForForm(" ");
        setRpe1ForForm(0)
        setDuration1ForForm(0)
        setWellness1ForForm(0)
      }
      else{
        setSession1ForForm("basketball");
        setRpe1ForForm(1)
        setDuration1ForForm(0)
        setWellness1ForForm(1)
      }
      
    }
    const goBack = () =>{
      props.fillForm(false)
    }
    if(formSubmitted) return(<div className="congratulation"><h1>Congratulation! <br/>You filled the form!</h1><button className="congratulation-button" onClick={()=>props.fillForm(false)}>Go back to main screen</button></div>)
  return (
    <div className="athlete-fill-form-wrapper">
          <div className="top-back">
            <HiOutlineArrowCircleLeft onClick={goBack} className="back-arrow"/>
            <label className="top-back-label">Forms</label>
            <HiOutlineArrowCircleLeft className="back-arrow2 back-arrow"/>
            
          </div>
      <label className="fill-form-player-name">{`${user.lastName} ${user.firstName}`}</label>
      <form method="post" onSubmit={submitForm} className="athlete-fill-form">
        <select className="fill-form-team">
          <option value="Junior">{user.team}</option>
        </select>
        <div className="fill-form-details">
            <label className="training-date-label">Training Date</label>
            <div className="fill-form-training-date">
                <div className="fill-form-today">Today</div>
                <div className="fill-form-date">{dateForForm}</div>
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
            <label className="did-label">Did you have training on {dateForForm}?</label>
            <div><input className="training-yes" onChange={playerHasTraining} checked={hasTraining} type="checkbox"></input><label className="did-label">Yes </label></div>
            {hasTraining?<div className="form-part">
                <label className="form-part-title">Session1</label>
                <div className="sub-subtitle-field">
                    <label className="form-part-subtitle">Session type</label>
                    <label className="form-part-subsubtitle">Type of Training</label>
                </div>
                <select value={session1ForForm} onChange={updateSession1} className="form-part-select session-type">
                    <option value="basketball">Basketball</option>
                    <option value="gym">Gym</option>
                </select> 
                    <label className="form-part-subtitle">Duration</label>
                    <select value={duration1ForForm} onChange={updateDuration1} className="form-part-select">
                    <option value="0">0</option>
                    <option value="10">10</option>
                    <option value="20">20</option>
                    <option value="30">30</option>
					          <option value="40">40</option>
                    <option value="50">50</option>
                    <option value="60">60</option>
                    <option value="70">70</option>
					          <option value="80">80</option>
                    <option value="90">90</option>
                    <option value="100">100</option>
                    <option value="110">110</option>
					          <option value="120">120</option>
					          <option value="130">130</option>
					          <option value="140">140</option>
					          <option value="150">150</option>
					          <option value="160">160</option>
					          <option value="170">170</option>
					          <option value="180">180</option>
                </select>
                <div className="sub-subtitle-field">
                    <label className="form-part-subtitle">RPE</label>
                    <label className="form-part-subsubtitle">How hard was your training?</label>
                </div>
                <input value={rpe1ForForm} onChange={updateRpe1} className="slider slider2" type="range" id="fatigue" name="fatigue" min="1" max="10"></input>
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
                <input value={wellness1ForForm} onChange={updateWellness1} className="slider" type="range" id="fatigue" name="fatigue" min="1" max="5"></input>
                <div className="slider-indexes2">
                  <label style={{textAlign:"start"}} className="slider-index2">Poor</label>
                  <label style={{textAlign:"start"}} className="slider-index2">Fair</label>
                  <label style={{textAlign:"center"}} className="slider-index2">Good</label>
                  <label style={{textAlign:"end"}} className="slider-index2">Very Good</label>
                  <label style={{textAlign:"end"}} className="slider-index2">Excellent</label>
                </div>
            </div>:""}
            {hasTraining?<div className="separator"></div>:""}
             {false?<div className="form-part">
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
            </div>:""}
            {false?<div className="separator"></div>:""}
            {false?<div className="form-part">
                <label className="form-part-title">Session3</label>
                <div className="sub-subtitle-field">
                    <label className="form-part-subtitle">Session type</label>
                    <label className="form-part-subsubtitle">Type of Training</label>
                </div>
                <select onChange={updateSession3} className="form-part-select session-type">
                    <option value="basketball">Basketball</option>
                    <option value="gym">Gym</option>
                </select> 
                    <label className="form-part-subtitle">Duration</label>
                    <select onChange={updateDuration3} className="form-part-select">
                    <option value="60">60</option>
                    <option value="70">70</option>
                    <option value="80">80</option>
                    <option value="90">90</option>
                </select>
                <div className="sub-subtitle-field">
                    <label className="form-part-subtitle">RPE</label>
                    <label className="form-part-subsubtitle">How hard was your training?</label>
                </div>
                <input onChange={updateRpe3} className="slider slider2" type="range" id="fatigue" name="fatigue" min="1" max="10"></input>
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
                <input onChange={updateWellness3} className="slider" type="range" id="fatigue" name="fatigue" min="1" max="5"></input>
                <div className="slider-indexes2">
                  <label style={{textAlign:"start"}} className="slider-index2">Poor</label>
                  <label style={{textAlign:"start"}} className="slider-index2">Fair</label>
                  <label style={{textAlign:"center"}} className="slider-index2">Good</label>
                  <label style={{textAlign:"end"}} className="slider-index2">Very Good</label>
                  <label style={{textAlign:"end"}} className="slider-index2">Excellent</label>
                </div>
            </div>:""}
            <div className="form-part">
            </div>
        </div>
        
        <button onClick={submitForm} type="submit" className="submit-athlete-form"><label>Submit</label></button>
      </form>
    </div>
  );
};

export default AthleteFormActual;
