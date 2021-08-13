import React ,{useState} from 'react'
import './AthleteForm.css'
import imag from '../../assets/ball.png'
import moment from 'moment'
const AthleteForm = (user) => {
    user = user.user
    const daysOfWeek = ["S","M","T","W","T","F","S"]
    const numberOfWeeks= [1,1,1,1]
    var todayDate = new Date()
    const getMonthName = (date,numberDays)=>{
        if(moment(date).add(numberDays, "day").toDate().getMonth()===0) return("January")

    }
    var startOfWeek = moment().startOf("week").toDate();
    const [currentShownWeek, setCurrentShownWeek] = useState(startOfWeek);
    const showDate = (date, numberDays) => {
         if(moment(date).add(numberDays, "day").toDate().getDate()===todayDate.getDate()) return("today")
      return moment(date).add(numberDays, "day").toDate().getDate();
    };
    const showMonth = (date, numberDays) => {
        if(moment(date).add(numberDays, "day").toDate().getDate()===todayDate.getDate()) return("")
      return (`/0${moment(date).add(numberDays, "day").toDate().getMonth()+1}`);
    };
    return (    
        <div className="athlete-form">
            <div className="athlete-form-header">
                <div className="athlete-form-logo">
                    <div>LOGO</div>
                </div>
                <div className="athlete-form-player-info">
                    <img className="athlete-form-player-photo" src={imag}></img>
                    <label className="athlete-form-player-name">{`${user.firstName} ${user.lastName}`}</label>
                    <label className="athlete-form-player-team">{`Team:${user.team}`}</label>
                </div>
                <div className="athlete-form-weeks">
                 {daysOfWeek.map((dayOfWeek,index)=>{return(<div className="week-days" key={index}>{dayOfWeek}</div>)})}
                </div>
                {numberOfWeeks.map((el,index2)=>{return(
                    <div  key={index2} className="athlete-form-weeks">
                    {daysOfWeek.map((dayOfWeek,index)=>{return(
                        <div  key={index}> 
                            <div className="week-color" key={index}>
                                <div className="week-color-center"></div>
                            </div>
                            <div className="week-color-date">{`${showDate(currentShownWeek,index+(index2  )*7)}${showMonth(currentShownWeek,index+(index2)*7)}`}</div>
                        </div>)})} 
                    </div>)})}  
            </div>
        </div>
    )
}

export default AthleteForm
