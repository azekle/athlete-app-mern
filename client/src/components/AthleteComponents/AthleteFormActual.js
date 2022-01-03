import React, { useState, useEffect } from "react";
import moment from "moment";
import {requests} from '../../utils/axios';
import {Redirect } from "react-router-dom";
import './AthleteFormActual.css'
import logo2 from'../../assets/logo2.svg'
import {HiOutlineArrowCircleLeft} from 'react-icons/hi'
import {GoCalendar} from 'react-icons/go'
const AthleteFormActual = (props) => {
  const isSecondSession = props.isSecondSession
  const user = props.user;
  const [formSubmitted,setFormSubmitted] = useState(false);
  const [today, setToday] = useState(moment(props.today));
  const [dateForForm,setDateForForm] = useState(props.theDayForForm);
  const [sleepForForm,setSleepForForm]= useState(1)
  const [fatigueForForm,setFatigueForForm] = useState(5)
  const [sorenessForForm,setSorenessForForm] = useState(user.soreness||5)
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
  const [hasTraining,setHasTraining] = useState(false)
  const [hasTraining2,setHasTraining2] = useState(false)
  const [injuryName,setInjuryName] = useState("")
  const [counter,setCounter] = useState(0)
  const [injuryNames,setInjuryNames] = useState(user.training[user.training.length-1].injuries)
  const [injuryExist,setInjuryExist] = useState(false)
  const [severity,setSeverity] = useState(user.severity)
  const [showSeverity,setShowSeverity] = useState(false)
  const [front,setFront] = useState(true)
  const [injuries,setInjuries] = useState()
{// UPDATE FUNCTIONS ---START---
}
useEffect(() => {
  if(isSecondSession) setSession2ForForm("basketball")
  if(user.injury!=" ") setInjuryExist(true)
}, [])
useEffect(()=>{
	setInjuryNames(injuryNames);
  },[injuryNames,counter])
  const updateSleep = (e)=>{
      setSleepForForm(e.target.value)
  }
  const updateFatigue = (e)=>{
    setFatigueForForm(e.target.value)
  }
  const updateSoreness = (e)=>{
    setSorenessForForm(e.target.value)
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

    const submitForm = async (e,reque) =>{
     
      e.preventDefault()
	  user.injuries = injuryNames;
	  user.injury = injuryName;
	  user.severity = severity
	  user.soreness = sorenessForForm
	  await requests.put("/user/update",user).then(res=>console.log(res))
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
			  injuries:injuryNames
              }} 
	 console.log(user)
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
	const playerHasTraining2 = () =>{
		setHasTraining2(!hasTraining2);
		console.log(hasTraining2,isSecondSession)
		if(hasTraining2){
		  setSession2ForForm(" ");
		  setRpe2ForForm(0)
		  setDuration2ForForm(0)
		  setWellness2ForForm(0)
		}
		else{
		  setSession2ForForm("basketball");
		  setRpe2ForForm(1)
		  setDuration2ForForm(0)
		  setWellness2ForForm(1)
		}
		
	  }
    const goBack = () =>{
      props.fillForm(false)
    }
    const submitSecondSession = async(e) =>{
      e.preventDefault()
	  user.injuries = injuryNames;
	  user.soreness = sorenessForForm
	  await requests.put("/user/update",user).then(res=>console.log(res))
	  user.severity = severity
      var indexOfSecondTraining = 0
      user.training.map((value,index)=>{if(value.date==dateForForm) indexOfSecondTraining=index})
      console.log("session2",session2ForForm)
      console.log("duration2",duration2ForForm)
      console.log("rpe2",rpe2ForForm)
      console.log("wellness2",wellness2ForForm)
      user.training[indexOfSecondTraining].session2 = session2ForForm;
      user.training[indexOfSecondTraining].duration2 = duration2ForForm;
      user.training[indexOfSecondTraining].rpe2 = rpe2ForForm;
      user.training[indexOfSecondTraining].wellness2 = wellness2ForForm;
      await requests.put("/user/update",user)
      .then(res => console.log(res))
      .then(()=>setFormSubmitted(true))
    }
	const displaySeverity = (e) =>{
		e.preventDefault()
		setShowSeverity(!showSeverity)
	}
	const changeSide = (e) =>{
		e.preventDefault()
		if(e.target.id=="front") {setFront(true);}
		else setFront(false)
	}
	const reloadPage = () =>{
		window.location.reload()
	}
	
	const addInjury = (injury) =>{
		const injuryArray = injuryNames;
		if(!injuryArray.some(e=>e.name==injury)||injuryArray.length==0) {;injuryArray.push({name:injury,severity:""})}
		
		else{
			var index
			injuryArray.map((value,indexx)=>{
				if(value.name==injury) index = indexx
			})
			injuryArray.splice(index,1);
		}
		setInjuryNames(injuryArray)
		setCounter(counter+1)
		
	}
	const setSeverityForInjury = (e) =>{
		
		const injuryArray = injuryNames
		if(injuryArray.length-1>-1)injuryArray[(injuryArray.length-1)].severity = severity
		setInjuryNames(injuryArray)
	}
	const handleInjuryName = (injury) =>{
		const injuryArray  = injuryNames
		addInjury(injury)
		setInjuryName(injury)
		if(injuryArray.some(e=>e.name==injury)) setShowSeverity(true)

	}
	const removeInjury = (e) =>{
		const injuryArray = injuryNames
		injuryArray.splice(e.target.id,1)
		setInjuryNames(injuryArray)
		setCounter(counter+1)
	}
	const showDayofWeek = () =>{
		var date = dateForForm;
		if(date===moment().format("DD/MM/YY")) return("Today")
		const dateArray = date.split("/")
		const intermediate = dateArray[0]
		dateArray[0] = dateArray[1]
		dateArray[1] = intermediate;
		var date = dateArray.join("/")
		date = new Date(date)
		date = moment(date).day()
		
		switch (date) {
			case 0:
				return("Sunday")
			case 1:
				return("Monday")
			case 2:
				return("Tuesday")
			case 3:
				return("Wednesday")
			case 4:
				return("Thursday")
			case 5:
				return("Friday")
			case 6:
				return("Saturday")
			default:
				break;
		}
		
	}
	const SubmitBothSessions = async (e,reque) =>{
		e.preventDefault()
		user.injuries = injuryNames;
		user.soreness = sorenessForForm
		console.log("both sessions are going to be submitted")
		await requests.put("/user/update",user).then(res=>console.log(res))
		
		
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
		.then(()=>console.log("Both sessions have been submitted"))
		
  
	}
    if(formSubmitted) return(<div className="congratulation"><h1>Congratulation! <br/>You filled the form!</h1><button className="congratulation-button" onClick={()=>{props.fillForm(false);reloadPage()}}>Go back to main screen</button></div>)
  return (
    <div className="athlete-fill-form-wrapper">
      <div className="top-back">
            <HiOutlineArrowCircleLeft onClick={goBack} className="back-arrow"/>
            
            <img className="actual-form-logo" src={logo2}></img>
          </div>
      <label className="fill-form-player-name">{`${user.lastName} ${user.firstName}`}</label>
      <form method="post" onSubmit={submitForm} className="athlete-fill-form">
        <select className="fill-form-team">
          <option value="Junior">{user.team}</option>
        </select>
        <div className="fill-form-details">
			<div className="fill-form-training-date">
				<label className="training-date-label">Training Date</label>
                <div className="fill-form-today">{showDayofWeek()}</div>
                <div className="fill-form-date">{dateForForm}<GoCalendar className="calendar-icon" onClick={goBack}/></div>
            </div>
            <div className="separator"></div>
            {!isSecondSession? <div className="form-part">
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
                <input value={fatigueForForm} className="slider" onChange={updateFatigue} type="range" id="fatigue" name="fatigue" min="1" max="5"></input>
				<div className="slider-indexes">
                  <label className="slider-index">Exhausted</label>
                  <label className="slider-index tired">Tired</label>
                  <label className="slider-index">Normal</label>
                  <label className="slider-index fresh">Fresh</label>
                  <label className="slider-index">Very Fresh</label>
                </div>
				<div className="sub-subtitle-field">
                    <label className="form-part-subtitle">Soreness</label>
                    <label className="form-part-subsubtitle">Do you have muscle soreness?</label>
                </div>
                <input value={sorenessForForm} className="slider" onChange={updateSoreness} type="range" id="fatigue" name="fatigue" min="1" max="5"></input>
                <div className="slider-indexes">
                  <label style={{fontSize:"12px",textAlign:"left"}} className="slider-index">Not sore at all</label>
                  <label style={{fontSize:"12px",textAlign:"center"}}  className="slider-index ">Slighty sore</label>
                  <label style={{fontSize:"12px",textAlign:"center"}}  className="slider-index">Increase in soreness/tightness</label>
                  <label style={{fontSize:"12px",textAlign:"center"}}  className="slider-index ">Very sore</label>
                  <label style={{fontSize:"12px",textAlign:"right"}}  className="slider-index">Extremely sore</label>
                </div>
            </div>:""}
            <div className="separator"></div>
            
			{!isSecondSession?<label className="did-label">Did you have training on {dateForForm}?</label>:""}
            {!isSecondSession?<div>
				<input className="training-yes" onChange={playerHasTraining} checked={hasTraining} type="checkbox"></input>
				<label className="did-label"> </label>
			</div>:""}
			
            {hasTraining&&!isSecondSession?<div className="form-part">
                <label className="form-part-title">Session1</label>
                <div className="sub-subtitle-field">
                    <label className="form-part-subtitle">Session type</label>
                    <label className="form-part-subsubtitle">Type of Training</label>
                </div>
                <select onChange={updateSession1} className="form-part-select session-type">
                    <option value="basketball">Basketball</option>
                    <option value="strength">Strength</option>
					<option value="game">Game</option>
					<option value="agility/speed">Agility/Speed</option>
                </select> 
                    <label className="form-part-subtitle">Duration</label>
                    <select onChange={updateDuration1} className="form-part-select">
							  <option value="0">0 min</option>
							  <option value="10">10 min</option>
							  <option value="20">20 min</option>
							  <option value="30">30 min</option>
					          <option value="40">40 min</option>
							  <option value="50">50 min</option>
						      <option value="60">60 min</option>
							  <option value="70">70 min</option>
					          <option value="80">80 min</option>
							  <option value="90">90 min</option>
							  <option value="100">100 min</option>
							  <option value="110">110 min</option>
					          <option value="120">120 min</option>
					          <option value="130">130 min</option>
					          <option value="140">140 min</option>
					          <option value="150">150 min</option>
					          <option value="160">160 min</option>
					          <option value="170">170 min</option>
					          <option value="180">180 min</option>
                </select>
                <div className="sub-subtitle-field">
                    <label className="form-part-subtitle">RPE</label>
                    <label className="form-part-subsubtitle">How hard was your training?</label>
                </div>
                <input onChange={updateRpe1} className="slider slider2" type="range" id="fatigue" name="fatigue" min="1" max="10"></input>
                <div className="slider-indexes">
                  <label style={rpe1ForForm==1?{fontWeight:"700",color:"black",fontSize:"1.2em"}:{}} className="slider-index">1</label>
                  <label style={rpe1ForForm==2?{fontWeight:"700",color:"black",fontSize:"1.2em"}:{}} className="slider-index">2</label>
                  <label style={rpe1ForForm==3?{fontWeight:"700",color:"black",fontSize:"1.2em"}:{}} className="slider-index">3</label>
                  <label style={rpe1ForForm==4?{fontWeight:"700",color:"black",fontSize:"1.2em"}:{}} className="slider-index">4</label>
                  <label style={rpe1ForForm==5?{fontWeight:"700",color:"black",fontSize:"1.2em"}:{}} className="slider-index">5</label>
                  <label style={rpe1ForForm==6?{fontWeight:"700",color:"black",fontSize:"1.2em"}:{}} className="slider-index">6</label>
                  <label style={rpe1ForForm==7?{fontWeight:"700",color:"black",fontSize:"1.2em"}:{}} className="slider-index">7</label>
                  <label style={rpe1ForForm==8?{fontWeight:"700",color:"black",fontSize:"1.2em"}:{}} className="slider-index">8</label>
                  <label style={rpe1ForForm==9?{fontWeight:"700",color:"black",fontSize:"1.2em"}:{}} className="slider-index">9</label>
                  <label style={rpe1ForForm==10?{fontWeight:"700",color:"black",fontSize:"1.2em"}:{}} className="slider-index">10</label>
                </div>
                <div className="sub-subtitle-field">
                    <label className="form-part-subtitle">Wellness</label>
                    <label className="form-part-subsubtitle">Energy level in practice</label>
                </div>
                <input onChange={updateWellness1} className="slider" type="range" id="fatigue" name="fatigue" min="1" max="5"></input>
                <div className="slider-indexes2">
                  <label style={{textAlign:"start"}} className="slider-index2">Poor</label>
                  <label style={{textAlign:"start"}} className="slider-index2">Fair</label>
                  <label style={{textAlign:"center"}} className="slider-index2">Good</label>
                  <label style={{textAlign:"end"}} className="slider-index2">Very Good</label>
                  <label style={{textAlign:"end"}} className="slider-index2">Excellent</label>
                </div>
            </div>:""}
			{hasTraining?<div className="separator"></div>:""}
			<label className="did-label">Did you have a 2nd training session on {dateForForm}?</label>
			<div>
				<input className="training-yes" onChange={playerHasTraining2} checked={hasTraining2} type="checkbox"></input>
				<label className="did-label"></label>
			</div>
             {hasTraining2?<div className="form-part">
                <label className="form-part-title">Session2</label>
                <div className="sub-subtitle-field">
                    <label className="form-part-subtitle">Session type</label>
                    <label className="form-part-subsubtitle">Type of Training</label>
                </div>
                <select onChange={updateSession2} value={session2ForForm} className="form-part-select session-type">
					<option value="basketball">Basketball</option>
                    <option value="strength">Strength</option>
					<option value="game">Game</option>
					<option value="agility/speed">Agility/Speed</option>
                </select> 
                    <label className="form-part-subtitle">Duration</label>
                    <select onChange={updateDuration2} value={duration2ForForm} className="form-part-select">
							  <option value="0">0 min</option>
							  <option value="10">10 min</option>
							  <option value="20">20 min</option>
							  <option value="30">30 min</option>
					          <option value="40">40 min</option>
                              <option value="50">50 min</option>
                              <option value="60">60 min</option>
                              <option value="70">70 min</option>
					          <option value="80">80 min</option>
                              <option value="90">90 min</option>
                              <option value="100">100 min</option>
                              <option value="110">110 min</option>
					          <option value="120">120 min</option>
					          <option value="130">130 min</option>
					          <option value="140">140 min</option>
					          <option value="150">150 min</option>
					          <option value="160">160 min</option>
					          <option value="170">170 min</option>
					          <option value="180">180 min</option>
                </select>
                <div className="sub-subtitle-field">
                    <label className="form-part-subtitle">RPE</label>
                    <label className="form-part-subsubtitle">How hard was your training?</label>
                </div>
                <input onChange={updateRpe2} value={rpe2ForForm} className="slider slider2" type="range" id="fatigue" name="fatigue" min="1" step=".5" max="10"></input>
                <div className="slider-indexes">
				<label style={rpe2ForForm==1?{fontWeight:"700",color:"black",fontSize:"1.2em"}:{}} className="slider-index">1</label>
				  
                  <label style={rpe2ForForm==2?{fontWeight:"700",color:"black",fontSize:"1.2em"}:{}} className="slider-index">2</label>
				  
                  <label style={rpe2ForForm==3?{fontWeight:"700",color:"black",fontSize:"1.2em"}:{}} className="slider-index">3</label>
				  
                  <label style={rpe2ForForm==4?{fontWeight:"700",color:"black",fontSize:"1.2em"}:{}} className="slider-index">4</label>
				  
                  <label style={rpe2ForForm==5?{fontWeight:"700",color:"black",fontSize:"1.2em"}:{}} className="slider-index">5</label>
				  
                  <label style={rpe2ForForm==6?{fontWeight:"700",color:"black",fontSize:"1.2em"}:{}} className="slider-index">6</label>
				  
                  <label style={rpe2ForForm==7?{fontWeight:"700",color:"black",fontSize:"1.2em"}:{}} className="slider-index">7</label>
				  
                  <label style={rpe2ForForm==8?{fontWeight:"700",color:"black",fontSize:"1.2em"}:{}} className="slider-index">8</label>
				  
                  <label style={rpe2ForForm==9?{fontWeight:"700",color:"black",fontSize:"1.2em"}:{}} className="slider-index">9</label>
				  
                  <label style={rpe2ForForm==10?{fontWeight:"700",color:"black",fontSize:"1.2em"}:{}} className="slider-index">10</label>
                </div>
                <div className="sub-subtitle-field">
                    <label className="form-part-subtitle">Wellness</label>
                    <label className="form-part-subsubtitle">Energy level in practice</label>
                </div>
                <input onChange={updateWellness2} value={wellness2ForForm} className="slider" type="range" id="fatigue" name="fatigue" min="1" max="5"></input>
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
                    <option value="strength">Strength</option>
					<option value="game">Game</option>
					<option value="agility/speed">Agility/Speed</option>
                </select> 
                    <label className="form-part-subtitle">Duration</label>
                    <select onChange={updateDuration3} className="form-part-select">
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
                    <label className="form-part-subsubtitle">Energy level in practice</label>
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

		<label onClick={()=>setFront(!front)} className="did-label">Report an injury</label>
		<div><input className="training-yes" onChange={()=>{setInjuryExist(!injuryExist);setInjuryName(" ");setSeverity(" ")}} checked={injuryExist} type="checkbox"></input><label className="did-label"> </label></div>
        {injuryExist?<div className="front-back-fields">
		<button onClick={changeSide} style={front?{background:"#676767",color:"white"}:{}} id="front" className="but-select front-but">Front</button>
			<button onClick={changeSide} style={!front?{background:"#676767",color:"white"}:{}} id="back" className="but-select back-but">Back</button>
		</div>:""}
        {injuryExist?<svg version="1.1" id="Layer_1" x="0px" y="0px"
	 viewBox="0 0 693 666" className={!front?"svg-front":"svg-back"} >
<g className={front?"show":"hide"}>
	<path  class="st0" d="M167.2,122.7c7.4-8.1,6.3-15.1,5.1-22.3c-0.7-4.2-1.4-8.5-0.4-13.1c-1.7,0.6-3.2,0.9-4.5,0.9h-0.5
		c-1.2,0-2.7-0.3-4.5-0.9c0.9,4.6,0.3,8.9-0.4,13.1C161,107.5,159.8,114.6,167.2,122.7z"/>
	<path class="st0" d="M159.2,85.8c0,0.8-0.1,1.9-0.1,3.1c-0.1,3.8-0.1,9-0.8,13.1c0.5,2,0.9,4,1.4,5.8c0.1-2.6,0.5-5.1,0.9-7.6
		c0.7-4.4,1.4-8.8,0.2-13.5C160.3,86.4,159.7,86.1,159.2,85.8z"/>
	<path class="st0" d="M174.6,107.8c0.5-1.8,1-3.8,1.4-5.8c-0.6-4.1-0.7-9.3-0.7-13.1c0-1.2,0-2.3-0.1-3.1c-0.6,0.3-1.1,0.5-1.6,0.8
		c-1.2,4.7-0.5,9.1,0.2,13.5C174.2,102.7,174.6,105.2,174.6,107.8z"/>
	<path class="st0" d="M178.4,89.3c0.4-2.4,0.8-4.5,1.1-6.1c-0.9,0.6-1.9,1.2-2.8,1.8c0,0.9,0.1,2.3,0.1,3.9c0,2.4,0.1,5.3,0.3,8.1
		C177.6,94.3,178,91.7,178.4,89.3z"/>
	<path class="st0" d="M157.6,88.9c0-1.6,0-2.9,0.1-3.9c-0.9-0.5-1.9-1.1-2.8-1.8c0.3,1.6,0.7,3.7,1.1,6.1c0.4,2.3,0.9,5,1.4,7.7
		C157.5,94.2,157.6,91.3,157.6,88.9z"/>
	<path class="st0" d="M187.2,109.2c0-0.1,0-0.1,0-0.2c-0.1-4.8-0.6-10.6-0.9-13.5c-0.1-0.6-0.1-1.1-0.1-1.5
		c-0.1-0.2-0.2-0.5-0.3-0.7c0,0.1,0,0.1,0,0.2c-0.4,1.3-0.9,2.8-1.5,4.6l-0.1,0.8c-0.6,3.2-2.1,11.8-4.2,18.6
		c2.5-0.2,4.7-0.5,6.9-0.9C187.3,115.3,187.3,112.5,187.2,109.2z"/>
	<path class="st0" d="M181.3,106.2c-1.6,3.8-3.4,7.7-5.6,11.5c0.9,0,1.9-0.1,2.7-0.2C179.6,113.9,180.5,109.8,181.3,106.2z"/>
	<path class="st0" d="M158.7,117.6c-2.2-3.8-4.1-7.7-5.6-11.5c0.7,3.6,1.7,7.8,2.9,11.3C156.9,117.5,157.8,117.6,158.7,117.6z"/>
	<path class="st0" d="M150.1,98c-0.6-1.7-1.1-3.3-1.5-4.6c0-0.1,0-0.1-0.1-0.2c-0.1,0.3-0.2,0.5-0.3,0.7c0,0.4-0.1,0.9-0.1,1.5
		c-0.2,2.9-0.7,8.7-0.9,13.5c0,0.1,0,0.1,0,0.2c-0.1,3.2,0,6,0.3,7.2c2.1,0.3,4.4,0.6,6.9,0.9c-2.1-6.7-3.6-15.3-4.2-18.6L150.1,98z
		"/>
	<path class="st0" d="M145.9,104.3c-0.5,0.5-0.9,0.9-1.4,1.5c-0.6,0.7-1.1,1.5-1.8,2.7c-0.1,0.1-0.1,0.3-0.3,0.4
		c-0.3,0.5-0.5,1-0.9,1.5c-0.2,0.4-0.9,1.9-1.4,3.2c-0.2,0.5-0.4,1-0.5,1.3c0.1,0,0.1,0,0.2,0c1-0.4,2-1.2,2.8-2.1
		c1.3-1.3,2.3-2.9,2.9-4C145.8,107.4,145.8,105.8,145.9,104.3z"/>
	<path class="st0" d="M146.4,96.8c0,0.1-0.1,0.1-0.1,0.2c-0.6,1.1-1.7,3.6-2.6,6.3c-0.2,0.6-0.3,1.2-0.5,1.8
		c0.1-0.1,0.1-0.1,0.1-0.2c0.9-1.1,1.7-1.8,2.7-2.7C146.2,100.1,146.3,98.3,146.4,96.8z"/>
	<path class="st0" d="M145.7,111.8c-0.5,0.7-1.1,1.5-1.8,2.2c-0.5,0.5-1.1,1.1-1.8,1.5c1.2,0.3,2.5,0.5,3.8,0.7
		C145.7,115.1,145.7,113.6,145.7,111.8z"/>
	<path class="st0" d="M138.4,114.5c0.1-0.4,0.3-0.9,0.5-1.5c0.5-1.4,1.2-2.9,1.4-3.4c0.3-0.6,0.7-1.2,1-1.7c0-1.5,0.5-3.4,1-5.2
		c0.3-1.1,0.7-2.1,1.1-3.1c-3.2,2.5-7.7,5-13.6,8.2c-1.3,0.7-2.7,1.5-4.2,2.3l0.1,0.1C128.9,111.5,133,113.1,138.4,114.5z"/>
	<path class="st0" d="M192.1,102.8c0.6,1.8,1,3.6,1,5.2c0.3,0.5,0.6,1.1,1,1.7c0.2,0.4,0.9,2,1.4,3.4c0.2,0.5,0.4,1.1,0.5,1.5
		c5.4-1.4,9.5-3.1,12.6-4.3l0.1-0.1c-1.5-0.8-2.9-1.5-4.2-2.3c-5.9-3.2-10.4-5.6-13.6-8.2C191.4,100.7,191.8,101.7,192.1,102.8z"/>
	<path class="st0" d="M191,104.8c0.1,0.1,0.1,0.1,0.2,0.2c-0.1-0.6-0.3-1.2-0.5-1.8c-0.9-2.7-2-5.2-2.6-6.3
		c-0.1-0.1-0.1-0.1-0.2-0.2c0.1,1.5,0.3,3.4,0.4,5.4C189.4,103,190.2,103.8,191,104.8z"/>
	<path class="st0" d="M194.6,114.9c-0.1-0.4-0.3-0.9-0.5-1.3c-0.5-1.3-1.2-2.8-1.4-3.2c-0.3-0.6-0.6-1.1-0.9-1.5
		c-0.1-0.1-0.2-0.3-0.2-0.4c-0.7-1.1-1.2-1.9-1.8-2.7c-0.5-0.5-0.9-1-1.4-1.5c0.1,1.5,0.2,3.1,0.2,4.6c0.6,1.1,1.6,2.7,2.9,4
		c0.9,0.9,1.8,1.7,2.8,2.1C194.5,115,194.5,114.9,194.6,114.9z"/>
	<path class="st0" d="M188.7,111.8c0,1.8-0.1,3.3-0.3,4.4c1.3-0.2,2.6-0.5,3.8-0.7c-0.6-0.5-1.2-1-1.8-1.5
		C189.9,113.3,189.2,112.5,188.7,111.8z"/>
	<path class="st0" d="M164.2,137.4c-0.3-4.7-0.8-9.1-3.2-12.1c-2.4-2.9-6.8-4.4-15-3.4c-5,0.6-10.5,1.3-15.7,2.3
		c-5.2,0.9-10,2.1-13.5,3.6c-3.8,1.6-5.4,5.2-5.8,9.6c5,6.7,17.1,13.7,29.5,20.8c8.6,5,17.3,10,24.1,15.2c0.1-1.1,0.2-2.3,0.2-3.6
		c0-2.1,0-4.7,0-7.6C164.9,154.9,164.9,145.8,164.2,137.4z"/>
	<path class={(injuryNames.some(e => e.name === 'Right Anterior Shoulder'))?"st2":"st0"} onClick={()=>{handleInjuryName("Right Anterior Shoulder"); }} d="M91.6,162.2c0.2-0.1,0.3-0.3,0.5-0.4c7.4-5.9,15.2-12.1,17.4-22c-0.1-6,1.6-11.3,6.8-13.4
		c3.6-1.5,8.5-2.7,13.8-3.7c2.2-0.4,4.3-0.7,6.5-1.1c-3.5-1-7-2.4-10.5-4.1c-4.7-2.2-9.2-4.7-12.9-6.9c-1.7,0.1-3.3,0.4-4.8,0.7
		c-8.1,1.9-14.6,6.3-19.3,12.5c-1.4,1.9-2.7,4-3.8,6.2c-3.3,9.9-0.1,16.2,2.8,22C89.7,155.5,91.3,158.6,91.6,162.2z"/>
	<path class="st0" d="M118,166.6c1.8,3.7,4,6.9,6.7,9.4c3.3,3,7.3,5,12.2,5.5c9.2,0.8,16.4,1.4,21.2-0.1c1.2-0.3,2.2-0.9,3.1-1.5
		c-2.9-3.1-6.6-6.6-10.3-9.9c-7.1-6.3-14.3-12-16.4-13.7c-0.1,0-0.1-0.1-0.1-0.1c-9.7-5.6-18.5-11.2-23.3-16.6
		c0,1.2,0.1,2.3,0.2,3.6c0.7,7.1,3.3,14.7,5,19.1C116.7,163.8,117.3,165.3,118,166.6L118,166.6z"/>
	<path class="st0" d="M142.6,161.2c2.8,2.3,6,5,9.2,7.8c3.7,3.3,7.5,6.8,10.5,10c0.9-1,1.6-2.3,2-4
		C158.3,170.4,150.5,165.7,142.6,161.2z"/>
	<path class={(injuryNames.some(e => e.name === 'Right Anterior Shoulder'))?"st2":"st0"} onClick={()=>{handleInjuryName("Right Anterior Shoulder");}} d="M90.2,163.3c-0.1-3.7-1.7-6.9-3.4-10.4c-2.2-4.5-4.6-9.3-4.3-15.7c-1,3.1-1.8,6.5-2.2,10
		c-1,7.8-0.7,16.2,1,24.6C83.7,168.7,86.8,166,90.2,163.3z"/>
	<path class="st0" d="M76.3,225.1c1.8-0.3,3.2-0.8,4.4-1.5c1.2-0.7,2.1-1.7,2.7-2.9c-0.7-3.8-1-7.6-0.9-11.3
		c0.1-5.2,0.7-10.5,1.6-15.7c0.3-1.6,3.1-8.9,6.2-16.7c2.7-6.7,5.6-13.7,7.4-17.8c-1.5,1.3-3.1,2.5-4.6,3.8c-0.5,0.4-1,0.8-1.5,1.2
		l-0.1,0.1c-3.8,3.1-7.4,6.1-9.9,9.6c-1.1,5.1-2.2,8.7-3.3,12c-1.8,6-3.4,11.1-4.1,21.8C76.9,212.7,77.3,218.8,76.3,225.1z"/>
	<path class="st0" d="M96.8,216.5c-0.7,0.6-1.4,1.1-2,1.5c-1.2,0.9-2.3,1.6-2.9,1.9c-0.1,0.1-0.2,0.1-0.4,0.1
		c-0.4,0-0.7-0.3-0.7-0.7c0-2.3,0.4-5.1,1.5-8.2c0.9-2.5,2.2-5.1,4.3-7.9c2.3-3.2,4.4-8.2,6.2-13.7l0,0c2.4-7.6,4.2-15.9,5-21.1
		c0-7.3,0.7-15,2.3-23.1c-0.1-0.5-0.1-0.9-0.2-1.4c-2,5.1-5.4,9.2-9.3,12.8c-0.9,1.6-5,11.5-8.8,20.8c-3.1,7.7-5.8,14.9-6.1,16.4
		c-0.9,5.1-1.6,10.2-1.6,15.4c-0.1,5.1,0.5,10.2,1.8,15.3v0.1c0.3,1.3,1.8,5,3.5,8.4c0.1,0.2,0.2,0.4,0.3,0.6l0,0
		c1.2,2.4,2.5,4.5,3.2,5c1.6-5.3,2.4-10.5,2-16c0-0.1,0-0.2,0-0.3C95.4,220.3,96.1,218.4,96.8,216.5z"/>
	<path class="st0" d="M114.8,162.9c-1.2-3.3-2.9-8.2-4.1-13.5c-1.1,6.6-1.6,12.9-1.6,19c0,0.1,0,0.1,0,0.1c0,4.4,0.2,8.5,0.6,12.5
		c0.2,1.5,0.3,2.9,0.5,4.4v0.1c1.1,7.7,2.8,14.5,4.6,20.2c-0.1-1-0.1-2.1-0.2-3.2v-0.1c-0.2-3.7-0.2-7.8-0.1-11.9
		c0-1.5,0.1-3,0.1-4.5c0-0.4,0-0.8,0-1.2c0-0.1,0-0.1,0-0.2c0.2-4.3,0.6-8.6,1-12.5V172c0-0.1,0-0.1,0-0.2c0.2-1.6,0.4-3.2,0.7-4.7
		C115.9,165.7,115.3,164.4,114.8,162.9z"/>
	<path class="st0" d="M108.3,181.2c-0.2-1.8-0.3-3.6-0.5-5.5c-0.9,4.4-2.2,9.5-3.7,14.3v0.1c-1.8,5.6-4,10.8-6.4,14.1
		c-1.9,2.6-3.2,5.2-4.1,7.5c-0.8,2.3-1.2,4.5-1.3,6.3c0.5-0.3,1-0.7,1.6-1.1c1.2-0.9,2.6-2,4-3.2c1.7-4.3,3.4-7.8,4.9-10.9
		c2.8-5.7,5-10.4,6-17.2C108.6,184.1,108.4,182.7,108.3,181.2z"/>
	<path class="st0" d="M116.7,178.9c-0.2,2.3-0.3,4.6-0.4,7c0.1,2.4,1.5,5.4,3.5,8.1c0.5,0.7,0.9,1.3,1.5,1.9
		c1.3-0.5,3.2-1.5,5.1-2.8c2.1-1.4,4.3-3,5.6-4.2l-0.6-0.2C124.5,186.8,118.8,185.1,116.7,178.9z"/>
	<path class="st0" d="M135.1,195.1c-0.1-2.3-0.6-4.4-1.8-5.4c-1.4,1.3-3.8,3.1-6.2,4.7c-1.8,1.1-3.5,2.2-4.9,2.7
		c1.2,1.3,2.4,2.3,3.6,3.2l0.1,0.1c0.7,0.5,1.5,0.9,2.2,1.1c0.2,0.1,1.6,0.7,3,1.4c1,0.5,2.1,1,2.8,1.3c0.1-0.2,0.2-0.5,0.3-0.7
		C134.7,201.3,135.2,198,135.1,195.1z"/>
	<path class="st0" d="M121.8,202.2c0.7-0.6,1.4-1.1,2.1-1.5c-1.2-0.9-2.4-2.1-3.5-3.4c-0.1,0-0.1-0.1-0.1-0.1
		c-0.6-0.7-1.2-1.5-1.8-2.3c-0.9-1.3-1.8-2.7-2.4-4.1c-0.1,4,0,7.8,0.1,11.4c0.4,1,1.1,2.2,2,3.5
		C119.1,204.7,120.5,203.3,121.8,202.2z"/>
	<path class="st0" d="M130.5,204.3c-1.4-0.6-2.7-1.2-2.9-1.3c-0.7-0.3-1.5-0.7-2.3-1.2c-0.7,0.2-1.6,0.8-2.6,1.6
		c-1.4,1.1-2.7,2.5-3.5,3.6c1.5,1.9,3.5,3.9,5.5,5.8c3.3,2.9,6.8,5.3,9.2,5.8c0.5-1.3,1.1-3.8,1.1-6.6c0-2.1-0.4-4.2-1.3-6
		C133.3,205.6,131.8,204.9,130.5,204.3z"/>
	<path class="st0" d="M116.4,205.7c0.2,2.3,0.4,4.4,0.7,6.1c0.3,0.7,0.5,1.4,0.8,2c0.3-0.4,0.7-0.7,1.2-1l0,0
		c0.7-0.4,1.6-0.6,2.7-0.7c-1.6-1.5-3-3.1-4.2-4.6l-0.1-0.1C117.2,206.8,116.8,206.2,116.4,205.7z"/>
	<path class="st0" d="M133.9,220c-2.7-0.4-6.6-2.9-10.2-6.2l-0.1-0.1c0,0,0,0-0.1,0c-1.7-0.3-2.9-0.1-3.7,0.4h-0.1
		c-0.6,0.4-1,0.9-1.2,1.6c0,1.5,0,3.1,0,4.8c0.9,2.8,3,5.4,5.5,7.6c3.2,2.9,7,5.1,9.9,6.3c0.8-1.8,1.2-4.6,1.2-7.4
		S134.8,221.5,133.9,220z"/>
	<path class="st0" d="M133.8,236c-3-1.3-7.2-3.7-10.6-6.8c-1.8-1.6-3.4-3.4-4.6-5.4c-0.1,4.2-0.3,8.7-0.6,13.6
		c0.7,1.1,3.1,3.5,5.9,6c3.1,2.8,6.6,5.8,8.5,7.2c1.2-1.1,2-3.2,2.3-5.6C135,242.1,134.7,238.7,133.8,236z"/>
	<path class="st0" d="M132.7,288.4c1.1-0.8,2-1.9,2.4-3.3c0.4-1.2,0.6-2.3,0.8-3.4c0.1-1.1,0.2-2.3,0.1-3.4
		c-0.1-3.2-0.2-8.8-0.9-14.1c-0.6-5.2-1.6-10-3.2-12.1c-1.8-1.3-5.7-4.5-9-7.5c-2-1.8-3.8-3.6-5-4.9c-0.6,8.8-1.4,18.4-2.5,28.2
		c-0.2,2-0.5,4.1-0.7,6.1c0.9,2.1,2.5,3.1,4.3,4.3c2.4,1.6,5,3.3,6.5,7.6c0.2,0.4,0.3,0.8,0.5,1.1l0,0c0.4,0.7,0.8,1.2,1.2,1.5l0,0
		c0.1,0.1,0.1,0.1,0.2,0.1c0.7,0.5,1.6,0.7,2.5,0.7C130.9,289.3,131.8,289,132.7,288.4z"/>
	<path class={(injuryNames.some(e => e.name === 'Right Hip'))?"st2":"st0"} onClick={()=>{handleInjuryName("Right Hip"); }} d="M118.2,279.5c-1.4-0.9-2.7-1.8-3.7-3.1c-0.1,1.2-0.3,2.5-0.4,3.8c1.4-0.4,2.5,0.1,3.3,1
		c0.9,0.9,1.4,2.4,1.8,4.1c2.8,0.1,3.1,0.2,4.8,0.8C122.7,282.5,120.4,280.9,118.2,279.5z"/>
	<path  class={(injuryNames.some(e => e.name === 'Right Forearm'))?"st2":"st0"} onClick={()=>{handleInjuryName("Right Forearm"); }} d="M84.3,225c-0.2-0.7-0.4-1.4-0.5-2.1c-0.6,0.8-1.4,1.5-2.4,2.1c-1.4,0.9-3.3,1.4-5.4,1.7
		c-0.3,1.7-0.7,3.3-1.2,5c0,0.1-0.1,0.2-0.1,0.4c1.6-0.7,3.6-1.9,5.5-3.1c1.8-1.2,3.5-2.4,4.2-3.4c-0.1-0.1-0.1-0.3-0.1-0.4
		S84.3,225.1,84.3,225z"/>
	<path  class={(injuryNames.some(e => e.name === 'Right Forearm'))?"st2":"st0"} onClick={()=>{handleInjuryName("Right Forearm"); }} d="M70.9,261.8c0.5-0.8,1-1.6,1.6-2.3l0.5-0.7c1-1.4,2.4-3.1,3.5-5.4v-0.1c0.8-1.6,1.6-3.4,2.4-5.2
		c2.2-5.1,4.6-10.6,9.1-14.4c0,0,0-0.1-0.1-0.1c-1.1-2.3-2.2-4.8-2.9-6.6c-1,0.9-2.4,2-4,3.1c-2.4,1.6-5.2,3.1-6.9,3.7
		c-2.4,7.8-6,15.3-8.6,20.8c-0.7,1.4-1.3,2.8-1.9,4.2c0.2,5.4-1.2,12.5-3.3,19.6c-2.7,9-6.6,18.3-9.9,24.9c1.1,0.2,2.2,0.5,3.3,0.9
		c1.1-6.2,3.9-14.8,7.3-23.1C64.1,274,67.6,266.9,70.9,261.8C70.9,261.9,70.9,261.9,70.9,261.8z"/>
	<path  class={(injuryNames.some(e => e.name === 'Right Forearm'))?"st2":"st0"} onClick={()=>{handleInjuryName("Right Forearm"); }} d="M88.7,235.3c-4,3.6-6.3,8.8-8.4,13.6c-0.8,1.8-1.6,3.6-2.4,5.3v0.1c-1.2,2.3-2.6,4.2-3.7,5.6l-0.5,0.7
		c-0.5,0.6-1,1.3-1.4,2c-0.3,3.1-2.4,9.8-5.4,17.7c-3.1,8-7,17.1-10.9,25c1.2,0.5,2.4,1.1,3.5,1.8c1.8-10.1,5.2-18.9,8.8-26.3
		c6.5-12.9,14.2-21.2,16.7-23.6c3-5.9,5.7-11.6,7.5-17.2C91.2,239.4,89.9,237.5,88.7,235.3z"/>
	<path  class={(injuryNames.some(e => e.name === 'Right Forearm'))?"st2":"st0"} onClick={()=>{handleInjuryName("Right Forearm"); }} d="M56.1,276.6c2.3-7.6,4.6-15.1,8.1-22.5c2.9-6,6.9-14.3,9.2-22.8c0.5-1.8,0.9-3.6,1.2-5.4v-0.1
		c1.1-6.1,1-11.9-1.4-16.7c-10.1,10.9-14.4,24.2-17.5,39c-0.4,3.3-0.4,6.8-0.4,10.4c0,9.4,0.1,19.6-7.3,29.3
		c-1.2,5.1-2.7,10.2-4.6,15.3c0.7-0.1,1.6-0.2,2.5-0.2C50.7,294.3,53.4,285.4,56.1,276.6z"/>
	<path  class={(injuryNames.some(e => e.name === 'Right Forearm'))?"st2":"st0"} onClick={()=>{handleInjuryName("Right Forearm"); }} d="M53.9,258.6c0-0.1,0-0.2,0-0.3c-0.3,1.5-0.5,3-0.8,4.5c-1.2,6.8-2.4,13.7-4,20.9
		C54,275.3,53.9,266.6,53.9,258.6z"/>
	<path class={(injuryNames.some(e => e.name === 'Right Forearm'))?"st2":"st0"} onClick={()=>{handleInjuryName("Right Forearm"); }} d="M57.5,277c-2.6,8.7-5.3,17.4-9.9,26c0.4,0,0.9,0.1,1.3,0.1c3.3-6.6,7.3-15.9,10-25.1
		c1.6-5.4,2.8-10.6,3.2-15.1C60.4,267.7,58.9,272.4,57.5,277z"/>
	<path  class={(injuryNames.some(e => e.name === 'Right Forearm'))?"st2":"st0"} onClick={()=>{handleInjuryName("Right Forearm"); }} d="M65.4,279.7c2-5.3,3.7-10.1,4.6-13.5c-2.6,4.5-5.2,10-7.5,15.7c-2.9,7.1-5.4,14.5-6.7,20.2
		C59.2,294.9,62.7,286.8,65.4,279.7z"/>
	<path  class={(injuryNames.some(e => e.name === 'Right Forearm'))?"st2":"st0"} onClick={()=>{handleInjuryName("Right Forearm"); }} d="M60.7,308c1.1,0.8,2,1.7,2.6,2.7c3.9-19.5,11.7-34.4,18.5-47.6c0.2-0.3,0.3-0.5,0.5-0.8
		c-3.4,4-8.3,10.6-12.7,19.3C65.9,288.9,62.5,297.8,60.7,308z"/>
	<path class="st0" d="M59.6,309c-0.1,0-0.1-0.1-0.1-0.1c-1.4-1-3.1-1.8-4.8-2.5l0,0c0,0,0,0-0.1,0c-0.2-0.1-0.3-0.1-0.5-0.2
		c-1.6-0.6-3.2-1-4.8-1.3h-0.1c-0.9-0.2-1.8-0.3-2.7-0.3c-0.1,0-0.1,0-0.1,0c-1-0.1-2,0-2.7,0.2c-0.3,0.1-0.5,0.1-0.7,0.2
		c-0.1,0.3-0.2,0.6-0.3,0.9c-1.8,4.7-3.3,6.7-4.9,7.8c0.8,0.1,1.6,0.4,2.3,0.7c1.9,0.8,3.3,2.2,3.8,4l0,0c0,0.1,0.1,0.3,0.1,0.5l0,0
		c0.1,0.9,0.1,1.8-0.1,2.8c0.6,0,1.4,0.1,2.1,0c1.1-0.1,2.2-0.4,3.1-1c0.3-0.2,0.8-0.2,1,0.2l0,0c0.1,0.2,0.4,0.7,0.7,1.4
		c0.9,1.9,2.6,5.2,4,7.3c0.1-1,0.2-2,0.4-2.9c1-5,3.7-8.9,7.4-11.3c0-0.3,0.1-0.6,0.1-0.9l0,0c0.1-0.3,0.1-0.7,0.2-1
		c-0.1-0.3-0.2-0.6-0.3-1C61.9,311.1,60.9,309.9,59.6,309z"/>
	<path class="st0" d="M56.6,326.7c-0.3,1.4-0.4,2.9-0.4,4.6c0,0.1,0,0.2,0,0.3c0.1,2.4,0.6,5.1,1.6,7.8c1.7-6.1,2.8-13,3.8-18.9
		c0.2-1.1,0.4-2.3,0.6-3.3C59.4,319.5,57.4,322.7,56.6,326.7z"/>
	<path class="st0" d="M51.5,326.9c-0.1,0.8-0.2,1.6-0.3,2.3v0.1c-0.1,0.6-0.2,1.2-0.4,1.8c-0.2,1.2-0.2,2.6-0.1,4.1
		c0.1,1.5,0.5,3.1,1.2,4.4c0.7,1.2,1.6,2.1,2.9,2.5c0.6,0.2,1.3,0.3,2,0.3c0.1-0.2,0.1-0.5,0.2-0.7c-1.5-3.6-2.3-6.9-2.4-10
		C53.7,330.8,52.6,328.9,51.5,326.9z"/>
	<path class="st0" d="M44.1,334.7c-0.2,2.1-0.1,4.3,0.7,6c0.2-0.2,0.5-0.5,0.9-1.1c0.6-0.8,1.2-2,1.9-3.5s1.3-3.4,1.8-5.3
		c0.1-0.7,0.2-1.3,0.4-1.9c0.3-1.7,0.4-3.4,0.3-5c-0.3-0.5-0.5-0.9-0.7-1.3l-0.3-0.6c-0.3,0.1-0.5,0.3-0.8,0.3
		c-0.3,0.5-0.7,1.2-1.1,2.2c-0.5,1.1-1.2,2.4-1.9,3.8C44.9,330,44.3,332.3,44.1,334.7z"/>
	<path class="st0" d="M43.3,323c-0.8,2.3-2.5,4.7-4.5,6.9c-2.3,2.4-5,4.6-7.7,6.5c7.9,1.9,12.4-7.4,14.7-12.3
		c0.2-0.4,0.4-0.8,0.5-1.1c-0.1,0-0.2,0-0.3,0.1C45,323.1,44.1,323,43.3,323z"/>
	<path class="st0" d="M25.8,326.3c0.9,1.3,1.4,3,1.4,5c0,0.5-0.1,1.1-0.2,1.7c0,0.1,0,0.1,0,0.1l0,0c-0.3,0.8-0.9,2.1-1.6,3.9
		c-0.2,0.4-0.3,0.8-0.5,1.2c1.2-0.6,2.6-1.4,4.1-2.3c0,0,0.1,0,0.1-0.1c3-1.9,6.2-4.4,8.7-7.1c2.1-2.2,3.7-4.6,4.4-6.8
		c0-0.1,0-0.1,0-0.1c0.3-1,0.4-2,0.3-3c0-0.1,0-0.2-0.1-0.3l0,0c-0.3-1.3-1.5-2.3-3-3c-1.6-0.7-3.5-1-5.3-0.7
		c-0.3,0-0.6,0.1-0.9,0.2c-1.8,0.5-3.9,1.3-6.7,3.7c-1.1,0.9-2.5,2.7-4.1,5.1C23.7,324.2,25,325.1,25.8,326.3z"/>
	<path class="st0" d="M18.1,337c0.9,1.1,1.6,2.5,2,3.7c1.7-1.9,3.5-4.5,5.4-8.1c0.1-0.5,0.1-0.9,0.2-1.3c0.1-1.6-0.3-3-1.1-4.1
		c-0.7-1-1.7-1.7-2.9-2c-0.1,0-0.3-0.1-0.4-0.1c-1.9,2.9-4,6.3-5.9,9.5C16.4,335.1,17.4,336,18.1,337z"/>
	<path class="st0" d="M18.9,342c-0.2-1.1-1-2.7-1.9-4c-0.7-0.9-1.5-1.7-2.3-1.9c-0.9,1.5-1.7,2.9-2.5,4.2c-0.7,1.3-1.4,2.4-1.8,3.1
		c-0.1,0.1-0.1,0.3-0.1,0.4s0,0.3,0.1,0.4s0.1,0.3,0.3,0.3c0.1,0.1,0.3,0.1,0.4,0.1c2.1,0.4,4.2,0.1,6.5-1.6
		C18,342.8,18.4,342.4,18.9,342z"/>
	<path class="st0" d="M55.6,348.1c0.2-0.1,0.3-0.2,0.5-0.3c0-0.9,0-1.8,0-2.9c0-0.1,0-0.2,0.1-0.3c0.1-0.2,0.2-0.5,0.3-0.7
		c-0.7,0-1.3-0.1-1.9-0.3c-1.8-0.5-3-1.8-3.9-3.3c-0.7-1.3-1.1-2.9-1.3-4.4c-0.1,0.3-0.2,0.5-0.3,0.8c-0.7,1.5-1.4,2.8-2,3.7
		c-0.8,1.1-1.5,1.7-2.2,1.8c-0.2,0-0.4,0-0.6-0.1c-0.1-0.1-0.3-0.2-0.3-0.3c-1.1-2-1.3-4.7-1.1-7.3c0.1-0.8,0.2-1.6,0.3-2.4
		c-3,4.2-7.4,7.5-13.5,5.3c-1.8,1.1-3.5,2-5,2.7c1.4,2.5,4.1,4.6,7.3,6.2c0.1,0,0.1,0.1,0.1,0.1c2,1,4.1,1.8,6.4,2.4
		C44.4,350.4,51,350.4,55.6,348.1z"/>
	<path class="st0" d="M30.5,347.4c-2.9-1.6-5.4-3.6-6.9-5.9c-1.8,4.2-3.8,9.4-5.2,13.8c1.3,0.2,2.7,0.5,3.9,1.1c1,0.4,1.9,1,2.7,1.7
		c0.3-0.6,0.7-1.2,1-1.8c1.2-2.2,2.3-4.4,3.1-6.1C29.6,348.9,30.1,348,30.5,347.4z"/>
	<path class="st0" d="M17.9,356.7c-1.3,4.4-1.9,7.9-0.7,8.5c1.9,1.1,4.5-2,7-6c-0.7-0.7-1.5-1.2-2.4-1.6
		C20.5,357.2,19.1,356.8,17.9,356.7z"/>
	<path class="st0" d="M32,348.1c-0.5,2.4-0.9,4.5-1.4,6.6c-0.7,3.2-1.3,6.4-2,9.7c1.6,0.1,4.1,0.4,6.4,1.7l3.2-15.8
		c-0.1,0-0.2,0-0.3-0.1C35.9,349.7,33.9,349,32,348.1z"/>
	<path class="st0" d="M27.6,369.4c-0.7,3-0.3,4.8,0.5,5.7c0.3,0.3,0.7,0.5,1.1,0.6s0.9,0,1.4-0.2c1.5-0.6,3-2.3,3.5-4.9l0.6-2.9
		c-2.2-1.4-4.9-1.6-6.4-1.7C28.1,367.1,27.9,368.2,27.6,369.4z"/>
	<path class="st0" d="M39.3,365c-0.1,0.6-0.1,1.2-0.1,1.8c0.9-0.1,2.2-0.1,3.4-0.1c1.1,0.1,2.3,0.3,3.1,0.5c0.4-3.2,0.8-6.6,1.2-10
		c0.2-1.6,0.4-3.2,0.7-5.8c-2.6,0.1-5.2-0.2-7.8-0.7C40,355.2,39.6,360.3,39.3,365z"/>
	<path class="st0" d="M39,368.3c-0.1,1.2-0.1,2.3-0.2,3.3c-0.1,2.4,0.5,4,1.4,4.8c0.3,0.3,0.7,0.4,1.1,0.5c0.4,0,0.8-0.1,1.2-0.4
		c1.2-0.7,2.3-2.7,2.7-5.9c0.1-0.6,0.1-1.2,0.2-1.8c-0.7-0.3-1.9-0.4-3.1-0.5C41.1,368.1,39.7,368.1,39,368.3z"/>
	<path class="st0" d="M56.6,361.6c-0.1-2.1-0.2-3.8-0.3-5.4c-0.1-2.1-0.2-4.1-0.3-6.7c-2,0.9-4.3,1.5-6.7,1.7l1.8,11.1
		c0.7-0.2,1.5-0.4,2.4-0.6C54.5,361.6,55.5,361.5,56.6,361.6z"/>
	<path class="st0" d="M53.8,363.3c-0.9,0.1-1.7,0.4-2.4,0.6l0.3,1.9c0.2,1.1,0.9,1.9,1.7,2.3c0.4,0.1,0.7,0.2,1.1,0.2
		c0.4,0,0.7-0.1,1-0.4c0.7-0.5,1.2-1.6,1.2-3.3c0-0.5,0-0.9,0-1.3C55.7,363.1,54.7,363.1,53.8,363.3z"/>
	<path class="st0" d="M104.5,346.2c2-7.3,4.9-16.1,7.1-22.3v-0.1c0.3-1,0.7-1.9,0.9-2.7c0.8-2.3,1.4-3.9,1.6-4.6
		c0.3-1.2,0.6-2.2,0.9-3.1c2.8-9.3,5-16.7,2.9-27.2l0,0c-0.3-1.7-0.8-3.1-1.6-3.9c-0.6-0.6-1.4-0.8-2.5-0.4
		c-2.3,19.2-5.1,37.3-7.4,48.6C105.5,335,104.9,340.3,104.5,346.2z"/>
	<path class={(injuryNames.some(e => e.name === 'Right Thigh'))?"st2":"st0"} onClick={()=>{handleInjuryName("Right Thigh"); }} d="M138.4,340.5c-1-2.7-2-5.5-3.3-9c-0.3-0.7-0.5-1.5-0.8-2.2c0,0,0,0,0-0.1c-1.1-3.2-2-6.5-2.9-9.8v-0.1
		c-0.8-2.9-1.5-5.8-2.2-8.6c-0.6-2.4-1.2-4.8-1.8-7c-0.7-2.5-1.5-5.1-2.2-7.5c-1-3.3-2-6.3-2.6-9.2c-0.7-0.2-1.3-0.3-2.9-0.3
		c0.4,1.9,0.6,3.8,0.7,5.6c1.8,7.1,3,14.2,4.3,21.2c0.3,1.3,0.5,2.7,0.7,4.1c0,0,0,0,0,0.1c1.4,7.5,2.9,15,5,22.7
		c2.3,8.2,5.1,16.4,8,24.6c0.6,1.7,1.2,3.4,1.7,5.1v0.1c4.3,12.5,8.4,25.2,10.6,38.2c0.8,4.7,1.3,8.8,1.6,13
		c0.1,1.9,0.2,3.9,0.3,5.9c0.2-1.1,0.4-2.2,0.7-3.3c0.2-1,0.4-2.1,0.6-3.1c0-0.1,0-0.1,0-0.2C155.7,387.8,148.7,368.5,138.4,340.5z"
		/>
	<path class={(injuryNames.some(e => e.name === 'Right Hip'))?"st2":"st0"} onClick={()=>{handleInjuryName("Right Hip"); }} d="M128.6,303.4c0.6,2.3,1.2,4.6,1.8,7c0.3,1.3,0.7,2.7,1,4c0.1-2.6,0.1-5.4,0.1-8.2c-0.1-3.6-0.4-7.2-0.9-10.2
		c-1.4-1.9-2.9-3.9-4.4-6.3c-0.5-0.4-1-1-1.4-1.7c-0.3-0.1-0.6-0.2-0.9-0.3c0.6,2.5,1.4,5.3,2.4,8.2
		C127.1,298.2,127.9,300.7,128.6,303.4z"/>
	<path class={(injuryNames.some(e => e.name === 'Right Thigh'))?"st2":"st0"} onClick={()=>{handleInjuryName("Right Thigh"); }} d="M115,435.1c-0.6,2.9-1,6.9-1.3,11.1c10.8-5,6-20.9,2.1-34.1c-0.6-2-1.2-3.9-1.7-5.9c-7.8-28.2-5.8-45-3.9-60.4
		c0.7-5.9,1.4-11.5,1.4-17.4c-2.9,8.7-6.6,20.1-7.5,26.3c-0.2,8.9,0.1,18.5,0.9,28.1c1.6,19.4,5,38.7,9.9,51.8
		C115,434.7,115,434.9,115,435.1z"/>
	<path class={(injuryNames.some(e => e.name === 'Right Thigh'))?"st2":"st0"} onClick={()=>{handleInjuryName("Right Thigh"); }} d="M131.2,412.1c0.6,4.2,1.1,8.5,1.8,12.9c0.5-4.2,1.3-8.5,2.1-12.5v-0.3c1.8-9.1,2.1-18.2,2.5-26.9
		c0.2-5.1,0.4-10.1,0.9-15c-0.6-1.7-1.1-3.3-1.7-5c-2.8-8.3-5.7-16.5-8-24.7c-1.7-6.1-3-12.2-4.2-18.2c-1.3,10.5-2.1,19.4-2,28.3
		c0.1,10.3,1.4,20.9,4.4,34.6C128.9,394.2,130,403,131.2,412.1z"/>
	<path class={(injuryNames.some(e => e.name === 'Right Hip'))?"st2":"st0"} onClick={()=>{handleInjuryName("Right Hip"); }} d="M137.5,304c-1.6-1.7-3.3-3.6-5-5.7c0.3,2.5,0.5,5.2,0.5,7.8c0.1,4.8,0,9.5-0.3,13c0.7,2.6,1.5,5.3,2.3,7.9
		c1.2-2.4,2.2-5.1,3-8.1c0.9-3.7,1.4-8,1-13C138.6,305.2,138.1,304.6,137.5,304z"/>
	<path class={(injuryNames.some(e => e.name === 'Right Groi'))?"st2":"st0"} onClick={()=>{handleInjuryName("Right Groi"); }} d="M135.8,329c0.2,0.6,0.5,1.3,0.7,1.9c0.8,2.1,1.6,4.5,2.6,7c2.4-4.3,4-8.6,5.1-12.5c1.2-4.1,1.7-7.8,2-10.2
		c-0.3-0.4-0.5-0.9-0.8-1.3c-1.4-2.3-2.9-4.2-4.5-6.2c0.2,4.4-0.3,8.2-1.2,11.6C138.6,323,137.2,326.2,135.8,329z"/>
	<path class={(injuryNames.some(e => e.name === 'Right Groi'))?"st2":"st0"} onClick={()=>{handleInjuryName("Right Groi"); }} d="M139.8,340c5.4,14.7,9.9,27,12.7,40.1c6.1-15,2.9-27.5-0.5-40.5c-0.7-2.5-1.3-5-1.9-7.5
		c-0.2-0.9-0.7-3.8-1.3-6.7c-0.5-2.9-1-5.9-1.2-7.1c-0.1-0.3-0.2-0.5-0.3-0.7c-0.3,2.3-0.9,5.2-1.8,8.3c-1.2,4.3-3,9.2-5.9,13.9
		C139.7,339.8,139.7,339.9,139.8,340z"/>
	<path class={(injuryNames.some(e => e.name === 'Right Groi'))?"st2":"st0"} onClick={()=>{handleInjuryName("Right Groi"); }} d="M151.4,328c-0.4-1.1-0.8-2.2-1.2-3.4c0,0.1,0.1,0.3,0.1,0.5c0.5,2.9,1,5.7,1.3,6.6c0.6,2.5,1.2,5,1.8,7.4
		c1.9,7.3,3.7,14.5,3.9,22c0.7,3.6,0.7,12.6,0.1,20.8c-0.5,7.3-1.3,14-2.4,15.9c0.4,4.4,0.5,9,0.5,13.9c5-25.6,9.4-50.8,8-68.3
		C156,341.6,154,335.7,151.4,328z"/>
	<path class={(injuryNames.some(e => e.name === 'Right Groi'))?"st2":"st0"} onClick={()=>{handleInjuryName("Right Groi"); }} d="M156.4,372.4c-0.7,3.3-1.8,6.7-3.4,10.2c0.7,3.7,1.3,7.5,1.7,11.4c0.5-2.9,1-7.4,1.3-12.1
		C156.2,378.7,156.3,375.4,156.4,372.4z"/>
	<path class={(injuryNames.some(e => e.name === 'Right Thigh'))?"st2":"st0"} onClick={()=>{handleInjuryName("Right Thigh"); }} d="M149.1,408.6c-2-11.7-5.6-23.2-9.4-34.6c-0.3,3.7-0.4,7.6-0.6,11.5c-0.3,8.8-0.7,17.9-2.5,27.1l-0.1,0.3
		c-1.1,5.9-2.4,12.5-2.6,18.6v0.1c-0.1,5,0.5,9.7,2.7,13.5c0.2,0.4,0.5,0.7,0.9,0.9c0.7,0.4,1.6,0.5,2.7,0.3
		c1.1-0.2,2.4-0.8,3.6-1.5c0.6-0.3,1.2-0.7,1.7-1.1l0,0c1.9-1.4,3.6-3.1,4.6-4.6c0.3-1.4,0.6-2.9,0.9-4.5c0-4.7-0.1-8.8-0.4-12.9
		C150.4,417.3,149.9,413.2,149.1,408.6z"/>
	<path class={(injuryNames.some(e => e.name === 'Right Knee'))?"st2":"st0"} onClick={()=>{handleInjuryName("Right Knee"); }} d="M146.8,444.4c0,5-2.1,11.5-3.8,16.6c-1.4,4.4-2.5,7.8-2,8c0.1,0.1,0.1,0.1,0.2,0.1c0.9,0.2,2-0.5,3.1-1.7
		c1.2-1.3,2.4-3.3,3.4-5.6c0.5-1.3,1-2.8,1.3-4.3l0,0c0.1-0.2,0.1-0.4,0.1-0.6c0.7-4.5,1-9.6,1-15.5
		C149.1,442.5,147.9,443.5,146.8,444.4z"/>
	<path class={(injuryNames.some(e => e.name === 'Right Leg'))?"st2":"st0"} onClick={()=>{handleInjuryName("Right Leg"); }} d="M132.4,586.9c0-4.2-0.4-9.2-0.9-14.4c-0.5-5.6-1.2-11.4-2-16.9c-0.8-6-1.8-11.7-2.8-17.5
		c-0.9-5.2-1.8-10.3-2.5-15.6c-0.7-4.6-1.3-9.6-2-14.7c-2.4-18.7-4.8-37.8-9-44.9c0,0.3,0,0.6,0,0.9c0,0.7,0.1,1.4,0.1,2.1
		c0.1,2,0.1,3.8-0.1,6.2c-0.3,2.8-0.6,5.4-1,7.9c-0.1,1.8,0,4.4,0.1,7.4c0.2,3.8,0.5,8.1,0.8,12.2c0.9,10.9,2.4,21.3,4.5,31.6
		c0.2,1.1,0.5,2.1,0.7,3.2l0,0c0.5,2,0.9,4,1.4,6.1c0,0,0,0,0,0.1c1.8,7.2,3.9,14.3,6.3,21.5c0.9,2.7,2.6,8.5,3.6,14.7
		c0.6,3.6,0.9,7.4,0.7,10.7C131.1,587.1,131.8,587,132.4,586.9z"/>
	<path class="st0" d="M143.3,484.1c-2.1,2.5-3.9,5.5-5.4,9.2c-1.8,4.5-3,10.2-3.7,17.7c-0.3,3.2-0.2,7,0.1,10.9c0,0.3,0.1,0.7,0.1,1
		c0.5,4.2,2,8.7,4.4,11.8c1.8,2.4,4.1,4,6.8,4.1c4-14.5,1.9-25.3-0.1-35.7C144.3,496.8,143.1,490.8,143.3,484.1z"/>
	<path class="st0" d="M137.6,535.6c-0.9-1.2-1.7-2.5-2.3-4c0.1,0.8,0.2,1.6,0.3,2.4c0.2,1.9,0.4,3.7,0.6,5.5
		c0.1,0.3,0.2,0.5,0.3,0.8c0.9,2.8,3,9.5,3.9,17.4c1.4-6.4,3-11.8,3.9-14.6c0.3-1,0.7-2,1-2.9C142.1,540.1,139.6,538.3,137.6,535.6z
		"/>
	<path class="st0" d="M138.3,569.3c0.2-1.9,0.5-3.8,0.8-5.6c0-6.6-1.3-12.8-2.5-17.3c0.1,2.7,0.3,5.4,0.4,8.1
		c0.2,5.6,0.5,11.2,1,17.1C138.1,570.9,138.2,570.1,138.3,569.3z"/>
	<path class={(injuryNames.some(e => e.name === 'Right Leg'))?"st2":"st0"} onClick={()=>{handleInjuryName("Right Leg"); }} d="M114.3,548.3c2.1,10.3,4.2,20.6,5,31.6l0.1,0.9c0.2,2,0.4,4.6,0.5,7.2c0.1,0,0.2,0,0.3,0
		c2-8.6-1.3-36.8-2.6-48.4c-0.3-2.3-0.5-4-0.5-4.9c-0.3-1.1-0.5-2.2-0.7-3.3c-2.2-10.4-3.7-20.9-4.5-31.8c-0.3-3.8-0.6-7.9-0.8-11.5
		c-0.1,0.4-0.1,0.9-0.2,1.3c-0.3,1.4-0.5,2.7-0.7,4c0,7.9,0.9,15.7,1.7,23.5c1,9.1,2,18.2,1.6,27.4C113.7,545.6,114,547,114.3,548.3
		z"/>
	<path class={(injuryNames.some(e => e.name === 'Right Leg'))?"st2":"st0"} onClick={()=>{handleInjuryName("Right Leg"); }} d="M108.9,502.3c-0.1,2-0.2,4-0.2,6.1c0.3,10,1.6,19.2,3.3,28.2c-0.2-6.5-0.9-13-1.6-19.6
		C109.8,512.1,109.2,507.2,108.9,502.3z"/>
	<path class={(injuryNames.some(e => e.name === 'Right Leg'))?"st2":"st0"} onClick={()=>{handleInjuryName("Right Leg"); }} d="M125.8,587.9c0-9.3-2.9-23.6-5.1-34.7c-0.1-0.7-0.3-1.4-0.4-2.1c1.4,13.1,2.8,30.1,1.4,36.9
		C123.1,588.1,124.4,588,125.8,587.9z"/>
	<path class={(injuryNames.some(e => e.name === 'Right Leg'))?"st2":"st0"} onClick={()=>{handleInjuryName("Right Leg"); }} d="M128.9,587.5c0.3-3.3-0.1-7.1-0.7-10.8c-1-6.1-2.7-11.8-3.6-14.5c-0.6-1.8-1.2-3.6-1.7-5.3
		c2,10.3,4.3,22.4,4.3,30.8C127.8,587.7,128.4,587.6,128.9,587.5z"/>
	<path class={(injuryNames.some(e => e.name === 'Abs'))?"st2":"st0"} onClick={()=>{handleInjuryName("Abs"); }} d="M153.8,258.8c-4.4-0.2-9.1-0.5-13.4-1.1c-0.6,5.2,0.1,11.2,1.4,17.6c1.4,6.7,3.6,13.7,5.7,20.5
		c0.8,2.5,1.3,4.8,1.8,7.1c0.7,3.5,1.4,6.8,3,9.7c1,2,4.1,5.7,7.3,8.6c2,1.9,4,3.4,5.3,3.8l0.1-66.4
		C162.2,258.9,158.2,258.9,153.8,258.8z"/>
	<path class={(injuryNames.some(e => e.name === 'Abs'))?"st2":"st0"} onClick={()=>{handleInjuryName("Abs"); }} d="M164.2,233c-0.7-0.3-7.7,0.3-14,1.2c-5,0.7-9.4,1.5-9.9,2c0,0-0.1,0.1-0.1,0.2c-0.7,1.3-0.9,5.2-0.7,8.9
		c0.1,3.6,0.6,6.9,1.2,7.5c2.6,1,6.2,1.3,9.9,1.4c3.7,0.1,7.6-0.2,10.7-0.5c1.2-0.1,2.1-1,2.7-2.3c0.7-1.5,1-3.4,1.2-5.6
		c0.1-2.1,0.1-4.5-0.1-6.5C164.8,235.8,164.4,233.1,164.2,233z"/>
	<path class={(injuryNames.some(e => e.name === 'Abs'))?"st2":"st0"} onClick={()=>{handleInjuryName("Abs"); }} d="M141.7,211.6c6-4,16.1-10.9,23.4-12.9v-1.1c-0.1-4.3-0.3-10.8-2.8-16.4c-1,0.8-2.3,1.4-3.7,1.8
		c-4.3,1.3-10.4,1.1-18,0.4c-0.9,3.6-1.4,9.7-1.4,15.7c0,5.1,0.4,10.1,1.3,13.4L141.7,211.6z"/>
	<path class={(injuryNames.some(e => e.name === 'Abs'))?"st2":"st0"} onClick={()=>{handleInjuryName("Abs"); }} d="M140.7,230.9c2.4-1,6.9-1.4,11.4-1.8c5.3-0.5,10.6-1,11.8-2.2c0.6-0.6,1-5.2,1.1-10.3
		c0.1-4.3-0.1-8.9-0.7-11.7c-2.3,0.6-6.2,2.5-10.5,5c-4.5,2.6-9.3,5.9-13.1,8.9c-0.2,2.7-0.1,6.1-0.1,9.2
		C140.6,229,140.7,230,140.7,230.9z"/>
	<path class="st0" d="M167.2,126.3c2.4-2.3,4.6-5.2,6.4-8.2l0,0c4.2-6.8,7.2-14.6,9.2-20.4v-0.1c0.6-1.7,1.1-3.3,1.5-4.6
		c0.3-0.9,0.6-1.7,0.8-2.4c-0.4-2.7,0-6,0.4-9.6c0.1-1.1,0.2-2.2,0.3-3.3c-1.3,1.4-2.8,2.9-4.5,4.2c-0.4,1.5-0.9,4.3-1.5,7.7
		c-0.7,3.8-1.4,8.2-2.4,12.6v0.1c-1.2,5.6-2.7,11-4.5,14.3c-1,2.5-2.7,5-5.3,7.7l0,0l0,0l0,0l0,0l0,0l0,0l0,0l0,0l0,0l0,0l0,0l0,0
		l0,0l0,0l0,0l0,0l0,0l0,0l0,0l0,0l0,0l0,0l0,0l0,0l0,0l0,0l0,0l0,0l0,0l0,0l0,0l0,0l0,0l0,0l0,0l0,0l0,0l0,0l0,0l0,0l0,0l0,0l0,0
		l0,0l0,0l0,0l0,0l0,0l0,0l0,0c-2.6-2.7-4.2-5.2-5.3-7.7c-1.8-3.4-3.3-8.8-4.5-14.3v-0.1c-0.9-4.4-1.7-8.8-2.4-12.6
		c-0.6-3.4-1.1-6.2-1.5-7.7c-1.7-1.3-3.2-2.7-4.5-4.2c0.1,1.1,0.2,2.2,0.3,3.3c0.4,3.5,0.7,6.8,0.4,9.6c0.2,0.7,0.5,1.5,0.8,2.4
		c0.4,1.3,0.9,2.9,1.5,4.6v0.1c2,5.8,5,13.6,9.2,20.4l0,0C162.7,121.1,164.8,124,167.2,126.3z"/>
	<path class="st0" d="M181.6,327.6c1-3.1,2.2-6.4,3.9-10l0,0c0.4-0.9,0.9-1.9,1.4-2.8l0.1-0.1c0.3-0.5,0.6-1.1,0.9-1.6
		c1.8-3,3.9-5.5,6.1-8l0.1-0.1c0.6-0.7,1.2-1.3,1.8-2c2.1-2.3,4.3-4.7,6.6-7.8l0.1-0.1c1-1.3,2-2.7,3.1-4.3
		c-0.4,0.1-0.9,0.1-1.3,0.1c-1.2-0.1-2.3-0.5-3.3-1.3c-1.4-0.9-2.5-2.3-3-4c-0.4-1.3-0.7-2.5-0.8-3.7s-0.2-2.4-0.1-3.6
		c0.1-3.3,0.3-9,0.9-14.3c0.6-5,1.5-9.8,3.1-12.3c-1.5-1.4-2.4-3.8-2.7-6.4c-0.4-3.2,0-6.8,1-9.8c-1-2-1.6-5.2-1.6-8.4
		c0-3,0.5-6,1.5-7.8c-0.6-1.4-1.3-4.4-1.3-7.4c0-2.3,0.4-4.6,1.4-6.6c-0.2-0.4-0.3-0.8-0.5-1.3c-0.7-2.3-1.2-5.8-1-8.9
		c0.2-3.3,1.1-6.2,3.4-7.2c0.2-0.1,0.3-0.1,0.5-0.2l1-0.3c8.2-2.4,14.7-4.3,14.4-15.1c-0.1-1-0.3-1.9-0.4-2.8
		c-1.7,3-3.7,5.7-6.1,7.9c-3.5,3.3-7.9,5.4-13,5.8c-0.8,0.1-1.5,0.1-2.2,0.2c0.9,3.8,1.4,9.8,1.4,15.8c0,5.8-0.5,11.5-1.7,14.8
		c-0.1,0.4-0.6,0.6-1,0.5c-0.1,0-0.1-0.1-0.2-0.1c-0.7-0.5-1.4-0.9-2.1-1.4c-6-4.1-16.4-11.1-23.5-12.9c-0.4-0.1-0.6-0.5-0.6-0.8
		c0-0.5,0-1.1,0-1.6c0.1-4.5,0.3-11.3,3.1-17.2l0,0c0,0,0-0.1,0.1-0.1c0-0.1,0-0.1,0.1-0.1c-1.2-1.3-2-2.9-2.5-5
		c-0.1-0.1-0.1-0.3-0.1-0.5c-0.3-1.4-0.4-3-0.4-4.9c0-2.2,0-4.7,0-7.5c0-7.4-0.1-16.6,0.6-25c0.4-5,0.9-9.6,3.6-12.9
		c2.7-3.3,7.5-5,16.3-4c1.7,0.2,3.4,0.4,5.1,0.7c4.4-0.8,9.3-2.7,14-4.9c3.8-1.8,7.5-3.8,10.8-5.7c-2.4-0.1-5,0.1-7.7,0.5l-1.5,0.6
		c-3.3,1.3-7.7,3.1-13.4,4.6c-0.1,0-0.2,0.1-0.3,0.1c0,0,0,0-0.1,0c-4.6,1.2-10,2.2-16.5,2.7H179c-1.4,0.1-2.8,0.2-4.3,0.2
		c-2,3.2-4.4,6.2-7,8.7l0,0l0,0l0,0l0,0l0,0l0,0l0,0l0,0l0,0l0,0l0,0l0,0h-0.1l0,0l0,0l0,0l0,0l0,0l0,0l0,0l0,0l0,0l0,0l0,0l0,0l0,0
		c0,0,0,0-0.1,0l0,0l0,0l0,0l0,0l0,0l0,0l0,0l0,0l0,0l0,0l0,0l0,0l0,0l0,0l0,0c-2.6-2.5-4.9-5.5-7-8.7c-1.5-0.1-2.9-0.1-4.3-0.2
		c0,0,0,0-0.1,0c-6.5-0.5-11.9-1.5-16.5-2.7c0,0,0,0-0.1,0s-0.2-0.1-0.3-0.1c-5.7-1.5-10.1-3.2-13.4-4.6l-1.5-0.6
		c-2.7-0.4-5.3-0.5-7.7-0.5c3.2,1.9,6.9,3.9,10.8,5.7c4.7,2.2,9.6,4,14,4.9c1.7-0.3,3.5-0.5,5.1-0.7c8.8-1.1,13.7,0.7,16.4,4
		s3.2,8,3.6,12.9c0.7,8.4,0.6,17.6,0.6,25c0,2.8,0,5.4,0,7.5c0,1.9-0.1,3.5-0.4,4.9c0,0.2,0,0.3-0.1,0.5c-0.5,2.1-1.3,3.7-2.5,5
		c0,0,0,0.1,0.1,0.1c0,0,0,0,0.1,0.1l0,0c2.8,5.9,2.9,12.7,3,17.2c0,0.6,0,1.1,0.1,1.6c0,0.4-0.2,0.7-0.6,0.8
		c-7.1,1.8-17.4,8.8-23.5,12.9c-0.7,0.5-1.4,0.9-2.1,1.4c-0.1,0-0.1,0.1-0.2,0.1c-0.4,0.1-0.8-0.1-0.9-0.5
		c-1.2-3.4-1.7-9.1-1.7-14.8c0-6,0.5-12,1.4-15.8c-0.7-0.1-1.5-0.1-2.2-0.2c-5.2-0.5-9.5-2.6-13-5.8c-2.4-2.2-4.4-4.9-6.1-7.9
		c-0.1,0.9-0.3,1.9-0.4,2.8c-0.3,10.9,6.2,12.8,14.4,15.1l1,0.3c0.2,0,0.3,0.1,0.5,0.2c2.3,1,3.2,4,3.4,7.2c0.1,3.1-0.4,6.6-1,8.9
		c-0.1,0.5-0.3,0.9-0.4,1.3c1,1.9,1.4,4.3,1.4,6.6c0,3.1-0.7,6-1.2,7.4c1,1.8,1.5,4.8,1.5,7.8c0,3.2-0.5,6.4-1.6,8.4
		c1,2.9,1.3,6.6,1,9.8c-0.3,2.7-1.2,5-2.7,6.4c1.6,2.5,2.6,7.3,3.2,12.3c0.6,5.4,0.8,11,0.9,14.3c0,1.2,0,2.4-0.2,3.6
		c-0.1,1.2-0.4,2.4-0.8,3.7c-0.5,1.7-1.7,3.1-3,4c-1,0.7-2.2,1.1-3.3,1.3c-0.4,0-0.9,0-1.3-0.1c1,1.6,2.1,3,3.1,4.3l0.1,0.1
		c2.3,3,4.5,5.5,6.6,7.8c0.6,0.7,1.2,1.3,1.7,2c0.1,0,0.1,0.1,0.1,0.1c2.2,2.5,4.3,5,6.1,8c0.3,0.5,0.6,1,0.9,1.6l0.1,0.1
		c0.5,0.9,1,1.9,1.4,2.8l0,0c1.7,3.6,2.8,6.9,3.9,10c2.7,8.2,4.8,14.2,14.3,14.9C176.7,341.8,178.8,335.7,181.6,327.6z M139.2,218.3
		c0-0.2,0.1-0.4,0.3-0.5c3.9-3.2,8.9-6.6,13.5-9.3c4.9-2.9,9.4-5,11.7-5.4c0.4-0.1,0.7,0.2,0.9,0.5c0.7,2.8,1,8,0.9,12.8
		c-0.1,5.4-0.7,10.5-1.5,11.4c-1.6,1.7-7.2,2.2-12.8,2.7c-5.3,0.5-10.5,0.9-11.7,2.2c-0.1,0.2-0.3,0.3-0.6,0.3
		c-0.4,0-0.7-0.3-0.7-0.8c0-1.4,0-2.8-0.1-4.2C139,224.7,139,221.1,139.2,218.3z M166.4,325.9c0,0.4-0.3,0.7-0.8,0.7
		c-1.7,0-4.4-1.9-7.1-4.4c-3.2-3-6.4-6.9-7.6-9c-1.6-3.1-2.3-6.5-3.1-10.1c-0.5-2.3-1-4.6-1.7-7c-2.2-6.8-4.3-13.9-5.8-20.7
		c-1.4-6.8-2.2-13.3-1.3-18.8c0.1-0.4,0.4-0.7,0.9-0.7c4.5,0.7,9.4,1.1,14,1.2c4.7,0.2,9,0.1,11.8-0.2h0.1c0.4,0,0.7,0.3,0.7,0.7
		L166.4,325.9z M166.7,246c-0.2,2.3-0.6,4.4-1.3,6.1c-0.9,1.8-2.1,3-3.9,3.2c-3.1,0.3-7,0.5-10.9,0.5s-7.7-0.5-10.4-1.5h-0.1
		c-0.1-0.1-0.2-0.1-0.3-0.2c-1-0.8-1.6-4.7-1.8-8.6c-0.2-3.9,0.1-8,0.8-9.6c0.1-0.2,0.2-0.4,0.3-0.5c0.7-0.8,5.5-1.8,10.8-2.5
		c6.5-0.9,13.9-1.5,14.8-1.1c0.5,0.3,1.4,3.6,1.8,7.6C166.8,241.4,166.9,243.8,166.7,246z M168.8,203.7c0.1-0.4,0.5-0.6,0.9-0.5
		c2.3,0.4,6.8,2.5,11.7,5.4c4.6,2.7,9.7,6.1,13.5,9.3c0.2,0.1,0.3,0.3,0.3,0.5c0.2,2.8,0.1,6.4,0.1,9.6c0,1.5-0.1,2.9-0.1,4.2
		c0,0.4-0.3,0.8-0.8,0.8c-0.2,0-0.4-0.1-0.6-0.3c-1.2-1.2-6.5-1.7-11.7-2.2c-5.6-0.5-11.2-1-12.8-2.7c-0.8-0.9-1.4-5.9-1.5-11.4
		C167.8,211.7,168.1,206.5,168.8,203.7z M167.8,239.3c0.3-4,1.2-7.4,1.8-7.6c0.9-0.4,8.3,0.2,14.8,1.1c5.3,0.7,10.1,1.7,10.8,2.5
		c0.1,0.1,0.2,0.3,0.3,0.5c0.7,1.6,1,5.7,0.8,9.6c-0.2,4-0.8,7.8-1.8,8.6c-0.1,0.1-0.2,0.1-0.3,0.2h-0.1c-2.7,1.1-6.5,1.5-10.4,1.5
		s-7.8-0.2-10.9-0.5c-1.8-0.1-3.1-1.4-3.9-3.2c-0.8-1.6-1.1-3.8-1.3-6.1C167.5,243.8,167.6,241.4,167.8,239.3z M168.8,326.6
		c-0.4,0-0.8-0.3-0.8-0.7l-0.1-68.1c0-0.4,0.3-0.7,0.8-0.7h0.1c2.8,0.3,7.1,0.4,11.7,0.2c4.6-0.2,9.6-0.6,14-1.2
		c0.4-0.1,0.8,0.2,0.9,0.7c0.8,5.5,0.1,12-1.3,18.8c-1.4,6.8-3.6,13.9-5.8,20.7c-0.8,2.3-1.2,4.7-1.8,7c-0.8,3.6-1.5,7-3.1,10.1
		c-1.1,2.1-4.3,6-7.6,9C173.2,324.7,170.5,326.6,168.8,326.6z"/>
	<path class="st0" d="M169.8,173.4c6.7-5.2,15.5-10.2,24.1-15.2c12.4-7.2,24.5-14.1,29.5-20.8c-0.4-4.4-2-8-5.8-9.6
		c-3.5-1.5-8.3-2.6-13.5-3.6c-5.2-0.9-10.7-1.7-15.7-2.3c-8.2-1-12.6,0.5-15,3.4s-2.9,7.4-3.3,12.1c-0.6,8.4-0.6,17.5-0.6,24.8
		c0,2.8,0,5.4,0,7.6C169.5,171.1,169.6,172.3,169.8,173.4z"/>
	<path class="st0" d="M209.7,176.1c2.7-2.5,5-5.8,6.8-9.4l0,0c0.7-1.3,1.2-2.8,1.8-4.2c1.6-4.4,4.2-12.1,5-19.1
		c0.1-1.2,0.2-2.4,0.2-3.6c-4.8,5.5-13.6,11-23.3,16.6c0,0.1-0.1,0.1-0.1,0.1c-2.1,1.7-9.3,7.4-16.5,13.7c-3.7,3.3-7.4,6.7-10.3,9.9
		c0.9,0.6,1.9,1.1,3.1,1.5c4.7,1.4,11.9,0.9,21.2,0.1C202.3,181.1,206.4,179.1,209.7,176.1z"/>
	<path class="st0" d="M182.6,169c3.2-2.9,6.4-5.6,9.2-7.8c-7.9,4.6-15.7,9.2-21.7,13.9c0.4,1.6,1.1,2.9,2,4
		C175.1,175.8,178.9,172.3,182.6,169z"/>
	<path class={(injuryNames.some(e => e.name === 'Left Anterior Shoulder '))?"st2":"st0"} onClick={()=>{handleInjuryName("Left Anterior Shoulder "); }} d="M197.8,121.7c2.2,0.3,4.4,0.7,6.5,1.1c5.3,1,10.2,2.2,13.8,3.7c5.2,2.2,6.9,7.4,6.8,13.4
		c2.2,9.8,10,16.1,17.4,22c0.1,0.1,0.3,0.2,0.4,0.4c0.4-3.5,1.9-6.6,3.5-9.9c2.9-5.8,6-12.2,2.8-22c-1.1-2.2-2.4-4.3-3.8-6.2
		c-4.7-6.2-11.2-10.7-19.3-12.5c-1.5-0.3-3.1-0.6-4.8-0.7c-3.7,2.2-8.2,4.7-12.9,6.9C204.8,119.2,201.3,120.7,197.8,121.7z"/>
	<path class={(injuryNames.some(e => e.name === 'Left Anterior Shoulder '))?"st2":"st0"} onClick={()=>{handleInjuryName("Left Anterior Shoulder "); }} d="M247.6,152.9c-1.7,3.5-3.3,6.7-3.4,10.4c3.3,2.7,6.5,5.4,9,8.5c1.7-8.4,2-16.9,1-24.6c-0.5-3.5-1.2-6.8-2.2-10
		C252.3,143.6,249.9,148.4,247.6,152.9z"/>
	<path class="st0" d="M243,164.3c-0.1,0-0.1-0.1-0.1-0.1c-0.5-0.4-1-0.8-1.5-1.2c-1.5-1.2-3.1-2.5-4.6-3.8
		c1.8,4.1,4.7,11.1,7.4,17.8c3.1,7.8,5.9,15.1,6.2,16.7c0.9,5.2,1.6,10.4,1.6,15.7c0,3.8-0.3,7.6-0.9,11.3c0.5,1.3,1.4,2.2,2.7,2.9
		c1.2,0.7,2.7,1.2,4.4,1.5c-1-6.4-0.7-12.5,2.1-17.4c-0.7-10.8-2.2-15.8-4.1-21.8c-1-3.3-2.1-7-3.3-12
		C250.4,170.4,246.8,167.3,243,164.3z"/>
	<path class="st0" d="M244.9,233.7c0.1-0.2,0.2-0.4,0.3-0.6c1.7-3.3,3.1-7.1,3.5-8.4v-0.1c1.4-5.1,1.9-10.2,1.8-15.3
		c-0.1-5.1-0.7-10.2-1.6-15.4c-0.3-1.5-3-8.7-6.1-16.4c-3.7-9.3-7.9-19.2-8.8-20.8c-3.9-3.6-7.3-7.7-9.4-12.8c0,0.5-0.1,0.9-0.2,1.4
		c1.6,8.1,2.3,15.8,2.3,23.1c0.8,5.2,2.6,13.5,5,21.1l0,0c1.8,5.5,3.9,10.5,6.2,13.7c2,2.7,3.4,5.4,4.3,7.9c1.1,3.1,1.5,5.9,1.5,8.2
		c0,0.4-0.3,0.7-0.7,0.7c-0.1,0-0.3,0-0.4-0.1c-0.7-0.3-1.7-1-2.9-1.9c-0.6-0.5-1.3-1-2-1.5c0.7,1.8,1.3,3.8,2,5.9
		c0,0.1,0,0.2,0,0.3c-0.4,5.5,0.4,10.7,2,16C242.4,238.3,243.6,236.2,244.9,233.7C244.8,233.8,244.8,233.8,244.9,233.7z"/>
	<path class="st0" d="M219.7,162.9c-0.5,1.4-1.1,2.8-1.8,4.2c0.2,1.5,0.5,3.1,0.7,4.7c0,0.1,0,0.1,0,0.2v0.1c0.5,3.9,0.8,8.2,1,12.5
		c0,0.1,0,0.1,0,0.2c0,0.4,0,0.8,0,1.2c0.1,1.5,0.1,3,0.1,4.5c0.1,4.2,0,8.2-0.1,11.9v0.1c-0.1,1.1-0.1,2.2-0.2,3.2
		c1.8-5.7,3.6-12.5,4.6-20.2v-0.1c0.2-1.4,0.4-2.9,0.5-4.4c0.4-4,0.7-8.1,0.7-12.5v-0.1c0-6-0.5-12.3-1.6-19
		C222.6,154.7,220.9,159.7,219.7,162.9z"/>
	<path class="st0" d="M242.1,218c-0.1-1.9-0.5-4-1.3-6.3c-0.9-2.3-2.1-4.9-4.1-7.5c-2.4-3.3-4.6-8.5-6.4-14.1V190
		c-1.5-4.8-2.8-9.8-3.7-14.3c-0.1,1.9-0.3,3.7-0.4,5.5c-0.1,1.5-0.3,2.9-0.5,4.4c1,6.8,3.3,11.5,6,17.2c1.5,3.1,3.2,6.6,4.9,10.9
		c1.4,1.2,2.8,2.3,4,3.2C241.1,217.3,241.7,217.7,242.1,218z"/>
	<path class="st0" d="M203.1,188.8l-0.6,0.2c1.4,1.2,3.5,2.8,5.6,4.2c1.9,1.3,3.8,2.3,5.1,2.8c0.5-0.6,1-1.3,1.5-1.9
		c1.9-2.7,3.3-5.7,3.5-8.1c-0.1-2.4-0.2-4.7-0.4-7C215.7,185.1,209.9,186.8,203.1,188.8z"/>
	<path class="st0" d="M199.3,195.1c-0.1,2.9,0.4,6.2,1,8.4c0.1,0.3,0.2,0.5,0.2,0.7c0.7-0.3,1.8-0.8,2.8-1.3c1.4-0.7,2.8-1.3,3-1.4
		c0.7-0.3,1.4-0.7,2.2-1.1l0.1-0.1c1.2-0.8,2.4-1.9,3.6-3.2c-1.4-0.6-3.1-1.6-4.9-2.7c-2.4-1.6-4.9-3.5-6.2-4.7
		C199.9,190.7,199.4,192.8,199.3,195.1z"/>
	<path class={(injuryNames.some(e => e.name === 'Abs'))?"st2":"st0"} onClick={()=>{handleInjuryName("Abs"); }} d="M169.4,198.7c7.3,2.1,17.4,8.9,23.4,12.9l1.2,0.9c0.9-3.3,1.3-8.3,1.3-13.4c0-6-0.5-12-1.4-15.7
		c-7.7,0.6-13.7,0.9-18-0.4c-1.4-0.4-2.7-1-3.7-1.8c-2.6,5.6-2.7,12.1-2.8,16.4V198.7z"/>
	<path class={(injuryNames.some(e => e.name === 'Abs'))?"st2":"st0"} onClick={()=>{handleInjuryName("Abs"); }} d="M170.5,226.8c1.2,1.3,6.5,1.7,11.8,2.2c4.5,0.4,9.1,0.8,11.5,1.8c0-0.9,0.1-1.9,0.1-2.9c0.1-3.1,0.2-6.5,0-9.2
		c-3.8-3.1-8.6-6.3-13.1-8.9c-4.3-2.5-8.2-4.4-10.5-5c-0.6,2.8-0.8,7.4-0.7,11.7C169.5,221.6,169.9,226.2,170.5,226.8z"/>
	<path class={(injuryNames.some(e => e.name === 'Abs'))?"st2":"st0"} onClick={()=>{handleInjuryName("Abs"); }} d="M170.3,251.5c0.6,1.3,1.5,2.2,2.7,2.3c3.1,0.3,6.9,0.5,10.7,0.5c3.7-0.1,7.3-0.4,9.8-1.4
		c0.7-0.6,1.1-4,1.2-7.5c0.2-3.7,0-7.5-0.7-8.9c0-0.1-0.1-0.1-0.1-0.2c-0.5-0.5-4.9-1.3-9.8-2c-6.3-0.9-13.4-1.5-14-1.2
		c-0.2,0.1-0.6,2.8-0.9,6.4c-0.2,2.1-0.3,4.4-0.1,6.5C169.3,248,169.7,250,170.3,251.5z"/>
	<path class="st0" d="M200.4,234.4c2.9-1.2,6.7-3.5,9.8-6.3c2.5-2.3,4.6-4.9,5.5-7.6c0-1.7,0-3.3,0-4.8c-0.2-0.6-0.6-1.2-1.2-1.6
		l0,0c-0.8-0.4-1.9-0.6-3.7-0.4h-0.1c-0.1,0-0.1,0.1-0.1,0.1c-3.6,3.2-7.5,5.8-10.2,6.2c-0.9,1.6-1.3,4.3-1.3,7.1
		S199.6,232.7,200.4,234.4z"/>
	<path class="st0" d="M202,250.6c1.9-1.3,5.4-4.3,8.5-7.2c2.7-2.5,5.2-5,5.9-6c-0.3-4.8-0.5-9.4-0.6-13.6c-1.2,1.9-2.8,3.8-4.6,5.4
		c-3.4,3.1-7.6,5.5-10.6,6.8c-0.9,2.7-1.2,6.1-0.9,9.1C200,247.4,200.8,249.5,202,250.6z"/>
	<path class="st0" d="M209.7,212.7c2-1.8,4-3.9,5.5-5.8c-0.8-1-2.2-2.4-3.5-3.6c-1-0.8-1.9-1.4-2.6-1.6c-0.8,0.5-1.5,0.9-2.2,1.2
		c-0.2,0.1-1.6,0.7-2.9,1.3c-1.4,0.6-2.8,1.3-3.3,1.5c-0.9,1.7-1.2,3.9-1.2,6c0,2.8,0.5,5.4,1.1,6.6
		C202.9,218,206.4,215.6,209.7,212.7z"/>
	<path class="st0" d="M218.3,190.8c-0.6,1.4-1.4,2.7-2.4,4.1c-0.6,0.8-1.2,1.6-1.8,2.3l-0.1,0.1c-1.1,1.3-2.3,2.5-3.5,3.4
		c0.7,0.4,1.4,0.9,2.2,1.5c1.3,1.1,2.6,2.4,3.5,3.5c1-1.3,1.7-2.5,2-3.5C218.4,198.7,218.4,194.8,218.3,190.8z"/>
	<path class="st0" d="M212.5,212.1c1.2,0.1,2,0.3,2.7,0.7l0,0c0.5,0.3,0.9,0.6,1.2,1c0.3-0.7,0.5-1.3,0.8-2c0.3-1.7,0.5-3.8,0.7-6.1
		c-0.4,0.5-0.8,1.1-1.2,1.7l-0.1,0.1C215.5,209,214.1,210.6,212.5,212.1z"/>
	<path class="st0" d="M215.4,278.2c1.8-1.2,3.4-2.3,4.3-4.3c-0.2-2-0.5-4.1-0.7-6.1c-1-9.7-1.9-19.4-2.5-28.2c-1.2,1.3-3,3.1-5,4.9
		c-3.3,3.1-7.2,6.3-9,7.5c-1.6,2.1-2.6,6.9-3.2,12.1c-0.6,5.3-0.8,10.9-0.9,14.1c0,1.1,0,2.3,0.1,3.4s0.4,2.2,0.7,3.4
		c0.5,1.3,1.4,2.5,2.5,3.3c0.8,0.5,1.7,0.9,2.6,1c0.9,0.1,1.7-0.1,2.5-0.7c0.1-0.1,0.1-0.1,0.2-0.1l0,0c0.5-0.4,0.9-0.9,1.2-1.5l0,0
		c0.2-0.3,0.3-0.7,0.5-1.1C210.3,281.6,213,279.9,215.4,278.2z"/>
	<path class={(injuryNames.some(e => e.name === 'Abs'))?"st2":"st0"} onClick={()=>{handleInjuryName("Abs"); }} d="M185.1,302.8c0.5-2.3,1-4.7,1.8-7.1c2.2-6.8,4.3-13.8,5.7-20.5c1.4-6.4,2-12.4,1.4-17.6c-4.3,0.6-9,1-13.4,1.1
		c-4.3,0.2-8.3,0.1-11.1-0.2l0.1,66.4c1.4-0.5,3.3-2,5.3-3.8c3.1-2.9,6.2-6.6,7.3-8.6C183.6,309.6,184.3,306.3,185.1,302.8z"/>
	<path class={(injuryNames.some(e => e.name === 'Left Hip'))?"st2":"st0"} onClick={()=>{handleInjuryName("Left Hip"); }} d="M217,281.1c0.9-0.9,1.9-1.3,3.3-1c-0.1-1.3-0.3-2.5-0.4-3.8c-1,1.3-2.4,2.2-3.7,3.1c-2.2,1.4-4.5,3-5.8,6.5
		c1.7-0.6,2-0.7,4.8-0.8C215.6,283.5,216.1,282.1,217,281.1z"/>
	<path class={(injuryNames.some(e => e.name === 'Left Hip'))?"st2":"st0"} onClick={()=>{handleInjuryName("Left Hip"); }} d="M203.7,296c-0.5,3-0.8,6.6-0.9,10.2c-0.1,2.8-0.1,5.7,0,8.2c0.4-1.3,0.7-2.7,1-4c0.6-2.3,1.2-4.7,1.8-7
		c0.7-2.7,1.5-5.2,2.3-7.5c0.9-2.9,1.8-5.7,2.4-8.2c-0.3,0.1-0.6,0.2-0.9,0.3c-0.4,0.7-0.9,1.3-1.4,1.7
		C206.6,292,205.2,294.1,203.7,296z"/>
	<path class={(injuryNames.some(e => e.name === 'Left Hip'))?"st2":"st0"} onClick={()=>{handleInjuryName("Left Hip"); }} d="M201.9,298.3c-1.8,2.1-3.4,4-5,5.7c-0.5,0.6-1.1,1.2-1.6,1.8c-0.4,5,0.1,9.3,1,13c0.8,3,1.9,5.7,3,8.1
		c0.8-2.6,1.6-5.2,2.3-7.9c-0.3-3.5-0.4-8.2-0.3-13C201.4,303.4,201.6,300.8,201.9,298.3z"/>
	<path class={(injuryNames.some(e => e.name === 'Left Groin'))?"st2":"st0"} onClick={()=>{handleInjuryName("Left Groin"); }} d="M198,331c0.2-0.6,0.5-1.3,0.7-1.9c-1.4-2.8-2.8-6-3.8-9.8c-0.9-3.4-1.4-7.2-1.2-11.6c-1.6,1.9-3.1,3.9-4.5,6.2
		c-0.3,0.5-0.5,0.9-0.8,1.3c0.3,2.5,0.8,6.1,2,10.2c1.1,3.9,2.7,8.2,5.1,12.5C196.3,335.5,197.2,333,198,331z"/>
	<path class={(injuryNames.some(e => e.name === 'Left Groin'))?"st2":"st0"} onClick={()=>{handleInjuryName("Left Groin"); }} d="M187.1,317.5c-0.1,0.3-0.2,0.5-0.3,0.7c-0.2,1.2-0.7,4.2-1.2,7.1s-1.1,5.8-1.3,6.7c-0.6,2.5-1.2,5-1.8,7.5
		c-3.3,12.9-6.5,25.5-0.5,40.5c2.8-13.1,7.3-25.4,12.7-40.1c0-0.1,0-0.2,0.1-0.2c-2.8-4.8-4.6-9.6-5.8-13.9
		C188,322.7,187.5,319.8,187.1,317.5z"/>
	<path class={(injuryNames.some(e => e.name === 'Left Groin'))?"st2":"st0"} onClick={()=>{handleInjuryName("Left Groin"); }} d="M176.9,381.9c-0.5-8.2-0.6-17.2,0.1-20.8c0.2-7.5,2.1-14.7,3.9-22c0.6-2.4,1.2-4.9,1.8-7.4
		c0.2-0.9,0.7-3.8,1.3-6.6c0-0.1,0.1-0.3,0.1-0.5c-0.4,1.2-0.8,2.3-1.2,3.4c-2.6,7.7-4.6,13.6-12.3,15.4
		c-1.4,17.5,3.1,42.8,8.2,68.4c-0.1-5,0.1-9.6,0.4-14.1C178.2,395.9,177.4,389.2,176.9,381.9z"/>
	<path class={(injuryNames.some(e => e.name === 'Left Groin'))?"st2":"st0"} onClick={()=>{handleInjuryName("Left Groin"); }} d="M178,372.4c0.1,3,0.2,6.3,0.4,9.4c0.3,4.8,0.8,9.3,1.3,12.1c0.4-3.9,1-7.7,1.7-11.4
		C179.8,379.1,178.7,375.7,178,372.4z"/>
	<path class={(injuryNames.some(e => e.name === 'Left Thigh'))?"st2":"st0"} onClick={()=>{handleInjuryName("Left Thigh"); }} d="M194.4,370.1C194.4,370.1,194.5,370.1,194.4,370.1c0.6-1.8,1.2-3.5,1.8-5.2c2.8-8.2,5.6-16.4,8-24.6
		c2.2-7.6,3.7-15.2,5-22.7c0,0,0,0,0-0.1c0.3-1.3,0.5-2.7,0.7-4.1c1.3-7.1,2.6-14.1,4.3-21.2c0.1-1.8,0.3-3.6,0.7-5.6
		c-1.5,0.1-2.2,0.1-2.9,0.3c-0.6,2.9-1.6,6-2.6,9.2c-0.8,2.4-1.5,5-2.2,7.5c-0.6,2.2-1.2,4.6-1.8,7c-0.7,2.8-1.5,5.7-2.2,8.6v0.1
		c-0.9,3.3-1.9,6.6-3,9.8c0,0,0,0,0,0.1c-0.3,0.7-0.5,1.5-0.8,2.2c-1.3,3.6-2.3,6.3-3.3,9c-10.3,28-17.4,47.3-15.3,80.2
		c0,0.1,0,0.2,0,0.2c0.1,0.6,0.2,1.2,0.3,1.7c0.3,1.5,0.6,3.1,0.9,4.6c0.1-2,0.1-4,0.3-5.9c0.3-4.2,0.7-8.3,1.6-13
		C186.1,395.3,190.2,382.7,194.4,370.1z"/>
	<path class={(injuryNames.some(e => e.name === 'Left Thigh'))?"st2":"st0"} onClick={()=>{handleInjuryName("Left Thigh"); }} d="M188.8,443.4C188.9,443.4,188.9,443.4,188.8,443.4c0.6,0.4,1.2,0.8,1.8,1.2c1.2,0.7,2.5,1.3,3.6,1.5
		c1,0.2,2,0.1,2.7-0.3c0.3-0.2,0.6-0.5,0.9-0.9c2.1-3.7,2.8-8.4,2.7-13.5c0,0,0,0,0-0.1c-0.2-6.1-1.4-12.7-2.6-18.6v-0.3
		c-1.8-9.2-2.2-18.3-2.5-27.1c-0.2-3.9-0.3-7.8-0.6-11.5c-3.8,11.4-7.4,22.9-9.4,34.6c-0.8,4.6-1.3,8.8-1.6,12.9s-0.3,8.2-0.3,12.9
		c0.3,1.5,0.6,3,0.9,4.5C185.3,440.3,187,442,188.8,443.4z"/>
	<path class={(injuryNames.some(e => e.name === 'Left Thigh'))?"st2":"st0"} onClick={()=>{handleInjuryName("Left Thigh"); }} d="M207.4,385.5c3-13.7,4.3-24.2,4.4-34.6c0.1-9-0.7-17.8-2-28.3c-1.2,6-2.5,12.1-4.2,18.2
		c-2.3,8.2-5.2,16.4-8,24.7c-0.6,1.7-1.1,3.3-1.7,5c0.5,4.8,0.7,9.8,0.9,15c0.4,8.7,0.7,17.8,2.5,26.9v0.3c0.8,4,1.6,8.2,2.1,12.5
		c0.7-4.4,1.2-8.6,1.8-12.9C204.4,403,205.5,394.2,207.4,385.5z"/>
	<path class={(injuryNames.some(e => e.name === 'Left Thigh'))?"st2":"st0"} onClick={()=>{handleInjuryName("Left Thigh"); }} d="M203.7,444.5c1.3,0.1,2.6,0.3,4,0.3c2.8,0.2,5.7,0.2,8.5,0.2c-6.8-7.2-2.6-21.4,1-33.3
		c0.6-2.1,1.2-4.1,1.7-5.9c7.7-27.9,5.7-44.6,3.9-59.8c-0.9-7.3-1.7-14.2-1.4-21.9c-0.3-0.9-0.6-1.8-0.9-2.6c-0.8-2.3-1.4-4-1.6-4.6
		c-0.3-0.9-0.6-2.1-0.9-3.1c-1.6-5.5-3.1-10.3-3.6-15.4c-1.1,5.2-2,10.4-3,15.5c-0.3,1.3-0.5,2.6-0.7,4c1.7,12.7,2.7,22.8,2.6,33.1
		c-0.1,10.4-1.4,21.1-4.4,34.9c-1.9,8.7-3,17.5-4.2,26.5c-0.8,6.2-1.6,12.6-2.8,19.2c0.1,4.5-0.4,8.6-1.9,12.2
		C201.2,444.3,202.4,444.4,203.7,444.5z"/>
	<path class={(injuryNames.some(e => e.name === 'Right Thigh'))?"st2":"st0"} onClick={()=>{handleInjuryName("Right Thigh"); }} d="M131.1,442.8c-1.3,0.1-2.6,0.3-4,0.3c-2.8,0.2-5.7,0.2-8.5,0.2c6.8-7.2,2.6-21.4-1-33.3
		c-0.6-2.1-1.2-4.1-1.7-5.9c-7.7-27.9-5.7-44.6-3.9-59.8c0.9-7.3,1.7-14.2,1.4-21.9c0.3-0.9,0.6-1.8,0.9-2.6c0.8-2.3,1.4-4,1.6-4.6
		c0.3-0.9,0.6-2.1,0.9-3.1c1.6-5.5,3.1-10.3,3.6-15.4c1.1,5.2,2,10.4,3,15.5c0.3,1.3,0.5,2.6,0.7,4c-1.7,12.7-2.7,22.8-2.6,33.1
		c0.1,10.4,1.4,21.1,4.4,34.9c1.9,8.7,3,17.5,4.2,26.5c0.8,6.2,1.6,12.6,2.8,19.2c-0.1,4.5,0.4,8.6,1.9,12.2
		C133.6,442.5,132.4,442.7,131.1,442.8z"/>
	<path class="st0" d="M214.6,479.3c-0.1,0-0.2,0.1-0.3,0.1l0,0c-1.6,0.6-3.3,0.7-5,0.4c-3.3-0.5-6.3-2.1-9-4
		c-2.2-1.6-4.1-3.5-5.7-5.7c-0.1,0.1-0.3,0.3-0.5,0.3c-0.1,0.1-0.3,0.1-0.5,0.2c-1.4,0.3-3-0.5-4.5-2.1c-0.6-0.6-1.2-1.4-1.7-2.2
		c0.3,1.1,0.7,2.3,1,3.3c1.5,4.3,2.2,8.3,2.5,12.1c2.8,3,5.1,6.4,6.9,11.1c1.8,4.7,3.1,10.5,3.7,18.1c0.3,3.3,0.2,7.1,0,11.1
		c0,0.2,0,0.4-0.1,0.6c0,0.1,0,0.1,0,0.2v0.3c-0.3,3.6-0.7,7.4-1.2,11.1c-0.2,1.8-0.4,3.7-0.6,5.5v0.1c-0.4,5-0.6,9.9-0.9,14.8
		c-0.3,8.1-0.7,16.4-2.1,25.5c0,1.7-0.1,3.4-0.2,5c1.2,0.5,2.5,1,3.9,1.4c0-4.1,0.4-9,0.9-14.2c0.5-5.6,1.3-11.4,2-16.9
		c0.8-6,1.8-11.8,2.8-17.6c0.9-5.2,1.8-10.3,2.5-15.5c0.7-4.8,1.3-9.8,2-14.7C211.8,497.7,213.1,487.7,214.6,479.3L214.6,479.3z"/>
	<path class="st0" d="M119.8,478.7c0.1,0,0.2,0.1,0.3,0.1l0,0c1.6,0.6,3.3,0.7,5,0.4c3.3-0.5,6.3-2.1,9-4c2.2-1.6,4.1-3.5,5.7-5.7
		c0.1,0.1,0.3,0.3,0.5,0.3c0.1,0.1,0.3,0.1,0.5,0.2c1.4,0.3,3-0.5,4.5-2.1c0.6-0.6,1.2-1.4,1.7-2.2c-0.3,1.1-0.7,2.3-1,3.3
		c-1.5,4.3-2.2,8.3-2.5,12.1c-2.8,3-5.1,6.4-6.9,11.1c-1.8,4.7-3.1,10.5-3.7,18.1c-0.3,3.3-0.2,7.1,0,11.1c0,0.2,0,0.4,0.1,0.6
		c0,0.1,0,0.1,0,0.2v0.3c0.3,3.6,0.7,7.4,1.2,11.1c0.2,1.8,0.4,3.7,0.6,5.5v0.1c0.4,5,0.6,9.9,0.9,14.8c0.3,8.1,0.7,16.4,2.1,25.5
		c0,1.7,0.1,3.4,0.2,5c-1.2,0.5-2.5,1-3.9,1.4c0-4.1-0.4-9-0.9-14.2c-0.5-5.6-1.3-11.4-2-16.9c-0.8-6-1.8-11.8-2.8-17.6
		c-0.9-5.2-1.8-10.3-2.5-15.5c-0.7-4.8-1.3-9.8-2-14.7C122.7,497.1,121.4,487.1,119.8,478.7L119.8,478.7z"/>
	<path class={(injuryNames.some(e => e.name === 'Left Knee'))?"st2":"st0"} onClick={()=>{handleInjuryName("Left Knee"); }} d="M195,469c0.8,1.2,1.8,2.3,2.8,3.3c4,4,10.4,8.2,16.3,6.1h0.1l0,0l0,0l0,0c0,0,0.1,0,0.1-0.1
		c0.1,0,0.2-0.1,0.3-0.1s0.2-0.1,0.3-0.1c1.7-8.4,3.6-15,6.1-17.8c0-3.7-0.1-8-0.3-12.3c-1.5-0.6-2.7-1.4-3.7-2.3
		c-0.1,0.1-0.2,0.2-0.4,0.2c-3.1,0-6.1,0-9.2-0.2c-1.4-0.1-2.8-0.2-4.1-0.4c-1.3-0.1-2.5-0.3-3.7-0.7l0,0c-0.2,0.4-0.3,0.7-0.5,1.1
		c-0.4,0.6-0.8,1.1-1.3,1.4c-1,0.7-2.4,0.8-3.7,0.5s-2.7-0.9-4.1-1.7c-0.2-0.1-0.4-0.3-0.7-0.4c0.3,4.6,2.2,10.4,3.7,15.1
		C194.1,464.3,195.1,467.3,195,469z M216.1,466c0.3,0,0.5,0.5,0.4,0.9c-0.1,0.2-0.1,0.4-0.2,0.7c-0.6,1.7-1.8,3.6-3.7,4.7
		c-2,1.1-4.6,1.5-8.3,0.5c-0.5-0.1-0.9-0.3-1.4-0.5c-0.4-0.1-0.6-0.6-0.5-0.9c0.1-0.4,0.6-0.6,1-0.5c0.4,0.2,0.9,0.3,1.3,0.4
		c3.3,0.9,5.6,0.5,7.2-0.4c1.6-0.9,2.6-2.4,3.1-3.8c0.1-0.2,0.1-0.4,0.2-0.6C215.3,466.1,215.7,465.9,216.1,466z M202.1,454
		c1-1.5,2.4-2.2,4-2.5c1.5-0.3,3.1-0.2,4.6,0.1c2.4,0.5,4.4,1.6,4.8,2.1c0.3,0.3,0.2,0.8-0.1,1.1c-0.3,0.3-0.8,0.2-1-0.1
		c-0.3-0.4-1.9-1.1-4-1.6c-1.3-0.3-2.7-0.4-4-0.1c-1.2,0.2-2.3,0.8-3.1,1.9c-0.7,1-1.1,2.4-1.1,4.4c-0.1,0.2-0.4,0.6-0.8,0.6
		c-0.4,0-0.7-0.3-0.7-0.7C200.7,456.9,201.2,455.2,202.1,454z"/>
	<path class={(injuryNames.some(e => e.name === 'Right Knee'))?"st2":"st0"} onClick={()=>{handleInjuryName("Right Knee"); }} d="M141.8,459.7c1.5-4.7,3.4-10.5,3.7-15.1c-0.3,0.1-0.5,0.3-0.7,0.4c-1.4,0.8-2.8,1.4-4.1,1.7
		c-1.3,0.3-2.7,0.2-3.7-0.5c-0.5-0.3-0.9-0.8-1.3-1.4c-0.2-0.3-0.4-0.7-0.5-1.1l0,0c-1.2,0.4-2.5,0.6-3.7,0.7
		c-1.4,0.1-2.8,0.3-4.1,0.4c-3.1,0.2-6.1,0.2-9.2,0.2c-0.2,0-0.3-0.1-0.4-0.2c-1,0.9-2.2,1.7-3.7,2.3c-0.2,4.3-0.3,8.6-0.3,12.3
		c2.5,2.8,4.5,9.4,6.1,17.8c0.1,0,0.2,0.1,0.3,0.1c0.1,0,0.2,0.1,0.3,0.1c0,0,0.1,0,0.1,0.1l0,0l0,0l0,0h0.1
		c5.9,2,12.3-2.2,16.3-6.1c1-1,2-2.1,2.8-3.3C139.6,466.3,140.6,463.3,141.8,459.7z M119.5,465.5c0.1,0.2,0.1,0.4,0.2,0.6
		c0.5,1.4,1.5,2.9,3.1,3.8s3.9,1.3,7.2,0.4c0.4-0.1,0.9-0.2,1.3-0.4c0.4-0.1,0.9,0.1,1,0.5c0.1,0.3-0.1,0.8-0.5,0.9
		c-0.5,0.2-0.9,0.4-1.4,0.5c-3.7,1-6.3,0.6-8.3-0.5c-1.9-1.1-3.1-3-3.7-4.7c-0.1-0.3-0.1-0.5-0.2-0.7c-0.1-0.4,0.1-0.9,0.4-0.9
		C119,464.9,119.4,465.1,119.5,465.5z M134,458.2c0,0.4-0.3,0.7-0.7,0.7s-0.7-0.4-0.8-0.6c0-2-0.4-3.4-1.1-4.4
		c-0.8-1.1-1.9-1.7-3.1-1.9c-1.3-0.3-2.7-0.2-4,0.1c-2.1,0.5-3.7,1.2-4,1.6c-0.2,0.3-0.7,0.4-1,0.1s-0.4-0.8-0.1-1.1
		c0.4-0.5,2.4-1.6,4.8-2.1c1.5-0.3,3.1-0.4,4.6-0.1c1.6,0.3,3,1,4,2.5C133.5,454.2,134,455.9,134,458.2z"/>
	<path class={(injuryNames.some(e => e.name === 'Left Thigh'))?"st2":"st0"} onClick={()=>{handleInjuryName("Left Thigh"); }} d="M222.8,328.4c0.1,5.9,0.7,11.6,1.4,17.4c1.8,15.3,3.8,32.2-3.9,60.4c-0.5,2-1.1,3.9-1.7,5.9
		c-3.9,13.2-8.7,29.1,2.1,34.1c-0.3-4.2-0.7-8.2-1.3-11.1c0-0.1,0-0.3,0-0.5c4.9-13.1,8.4-32.4,9.9-51.8c0.8-9.6,1.1-19.2,0.9-28.1
		C229.4,348.5,225.8,337.1,222.8,328.4z"/>
	<path class="st0" d="M222.9,323.8c2.1,6.2,5.1,15.1,7,22.3c-0.4-5.8-1-11.2-2-15.8c-2.3-11.3-5-29.4-7.4-48.6
		c-1.1-0.4-1.9-0.2-2.5,0.4c-0.7,0.8-1.2,2.2-1.6,3.9l0,0c-2.1,10.5,0.1,17.9,2.9,27.2c0.3,0.9,0.6,1.9,0.9,3.1
		c0.2,0.7,0.8,2.3,1.6,4.6C222.2,321.9,222.5,322.8,222.9,323.8C222.8,323.8,222.8,323.8,222.9,323.8z"/>
	<path class={(injuryNames.some(e => e.name === 'Left Knee'))?"st2":"st0"} onClick={()=>{handleInjuryName("Left Knee"); }} d="M190.2,467.4c1.1,1.2,2.2,1.8,3.1,1.7c0.1,0,0.2,0,0.2-0.1c0.5-0.2-0.6-3.6-2.1-8c-1.7-5.2-3.8-11.6-3.8-16.6
		c-1.2-0.9-2.3-1.9-3.2-3c0,6,0.4,11.1,1,15.5c0,0.2,0.1,0.4,0.1,0.6l0,0c0.3,1.5,0.8,2.9,1.3,4.3
		C187.8,464.2,189,466.1,190.2,467.4z"/>
	<path class={(injuryNames.some(e => e.name === 'Left Leg'))?"st2":"st0"} onClick={()=>{handleInjuryName("Left Leg"); }} d="M221.1,471.9c-0.3-2.4-0.2-4.1-0.1-6.2c0-0.7,0.1-1.3,0.1-2.1c0-0.3,0-0.5,0-0.9c-4.1,7.1-6.6,26.2-9,44.9
		c-0.7,5.1-1.3,10.1-2,14.7c-0.7,5.3-1.6,10.5-2.5,15.6c-1,5.8-2,11.5-2.8,17.5c-0.7,5.5-1.4,11.3-2,16.9
		c-0.5,5.2-0.9,10.2-0.9,14.4c0.7,0.1,1.3,0.3,2,0.4c-0.2-3.4,0.1-7.1,0.7-10.7c1-6.2,2.7-12,3.6-14.7c2.4-7.2,4.5-14.3,6.3-21.5
		l0,0c0.8-3.1,1.5-6.2,2.1-9.3c2.2-10.3,3.7-20.8,4.5-31.6c0.3-4.1,0.6-8.5,0.8-12.2c0.1-3,0.2-5.6,0.1-7.4
		C221.8,477.3,221.4,474.7,221.1,471.9z"/>
	<path class="st0" d="M195.6,534.7c2.3-3.1,3.8-7.6,4.4-11.8c0-0.3,0.1-0.7,0.1-1c0.3-3.9,0.3-7.6,0.1-10.9
		c-0.7-7.5-1.9-13.2-3.7-17.7c-1.4-3.7-3.2-6.7-5.4-9.2c0.2,6.6-1,12.7-2.2,19c-2,10.3-4.1,21.1-0.1,35.7
		C191.5,538.7,193.8,537.1,195.6,534.7z"/>
	<path class="st0" d="M198,540.3c0.1-0.3,0.2-0.5,0.3-0.8c0.2-1.8,0.3-3.7,0.6-5.5c0.1-0.8,0.2-1.6,0.3-2.4c-0.7,1.5-1.4,2.8-2.3,4
		c-2,2.7-4.5,4.5-7.6,4.6c0.3,1,0.6,1.9,1,2.9c1,2.8,2.6,8.2,3.9,14.6C195,549.9,197.1,543.1,198,540.3z"/>
	<path class="st0" d="M197.8,546.4c-1.2,4.5-2.5,10.8-2.5,17.3c0.3,1.8,0.6,3.7,0.8,5.6c0.1,0.7,0.2,1.5,0.3,2.3
		c0.6-5.9,0.8-11.5,1-17.1C197.5,551.8,197.6,549.1,197.8,546.4z"/>
	<path class={(injuryNames.some(e => e.name === 'Left Leg'))?"st2":"st0"} onClick={()=>{handleInjuryName("Left Leg"); }} d="M206.1,576.8c-0.6,3.7-0.9,7.4-0.7,10.8c0.6,0.1,1.1,0.1,1.7,0.2c0.1-8.4,2.3-20.4,4.3-30.8
		c-0.6,1.7-1.1,3.5-1.7,5.3C208.8,565,207.1,570.7,206.1,576.8z"/>
	<path class={(injuryNames.some(e => e.name === 'Left Leg'))?"st2":"st0"} onClick={()=>{handleInjuryName("Left Leg"); }} d="M213.7,553.2c-2.2,11.1-5,25.4-5.1,34.7c1.3,0.1,2.7,0.2,4.1,0.1c-1.4-6.8,0-23.8,1.4-36.9
		C214,551.8,213.9,552.5,213.7,553.2z"/>
	<path class={(injuryNames.some(e => e.name === 'Left Leg'))?"st2":"st0"} onClick={()=>{handleInjuryName("Left Leg"); }} d="M223.4,488c-0.2,3.6-0.5,7.7-0.8,11.5c-0.9,10.9-2.4,21.4-4.5,31.8c-0.2,1.1-0.5,2.2-0.7,3.3
		c0,0.9-0.2,2.6-0.5,4.9c-1.4,11.7-4.6,39.9-2.7,48.4c0.1,0,0.2,0,0.3,0c0.1-2.7,0.3-5.2,0.5-7.2l0.1-0.9c0.9-11,2.9-21.2,5-31.6
		c0.3-1.4,0.6-2.7,0.9-4.1c-0.4-9.2,0.6-18.3,1.6-27.4c0.9-7.8,1.7-15.6,1.7-23.5c-0.2-1.3-0.5-2.6-0.7-4
		C223.6,488.9,223.5,488.4,223.4,488z"/>
	<path class={(injuryNames.some(e => e.name === 'Left Leg'))?"st2":"st0"} onClick={()=>{handleInjuryName("Left Leg"); }} d="M225.7,508.4c0.1-2.1,0-4.1-0.2-6.1c-0.3,4.9-0.9,9.8-1.4,14.7c-0.7,6.6-1.4,13.1-1.6,19.6
		C224.1,527.6,225.4,518.4,225.7,508.4z"/>
	<path class={(injuryNames.some(e => e.name === 'Left Ankle'))?"st2":"st0"} onClick={()=>{handleInjuryName("Left Ankle"); }} d="M198.4,612.9c2,0.4,3.9,0.7,5.9,0.8c3.5,0.2,7,0.4,10.5,0c0.2-0.8,0.5-1.6,0.8-2.4c1.1-2.9,2.3-6.1-0.1-12.3
		c-0.9-2.4-1.2-6-1.1-9.6h-0.8c-3.1,0.1-6-0.1-8.7-0.5c-0.1,0-0.2-0.1-0.3-0.1c-1.2-0.2-2.4-0.5-3.5-0.7H201
		c-1.6-0.4-3.2-0.9-4.6-1.5c-0.1,1.1-0.3,2.2-0.5,3.3c0,2.1-1,4.2-2,6.4c-2,4.2-4.3,9.2-0.9,15.8
		C194.8,612.2,196.6,612.6,198.4,612.9z"/>
	<path class={(injuryNames.some(e => e.name === 'Left Foot'))?"st2":"st0"} onClick={()=>{handleInjuryName("Left Foot"); }} d="M222.6,630.6c-2-2.3-4.2-5-6.4-8.8c-1.7-2.9-1.9-5.1-1.6-7c-3.3,0.3-6.7,0.2-10,0c-2-0.1-4-0.4-6-0.8
		c-1.8-0.4-3.5-0.7-5.3-0.8c-0.4,1.9-0.5,4.4-0.1,7.4c0.3,2.7,1,5.7,2.2,8.9c0.1,0.2,0.1,0.4,0,0.5c-1.2,2.8-1.6,5.6-1.4,8
		c0.2,2.5,1,4.6,2.3,6.1c1.4,1.6,3.3,2.8,5.5,3.7c3.6,1.4,7.9,1.8,11.9,1.2c4-0.5,7.7-2,10.2-4.2c1.1-1,2-2.2,2.5-3.5
		C228,637.2,225.9,634.6,222.6,630.6z"/>
	<path class={(injuryNames.some(e => e.name === 'Right Ankle'))?"st2":"st0"} onClick={()=>{handleInjuryName("Right Ankle"); }} d="M136.7,612.9c-2,0.4-3.9,0.7-5.9,0.8c-3.5,0.2-7,0.4-10.5,0c-0.2-0.8-0.5-1.6-0.8-2.4
		c-1.1-2.9-2.3-6.1,0.1-12.3c0.9-2.4,1.2-6,1.1-9.6h0.8c3.1,0.1,6-0.1,8.7-0.5c0.1,0,0.2-0.1,0.3-0.1c1.2-0.2,2.4-0.5,3.5-0.7h0.1
		c1.6-0.4,3.2-0.9,4.6-1.5c0.1,1.1,0.3,2.2,0.5,3.3c0,2.1,1,4.2,2,6.4c2,4.2,4.3,9.2,0.9,15.8C140.2,612.2,138.5,612.6,136.7,612.9z
		"/>
	<path class={(injuryNames.some(e => e.name === 'Right Foot'))?"st2":"st0"} onClick={()=>{handleInjuryName("Right Foot"); }} d="M112.5,630.6c2-2.3,4.2-5,6.4-8.8c1.7-2.9,1.9-5.1,1.6-7c3.3,0.3,6.7,0.2,10,0c2-0.1,4-0.4,6-0.8
		c1.8-0.4,3.5-0.7,5.3-0.8c0.4,1.9,0.5,4.4,0.1,7.4c-0.3,2.7-1,5.7-2.2,8.9c-0.1,0.2-0.1,0.4,0,0.5c1.2,2.8,1.6,5.6,1.4,8
		c-0.2,2.5-1,4.6-2.3,6.1c-1.4,1.6-3.3,2.8-5.5,3.7c-3.6,1.4-7.9,1.8-11.9,1.2c-4-0.5-7.7-2-10.2-4.2c-1.1-1-2-2.2-2.5-3.5
		C107.1,637.2,109.2,634.6,112.5,630.6z"/>
	<path class={(injuryNames.some(e => e.name === 'Left Forearm'))?"st2":"st0"} onClick={()=>{handleInjuryName("Left Forearm"); }} d="M259.7,232.1c0-0.1-0.1-0.3-0.1-0.4c-0.5-1.7-0.9-3.3-1.2-5c-2.2-0.3-4-0.9-5.5-1.7c-0.9-0.6-1.7-1.3-2.3-2.1
		c-0.2,0.7-0.3,1.4-0.5,2.1v0.1c0,0.1-0.1,0.3-0.1,0.4c0.8,1,2.4,2.2,4.2,3.4C256.1,230.2,258.1,231.3,259.7,232.1z"/>
	<path class={(injuryNames.some(e => e.name === 'Left Forearm'))?"st2":"st0"} onClick={()=>{handleInjuryName("Left Forearm"); }} d="M284,303.5c-3.3-6.6-7.2-15.9-9.9-24.9c-2.2-7.2-3.6-14.2-3.3-19.6c-0.6-1.4-1.2-2.8-1.9-4.2
		c-2.6-5.5-6.2-13-8.6-20.8c-1.7-0.7-4.5-2.1-6.9-3.7c-1.6-1-3-2.1-4-3.1c-0.7,1.8-1.8,4.3-2.9,6.6c0,0,0,0.1-0.1,0.1
		c4.5,3.8,6.8,9.3,9,14.4c0.8,1.8,1.6,3.6,2.4,5.2v0.1c1.1,2.2,2.4,4,3.5,5.4l0.5,0.7c0.5,0.7,1,1.5,1.6,2.3c0,0,0,0.1,0.1,0.1
		c3.3,5,6.8,12.1,9.8,19.4c3.4,8.3,6.2,16.9,7.3,23.1C281.8,304,282.9,303.7,284,303.5z"/>
	<path class={(injuryNames.some(e => e.name === 'Left Forearm'))?"st2":"st0"} onClick={()=>{handleInjuryName("Left Forearm"); }} d="M275,307.1c1.1-0.7,2.3-1.3,3.5-1.8c-3.9-7.8-7.8-17-10.9-25c-3-7.9-5.2-14.6-5.4-17.7c-0.5-0.7-1-1.4-1.4-2
		l-0.5-0.7c-1.1-1.5-2.4-3.3-3.7-5.6v-0.1c-0.9-1.6-1.6-3.4-2.4-5.3c-2.1-4.8-4.4-10-8.4-13.6c-1.2,2.3-2.5,4.2-3.7,4.8
		c1.8,5.6,4.5,11.3,7.5,17.2c2.4,2.3,10.1,10.6,16.6,23.6C269.9,288.1,273.2,296.9,275,307.1z"/>
	<path class={(injuryNames.some(e => e.name === 'Left Forearm'))?"st2":"st0"} onClick={()=>{handleInjuryName("Left Forearm"); }} d="M259.8,225.9L259.8,225.9c0.3,1.8,0.7,3.6,1.2,5.4c2.3,8.4,6.3,16.8,9.2,22.8c3.5,7.4,5.8,14.9,8.1,22.5
		c2.7,8.8,5.4,17.7,10.1,26.4c0.9,0,1.8,0,2.5,0.2c-1.9-5.2-3.3-10.2-4.6-15.3c-7.3-9.7-7.3-19.9-7.3-29.3c0-3.6,0-7.2-0.4-10.4
		c-3.1-14.8-7.3-28.1-17.5-39C258.8,213.9,258.7,219.8,259.8,225.9z"/>
	<path class={(injuryNames.some(e => e.name === 'Left Forearm'))?"st2":"st0"} onClick={()=>{handleInjuryName("Left Forearm"); }} d="M286.8,303.1c-4.5-8.6-7.2-17.3-9.8-26c-1.4-4.7-2.9-9.4-4.6-14c0.4,4.5,1.6,9.8,3.1,15.1
		c2.7,9.1,6.7,18.5,10,25.1C285.9,303.2,286.4,303.1,286.8,303.1z"/>
	<path class={(injuryNames.some(e => e.name === 'Left Forearm'))?"st2":"st0"} onClick={()=>{handleInjuryName("Left Forearm"); }} d="M281.3,262.8c-0.3-1.5-0.5-3-0.8-4.5c0,0.1,0,0.2,0,0.3c0,8-0.1,16.7,4.8,25.1
		C283.7,276.5,282.5,269.5,281.3,262.8z"/>
	<path class={(injuryNames.some(e => e.name === 'Left Forearm'))?"st2":"st0"} onClick={()=>{handleInjuryName("Left Forearm"); }} d="M264.4,266.2c0.9,3.4,2.6,8.2,4.6,13.5c2.7,7.1,6.2,15.2,9.7,22.4c-1.3-5.8-3.8-13.1-6.7-20.2
		C269.6,276.2,267,270.7,264.4,266.2z"/>
	<path class={(injuryNames.some(e => e.name === 'Left Forearm'))?"st2":"st0"} onClick={()=>{handleInjuryName("Left Forearm"); }} d="M273.7,308c-1.8-10.2-5.1-19.1-8.8-26.5c-4.4-8.7-9.3-15.3-12.7-19.3c0.1,0.3,0.3,0.5,0.4,0.8
		c6.9,13.2,14.7,28.2,18.6,47.6C271.7,309.7,272.6,308.8,273.7,308z"/>
	<path class="st0" d="M278.2,331.3c0.1-1.6-0.1-3.1-0.4-4.6c-0.8-4-2.8-7.2-5.6-9.5c0.2,1,0.4,2.1,0.6,3.3c1,5.9,2.1,12.8,3.8,18.9
		c1-2.8,1.5-5.4,1.6-7.8C278.2,331.5,278.2,331.4,278.2,331.3z"/>
	<path class="st0" d="M279.3,326.4c0.2,0.9,0.3,1.9,0.4,2.9c1.4-2.1,3.1-5.4,4-7.3c0.4-0.7,0.6-1.2,0.7-1.4l0,0
		c0.2-0.3,0.7-0.4,1-0.2c0.9,0.6,2,0.9,3.1,1c0.7,0.1,1.5,0,2.1,0c-0.2-0.9-0.2-1.9-0.1-2.8l0,0c0-0.1,0.1-0.3,0.1-0.5l0,0
		c0.5-1.8,2-3.1,3.8-4c0.7-0.3,1.5-0.6,2.3-0.7c-1.6-1.1-3.1-3.1-4.9-7.8c-0.1-0.3-0.2-0.6-0.3-0.9c-0.2-0.1-0.5-0.1-0.7-0.2
		c-0.8-0.2-1.7-0.2-2.7-0.2c-0.1,0-0.1,0-0.1,0c-0.9,0-1.7,0.1-2.7,0.3c-0.1,0-0.1,0-0.1,0c-1.6,0.3-3.2,0.7-4.8,1.3
		c-0.1,0.1-0.3,0.1-0.5,0.2c0,0,0,0-0.1,0c0,0,0,0-0.1,0c-1.8,0.7-3.4,1.5-4.8,2.5c-0.1,0.1-0.1,0.1-0.1,0.1c-1.3,1-2.4,2.1-2.9,3.3
		c-0.2,0.3-0.3,0.7-0.4,1c0.1,0.3,0.1,0.7,0.2,1l0,0c0.1,0.3,0.1,0.6,0.1,0.9C275.6,317.6,278.3,321.5,279.3,326.4z"/>
	<path class="st0" d="M292.1,318.6L292.1,318.6c0,0.1,0,0.2-0.1,0.3c-0.1,1-0.1,2,0.3,3c0,0.1,0,0.1,0,0.1c0.7,2.3,2.3,4.6,4.4,6.8
		c2.6,2.7,5.7,5.2,8.7,7.1c0,0,0.1,0,0.1,0.1c1.4,0.9,2.8,1.7,4.1,2.3c-0.2-0.4-0.3-0.8-0.5-1.2c-0.7-1.7-1.3-3.1-1.6-3.9l0,0
		c0,0,0-0.1-0.1-0.1c-0.1-0.6-0.2-1.1-0.2-1.7c-0.1-1.9,0.5-3.7,1.4-5s2.1-2.2,3.6-2.5c-1.6-2.3-3.1-4.2-4.1-5.1
		c-2.8-2.3-4.9-3.1-6.7-3.7l0,0c-0.3-0.1-0.6-0.1-0.9-0.2c-1.8-0.3-3.7,0-5.3,0.7C293.6,316.2,292.5,317.3,292.1,318.6z"/>
	<path class="st0" d="M309.8,327.2c-0.7,1.1-1.1,2.5-1.1,4.1c0,0.4,0.1,0.9,0.1,1.3c2,3.6,3.7,6.2,5.4,8.1c0.4-1.2,1.1-2.5,2-3.7
		c0.8-1,1.7-1.9,2.7-2.3c-1.9-3.2-4-6.6-5.9-9.5c-0.1,0-0.3,0-0.4,0.1C311.5,325.5,310.5,326.2,309.8,327.2z"/>
	<path class="st0" d="M322.2,340.2c-0.7-1.3-1.6-2.7-2.4-4.2c-0.8,0.3-1.6,1-2.3,1.9c-1,1.3-1.7,2.9-1.9,4c0.5,0.4,0.9,0.8,1.4,1.1
		c2.3,1.7,4.5,2,6.5,1.6c0.1,0,0.3-0.1,0.4-0.1c0.1-0.1,0.2-0.2,0.3-0.3c0.1-0.1,0.1-0.3,0.1-0.4s-0.1-0.3-0.1-0.4
		C323.6,342.6,323,341.5,322.2,340.2z"/>
	<path class="st0" d="M303.3,336.3c-2.7-1.8-5.5-4.1-7.7-6.5c-2.1-2.2-3.7-4.6-4.6-6.9c-0.7,0.1-1.7,0.1-2.7,0c-0.1,0-0.2,0-0.3-0.1
		c0.2,0.3,0.3,0.7,0.5,1.1C290.9,328.9,295.5,338.3,303.3,336.3z"/>
	<path class="st0" d="M287.2,324.7c-0.5-1-0.8-1.7-1.1-2.2c-0.3-0.1-0.6-0.2-0.8-0.3l-0.3,0.6c-0.2,0.4-0.4,0.8-0.7,1.3
		c-0.1,1.6,0,3.3,0.3,5c0.1,0.5,0.3,1.1,0.4,1.9c0.5,1.9,1.1,3.7,1.8,5.3c0.6,1.4,1.3,2.6,1.9,3.5c0.4,0.5,0.7,0.9,0.9,1.1
		c0.7-1.7,0.9-3.8,0.7-6c-0.2-2.3-0.7-4.6-1.1-6.2C288.4,327.2,287.8,325.8,287.2,324.7z"/>
	<path class="st0" d="M282.5,339.7c0.7-1.3,1-2.8,1.2-4.4c0.1-1.5,0.1-2.9-0.1-4.1c-0.1-0.6-0.3-1.2-0.4-1.8v-0.1
		c-0.1-0.8-0.2-1.6-0.3-2.3c-1,1.9-2.2,3.9-3.2,4.9c-0.1,3.1-0.9,6.4-2.4,10c0.1,0.2,0.1,0.4,0.2,0.7c0.7,0,1.4-0.1,2-0.3
		C280.9,341.8,281.8,340.9,282.5,339.7z"/>
	<path class="st0" d="M302.7,346.3c3.2-1.6,5.8-3.8,7.3-6.2c-1.5-0.6-3.2-1.5-5-2.7c-6.1,2.3-10.5-1.1-13.5-5.3
		c0.1,0.8,0.2,1.6,0.3,2.4c0.2,2.6,0,5.3-1.1,7.3c-0.1,0.1-0.2,0.3-0.3,0.3c-0.2,0.1-0.4,0.1-0.6,0.1c-0.7-0.1-1.4-0.7-2.2-1.8
		c-0.7-0.9-1.4-2.2-2-3.7c-0.1-0.3-0.2-0.5-0.3-0.8c-0.2,1.6-0.6,3.1-1.3,4.4c-0.9,1.5-2.1,2.7-3.9,3.3c-0.6,0.2-1.2,0.3-1.9,0.3
		c0.1,0.2,0.2,0.5,0.3,0.7c0.1,0.1,0.1,0.2,0.1,0.3c0,1.1,0,2,0,2.9c0.2,0.1,0.3,0.2,0.5,0.3c4.6,2.3,11.2,2.3,17.2,0.7
		C298.6,348.2,300.8,347.4,302.7,346.3C302.5,346.4,302.6,346.4,302.7,346.3z"/>
	<path class="st0" d="M278.1,356.3c-0.1,1.5-0.2,3.2-0.3,5.4c1.1-0.1,2.2,0,3.1,0.2s1.7,0.4,2.4,0.6l1.8-11.1
		c-2.5-0.2-4.8-0.8-6.7-1.7C278.3,352.2,278.2,354.1,278.1,356.3z"/>
	<path class="st0" d="M277.7,363.2c0,0.4,0,0.9,0,1.3c-0.1,1.8,0.5,2.8,1.2,3.3c0.3,0.2,0.7,0.3,1,0.4c0.4,0,0.8,0,1.1-0.2
		c0.9-0.3,1.6-1.1,1.7-2.3l0.3-1.9c-0.7-0.2-1.5-0.4-2.4-0.6C279.8,363.1,278.8,363.1,277.7,363.2z"/>
	<path class="st0" d="M295.3,366.8c-0.1-0.6-0.1-1.2-0.1-1.8c-0.3-4.7-0.7-9.8-0.6-14.3c-2.6,0.5-5.2,0.8-7.8,0.7
		c0.3,2.6,0.5,4.2,0.7,5.8c0.4,3.3,0.9,6.7,1.2,10c0.9-0.3,2-0.4,3.1-0.5C293.1,366.6,294.4,366.6,295.3,366.8z"/>
	<path class="st0" d="M295.4,368.3c-0.7-0.1-2-0.2-3.4-0.1c-1.2,0.1-2.4,0.3-3.1,0.5c0.1,0.6,0.1,1.2,0.2,1.8
		c0.4,3.2,1.5,5.2,2.7,5.9c0.4,0.3,0.8,0.4,1.2,0.4c0.4,0,0.8-0.2,1.1-0.5c0.9-0.8,1.5-2.4,1.4-4.8
		C295.5,370.6,295.5,369.5,295.4,368.3z"/>
	<path class="st0" d="M306.1,366c-1.5,0.1-4.1,0.3-6.4,1.7l0.6,2.9c0.5,2.5,2,4.3,3.5,4.9c0.5,0.2,1,0.3,1.4,0.2
		c0.4-0.1,0.8-0.3,1.1-0.6c0.8-0.9,1.2-2.7,0.5-5.7C306.5,368.2,306.3,367.1,306.1,366z"/>
	<path class="st0" d="M303.7,354.8c-0.4-2.1-0.9-4.3-1.4-6.6c-1.8,0.9-3.9,1.6-5.9,2.1c-0.1,0-0.2,0-0.3,0.1l3.2,15.8
		c2.3-1.3,4.8-1.5,6.4-1.7C305,361.2,304.4,358,303.7,354.8z"/>
	<path class="st0" d="M316.1,355.2c-1.4-4.4-3.5-9.5-5.2-13.8c-1.5,2.3-4,4.3-6.9,5.9c0.3,0.7,0.8,1.6,1.3,2.7
		c0.9,1.7,2,3.9,3.2,6.1c0.3,0.6,0.7,1.2,1,1.8c0.8-0.7,1.7-1.2,2.7-1.7C313.4,355.7,314.8,355.4,316.1,355.2z"/>
	<path class="st0" d="M312.7,357.7c-0.9,0.4-1.8,0.9-2.4,1.6c2.4,4,5.1,7,7,6c1.2-0.7,0.6-4.1-0.7-8.5
		C315.3,356.8,313.9,357.2,312.7,357.7z"/>
		<path class="st0" d="M142.4,62.7c0.8,0.7,1.6,1,2.4,0.6l-0.1-2.3c-0.1-1,1.4-1.1,1.5-0.1l0.1,2.7c0,0.1,0,0.2,0,0.2l0.3,7.4
		c0.1,1.2,0.6,2.5,1.5,3.8c0,0,0,0.1,0.1,0.1c1.4,2,3.4,4,5.8,5.8c0.1,0,0.1,0.1,0.2,0.1c1.4,1.1,3,2.1,4.5,3c0.1,0,0.1,0.1,0.2,0.1
		c3.1,1.7,6.2,2.8,8.2,2.7h0.4c1.3,0.1,3.1-0.4,5.1-1.3c0,0,0.1-0.1,0.2-0.1c0.9-0.4,1.8-0.9,2.7-1.4c0,0,0.1,0,0.1-0.1
		c1.6-0.9,3.1-1.9,4.6-3c0,0,0.1,0,0.1-0.1c2.4-1.8,4.5-3.8,5.8-5.8c0-0.1,0.1-0.1,0.1-0.2c0.9-1.3,1.4-2.5,1.5-3.7l0.3-7.4
		c0-0.1,0-0.1,0-0.2l0.1-2.7c0-1,1.5-0.9,1.5,0.1l-0.1,2.3c0.9,0.4,1.7,0.1,2.5-0.6c1-0.9,2-2.5,2.8-4.1c2-4.1,3.1-9.7,2.7-13.1
		c-0.1-0.9-0.3-1.7-0.6-2.1c-0.2-0.3-0.5-0.5-0.9-0.4c-0.9,0.2-2.1,1.2-3.7,3.4c-0.3,0.3-0.7,0.4-1,0.1c-0.2-0.2-0.3-0.4-0.3-0.7
		c1-12.2-0.7-21-4.7-26.7s-10.4-8.4-19-8.5c-8.5,0.1-14.9,2.8-18.9,8.5c-4.1,5.8-5.7,14.5-4.7,26.7c0,0.2-0.1,0.5-0.3,0.7
		c-0.3,0.3-0.8,0.2-1-0.1c-1.6-2.2-2.8-3.2-3.7-3.4c-0.4-0.1-0.7,0.1-0.9,0.4c-0.3,0.5-0.5,1.2-0.7,2.1c-0.4,3.5,0.7,9.1,2.7,13.1
		C140.4,60.2,141.4,61.7,142.4,62.7z"/>
	
</g>
<g className={front?"hide":"show"}>
<path class="st0" d="M376.8,348.6c-0.8-0.5-1.7-1.1-2.6-1.8c-0.9-0.6-1.6-1.3-2.3-2c-0.2,0.4-0.5,0.8-0.7,1.2
		c-0.7,1.3-1.4,2.4-1.8,3.1c-0.1,0.1-0.1,0.3-0.1,0.4s0,0.3,0.1,0.4s0.1,0.3,0.3,0.3c0.1,0.1,0.2,0.1,0.4,0.1
		c2.1,0.4,4.2,0.1,6.6-1.6C376.6,348.7,376.7,348.7,376.8,348.6z"/>
	<path class="st0" d="M375.1,345.6c1,0.7,2,1.5,2.9,2c1.2-1.1,2.4-2.6,3.7-4.5c-0.4-2.7-0.3-6.6,0.8-9.6c0.4-1.1,0.9-2,1.6-2.7
		c0.7-0.8,1.6-1.3,2.6-1.5c0.9-0.2,1.9-0.1,3.1,0.3c0,0,0.1,0,0.1,0.1l0,0c1.5,0.9,2.4,2.2,2.6,3.8c0,0.2,0.1,0.5,0.1,0.7
		c0.9-1.7,1.6-3.6,2.2-5.5c1.2-3.9,1.8-7.6,2-9.5c-1.1,0.8-2.2,1.1-3.6,1.4c-2,0.5-4.4,1.1-7.8,4c-2.9,2.3-8.6,12-12.7,19
		C373.3,344.1,374.2,344.9,375.1,345.6z"/>
	<path class="st0" d="M384.6,338.2c0.3-0.7,1.2-2.4,2-4.1c0.7-1.3,1.3-2.5,1.8-3.3c-0.5-0.1-1-0.1-1.4,0c-0.7,0.1-1.3,0.5-1.8,1
		c-0.5,0.6-0.9,1.3-1.3,2.2c-0.8,2.1-1,4.8-0.9,7C383.5,340.1,384,339.2,384.6,338.2L384.6,338.2z"/>
	<path class="st0" d="M388.2,341c1-1.1,1.8-2.3,2.3-3.6c0.5-1.3,0.7-2.5,0.5-3.7c-0.1-0.9-0.5-1.7-1.2-2.3c-0.4,0.7-1.1,2.1-1.8,3.4
		c-1,1.9-2,3.9-2,3.9c0,0.1,0,0.1,0,0.2v0.1c-0.3,0.8-0.9,2.1-1.6,3.9c-0.1,0.3-0.2,0.5-0.3,0.8C385.4,343.3,386.9,342.3,388.2,341z
		"/>
	<path class="st0" d="M389.8,352.4L389.8,352.4c0.1-0.1,0.1-0.2,0.2-0.3c3.5-2.4,7.6-7.9,11.1-13.8c3.4-5.8,6.1-12.1,6.8-16.2
		l-9.7-3.6c-0.1,2.1-0.6,6.3-2,10.5c-1,3.3-2.6,6.8-4.6,9.4c-0.6,1.2-1.4,2.4-2.3,3.4c-1.7,1.9-3.9,3.1-5.9,3.1
		c-2.2,5.3-5.1,12.6-6.7,18.1c1.2,0.9,3.7,2.5,5,3.3c0.1,0.1,0.3,0.1,0.3,0.2c1-1.5,2-3.1,2.9-4.8c1.2-2.2,2.3-4.4,3.2-6.1
		C388.8,354.2,389.4,353.1,389.8,352.4z"/>
	<path class="st0" d="M376.2,364.7c-0.9,3.3-1,5.6-0.1,6.2c1.4,0.8,3.2-0.6,5-3c-0.1-0.1-0.2-0.1-0.3-0.2
		C379.6,367,377.5,365.6,376.2,364.7z"/>
	<path class="st0" d="M386.4,376.1c-0.4,2.4,0,3.9,0.7,4.7c0.3,0.3,0.7,0.5,1.1,0.6c0.5,0.1,0.9,0,1.4-0.2c1.1-0.5,2.3-1.6,3-3.2
		c-0.3-0.1-0.6-0.1-0.9-0.2C390,377.5,388.2,377.1,386.4,376.1z"/>
	<path class="st0" d="M397.8,378.8c0.1,1.6,0.7,2.7,1.4,3.3c0.3,0.3,0.7,0.4,1.1,0.5c0.4,0,0.8-0.1,1.2-0.4c0.8-0.5,1.5-1.4,2-2.9
		c-1.1,0-2.7-0.2-4.1-0.3C398.8,378.9,398.3,378.8,397.8,378.8z"/>
	<path class="st0" d="M410.5,370.9l0.1,0.6c0.2,1.1,0.9,1.9,1.8,2.3c0.3,0.1,0.7,0.2,1.1,0.2s0.7-0.1,1-0.4c0.7-0.5,1.2-1.5,1.2-3.1
		c-1.1,0.2-2.6,0.3-3.8,0.3C411.3,370.8,410.9,370.8,410.5,370.9z"/>
	<path class="st0" d="M415.7,369.4c-0.1-3.1-0.2-5.4-0.3-7.4c-0.2-3.2-0.3-6-0.3-11.3c0-0.1,0-0.2,0.1-0.3l0,0
		c0.1-3.9-0.2-8.1-0.6-12.1c-0.6-5.9-1.6-11.3-2.2-14.5l-2.6-1c0.3,2.5,0.4,6.6,0.3,11c-0.1,6.7-0.6,14.1-1,16.9
		c-0.1,0.4-0.3,2.3-0.6,4c-0.1,0.7-0.2,1.3-0.2,1.6c0,0,0,0,0,0.1l2.1,13.1c0.4,0,0.9-0.1,1.5-0.1
		C413.4,369.2,415.4,369.6,415.7,369.4z"/>
	<path class="st0" d="M416,338.1c0.3,2.6,0.5,5.2,0.6,7.8c1.7-6.1,2.9-13.1,3.9-19.1l-6.5-2.4C414.6,327.7,415.4,332.7,416,338.1z"
		/>
	<path class="st0" d="M408.4,326.1c-1.2,3.9-3.5,8.6-6.1,13.1c-3.5,5.9-7.6,11.4-11.2,14.1c-0.5,2.6-1,5-1.5,7.3
		c-0.9,4.6-1.8,9.1-2.9,14.1c1.7,1,3.6,1.4,5.3,1.7c0.4,0.1,0.7,0.1,1.1,0.2c0-0.1,0-0.2,0.1-0.3l4.2-20.8c0.1-0.3,0.3-0.6,0.7-0.6
		c0.4,0,0.7,0.3,0.8,0.7c0.2,4.6-0.2,10.1-0.6,15.1c-0.2,2.3-0.3,4.6-0.4,6.5c0.5,0.1,1.1,0.1,1.8,0.2c1.7,0.2,3.7,0.4,4.4,0.4
		c0.1-0.5,0.2-1,0.3-1.6c0.5-4.3,1.1-8.8,1.6-13.3c0.2-1.7,0.4-3.3,0.8-6.2v-0.1c0-0.2,0.1-1.1,0.3-2.2c0.2-1.6,0.5-3.6,0.6-4
		c0.5-2.8,0.9-10,1-16.7C408.5,331,408.5,328.3,408.4,326.1z"/>
	<path class={(injuryNames.some(e => e.name === 'Left Wrist'))?"st2":"st0"} onClick={()=>{handleInjuryName("Left Wrist"); }} d="M420.2,318.4h-0.1l-2.4-0.8l0,0h-0.1l-3.5-1.2H414l-3.2-1.1h-0.1h-0.1l-4.4-1.5c-0.1,0-0.1,0-0.1-0.1l-4.9-1.6
		c-0.9,2.3-1.8,3.9-2.6,5.1l10.3,3.8c0,0,0,0,0.1,0l4.2,1.5l0,0l7.5,2.8c0.3-1.9,0.6-3.7,0.9-5.3l0,0c0.1-0.3,0.1-0.7,0.2-1
		L420.2,318.4L420.2,318.4z"/>
	<path class="st0" d="M409.4,301.8c2.6-6.1,5.9-12.3,7-13.7c0.2-1.7,0.3-3.3,0.5-4.8c0.6-6.6,1.2-12.5,5.1-23.4
		c-0.3-11.9-0.5-24.3,2-33.6c-6.8,12.3-9.3,26.7-12,42.3c-2.3,13.4-4.8,27.7-10.3,42.2l4,1.3C406.3,309.4,407.7,305.6,409.4,301.8z"
		/>
	<path class="st0" d="M407.2,312.5l3.2,1.1c3.2-9.8,4.6-16.5,5.4-21.9c-1.4,2.6-3.4,6.6-5.2,10.7C409.1,306.2,407.7,310,407.2,312.5
		z"/>
	<path class="st0" d="M418.9,297.2c1.2-3.8,2.2-7.1,2.8-9.5c0-0.1,0.1-0.3,0.1-0.4c0.9-5.8,0.7-14.2,0.4-23.3
		c-2.7,8.5-3.2,13.6-3.7,19.4c-0.2,1.6-0.3,3.2-0.5,5v0.1c-0.7,6-2,13.5-6,25.6l1.9,0.7C415.4,308.5,417.3,302.4,418.9,297.2z"/>
	<path class="st0" d="M420.4,297.6C420.3,297.6,420.3,297.6,420.4,297.6c-1.6,5.3-3.6,11.4-5.2,17.6l2.2,0.7
		C418.6,310.5,419.5,303.7,420.4,297.6z"/>
	<path class="st0" d="M423.4,259.3c0.1,0.2,0.1,0.4,0.1,0.7c0,0,0,0.1-0.1,0.1c0.1,1.3,0.1,2.5,0.1,3.8c0.3,9.2,0.6,17.8-0.3,23.8
		c0,0.1-0.1,0.3-0.1,0.4s0,0.1,0,0.1c-0.3,2.2-0.7,4.9-1.1,7.8c-0.9,6.7-1.9,14.5-3.3,20.5l1.1,0.4l0.3-1.6
		c1.1-5.5,2.4-11.5,4.3-16.5c2.8-7.4,5.2-14.9,7.4-22.5c0.2-0.5,0.3-1.1,0.5-1.6c1.1-12.8-1.5-22.8-3.7-31.4
		c-1.7-6.7-3.2-12.6-2.7-18.4C423,233.8,423.1,246.9,423.4,259.3z"/>
	<path class="st0" d="M440.8,246.3c-0.5,2.9-1,5.6-1.4,7.3c-1.7,7.2-3.5,14.3-5.6,21.3v0.1c-0.1,0.5-0.3,1.1-0.5,1.6
		c-2.2,7.6-4.6,15.1-7.5,22.6c-1.8,4.9-3.1,10.8-4.2,16.3l-0.4,1.8l0.8,0.3c3.8-20,11.8-35.3,18.8-48.7c0.1-0.2,0.2-0.4,0.3-0.6
		c0.7-4.5,0.9-8.9,0.6-13.3C441.6,252,441.3,249.1,440.8,246.3z"/>
	<path class="st0" d="M444.8,240.8c-1.2,0.7-2.3,1.2-3.3,1.4c0.9,4.2,1.6,8.3,1.8,12.6c0.2,3.1,0.1,6.3-0.2,9.6
		c2.7-5.2,5.1-10.2,7-15.1c-0.7-1.7-1.8-3.7-2.8-5.3C446.4,242.6,445.6,241.5,444.8,240.8z"/>
	<path class="st0" d="M446.1,240c0.8,0.8,1.6,1.9,2.4,3.1c0.8,1.3,1.6,2.7,2.3,4.1c1.8-5.2,2.9-10.4,3-15.7c-1.4,2.4-3,4.5-4.8,6.1
		C448.1,238.5,447.1,239.3,446.1,240z"/>
	<path class="st0" d="M444.5,239.3L444.5,239.3c1.2-0.7,2.4-1.7,3.6-2.8c1.6-1.5,3.1-3.4,4.3-5.6c-2.3,1.4-5,2.3-7.7,2.4h-0.1
		c-0.4,0-0.8,0.1-1.2,0.1c-0.9,0-1.7-0.1-2.5-0.2c0.6,2,0.7,4.7,0.6,7.5C442.3,240.4,443.4,239.9,444.5,239.3z"/>
	<path class="st0" d="M438.7,249.5c0.4-2.1,0.8-4.5,1.1-6.9c0.4-3.9,0.4-7.6-0.7-9.8c-1-0.3-1.9-0.7-2.7-1.1c-0.4-0.2-0.7-0.4-1-0.6
		c0,0-0.1,0-0.1-0.1c-1.6-1.2-2.9-2.7-3.8-4.7c-0.9-2.2-1.3-4.9-0.9-8.2c-1.9,5.1,0.3,10.1,3,16
		C435.6,238.6,437.9,243.5,438.7,249.5z"/>
	<path class="st0" d="M434.1,268.3c1.2-4.5,2.4-9,3.5-13.6c0.1-8-2.8-14.3-5.3-20c-2.3-5.1-4.3-9.5-3.9-14.1
		c-2.2,6.9-0.4,13.9,1.8,22.2C432,250,434,258.2,434.1,268.3z"/>
	<path class="st0" d="M435.3,229.1c1.1-5,0.6-8.5,0.2-11.7c-0.4-2.6-0.7-5.1-0.3-8.2c0.8-5.5,2.2-11,4-16.1V193
		c0.1-0.5,0.3-0.9,0.5-1.4c2-5.5,4.3-10.5,6.3-14.7l0.4-0.8c2-4,4.1-8.1,4.5-11c-3.6,3.6-7.5,7-11.4,9.4c0.3,1.6,0.6,3.2,0.9,4.8
		c0,0.1,0,0.2,0,0.3c-1.1,5.2-2.2,8.8-3.3,12.2c-1.8,6.1-3.4,11.1-4.1,22l0,0v0.1c0,0.1,0,0.1,0,0.1c-1.6,5-1.5,9-0.3,11.8
		C433.4,227,434.2,228.1,435.3,229.1z"/>
	<path class="st0" d="M447.1,203.4c0-1.9-0.1-4.9-1-7c-0.9-1.9-2.5-3.1-5.7-2.5c-1.6,4.9-3,10.1-3.8,15.5c-0.4,2.9-0.1,5.2,0.3,7.7
		c0.5,3.6,1,7.3-0.3,13c0.2,0.1,0.3,0.2,0.5,0.3c0.8,0.5,1.7,0.8,2.7,1.1h0.1c1.2,0.3,2.4,0.5,3.6,0.5c0.1,0,0.1,0,0.2,0
		c-0.6-3.2,0.7-10,1.8-16.5C446.3,210.6,447.1,206,447.1,203.4z"/>
	<path class="st0" d="M465.8,176.6c-1.4-8.8-2.6-17.8-3-26.4c-1.8,3.1-5.2,7.7-9.4,12.2c-0.3,0.3-0.6,0.6-0.8,0.9
		c0.3,3.4-2.3,8.5-4.8,13.3l-0.4,0.8c-2.1,4.2-4.4,9.1-6.3,14.6c0,0.1-0.1,0.1-0.1,0.2c3.5-0.5,5.4,1.2,6.5,3.5
		c1.1,2.4,1.2,5.5,1.2,7.6c0,2.7-0.9,7.4-1.8,12.3c-1.2,6.6-2.5,13.6-1.8,16.1c3.2-0.3,6.4-1.6,8.8-3.8c2.5-8.2,5.2-14.5,7.5-20
		c3-7,5.5-12.9,6.5-20C467.1,184.3,466.4,180.5,465.8,176.6z"/>
	<path class={(injuryNames.some(e => e.name === 'Left Posterior Shoulder'))?"st2":"st0"} onClick={()=>{handleInjuryName("Left Posterior Shoulder"); }} d="M451.1,162.7c0.1-0.1,0.2-0.3,0.3-0.3c0.3-0.3,0.6-0.6,0.9-0.9c5.7-6.2,10-12.5,10.3-14.3c0-0.1,0-0.1,0-0.1
		c-0.1-2.7-0.1-5.4,0-8c0,0,0,0,0-0.1c0-0.3,0.2-0.6,0.5-0.7c0,0,0,0,0.1,0c4.3-1.8,7.7-4,10.7-6.1c4.9-3.3,9.1-6.1,15.6-6.1
		c-2-3.6-4.4-7-7-9.3c-5.5-0.7-10.6-0.5-15.1,0.5c-8.1,1.9-14.6,6.3-19.3,12.5c-4.7,6.3-7.7,14.3-8.9,23.1c-0.9,6.3-0.8,13,0.1,19.8
		C443.3,170.2,447.4,166.5,451.1,162.7z"/>
	<path class={(injuryNames.some(e => e.name === 'Left Shoulder Blade'))?"st2":"st0"} onClick={()=>{handleInjuryName("Left Shoulder Blade"); }} d="M464.1,145.5c2.4,1.4,4.8,3.6,7.6,6.1c0.6,0.5,1.2,1.1,1.8,1.7c-0.1-0.3-0.2-0.5-0.3-0.8
		c-2.1-4.9-5.3-12.5-9.1-12.9C464,141.5,464,143.5,464.1,145.5z"/>
	<path class={(injuryNames.some(e => e.name === 'Left Shoulder Blade'))?"st2":"st0"} onClick={()=>{handleInjuryName("Left Shoulder Blade"); }} d="M474.5,151.9c0.8,1.8,1.4,3.2,1.8,3.8c5.8,4.8,13.2,9.7,23.8,11.6c-2.1-5.6-2.4-10.1-2.7-14.8
		c-0.2-3.2-0.5-6.5-1.3-10.2c-0.6-2.8-2.7-8.9-5.9-14.8c-6.5-0.2-10.7,2.5-15.6,5.8c-2.6,1.7-5.4,3.6-8.8,5.2
		C469.7,140.5,472.6,147.2,474.5,151.9z"/>
	<path class={(injuryNames.some(e => e.name === 'Left Shoulder Blade'))?"st2":"st0"} onClick={()=>{handleInjuryName("Left Shoulder Blade"); }} d="M483.3,173.8c5.1-0.3,10.7-1.7,16-5.2c-10.7-2-18.1-6.9-24-11.8l-0.1-0.1c-1.7-1.4-3.2-2.8-4.6-4.1
		c-2.4-2.1-4.5-4-6.5-5.4c0.3,7.2,1,14.7,2.1,22.2C469,171.9,475.6,174.2,483.3,173.8z"/>
	<path class={(injuryNames.some(e => e.name === 'Left Middle Back'))?"st2":"st0"} onClick={()=>{handleInjuryName("Left Middle Back"); }} d="M477.9,221.8c1.2,4,2,7.3,2.3,10.7c0,0.3,0.1,0.7,0.1,1c2,3.2,2.7,6,3.6,9c0.2,0.7,0.4,1.5,0.6,2.2
		c0,0.1,0,0.1,0.1,0.2c0.8,2.7,1.8,5.5,4,8.9c2,3.1,3.8,6.2,5,9.8c0.1,0.3,0.2,0.5,0.3,0.8c5.5-10,11.1-22.3,15.7-33.4
		c5.2-12.9,9-24.1,9.6-28.7c-4.1-9.2-8.8-17-12.4-23.2c-2.4-4-4.3-7.2-5.6-9.8c-5.8,4-12,5.7-17.6,5.9c-7.1,0.4-13.4-1.5-16.9-3.7
		c0.2,1.6,0.5,3.2,0.8,4.8c0.6,3.9,1.4,7.7,2.1,11.5c0,0,0,0,0,0.1C472.1,201.2,475.3,213.3,477.9,221.8z"/>
	<path class={(injuryNames.some(e => e.name === 'Trapez'))?"st2":"st0"} onClick={()=>{handleInjuryName("Trapez"); }} d="M491.4,126.4C491.4,126.4,491.4,126.5,491.4,126.4c3.3,6.2,5.6,12.7,6.3,15.6c0.9,3.8,1.1,7.1,1.3,10.4
		c0.3,4.9,0.7,9.7,3.1,15.6c1.1,2.6,3.2,6.2,5.8,10.5c5.3,8.9,12.6,21.1,17.4,36.1V91.9c-2.1,2.2-5.8,4.9-10,7.6
		c-6.3,4-13.7,7.9-17.7,9.2c-2.5,1.5-5.4,3.1-8.8,4.9c-1.5,0.8-3,1.6-4.7,2.5C486.8,118.8,489.3,122.5,491.4,126.4
		C491.3,126.3,491.4,126.4,491.4,126.4z"/>
	<path  class={(injuryNames.some(e => e.name === 'Trapez'))?"st2":"st0"} onClick={()=>{handleInjuryName("Trapez"); }} d="M536.7,99.5c-4.2-2.6-7.9-5.4-10-7.6v122.7c4.8-15,12.1-27.2,17.4-36.2c2.6-4.3,4.7-7.8,5.8-10.5
		c2.5-5.9,2.8-10.7,3.1-15.6c0.2-3.3,0.4-6.6,1.3-10.4c0.7-2.9,2.9-9.4,6.2-15.5c0,0,0,0,0-0.1c0,0,0-0.1,0.1-0.1
		c2.1-3.8,4.5-7.5,7.2-10.1c-1.6-0.9-3.2-1.8-4.7-2.5c-3.4-1.8-6.3-3.4-8.8-4.9C550.5,107.4,543.1,103.5,536.7,99.5z"/>
	<path class="st0" d="M500.9,72.4c0.6,0.6,1.2,1,1.8,1.1c-0.4-2.7-0.8-5.4-1.1-8c-0.4-3.1-0.7-6.3-0.9-9.3c-1.5-2-2.7-2.9-3.5-3.1
		c-0.4-0.1-0.7,0.1-0.9,0.3c-0.3,0.5-0.5,1.2-0.7,2.2c-0.4,3.4,0.7,9,2.7,13.1C499.1,70.1,500,71.5,500.9,72.4z"/>
	<path class="st0" d="M551.1,72.4c0.9-0.9,1.8-2.3,2.5-3.8c2.1-4.1,3.1-9.7,2.7-13.1c-0.1-1-0.3-1.7-0.7-2.2
		c-0.2-0.3-0.5-0.4-0.9-0.3c-0.8,0.2-2,1.1-3.5,3.1c-0.2,3.1-0.5,6.2-0.9,9.3c-0.3,2.6-0.7,5.3-1.1,8
		C549.8,73.4,550.5,73,551.1,72.4z"/>
	<path class="st0" d="M548.9,65.3c0.1-0.8,0.2-1.5,0.3-2.3c-0.6,0.5-1.3,0.9-2,1.3c-0.1,1.2-0.2,2.9-0.4,5.2c-0.3,3.8-0.7,9-1,13.8
		c0-0.1,0.1-0.1,0.1-0.1c0.4-0.7,0.7-1.5,0.8-2.1C547.4,75.7,548.2,70.4,548.9,65.3z"/>
	<path class="st0" d="M538.8,85.6c0.3,1,0.6,2,0.9,3c1.1,3.6,2.6,6.8,4.4,9.2c-0.4-2.2-0.3-6.7-0.1-11.7c0-0.1,0-0.1,0-0.2
		c0.3-5.6,0.8-11.9,1.2-16.5c0.1-1.7,0.3-3.1,0.3-4.2c-0.6,0.3-1.2,0.5-1.8,0.7c0.3,3.6,0,7.2-0.9,10.6
		C542.1,79.7,540.7,82.8,538.8,85.6z"/>
	<path class="st0" d="M541.1,66.8c-1.5,0.5-3.2,0.8-4.9,1.1c0.1,3.6,0.7,9.7,2,15.7c1.4-2.3,2.5-4.8,3.1-7.5c0.8-3.1,1-6.4,0.9-9.7
		C541.9,66.6,541.5,66.7,541.1,66.8z"/>
	<path class={(injuryNames.some(e => e.name === 'Neck'))?"st2":"st0"} onClick={()=>{handleInjuryName("Neck"); }} d="M526.7,68.8v20.6c1.3,2.1,5.7,5.4,10.8,8.7c3.6,2.3,7.4,4.5,10.8,6.2c-1-0.9-1.8-1.9-2.5-2.9
		c-3.4-2.4-5.8-7.2-7.6-12.5c-2.4-7.4-3.4-16.1-3.5-20.9C532.2,68.6,529.4,68.8,526.7,68.8z"/>
	<path class={(injuryNames.some(e => e.name === 'Neck'))?"st2":"st0"} onClick={()=>{handleInjuryName("Neck"); }} d="M525.2,89.5V68.8c-2.7-0.1-5.4-0.3-8-0.7c-0.1,4.8-1.1,13.4-3.5,20.9c-1.7,5.3-4.2,10-7.6,12.5
		c-0.7,1-1.5,1.9-2.5,2.9c3.4-1.7,7.3-3.9,10.8-6.2C519.5,95,523.9,91.6,525.2,89.5z"/>
	<path class="st0" d="M515.7,67.9c-1.7-0.3-3.3-0.7-4.9-1.1c-0.4-0.1-0.8-0.2-1.2-0.4c-0.2,3.3,0.1,6.6,0.9,9.7
		c0.7,2.6,1.7,5.2,3.1,7.5C515,77.6,515.6,71.6,515.7,67.9z"/>
	<path class="st0" d="M506.4,65.2c0.1,1.1,0.2,2.5,0.3,4.2c0.4,4.6,0.9,10.9,1.2,16.5c0,0.1,0,0.1,0,0.2c0.2,5,0.3,9.4-0.1,11.7
		c1.8-2.4,3.3-5.6,4.5-9.2c0.3-1,0.6-2,0.9-3c-2-2.8-3.3-5.8-4.1-9.1c-0.9-3.4-1.1-7-0.9-10.6C507.6,65.7,507,65.4,506.4,65.2z"/>
	<path class="st0" d="M506.2,83.2l0.1,0.1c-0.3-4.9-0.7-10-1-13.8c-0.2-2.2-0.3-4-0.4-5.2c-0.7-0.4-1.4-0.9-2-1.3
		c0.1,0.8,0.2,1.5,0.3,2.3c0.6,5.1,1.4,10.4,2.3,15.8C505.5,81.8,505.8,82.5,506.2,83.2z"/>
	<path class="st0" d="M502.2,55.6c0.1,0.2,0.1,0.4,0,0.6c0.1,1.5,0.2,3,0.4,4.6c1.8,2,4.8,3.5,8.6,4.6c4.4,1.3,9.6,1.9,14.7,2
		c5.1-0.1,10.4-0.7,14.8-2c3.7-1.1,6.8-2.6,8.6-4.6c0.1-1.5,0.3-3.1,0.4-4.6c-0.1-0.2-0.1-0.4,0-0.6c0.1-1.8,0.2-3.5,0.2-5.2
		c0.1-10.2-1.9-17.7-6-22.5c-4-4.8-10.1-7.2-18-7.3c-7.9,0.1-13.9,2.4-18,7.3s-6.1,12.3-6,22.5C502.1,52.1,502.1,53.8,502.2,55.6z"
		/>
	<path class={(injuryNames.some(e => e.name === 'Right Shoulder Blade'))?"st2":"st0"} onClick={()=>{handleInjuryName("Right Shoulder Blade"); }} d="M577.4,151.9c2-4.6,4.9-11.4,8.7-13.3c-3.5-1.7-6.3-3.5-8.8-5.2c-4.9-3.3-9.1-6.1-15.6-5.8
		c-3.1,5.9-5.3,12-5.9,14.8c-0.8,3.7-1,7-1.3,10.2c-0.3,4.7-0.6,9.2-2.7,14.8c10.6-1.9,18-6.8,23.8-11.6
		C576.1,155.1,576.7,153.7,577.4,151.9z"/>
	<path class={(injuryNames.some(e => e.name === 'Right Posterior Shoulder'))?"st2":"st0"} onClick={()=>{handleInjuryName("Right Posterior Shoulder"); }} d="M578.1,132.1c3.1,2,6.4,4.2,10.7,6.1h0.1c0.3,0.1,0.5,0.4,0.5,0.7c0,0,0,0,0,0.1c0.1,2.6,0.1,5.3,0,8v0.1
		c0.3,1.9,4.6,8.1,10.3,14.3c0.3,0.3,0.6,0.6,0.9,0.9c0.1,0.1,0.3,0.2,0.3,0.3c3.6,3.8,7.7,7.5,11.7,10c0.9-6.8,1-13.5,0.1-19.8
		c-1.2-8.9-4.2-16.9-8.9-23.1c-4.7-6.2-11.2-10.7-19.3-12.5c-4.5-1-9.5-1.2-15.1-0.5c-2.6,2.3-4.9,5.7-7,9.3
		C569,126,573.2,128.8,578.1,132.1z"/>
	<path class={(injuryNames.some(e => e.name === 'Right Shoulder Blade'))?"st2":"st0"} onClick={()=>{handleInjuryName("Right Shoulder Blade"); }} d="M587.9,139.6c-3.8,0.4-7,7.9-9.1,12.9c-0.1,0.3-0.2,0.5-0.3,0.8c0.7-0.6,1.2-1.1,1.8-1.7
		c2.7-2.5,5.2-4.7,7.6-6.1C587.9,143.5,587.9,141.5,587.9,139.6z"/>
	<path class={(injuryNames.some(e => e.name === 'Right Shoulder Blade'))?"st2":"st0"} onClick={()=>{handleInjuryName("Right Shoulder Blade"); }} d="M587.8,147.3c-2,1.3-4.1,3.3-6.5,5.4c-1.4,1.3-3,2.7-4.6,4.1c-0.1,0-0.1,0.1-0.1,0.1
		c-5.8,4.9-13.2,9.8-24,11.8c5.3,3.5,10.9,4.9,16,5.2c7.7,0.4,14.3-1.9,17.1-4.2C586.8,162.1,587.6,154.5,587.8,147.3z"/>
	<path class="st0" d="M606.9,231.8c0.7-2.5-0.6-9.5-1.8-16.1c-0.9-4.9-1.8-9.6-1.8-12.3c0-2.1,0.1-5.2,1.2-7.6c1.1-2.3,3-4,6.5-3.5
		c0-0.1-0.1-0.1-0.1-0.2c-1.9-5.4-4.2-10.4-6.3-14.6l-0.4-0.8c-2.4-4.8-5-9.9-4.7-13.3c-0.3-0.3-0.6-0.6-0.9-0.9
		c-4.2-4.6-7.6-9.2-9.4-12.2c-0.5,8.6-1.6,17.6-3,26.4c-0.7,3.9-1.4,7.7-2.1,11.5c1,7.2,3.5,13,6.5,20c2.4,5.5,5,11.7,7.6,20
		C600.5,230.2,603.7,231.5,606.9,231.8z"/>
	<path class="st0" d="M611.5,179.1c0.4-1.6,0.7-3.1,0.9-4.8c-3.9-2.3-7.8-5.7-11.4-9.4c0.5,2.9,2.6,7.1,4.5,11l0.4,0.8
		c2.1,4.2,4.4,9.2,6.3,14.7c0.2,0.5,0.3,0.9,0.5,1.4v0.1c1.7,5.1,3.2,10.6,4,16.1c0.4,3.1,0.1,5.6-0.3,8.2
		c-0.4,3.2-0.9,6.7,0.2,11.7c1-0.9,1.8-2,2.4-3.4c1.2-2.9,1.4-6.8-0.3-11.8l0,0v-0.1v-0.1l0,0c-0.7-10.9-2.2-15.9-4.1-22
		c-1-3.3-2.2-7-3.3-12.2C611.5,179.3,611.5,179.2,611.5,179.1z"/>
	<path class={(injuryNames.some(e => e.name === 'Right Middle Back'))?"st2":"st0"} onClick={()=>{handleInjuryName("Right Middle Back"); }} d="M582.6,187.8c0.8-3.8,1.5-7.6,2.1-11.5c0.3-1.6,0.5-3.1,0.7-4.8c-3.5,2.1-9.8,4.1-16.9,3.7
		c-5.6-0.3-11.8-1.9-17.6-5.9c-1.2,2.6-3.2,5.9-5.5,9.8c-3.7,6.2-8.4,14-12.5,23.2c0.5,4.6,4.3,15.9,9.6,28.7
		c4.6,11.1,10.2,23.3,15.7,33.4c0.1-0.3,0.2-0.5,0.3-0.8c1.2-3.7,3-6.7,5-9.8c2.1-3.4,3.2-6.2,4-8.9c0-0.1,0-0.1,0.1-0.2
		c0.2-0.7,0.4-1.5,0.6-2.2c0.8-3,1.6-5.8,3.6-9c0-0.3,0.1-0.7,0.1-1c0.3-3.4,1.1-6.8,2.3-10.7C576.6,213.3,579.9,201.2,582.6,187.8
		C582.6,187.9,582.6,187.8,582.6,187.8z"/>
	<path class={(injuryNames.some(e => e.name === 'Lower Back'))?"st2":"st0"} onClick={()=>{handleInjuryName("Lower Back"); }} d="M541.1,231.7c-4.6-11.2-8.1-21.2-9.3-26.8c-2,4.7-3.7,9.7-5.2,15.1v77.5c5.6-7.5,11.2-12.5,16.6-15.8
		c4-2.4,7.9-3.8,11.6-4.6c0.8-0.1,1.6-0.3,2.4-0.4c-0.4-3.9-0.3-7.2,0.3-10C551.9,256.3,545.9,243.4,541.1,231.7z"/>
	<path class={(injuryNames.some(e => e.name === 'Lower Back'))?"st2":"st0"} onClick={()=>{handleInjuryName("Lower Back"); }} d="M525.2,219.9c-1.4-5.3-3.2-10.3-5.1-15c-1.2,5.6-4.7,15.6-9.2,26.8c-4.8,11.7-10.7,24.6-16.6,35
		c0.6,2.9,0.7,6.1,0.3,10c0.8,0.1,1.6,0.2,2.4,0.4c3.7,0.8,7.6,2.2,11.6,4.6c5.4,3.3,11,8.3,16.6,15.8V219.9z"/>
	<path class="st0" d="M571.5,236.9c-0.9,2-1.4,4-2,6c-0.1,0.2-0.1,0.5-0.2,0.7c0.1,0,0.2-0.1,0.3-0.1c0.7-0.2,1.4-0.4,2.2-0.6
		C571.6,240.8,571.5,238.8,571.5,236.9z"/>
	<path class="st0" d="M568.2,247.4c0.8,0.2,1.6,0.5,2.3,0.7c0.7,0.3,1.4,0.6,2,1c-0.2-1.6-0.4-3.1-0.6-4.7c-0.7,0.1-1.3,0.3-1.9,0.5
		c-0.5,0.2-0.9,0.4-1.2,0.6C568.6,246.2,568.4,246.8,568.2,247.4z"/>
	<path class="st0" d="M567,250.5c1.6,1.2,3.2,2.6,4.6,4.2c0.9,0.9,1.6,1.9,2.4,2.8c-0.4-2.1-0.8-4.3-1.2-6.4c-0.1,0-0.3-0.1-0.4-0.1
		c-0.9-0.6-1.6-1-2.5-1.4c-0.7-0.3-1.4-0.5-2.3-0.7C567.4,249.4,567.2,250,567,250.5z"/>
	<path class="st0" d="M564.9,254.4c2.5,2.6,4.8,6.5,7.2,10.6c1.6,2.7,3.2,5.5,5,8.1c-0.5-2.9-1.2-5.8-1.8-8.8
		c-0.2-1.1-0.5-2.2-0.7-3.3l0,0c-1.2-1.8-2.6-3.6-4.1-5.2c-1.3-1.4-2.7-2.7-4.2-3.8C565.9,252.7,565.4,253.5,564.9,254.4z"/>
	<path class="st0" d="M577.7,276.3c-2.6-3.2-4.8-7-6.9-10.6c-2.3-3.9-4.5-7.6-6.8-10c-1.7,2.7-3.2,5.3-4.2,8.4
		c-1.1,3.3-1.6,7.2-1,12.4c7.2-0.6,13.8,1.2,19.4,3.3C578.1,278.7,577.9,277.5,577.7,276.3z"/>
	<path class="st0" d="M493.1,276.5c0.5-5.1,0.1-9-1-12.4c-1-3.1-2.5-5.8-4.2-8.4c-2.3,2.5-4.5,6.2-6.8,10c-2.1,3.6-4.4,7.4-6.9,10.6
		c-0.2,1.2-0.4,2.3-0.5,3.5C479.3,277.7,485.9,276,493.1,276.5z"/>
	<path class="st0" d="M477.3,261c-0.2,1.1-0.5,2.2-0.7,3.3c-0.6,3-1.2,5.9-1.8,8.8c1.8-2.6,3.4-5.4,5-8.1c2.4-4.1,4.7-8,7.3-10.6
		c-0.5-0.9-1-1.7-1.4-2.5c-1.5,1.1-2.9,2.4-4.2,3.8C480,257.4,478.6,259.2,477.3,261L477.3,261z"/>
	<path class="st0" d="M478,257.5c0.7-0.9,1.5-1.9,2.4-2.8c1.4-1.5,3-3,4.6-4.2c-0.3-0.6-0.5-1.1-0.7-1.7c-0.8,0.2-1.6,0.5-2.3,0.7
		c-0.9,0.3-1.6,0.8-2.5,1.4c-0.1,0.1-0.3,0.1-0.4,0.1C478.8,253.3,478.4,255.4,478,257.5z"/>
	<path class="st0" d="M479.5,249.2c0.7-0.4,1.3-0.7,2-1s1.5-0.5,2.3-0.7c-0.2-0.7-0.4-1.3-0.6-1.9c-0.3-0.2-0.7-0.4-1.2-0.6
		c-0.6-0.2-1.2-0.3-1.8-0.5C479.9,246.1,479.7,247.6,479.5,249.2z"/>
	<path class="st0" d="M482.6,243.6c-0.1-0.2-0.1-0.5-0.2-0.7c-0.6-2-1.1-4-2-6c0,1.9-0.1,3.9-0.3,6c0.8,0.2,1.5,0.3,2.2,0.6
		C482.5,243.6,482.5,243.6,482.6,243.6z"/>
	<path class="st0" d="M472.5,435.6c0-1.5,0-3.1,0-4.7c0-0.1,0-0.2,0-0.3l0,0l0,0c-0.1-5.4-0.5-10.9-1-15.2
		c-0.5-4.8-1.3-9.6-2.1-14.4c-1.5-9.3-3.1-18.8-3-28.7c0.1-6.1,0.4-13.4,1-20c0.5-5.6,1.3-10.6,2.3-14c0.1-0.3,0.4-0.6,0.7-0.6
		c0.4,0,0.7,0.3,0.7,0.8c0,8.6,2.1,17.1,4.1,25.2c1.3,5.2,2.5,10.3,3.2,15.2c0.3-1.8,0.6-3.6,1-5.1c2.1-9.3,5.7-11.1,9.1-10.9
		c-0.1,0-0.1-0.1-0.1-0.1c-3.1-2-5.8-5.2-7.6-10.1c-4.2-11.1-5.7-24.1-4.9-37c0.1-1.5,0.2-3,0.4-4.5v-0.1c1.2-11.6,4.1-23,8.5-32.7
		c-4.1,0.6-7.9,1.9-11.3,3.2c-2.7,7.9-5,21.4-6.7,36.4c-1.7,15.1-2.6,31.8-2.2,45.5c0.2,7.5,0.5,15.5,1,23.6c0.5,8,1.3,16,2.6,23.6
		c1.1,7,2.1,12.3,2.9,16.8C471.6,430.4,472,433.1,472.5,435.6z"/>
	<path class={(injuryNames.some(e => e.name === 'Gluteus'))?"st2":"st0"} onClick={()=>{handleInjuryName("Gluteus"); }} d="M495.7,291.8c4.9-2.7,9.3-5.3,11.6-9.2c-3.6-2.1-7.1-3.3-10.5-4c-1-0.2-2-0.3-3-0.5l0,0
		c-2.5-0.3-4.9-0.2-7.2,0c-4,8.5-6.8,18.4-8.2,28.7C482.7,299.2,489.6,295.3,495.7,291.8z"/>
	<path class={(injuryNames.some(e => e.name === 'Gluteus'))?"st2":"st0"} onClick={()=>{handleInjuryName("Gluteus"); }} d="M521.1,356.8L521.1,356.8C521.2,356.7,521.2,356.7,521.1,356.8c1.9-1.9,3.3-3.9,4.1-6.1V300
		c-5.6-7.9-11.3-13.1-16.7-16.6c-2.5,4.3-7.1,6.9-12.1,9.8c-6.9,3.9-14.7,8.4-18.7,18.2c-0.1,1.5-0.3,2.9-0.3,4.4
		c-0.8,12.7,0.7,25.5,4.8,36.4c1.7,4.6,4.2,7.5,7.1,9.4s6.2,2.7,9.8,2.9c5.6,0.4,11.6-1,16.4-3.6
		C517.6,359.7,519.5,358.3,521.1,356.8z"/>
	<path class={(injuryNames.some(e => e.name === 'Gluteus'))?"st2":"st0"} onClick={()=>{handleInjuryName("Gluteus"); }} d="M569.8,352.1c4.1-10.9,5.6-23.6,4.8-36.4c-0.1-1.5-0.2-2.9-0.4-4.4c-4-9.8-11.8-14.3-18.7-18.2
		c-5-2.9-9.6-5.5-12.1-9.8c-5.4,3.4-11.1,8.7-16.7,16.6v50.6c0,0.1,0,0.1,0,0.1c0.8,2.2,2.2,4.3,4.1,6.1l0,0l0,0
		c1.6,1.5,3.5,2.9,5.7,4.1c4.9,2.6,10.9,4,16.5,3.6c3.5-0.3,6.9-1.1,9.8-2.9C565.6,359.6,568.1,356.7,569.8,352.1z"/>
	<path class={(injuryNames.some(e => e.name === 'Gluteus'))?"st2":"st0"} onClick={()=>{handleInjuryName("Gluteus"); }} d="M558.3,278.1L558.3,278.1c-1,0.1-2,0.3-3,0.5c-3.4,0.7-6.9,2-10.5,4c2.3,3.9,6.7,6.4,11.6,9.2
		c6.2,3.5,13,7.4,17.4,15.1c-1.4-10.3-4.3-20.2-8.2-28.7C563.2,277.9,560.8,277.8,558.3,278.1z"/>
	<path class="st0" d="M578.6,281.5c-3.4-1.3-7.2-2.5-11.3-3.2c4.4,9.6,7.3,21,8.5,32.7v0.1c0.1,1.5,0.3,3,0.3,4.5
		c0.8,12.9-0.7,26-4.9,37c-1.9,4.9-4.5,8.1-7.7,10.1l-0.1,0.1c3.5-0.1,7.1,1.6,9.1,10.9c0.3,1.5,0.7,3.3,1,5.1
		c0.7-5,1.9-10,3.2-15.2c2-8.1,4.1-16.6,4.1-25.2c0-0.4,0.3-0.8,0.7-0.8s0.7,0.3,0.7,0.6c1,3.4,1.8,8.4,2.3,14c0.7,6.6,1,13.9,1,20
		c0.1,9.8-1.4,19.4-2.9,28.7c-0.8,4.8-1.6,9.6-2.1,14.4c-0.5,4.3-0.9,9.8-1,15.2l0,0l0,0c0,0.1,0,0.2,0,0.3
		c-0.1,1.6-0.1,3.2-0.1,4.7c0.4-2.5,0.9-5.2,1.5-8.2c0.9-4.5,1.8-9.8,2.9-16.8c1.2-7.6,2-15.6,2.6-23.6c0.5-8,0.8-16,1-23.6
		c0.3-13.7-0.6-30.3-2.2-45.5C583.6,303,581.2,289.4,578.6,281.5z"/>
	<path class="st0" d="M579.1,415.1c0.5-4.8,1.3-9.6,2.1-14.5c1.5-9.3,3.1-18.7,3-28.4c-0.1-6.1-0.4-13.3-1-19.8
		c-0.3-3-0.7-5.8-1.1-8.3c-0.6,6.8-2.3,13.5-3.9,19.9c-1.9,7.6-3.7,14.9-3.7,21.9c0.4,3,0.7,6.1,0.9,9.3c0.3,3.7,0.5,7.4,0.7,10.9
		c0.2,1.1,0.5,2.2,0.8,3.4c0.6,2.7,1.3,5.6,1.8,9.7C578.8,417.8,579,416.4,579.1,415.1z"/>
	<path class={(injuryNames.some(e => e.name === 'Right Posterior Thigh'))?"st2":"st0"} onClick={()=>{handleInjuryName("Right Posterior Thigh"); }} d="M571.1,374.1c-2.5-11.1-7.3-10-10.9-9.2c-1,0.2-2,0.4-2.8,0.4c-1,0.2-2.1,0.4-3.2,0.5
		c2.3,5.2,3.5,11.1,4.1,17.1c0.7,6.4,0.7,13,0.5,19.1c-0.6,31.2,4.1,41.4,13.7,61.8c1.8,3.8,3.7,7.9,5.8,12.5
		c-0.3-3.1-0.4-7.1-0.5-11.3c0-1.6,0-3.3,0-4.9c-4.5-5.4-3.9-17.7-3.3-31.6c0.1-3,0.3-6.1,0.4-9.2c0.2-6.4-0.1-15.4-0.8-24.2
		c-0.3-3.1-0.6-6.3-0.9-9.2v-0.1C572.5,381.5,571.8,377.5,571.1,374.1z"/>
	<path class={(injuryNames.some(e => e.name === 'Right Posterior Thigh'))?"st2":"st0"} onClick={()=>{handleInjuryName("Right Posterior Thigh"); }} d="M556.8,383.2c-0.6-6.1-1.9-12-4.2-17.1c-1.5,0.1-3.1,0-4.6-0.1c-3.5,6.5-5.8,16.1-7.3,26.1
		c-0.1,5.1,1.3,13.6,3,23.6c3.7,21.5,8.5,50.1,1.6,69.1c0.4,1,0.7,1.9,1,2.9c2.9-5.8,5.3-14.3,7.2-23.1c3.3-15.1,5-31,5.1-36.2
		c-1-7.1-1.4-15.4-1.2-26.2C557.4,396,557.4,389.5,556.8,383.2z"/>
	<path class="st0" d="M539.2,391.6c0.1-1.6,0.3-2.9,0.7-3.9c1.5-8.4,3.6-16.3,6.5-22.1c-3.7-0.5-7.3-1.8-10.5-3.5
		c-2-1.1-3.9-2.3-5.4-3.8c-1,1.5-1.9,3.5-2.5,5.6c-0.8,2.7-1.2,5.8-1.2,8.5l0,0c1.4,12.7,3.6,24.2,6.1,36.4
		c1.2,5.9,2.4,11.9,3.5,18.4c0.2-8.7,0.8-21.6,2.6-34C539,392.8,539.1,392.2,539.2,391.6z"/>
	<path class="st0" d="M526,352.7c-0.8,1.7-2,3.2-3.3,4.6c1.2,1.7,2.2,3.9,2.8,6.2c0.2,0.6,0.3,1.3,0.5,1.9c0.1-0.7,0.3-1.3,0.5-1.9
		c0.7-2.4,1.6-4.6,2.9-6.2C527.9,356,526.8,354.4,526,352.7z"/>
	<path class="st0" d="M521.6,358.4c-1.6,1.4-3.4,2.7-5.4,3.8c-3.2,1.7-6.8,2.9-10.5,3.5c2.9,5.8,5,13.7,6.5,22.1
		c0.4,1,0.6,2.3,0.6,3.9c0.1,0.6,0.2,1.2,0.3,1.8c1.8,12.4,2.4,25.2,2.6,34c1.2-6.4,2.4-12.5,3.5-18.4c2.4-12.2,4.7-23.7,6.1-36.4
		l0,0c0-2.8-0.4-5.8-1.2-8.5C523.5,361.9,522.6,359.9,521.6,358.4z"/>
	<path class={(injuryNames.some(e => e.name === 'Left Posterior Thigh'))?"st2":"st0"} onClick={()=>{handleInjuryName("Left Posterior Thigh"); }} d="M506.8,484.6c-6.9-19-2.1-47.6,1.6-69.1c1.7-10,3.1-18.5,3-23.6c-1.5-10-3.9-19.5-7.3-26.1
		c-1.6,0.2-3.1,0.2-4.6,0.1c-2.4,5.2-3.6,11.1-4.2,17.1c-0.7,6.3-0.6,12.9-0.5,18.9c0.2,10.8-0.2,19.1-1.2,26.2
		c0.1,5.1,1.8,21,5.1,36.2c1.9,8.8,4.3,17.3,7.2,23.1C506.1,486.6,506.4,485.6,506.8,484.6z"/>
	<path class={(injuryNames.some(e => e.name === 'Left Posterior Thigh'))?"st2":"st0"} onClick={()=>{handleInjuryName("Left Posterior Thigh"); }} d="M493.2,402.1c-0.1-6.1-0.1-12.7,0.5-19.1c0.6-6,1.8-11.9,4.1-17.1c-1.1-0.1-2.2-0.3-3.2-0.5
		c-0.9,0-1.8-0.2-2.8-0.4c-3.6-0.8-8.4-1.9-10.9,9.2c-0.7,3.3-1.4,7.4-1.9,11.9v0.1c-0.4,3-0.7,6.1-0.9,9.2
		c-0.7,8.8-1,17.8-0.8,24.2c0.1,3.1,0.2,6.2,0.4,9.2c0.6,13.9,1.1,26.3-3.3,31.6c0,1.6,0,3.3-0.1,4.9c-0.1,4.2-0.2,8.2-0.5,11.3
		c2.1-4.7,4-8.8,5.8-12.5C489,443.5,493.8,433.3,493.2,402.1z"/>
	<path class="st0" d="M475.9,406.1c0.2-3.6,0.4-7.3,0.7-10.9c0.3-3.2,0.6-6.3,0.9-9.3c0-7-1.8-14.3-3.7-21.9
		c-1.6-6.4-3.2-13.1-3.9-19.9c-0.4,2.5-0.8,5.3-1,8.3c-0.7,6.5-1,13.8-1,19.8c-0.1,9.7,1.4,19.2,2.9,28.4c0.8,4.9,1.6,9.7,2.1,14.5
		c0.1,1.3,0.3,2.6,0.4,4.1c0.5-4.1,1.2-6.9,1.8-9.7C475.4,408.4,475.6,407.3,475.9,406.1z"/>
	<path class="st0" d="M474.1,450.4c0.1,1.9,0.1,4.4,0.2,7.2c2.9-5.7,2.4-16.6,1.8-28.8c-0.1-3-0.3-6.1-0.4-9.2
		c-0.1-1.7-0.1-3.6-0.1-5.7c-0.8,3.9-1.5,8.7-1.8,16.7l0,0c0,0.1,0,0.2,0,0.3c0.1,4.7,0.1,9.2-0.3,12.9
		C473.8,445.8,474,448,474.1,450.4z"/>
	<path class="st0" d="M497.1,464.7c-2.4-11.3-4.1-23-4.8-30.4c-0.9,4.1-2,7.8-3.3,11.5c0.4,3.1,2.9,11.2,6,18.7
		c0.3,0.7,0.5,1.3,0.8,1.9c0.2,0.1,0.2,0.3,0.2,0.5c1.2,2.7,2.3,5.2,3.5,7.2C498.6,471.2,497.8,468,497.1,464.7z"/>
	<path class={injuryName=="Left Posterior Thigh"?"st2":"st0"} onClick={()=>{setInjuryName("Left Posterior Thigh");setShowSeverity(true)}} d="M509.8,415.8c-3.5,20.8-8.2,48.1-2.2,66.7c0-0.1,0.1-0.1,0.1-0.2c0.6-1.7,1.2-3.8,1.7-6.2
		c-0.5-5.7-0.3-14.8,0.7-23c0.8-6.9,2.2-13.2,4-16.4c0.2-4.5,0.1-20.7-1.8-37.2C511.8,404,510.8,409.6,509.8,415.8z"/>
	<path class={injuryName=="Left Posterior Thigh"?"st2":"st0"} onClick={()=>{setInjuryName("Left Posterior Thigh");setShowSeverity(true)}} d="M510.7,470c0.2-1,0.3-2.1,0.5-3.2c0.8-5.3,1.2-10.4,1.6-15.6c0.2-2.7,0.4-5.5,0.7-8.3
		c-0.8,2.9-1.4,6.5-1.8,10.3C511,458.9,510.6,464.9,510.7,470z"/>
	<path class={injuryName=="Right Posterior Thigh"?"st2":"st0"} onClick={()=>{setInjuryName("Right Posterior Thigh");setShowSeverity(true)}} d="M538.6,442.9c0.3,2.8,0.5,5.6,0.7,8.3c0.4,5.2,0.8,10.3,1.6,15.6c0.2,1.1,0.3,2.1,0.5,3.2
		c0-5.1-0.3-11.1-1-16.8C539.9,449.4,539.3,445.9,538.6,442.9z"/>
	<path class={injuryName=="Right Posterior Thigh"?"st2":"st0"} onClick={()=>{setInjuryName("Right Posterior Thigh");setShowSeverity(true)}} d="M544.3,482.2c0,0.1,0.1,0.2,0.1,0.2c6-18.6,1.3-46-2.2-66.7c-1-6.2-2-11.7-2.6-16.3c-1.9,16.6-2,32.7-1.8,37.2
		c1.8,3.1,3.2,9.4,4,16.4c1,8.2,1.2,17.3,0.7,23C543.1,478.4,543.7,480.5,544.3,482.2z"/>
	<path class="st0" d="M556.2,466.4c0.3-0.6,0.5-1.3,0.8-1.9c3-7.4,5.6-15.5,6-18.7c-1.3-3.7-2.5-7.5-3.3-11.5
		c-0.7,7.4-2.3,19.2-4.8,30.4c-0.7,3.2-1.5,6.4-2.3,9.5c1.1-2,2.3-4.5,3.5-7.2C556,466.8,556.1,466.6,556.2,466.4z"/>
	<path class="st0" d="M563.4,468.2c1.2-3.2,2.9-6.3,5-9.4c-1.7-3.6-3.1-7-4.4-10.3c-1,4-3.1,10.5-5.6,16.6c-0.3,0.6-0.5,1.2-0.8,1.9
		c2,2.8,3.1,6.2,3.7,9.2C561.8,473.3,562.5,470.7,563.4,468.2z"/>
	<path class="st0" d="M570.9,464.3c-0.6-1.3-1.2-2.6-1.8-3.9c-1.8,2.8-3.2,5.5-4.3,8.4c-0.5,1.4-1,2.9-1.3,4.4
		c0.4-1,0.9-1.9,1.4-2.7C567,466.8,569.3,465,570.9,464.3z"/>
	<path class="st0" d="M575.9,428.8c-0.5,12.2-1,23.2,1.8,28.8c0-2.7,0.1-5.3,0.2-7.2c0.1-2.4,0.3-4.6,0.5-6.7
		c-0.4-3.6-0.5-8.2-0.3-12.9c0-0.1,0-0.2,0-0.3l0,0c-0.3-7.9-1-12.8-1.8-16.7c0,2,0,3.9-0.1,5.7C576.1,422.7,576,425.8,575.9,428.8z
		"/>
	<path class={(injuryNames.some(e => e.name === 'Right Calf'))?"st2":"st0"} onClick={()=>{handleInjuryName("Right Calf"); }} d="M578.7,481.4c-2.6-6-5-11.1-7.1-15.7c-1.3,0.5-3.5,2.1-5.5,5.6c-1.6,2.7-3.1,6.4-4,11.6l0,0l0,0
		c-0.2,2.8-0.3,5.9-0.3,9.1c0,4.7,0.1,9.7,0.3,14.4c0.1,2.6,0.1,5.4,0.1,8.2c0.1,17.2,0.3,36.4,16.5,38.8
		c1.9-12.7,3.8-25.5,4.1-39.3c0.2-6.4-0.8-12.2-2-19.1C580.1,491,579.4,486.6,578.7,481.4z"/>
	<path class={(injuryNames.some(e => e.name === 'Right Calf'))?"st2":"st0"} onClick={()=>{handleInjuryName("Right Calf"); }} d="M560.1,548.5c1.8-5,1.6-10.8,1.4-15.6c-0.7-5.8-0.8-12.1-0.9-18.1c0-2.8,0-5.6-0.1-8.2
		c-0.2-4.8-0.3-9.8-0.2-14.5c0-3.3,0.1-6.4,0.3-9.2v-0.5c0-0.4-0.1-0.8-0.1-1.3c0,0,0,0,0-0.1c-0.1-1.1-0.7-2.5-1.5-3.6
		c-0.6-0.8-1.3-1.5-2-1.9c-0.7-0.3-1.5-0.5-2.3-0.1c-0.6,0.2-1.2,0.7-1.9,1.4c-0.6,0.9-1.1,1.7-1.6,2.2c-1.3,4.1-2.7,7.8-4.3,10.7
		c2,8.4,0.9,15.4-0.4,23.8c-1.1,6.9-2.3,14.7-2.1,25c0.1,6.3,1.1,13.3,2.4,20.7C554.5,557.5,558.3,553.4,560.1,548.5z"/>
	<path class="st0" d="M557.6,474.1c0.8,0.4,1.5,1,2.2,1.8c-0.5-2.4-1.4-5-2.8-7.3c-0.8,1.9-1.6,3.7-2.5,5.2
		C555.5,473.5,556.6,473.7,557.6,474.1z"/>
	<path class="st0" d="M494.4,474.1c1-0.5,2-0.6,3.1-0.3c-0.8-1.6-1.7-3.3-2.5-5.2c-1.4,2.3-2.3,4.9-2.8,7.3
		C492.9,475.1,493.6,474.5,494.4,474.1z"/>
	<path class="st0" d="M490.7,476.1c0.6-3,1.7-6.4,3.7-9.2c-0.3-0.6-0.5-1.2-0.8-1.9c-2.4-6.1-4.6-12.6-5.6-16.6
		c-1.3,3.3-2.8,6.7-4.5,10.3c2.1,3.1,3.8,6.2,5,9.4C489.5,470.7,490.2,473.3,490.7,476.1z"/>
	<path class="st0" d="M487.2,470.4c0.5,0.8,0.9,1.7,1.4,2.7c-0.4-1.5-0.8-3-1.4-4.4c-1.1-2.9-2.5-5.6-4.3-8.4
		c-0.6,1.3-1.2,2.5-1.8,3.9C482.6,465,485,466.8,487.2,470.4z"/>
	<path class={(injuryNames.some(e => e.name === 'Left Calf'))?"st2":"st0"} onClick={()=>{handleInjuryName("Left Calf"); }} d="M489.7,514.7c0-2.8,0.1-5.6,0.1-8.2c0.2-4.8,0.3-9.7,0.3-14.4c0-3.2-0.1-6.4-0.3-9.1l0,0
		c-0.9-5.2-2.4-8.9-4-11.6c-2-3.4-4.1-5-5.5-5.6c-2.2,4.6-4.6,9.8-7.2,15.7c-0.6,5.2-1.4,9.6-2.1,13.6c-1.2,6.9-2.2,12.7-2,19.1
		c0.4,13.8,2.2,26.7,4.2,39.3C489.5,551.1,489.6,531.9,489.7,514.7z"/>
	<path class={(injuryNames.some(e => e.name === 'Left Calf'))?"st2":"st0"} onClick={()=>{handleInjuryName("Left Calf"); }} d="M505.2,489.7c-1.6-2.9-3-6.5-4.4-10.7c-0.5-0.6-1.1-1.3-1.6-2.2c-0.7-0.7-1.3-1.2-1.9-1.4
		c-0.8-0.3-1.6-0.2-2.3,0.1c-0.8,0.4-1.4,1.1-2,1.9c-0.8,1.1-1.4,2.5-1.5,3.6v0.1c0,0.5-0.1,0.9-0.1,1.3v0.5c0.2,2.8,0.3,6,0.3,9.2
		c0,4.7-0.1,9.7-0.3,14.5c-0.1,2.6-0.1,5.4-0.1,8.2c-0.1,6-0.1,12.3-0.8,18.1c-0.3,4.8-0.4,10.7,1.4,15.6c1.8,4.9,5.6,9,13.4,10.7
		c1.3-7.4,2.3-14.3,2.4-20.7c0.2-10.3-1-18.2-2.1-25C504.3,505.1,503.2,498,505.2,489.7z"/>
	<path class={(injuryNames.some(e => e.name === 'Right Achiles'))?"st2":"st0"} onClick={()=>{handleInjuryName("Right Achiles"); }} d="M563,540.8c-0.1,2.8-0.6,5.7-1.6,8.4c-2,5.4-6.1,9.9-14.5,11.7l0.1,0.2c4.9,14.4,14.1,41.3,9.9,56.3
		c-0.3,1-0.5,1.8-0.8,2.3c1-0.2,1.8-0.7,2.7-1.1c0.8-0.4,1.7-0.8,2.5-1.3c0.4-0.2,0.7-0.5,1.1-0.8c0.5-0.6,1-1.1,1.4-1.7
		c0.2-0.4,0.3-0.8,0.5-1.1c0-0.1,0.1-0.1,0.1-0.2c0.1-0.3,0.2-0.7,0.4-1c1.1-7.9,3.6-23.5,6.6-35.6c1.9-7.8,4-14.3,6.2-16.6
		c0.2-1.1,0.3-2.2,0.5-3.2c0.1-0.6,0.2-1.2,0.3-1.7C569.7,553.9,565.3,548.3,563,540.8z"/>
	<path class="st0" d="M579.5,636.3c-0.1-1.1-0.5-1.8-1.1-2.2c-0.9-0.6-2.2-0.8-4.1-0.4c-0.4,0.1-0.8-0.2-0.9-0.6V633
		c-0.1-1.3-0.1-2.7,0-4.3c0.2-3.3,0.4-7.3-1.1-12.3c-1.4-3.7,0.2-15.5,1.2-23.2c0.1-0.3,0.1-0.5,0.1-0.8c-0.8,1.8-1.7,4-2.6,6.3
		c-2.1,5.4-4,11.1-4.5,13.3c-0.2,2-0.9,4-2.5,5.2c-0.3,0.2-0.7,0.5-1,0.7c-0.4,0.3-0.8,0.6-1.2,0.8c-1.2,0.8-2.6,1.4-4,1.8
		c-0.8,0.3-1.7,0.6-2.5,0.4c-0.1,0-0.1,0-0.2,0c-0.1,0-0.2-0.1-0.3-0.1c-0.4,0-0.8-0.3-1.1-1.1c-0.2-0.5-0.4-1.4-0.5-2.5
		c-0.3-2.5-0.4-6.2-0.4-8.8c-2,4.1-3.3,7.9-4,11.4c-0.8,4.2-0.6,7.9,0.7,11.3c0.1,0.3,0,0.7-0.3,0.9c-3.3,2.7-0.8,5.9,1,8.3
		c1,1.3,1.8,2.3,1.9,3.3v1.2c0,2.2,0,3.9,1.2,5.2c2.8,3.2,6.5,5.1,10.1,5.5c1.6,0.2,3.2,0.1,4.6-0.3c1.4-0.4,2.8-1.1,3.9-2.1
		c1.7-1.5,2.9-3.8,3.3-6.9c0-0.2,0.2-0.4,0.3-0.5c2.1-1.4,3.6-4.1,4.1-6.6C579.8,638.1,579.8,637.1,579.5,636.3z"/>
	<path class={(injuryNames.some(e => e.name === 'Left Achiles'))?"st2":"st0"} onClick={()=>{handleInjuryName("Left Achiles"); }} d="M489.2,540.8c0.1,2.8,0.6,5.7,1.6,8.4c2,5.4,6.1,9.9,14.5,11.7l-0.1,0.2c-4.9,14.4-14.1,41.3-9.9,56.3
		c0.3,1,0.5,1.8,0.8,2.3c-1-0.2-1.8-0.7-2.7-1.1c-0.8-0.4-1.7-0.8-2.5-1.3c-0.4-0.2-0.7-0.5-1.1-0.8c-0.5-0.6-1-1.1-1.4-1.7
		c-0.2-0.4-0.3-0.8-0.5-1.1c0-0.1-0.1-0.1-0.1-0.2c-0.1-0.3-0.2-0.7-0.4-1c-1.1-7.9-3.6-23.5-6.6-35.6c-1.9-7.8-4-14.3-6.2-16.6
		c-0.2-1.1-0.3-2.2-0.5-3.2c-0.1-0.6-0.2-1.2-0.3-1.7C482.5,553.9,486.9,548.3,489.2,540.8z"/>
	<path class="st0" d="M472.7,636.3c0.1-1.1,0.5-1.8,1.1-2.2c0.9-0.6,2.2-0.8,4.1-0.4c0.4,0.1,0.8-0.2,0.9-0.6V633
		c0.1-1.3,0.1-2.7,0-4.3c-0.2-3.3-0.4-7.3,1.1-12.3c1.4-3.7-0.2-15.5-1.2-23.2c-0.1-0.3-0.1-0.5-0.1-0.8c0.8,1.8,1.7,4,2.6,6.3
		c2.1,5.4,4,11.1,4.5,13.3c0.2,2,0.9,4,2.5,5.2c0.3,0.2,0.7,0.5,1,0.7c0.4,0.3,0.8,0.6,1.2,0.8c1.2,0.8,2.6,1.4,4,1.8
		c0.8,0.3,3,0.4,3.1,0.4c0.4,0,0.8-0.3,1.1-1.1c0.2-0.5,0.4-1.4,0.5-2.5c0.3-2.5,0.4-6.2,0.4-8.8c2,4.1,3.3,7.9,4,11.4
		c0.8,4.2,0.6,7.9-0.7,11.3c-0.1,0.3,0,0.7,0.3,0.9c3.3,2.7,0.8,5.9-1,8.3c-1,1.3-1.8,2.3-1.9,3.3v1.2c0,2.2,0,3.9-1.2,5.2
		c-2.8,3.2-6.5,5.1-10.1,5.5c-1.6,0.2-3.2,0.1-4.6-0.3c-1.4-0.4-2.8-1.1-3.9-2.1c-1.7-1.5-2.9-3.8-3.3-6.9c0-0.2-0.2-0.4-0.3-0.5
		c-2.1-1.4-3.6-4.1-4.1-6.6C472.4,638.1,472.4,637.1,472.7,636.3z"/>
	<path class="st0" d="M477.8,588.1c1.2,1.7,2.9,5.7,4.5,9.9l0,0c0.6,1.7,1.2,3.4,1.8,5.1c-1.3-8-3.1-17.9-5.1-26.3
		c-1.4-5.5-2.8-10.3-4.2-13.3c1.2,7.9,2.3,15.8,2.9,23.8C477.8,587.6,477.8,587.9,477.8,588.1z"/>
	<path class="st0" d="M497.6,605.1c0.7-10.7,3-22.1,5.2-33.2c-4.6,14.5-9.6,33.5-6.3,44.9c0.2,0.7,0.4,1.3,0.5,1.7
		c0.1-0.4,0.2-0.9,0.3-1.5c0.5-3.9,0.4-10.7,0.3-11.7C497.6,605.2,497.6,605.2,497.6,605.1C497.6,605.2,497.6,605.1,497.6,605.1z"/>
	<path class="st0" d="M554.4,605.2c0,1-0.1,7.8,0.4,11.7c0.1,0.6,0.1,1.1,0.2,1.5c0.2-0.4,0.3-0.9,0.6-1.7
		c3.2-11.5-1.7-30.4-6.3-44.9c2.2,11.1,4.5,22.5,5.2,33.2C554.4,605.1,554.4,605.2,554.4,605.2L554.4,605.2z"/>
	<path class="st0" d="M569.7,598.1L569.7,598.1c1.6-4.3,3.3-8.2,4.5-10c0-0.3,0-0.5,0.1-0.7c0.7-8.1,1.7-16,2.9-23.8
		c-1.4,3-2.9,7.8-4.2,13.3c-2,8.3-3.9,18.3-5.1,26.3C568.4,601.5,569,599.8,569.7,598.1z"/>
	<path class="st0" d="M612.2,231.4c0.9-0.3,1.8-0.6,2.7-1.1c0.2-0.1,0.3-0.2,0.5-0.3c-1.3-5.7-0.8-9.4-0.3-13
		c0.3-2.5,0.7-4.9,0.3-7.7c-0.7-5.3-2.1-10.6-3.8-15.5c-3.1-0.7-4.8,0.6-5.7,2.5c-1,2.1-1,5-1,7c0,2.6,0.9,7.2,1.7,12.1
		c1.2,6.5,2.4,13.3,1.8,16.5c0.1,0,0.1,0,0.2,0C609.8,231.9,611,231.8,612.2,231.4L612.2,231.4z"/>
	<path class="st0" d="M605.8,240c-1-0.7-2-1.5-2.9-2.4c-1.7-1.7-3.4-3.7-4.7-6.1c0,5.4,1.1,10.5,2.9,15.7c0.7-1.4,1.5-2.8,2.3-4.1
		C604.2,241.9,605.1,240.7,605.8,240z"/>
	<path class="st0" d="M608.6,233.4c-0.4,0-0.8,0-1.2-0.1h-0.1c-2.7-0.2-5.4-1-7.7-2.4c1.2,2.2,2.8,4,4.4,5.6c1.2,1.1,2.4,2,3.5,2.7
		c0,0,0.1,0,0.1,0.1c1.1,0.7,2.1,1.1,3,1.4c-0.2-2.8-0.1-5.5,0.6-7.5C610.3,233.4,609.4,233.4,608.6,233.4z"/>
	<path class="st0" d="M608.7,254.8c0.2-4.2,0.9-8.4,1.8-12.6c-1-0.2-2.1-0.7-3.3-1.4c-0.7,0.7-1.6,1.8-2.5,3.1
		c-1.1,1.7-2.1,3.6-2.8,5.3c1.9,4.9,4.3,9.9,7,15.1C608.5,261.1,608.5,257.9,608.7,254.8z"/>
	<path class="st0" d="M616.7,231L616.7,231c-0.4,0.3-0.7,0.5-1.1,0.7c-0.9,0.5-1.8,0.9-2.7,1.1c-1.1,2.1-1.1,5.9-0.7,9.8
		c0.3,2.4,0.7,4.8,1.1,6.9c0.9-5.9,3.1-10.9,5.2-15.4c2.6-5.8,4.9-10.9,3-16c0.4,3.3,0.1,6-0.9,8.2
		C619.7,228.3,618.3,229.8,616.7,231z"/>
	<path class="st0" d="M619.8,234.7c-2.6,5.6-5.5,12-5.4,20c1.1,4.6,2.2,9.1,3.5,13.6c0.1-10,2.2-18.2,4-25.5
		c2.1-8.3,3.9-15.3,1.7-22.2C624.1,225.1,622.1,229.6,619.8,234.7z"/>
	<path class="st0" d="M623.3,243.2c-2.2,8.6-4.8,18.6-3.7,31.4c0.1,0.5,0.3,1.1,0.5,1.6c2.2,7.6,4.6,15,7.4,22.5
		c1.9,5,3.1,11,4.3,16.5l0.3,1.6l1-0.4c-1.4-6-2.4-13.8-3.3-20.5c-0.4-2.9-0.7-5.5-1-7.8c0-0.1,0-0.1,0-0.1c0-0.1,0-0.2-0.1-0.4
		c-0.9-6-0.7-14.6-0.4-23.8c0-1.2,0.1-2.5,0.1-3.8v-0.1c-0.1-0.2-0.1-0.5,0.1-0.7c0.4-12.4,0.4-25.4-2.5-34.4
		C626.5,230.6,625,236.4,623.3,243.2z"/>
	<path class="st0" d="M630,259.8c3.9,10.9,4.5,16.8,5.1,23.4c0.1,1.5,0.3,3.1,0.5,4.8c1.1,1.5,4.4,7.6,7,13.7
		c1.7,3.8,3.1,7.6,3.6,10.2l4-1.3c-5.5-14.5-8-28.8-10.3-42.2c-2.7-15.5-5.2-30-12-42.3C630.5,235.4,630.3,247.9,630,259.8z"/>
	<path class="st0" d="M630.3,315.4c-1.1-5.5-2.4-11.4-4.2-16.3c-2.8-7.5-5.3-15-7.5-22.6c-0.1-0.5-0.3-1.1-0.5-1.6v-0.1
		c-2-7-3.8-14.1-5.5-21.3c-0.4-1.7-1-4.4-1.5-7.3c-0.5,2.8-0.9,5.7-1,8.6c-0.3,4.4-0.1,8.8,0.6,13.3c0.1,0.2,0.2,0.4,0.3,0.6
		c7,13.5,14.9,28.7,18.8,48.7l0.8-0.3L630.3,315.4z"/>
	<path class="st0" d="M640.1,314.1c-3.9-12.1-5.2-19.6-6-25.6v-0.1c-0.2-1.8-0.4-3.4-0.5-5c-0.5-5.7-1-10.9-3.7-19.4
		c-0.3,9.1-0.6,17.5,0.3,23.3c0,0.1,0,0.3,0.1,0.4c0.6,2.3,1.6,5.6,2.8,9.5c1.6,5.2,3.5,11.3,5.1,17.5L640.1,314.1z"/>
	<path class="st0" d="M644.7,312.5c-0.4-2.5-1.8-6.3-3.5-10.1c-1.8-4.1-3.7-8.1-5.1-10.7c0.8,5.4,2.3,12.1,5.4,21.9L644.7,312.5z"/>
	<path class="st0" d="M631.6,297.6c0.8,6.2,1.8,13,3,18.4l2.2-0.7C635.2,309,633.3,302.8,631.6,297.6L631.6,297.6z"/>
	<path class={(injuryNames.some(e => e.name === 'Right Wrist'))?"st2":"st0"} onClick={()=>{handleInjuryName("Right Wrist"); }} d="M638.8,322.5l4.2-1.5h0.1l10.3-3.8c-0.9-1.1-1.7-2.7-2.6-5.1l-4.9,1.6c0,0-0.1,0-0.1,0.1l-4.4,1.5h-0.1h-0.1
		l-3.2,1.1c-0.1,0-0.1,0-0.1,0l-3.5,1.2h-0.1l0,0l-2.4,0.8h-0.1l0,0l-1.6,0.5c0.1,0.3,0.1,0.7,0.2,1l0,0c0.3,1.6,0.6,3.4,0.9,5.3
		L638.8,322.5L638.8,322.5z"/>
	<path class="st0" d="M631.5,326.8c1,6,2.2,13,3.9,19.1c0.1-2.6,0.3-5.2,0.6-7.8c0.6-5.4,1.4-10.4,2.1-13.7L631.5,326.8z"/>
	<path class="st0" d="M643,350.7c-0.5-2.8-0.9-10.2-1-16.9c-0.1-4.4,0-8.5,0.3-11l-2.6,1c-0.7,3.2-1.6,8.6-2.3,14.5
		c-0.4,4-0.7,8.3-0.6,12.1l0,0c0.1,0.1,0.1,0.2,0.1,0.3c0,5.3-0.1,8-0.3,11.3c-0.1,2-0.2,4.3-0.3,7.4c0.3,0.2,2.2-0.2,3.9-0.1
		c0.6,0,1.1,0.1,1.5,0.1l2.1-13.1c0,0,0,0,0-0.1c-0.1-0.4-0.1-1-0.2-1.6C643.3,353,643,351.1,643,350.7z"/>
	<path class="st0" d="M665.3,374.6c-1.1-4.9-2-9.4-2.9-14.1c-0.5-2.3-0.9-4.7-1.5-7.3c-3.6-2.7-7.8-8.2-11.2-14.1
		c-2.6-4.5-4.8-9.1-6-13.1c-0.1,2.2-0.1,4.9-0.1,7.7c0.1,6.7,0.5,13.9,1,16.7c0.1,0.4,0.4,2.4,0.6,4c0.1,1.1,0.3,2,0.3,2.2
		c0,0.1,0,0.1,0,0.2c0.3,2.8,0.6,4.5,0.8,6.2c0.6,4.5,1.2,9,1.6,13.3c0.1,0.6,0.2,1.1,0.3,1.6c0.6-0.1,2.7-0.3,4.3-0.4
		c0.7-0.1,1.3-0.1,1.8-0.2c-0.1-1.9-0.3-4.2-0.4-6.5c-0.4-5-0.8-10.5-0.6-15.1c0-0.4,0.4-0.7,0.8-0.7c0.3,0,0.7,0.3,0.7,0.6
		l4.2,20.8c0,0.1,0,0.2,0.1,0.3c0.4-0.1,0.7-0.2,1.1-0.2C661.7,376,663.6,375.6,665.3,374.6z"/>
	<path class="st0" d="M668.6,345.1c-2.1,0-4.2-1.3-5.9-3.1c-0.9-1-1.7-2.2-2.3-3.4c-2.1-2.7-3.6-6.1-4.6-9.4
		c-1.3-4.2-1.9-8.4-2-10.5l-9.7,3.6c0.7,4.2,3.3,10.4,6.7,16.2c3.5,5.9,7.6,11.3,11.1,13.8c0.1,0.1,0.2,0.2,0.2,0.3l0,0
		c0.4,0.6,1,1.8,1.8,3.3c0.9,1.7,2,3.9,3.1,6.1c0.9,1.7,2,3.4,2.9,4.8c0.1-0.1,0.2-0.1,0.3-0.2c1.3-0.9,3.7-2.5,5-3.3
		C673.8,357.7,670.8,350.4,668.6,345.1z"/>
	<path class="st0" d="M659.4,334.2c0-0.2,0-0.5,0.1-0.7c0.2-1.5,1-2.9,2.6-3.8c0,0,0,0,0.1,0c0,0,0.1,0,0.1-0.1
		c1.2-0.4,2.2-0.5,3.1-0.3c1,0.2,1.9,0.7,2.6,1.5c0.7,0.7,1.2,1.7,1.6,2.7c1.1,2.9,1.3,6.9,0.8,9.6c1.3,1.9,2.6,3.4,3.7,4.5
		c0.9-0.5,1.9-1.2,2.9-2c0.9-0.7,1.8-1.5,2.5-2.2c-4.1-6.9-9.8-16.6-12.7-19c-3.4-2.8-5.8-3.4-7.8-4c-1.3-0.3-2.5-0.6-3.6-1.4
		c0.1,1.9,0.7,5.6,2,9.5C657.8,330.5,658.5,332.4,659.4,334.2z"/>
	<path class="st0" d="M668,334c-0.3-0.9-0.8-1.7-1.3-2.2s-1.1-0.9-1.8-1c-0.4-0.1-0.9-0.1-1.4,0c0.5,0.8,1.1,2.1,1.8,3.3
		c0.9,1.6,1.7,3.3,2,4.1c0,0,0,0.1,0.1,0.1c0.5,1,1,1.9,1.6,2.7C669.1,338.7,668.8,336.1,668,334z"/>
	<path class="st0" d="M666,338.7c0,0-1-1.9-2-3.9c-0.7-1.3-1.4-2.7-1.8-3.4c-0.7,0.6-1.1,1.4-1.2,2.3c-0.2,1.1,0.1,2.4,0.6,3.7
		c0.5,1.3,1.3,2.5,2.3,3.6c1.2,1.3,2.7,2.4,4.1,2.6c-0.1-0.3-0.2-0.5-0.3-0.8c-0.7-1.7-1.3-3.1-1.6-3.9c0,0,0,0,0-0.1
		C666,338.8,666,338.7,666,338.7z"/>
	<path class="st0" d="M682.6,349.1c-0.5-0.8-1.1-1.9-1.8-3.1c-0.2-0.4-0.4-0.8-0.7-1.2c-0.7,0.7-1.5,1.4-2.3,2
		c-0.9,0.7-1.8,1.3-2.6,1.8c0.1,0.1,0.2,0.1,0.3,0.2c2.3,1.7,4.5,2,6.5,1.6c0.1,0,0.3-0.1,0.4-0.1c0.1-0.1,0.2-0.2,0.3-0.3
		c0.1-0.1,0.1-0.3,0.1-0.4C682.7,349.3,682.7,349.2,682.6,349.1z"/>
	<path class="st0" d="M671.1,367.8c-0.1,0.1-0.2,0.1-0.3,0.2c1.8,2.3,3.6,3.8,5,3c1-0.5,0.8-2.9-0.1-6.2
		C674.5,365.6,672.4,367,671.1,367.8z"/>
	<path class="st0" d="M660.3,377.8c-0.3,0.1-0.6,0.1-0.9,0.2c0.7,1.6,1.8,2.7,3,3.2c0.5,0.2,1,0.3,1.4,0.2c0.4-0.1,0.8-0.3,1.1-0.6
		c0.7-0.8,1.1-2.3,0.7-4.7C663.8,377.1,661.9,377.5,660.3,377.8z"/>
	<path class="st0" d="M648.4,379.3c0.5,1.5,1.2,2.4,2,2.9c0.4,0.3,0.8,0.4,1.2,0.4s0.8-0.2,1.1-0.5c0.7-0.6,1.2-1.7,1.4-3.3
		c-0.4,0.1-1,0.1-1.6,0.2C651.1,379.1,649.5,379.2,648.4,379.3z"/>
	<path class="st0" d="M636.3,370.4c0,1.6,0.5,2.6,1.2,3.1c0.3,0.2,0.7,0.3,1,0.4c0.4,0,0.8,0,1.1-0.2c0.9-0.3,1.6-1.1,1.7-2.3
		l0.1-0.6c-0.4,0-0.9-0.1-1.4-0.1C638.9,370.7,637.3,370.6,636.3,370.4z"/>
	<path class="st0" d="M497.6,621h0.4H497.6z"/>
</g>
</svg>:""}
{showSeverity? <div  className="severity-container">
		<div className="how-much">
			<label className="did-label">Pain scale</label>
			<div className="severity-range-container"><input value={severity} onChange={(e)=>setSeverity(e.target.value)} className="slider slider2" type="range" id="severity" name="severity" min="1" max="10"></input>
			<div className="slider-indexes">
                  <label style={severity==1?{fontWeight:"700",color:"black",fontSize:"1.2em"}:{}} className="slider-index">1</label>
                  <label style={severity==2?{fontWeight:"700",color:"black",fontSize:"1.2em"}:{}} className="slider-index">2</label>
                  <label style={severity==3?{fontWeight:"700",color:"black",fontSize:"1.2em"}:{}} className="slider-index">3</label>
                  <label style={severity==4?{fontWeight:"700",color:"black",fontSize:"1.2em"}:{}} className="slider-index">4</label>
                  <label style={severity==5?{fontWeight:"700",color:"black",fontSize:"1.2em"}:{}} className="slider-index">5</label>
                  <label style={severity==6?{fontWeight:"700",color:"black",fontSize:"1.2em"}:{}} className="slider-index">6</label>
                  <label style={severity==7?{fontWeight:"700",color:"black",fontSize:"1.2em"}:{}} className="slider-index">7</label>
                  <label style={severity==8?{fontWeight:"700",color:"black",fontSize:"1.2em"}:{}} className="slider-index">8</label>
                  <label style={severity==9?{fontWeight:"700",color:"black",fontSize:"1.2em"}:{}} className="slider-index">9</label>
                  <label style={severity==10?{fontWeight:"700",color:"black",fontSize:"1.2em"}:{}} className="slider-index">10</label>
                </div>
			</div>
			<label className="did-label">{injuryName}</label>
			<button onClick={(e)=>{displaySeverity(e);setSeverityForInjury(e) }} className="submit-athlete-form ok-button">OK</button>
		</div>
		
	</div>:""}


	<div className="injuries-list">{injuryNames.map((value,index)=>{
			return(
			<div className="injury-in-list">
				<div>{value.name}</div>
				<div id={index} onClick={removeInjury} className="remove-injury">X</div>
			</div>)
		})}
		</div>
        {(isSecondSession&&hasTraining)||!isSecondSession||injuryExist?<button style={injuryExist?{marginTop:"10%"}:{}} onClick={hasTraining&&hasTraining2?SubmitBothSessions:!isSecondSession?submitForm:submitSecondSession} type="submit" className="submit-athlete-form"><label>Submit</label></button>:""}
      </form>
    </div>
  );
};

export default AthleteFormActual;
