import React, { useState, useEffect } from "react";
import "./AthleteForm.css";
import imag from "../../assets/sportsman.svg";
import moment from "moment";
import {requests} from '../../utils/axios';
import { IoIosArrowForward, IoIosArrowBack, } from "react-icons/io";
import {BiEnvelope} from "react-icons/bi"
import {FiCamera} from "react-icons/fi"
import logo from '../../assets/logo.svg'
import hideArrow from "../../assets/hide-arrow.svg";
import AthleteFormActual from './AthleteFormActual'
import FileBase64 from 'react-file-base64';
const AthleteForm = (props) => {
  var intermediate = [];
  const [today, setToday] = useState(new Date());
  const [fillFormColorState,setFillFormColorState] = useState({background:"grey"})
  const [theDayForForm,setTheDayForForm] = useState();
  const [canLogOut,setCanLogOut] = useState(false)
  const makeCalendar = () => {
    const startDate = moment(today).startOf("month").startOf("week");
    const endDate = moment(today).endOf("month").endOf("week");
    endDate.set({ hour: 0, minute: 0, second: 0, millisecond: 0 });
    var currentDate = startDate;

    intermediate = [...intermediate, currentDate.toDate()];
    while (!currentDate.isSame(endDate)) {
      currentDate.add(1, "d");
      intermediate = [...intermediate, currentDate.toDate()];
    }
    setDatess(intermediate);
  };
  const [item, setItem] = useState({ title: '', image:"" });
  const [items, setItems] = useState([])
  const [datess, setDatess] = useState([]);
  const [canNext,setCanNext] = useState();
  const  user =  props.user;
  const [fillForm,setFillForm] = useState(false);
  const [numberOfExercises, setNumberOfExercises] = useState([1, 1, 1, 1]);
  const daysOfWeek = ["Su", "Mu", "Tu", "We", "Th", "Fr", "Sa"];
  const formNotFilled = {position:"absolute",background:"#C41F1F",width:"4px",height:"4px",borderRadius:"10px"}
  const formFilled = {position:"absolute",background:"transparent",width:"4px",height:"4px",borderRadius:"10px"};
  const formFilledPartially = {position:"absolute",background:"#00d4a9",width:"5px",height:"5px",borderRadius:"10px"};
  let styleForDot={};
  const [rotateArrowTraining, setRotateArrowTraining] = useState("");
  const [rotateArrowBody, setRotateArrowBody] = useState("");
  const [rotateArrowFitness, setRotateArrowFitness] = useState("");
  const [fitnessHidden, setFitnessHidden] = useState(true);
  const [bodyHidden, setBodyHidden] = useState(true);
  const [trainingHidden, setTrainingHidden] = useState(true);
  const [isSecondSession,setIsSecondSession] = useState(false);
  const checkArrow = () =>{
    setCanNext({color:"black"})
    if(moment().toDate().getMonth()===moment(today).toDate().getMonth()) setCanNext({color:"grey"})
  }
  const hideFitness = () => {
    setFitnessHidden(!fitnessHidden);
    if (fitnessHidden) setRotateArrowFitness("rotate-arrow");
    else setRotateArrowFitness("");
  };
  const hideBody = () => {
    setBodyHidden(!bodyHidden);
    if (bodyHidden) setRotateArrowBody("rotate-arrow");
    else setRotateArrowBody("");
  };
  const hideTraining = () => {
    setTrainingHidden(!trainingHidden);
    if (trainingHidden) setRotateArrowTraining("rotate-arrow");
    else setRotateArrowTraining("");
  };
  const getMonthName = (date) => {
    if (moment(date).toDate().getMonth() === 0) return "January";
    else if (moment(date).toDate().getMonth() === 1) return "February";
    else if (moment(date).toDate().getMonth() === 2) return "March";
    else if (moment(date).toDate().getMonth() === 3) return "April";
    else if (moment(date).toDate().getMonth() === 4) return "May";
    else if (moment(date).toDate().getMonth() === 5) return "June";
    else if (moment(date).toDate().getMonth() === 6) return "July";
    else if (moment(date).toDate().getMonth() === 7) return "August";
    else if (moment(date).toDate().getMonth() === 8) return "September";
    else if (moment(date).toDate().getMonth() === 9) return "October";
    else if (moment(date).toDate().getMonth() === 10) return "November";
    else if (moment(date).toDate().getMonth() === 11) return "December";
  };
  const determineToday = (date) => {
    if (date.getMonth() !== today.getMonth()) return { color: "#AAB2BD" };
    if (
      date.getMonth() == today.getMonth() &&
      date.getDate() == today.getDate()
    )
      return { color: "#1195FF" };
  };
  const nextMonth = () => {
    if(moment().isBefore(moment(today).add(1,"month"))) return
    setToday(moment(today).add(1, "month").toDate());
  };
  const prevMonth = () => {
    setToday(moment(today).subtract(1, "month").toDate());
  };
  const goToFillForm = (id)=>{
    setIsSecondSession(false)
    const info = {
      date:theDayForForm,
      username:user.username
    }
    info.date = id;
    console.log(info)
    const todayArray = moment().format("DD/MM/YY").split("/")
    const theDayForFormArray = info.date.split("/");
  
    if((parseInt(todayArray[0])<parseInt(theDayForFormArray[0])&&parseInt(todayArray[1])===parseInt(theDayForFormArray[1]))||(parseInt(todayArray[1])<parseInt(theDayForFormArray[1])&&todayArray[2]===theDayForFormArray[2])) {return}
    requests.post("/form/checkforform",info)
    .then(res => {if (res.data)alert(res.data);else setFillForm(!fillForm)})
  }
 
  useEffect(() => {
    determineToday(today);
    makeCalendar();
    checkArrow();
    
  }, [today]);
  useEffect(()=>{
    setItem({image:user.image})
  },[user.image])
var trainingDates=[]
const determineTrainingDays = () =>{
  if(user.username){
    user.training.map((value)=>{
      trainingDates.push(value.date);
    })
  datess.map((value)=>{if(moment(value).isAfter(moment())) trainingDates.push(moment(value).format("DD/MM/YY"))})
  }}
const fillFormColor=(e)=>{
  if(trainingDates.includes(e.target.id)) setFillFormColorState({background:"grey"});
  
  else setFillFormColorState({})
}
  determineTrainingDays()
  const checkAfterToday = (day) =>{
   return( moment(day).isAfter(moment()))
  }
  const logOutUser = ()=>{
    localStorage.clear();
    window.location.reload();
  }
  const selectValue = () =>{
    alert("You need to choose a date first!")
  }
  const findBMI = () =>{
    if(user.measurements){
      const weight = user.measurements[user.measurements.length-1].weight;
      const height = user.measurements[user.measurements.length-1].height;
      if(height>0) return(weight/(height*height))
    }
    return("Can't determine")
  }
  const submitImg = async () =>{
    await requests.put("/user/update",user).then(res=>console.log(res))
  }
  const goLogOut = () =>{
    setCanLogOut(!canLogOut)
  }
  const fillSecondSession = () =>{
    setFillForm(true);
    setIsSecondSession(true)
  }
  return (
    <div className="athlete-form">
     {!fillForm? <div className="athlete-form-header">
        <div className="athlete-form-logo">
        <div onClick={goLogOut} style={{marginTop:"0px",transform:"scale(1.3)",marginLeft:"4vw",background:"white",color:"black",textTransform:"capitalize"}} className="can-log">{user.firstName?user.firstName[0]:""}</div>
          <img  style={{width:"45%",justifySelf:"flex-end",marginLeft:"25vw"}} src = {logo}></img>
        </div>
        <div style={{marginTop:"0",height:"1.5px",background:"rgb(17,149,255)"}} className="separator"></div>
        {canLogOut?
        <div  className="logout-panel2">
          <label onClick={goLogOut} className="options-name2">{user.firstName?user.firstName:""} {user.lastName?user.lastName:""}</label>
          <div className="separator3"></div>
          <div className="send-email2">
            <button className="send-email-label2">send us an email</button>
            <BiEnvelope style={{fontSize:"1.2em"}}/>
          </div>
          <div className="separator3"></div>
          <button style={{margin:"0"}}  onClick={logOutUser} className="logout-button">Log Out</button>
        </div>:
        ""}
        <img className="athlete-form-player-photo" src={item.image!=" "?item.image:imag}></img>
        <div className="athlete-form-player-info">
          
          <FileBase64
          type="file"
          multiple={false}
          onDone={({ base64 }) => {setItem({ ...item, image: base64 });user.image = base64;submitImg()}}
        />
        <div className="camera"><FiCamera className=""/></div>
          <label className="athlete-form-player-name">{`${user.firstName} ${user.lastName}`}</label>
          <label className="athlete-form-player-team">{`${user.team}`}</label>
        </div>
        <div className="month-form">
          <label className="display-month">{getMonthName(today)}</label>
          <div className="fill-form-field">
          </div>
        </div>
        <div className="athlete-form-weeks">
         
          {daysOfWeek.map((dayOfWeek, index) => {
            return (
              <div className="week-days" key={index}>
                {dayOfWeek}
              </div>
            );
          })}
          
        </div>
        <div className="calendar-wrapper">
          <button onClick={prevMonth} className="change-month-btn prev-month-btn"><IoIosArrowBack/></button>
          <div className="athlete-form-calendar">
            {datess.map((day,index) => {var conditioner = true
             {if(trainingDates.includes(moment(day).format("DD/MM/YY"))) 
             {styleForDot=formFilled;}
             else styleForDot=formNotFilled;
             if(checkAfterToday(day)) styleForDot=formFilled;
             if(user.training)user.training.map(value=>{if(value.date==moment(day).format("DD/MM/YY")&&value.session2===" "){styleForDot=formFilledPartially;conditioner = false}})
            }
              return (
                <div id={moment(day).format("DD/MM/YY")} onClick={(e)=>{setTheDayForForm(e.target.id); fillFormColor(e);conditioner?goToFillForm(e.target.id):fillSecondSession()}}   key={index} style={determineToday(day)} className="date-day">
                  <div style={styleForDot}></div>
                  {day.getDate()}
                </div>
              );
            })}
          </div>
          <button style={canNext} onClick={nextMonth} className="change-month-btn next-month-btn"><IoIosArrowForward/></button>
        </div>
        <div className="body-fitness-training">
          <div className="athlete-training">
            <label className="athlete-training-title">Training Program</label>
            {trainingHidden ? (
              <div className="athlete-training-labels">
                <label className="athlete-training-label">Exercise</label>
                <label className="athlete-training-label">Sets</label>
                <label className="athlete-training-label">Repetition</label>
                <label className="athlete-training-label">Notes</label>
              </div>
            ) : (
              ""
            )}
            {trainingHidden ? (
              <div>
                {numberOfExercises.map((el,index) => {
                  return (
                    <div key={index} className="athlete-training-values">
                      <label key={`${index}`+ "1"} className="athlete-training-value">value</label>
                      <label key={`${index}`+ "2"} className="athlete-training-value">value</label>
                      <label key={`${index}`+ "3"} className="athlete-training-value">value</label>
                      <label key={`${index}`+ "4"} className="athlete-training-value">value</label>
                    </div>
                  );
                })}
              </div>
            ) : (
              ""
            )}
            <button
              onClick={hideTraining}
              className={"hide-button " + rotateArrowTraining}
            >
              <img src={hideArrow} />
            </button>
          </div>
          <div className="athlete-body-measurements">
            <label className="athlete-training-title">Body measurements</label>
            {bodyHidden ? (
              <div className="athlete-body-measurements-attributes">
                <div className="athlete-body-measurements-labels">
                  <label className="athlete-body-measurements-label">
                    Height
                  </label>
                  <label className="athlete-body-measurements-label">
                    Weight
                  </label>
                  <label className="athlete-body-measurements-label">
                    Fat
                  </label>
                  <label className="athlete-body-measurements-label"> BMI </label>
                </div>
                <div className="athlete-body-measurements-values">
                  <label
                    placeholder="Meters"
                    className="athlete-body-measurements-value"
                  >
                    {user.measurements? user.measurements[user.measurements.length-1].height:""} m
                  </label>
                  <label
                    placeholder="Kg"
                    className="athlete-body-measurements-value"
                  >
                   {user.measurements? user.measurements[user.measurements.length-1].weight:""} kg
                  </label>
                  <label
                    placeholder="%"
                    className="athlete-body-measurements-value"
                  >
                   {user.measurements?user.measurements[user.measurements.length-1].fat:""} %
                  </label>
                  <label className="athlete-body-measurements-value">
                  {findBMI()}
                  </label>
                </div>
              </div>
            ) : (
              ""
            )}
            <button
              onClick={hideBody}
              className={"hide-button " + rotateArrowBody}
            >
              <img src={hideArrow} />
            </button>
          </div>
          <div className="athlete-body-measurements">
            <label className="athlete-training-title">Fitness Test</label>
            {fitnessHidden ? (
              <div className="athlete-body-measurements-attributes">
                <div className="athlete-body-measurements-labels">
                  <label className="athlete-body-measurements-label">
                    Sprint 10
                  </label>
                  <label className="athlete-body-measurements-label">
                    Triple Jump
                  </label>
                  <label className="athlete-body-measurements-label">
                    Vertical Jump
                  </label>
                  <label className="athlete-body-measurements-label">
                    Balance
                  </label>
                  <label className="athlete-body-measurements-label">
                    Drill
                  </label>
                </div>
                <div className="athlete-body-measurements-values">
                  <label
                    placeholder="Seconds"
                    className="athlete-body-measurements-value"
                  >
                    value
                  </label>
                  <label
                    placeholder="Meters"
                    className="athlete-body-measurements-value"
                  >
                    value
                  </label>
                  <label
                    placeholder="Meters"
                    className="athlete-body-measurements-value"
                  >
                    value
                  </label>
                  <label className="athlete-body-measurements-value">
                    value
                  </label>
                  <label className="athlete-body-measurements-value">
                    value
                  </label>
                </div>
              </div>
            ) : (
              ""
            )}
            <button
              onClick={hideFitness}
              className={"hide-button " + rotateArrowFitness}
            >
              <img src={hideArrow} />
            </button>
          </div>
        </div>
      </div>:""}
      {fillForm?
        <AthleteFormActual isSecondSession={isSecondSession} fillForm={setFillForm} user={user} theDayForForm = {theDayForForm}/>
        :""}
    </div>
  );
};

export default AthleteForm;
