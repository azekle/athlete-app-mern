import React,{useState, useEffect} from 'react'
import moment from 'moment';
import { IoIosArrowBack,IoIosArrowForward } from 'react-icons/io';
import CoachCreateSchedule from './CoachCreateSchedule';

const CoachCalendar = () => {
    
  var intermediate = [];
  const [today, setToday] = useState(new Date());
  const [schedulerIsShown,setSchedulerIsShown] = useState(false);
  const [fullDate,setFullDate] = useState([])
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
  const [datess, setDatess] = useState([]);
  const [canNext,setCanNext] = useState();
  const checkArrow = () =>{
    setCanNext({color:"black"})
    if(moment().toDate().getMonth()===moment(today).toDate().getMonth()) setCanNext({color:"grey"})
  }
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
  const ShowScheduler = (e) =>{
    setSchedulerIsShown(!schedulerIsShown)
    setFullDate(e.target.id.split('-')) ; 
    console.log(fullDate,schedulerIsShown);
  }
  useEffect(() => {
    determineToday(today);
    makeCalendar();
    checkArrow()
    
  }, [today]);
    return (
        <div style={{display:"flex",flexDirection:"column", justifyContent:"center"}}>
           <label style={{alignSelf:"flex-start",marginTop:"20px",marginLeft:"50px",fontWeight:"600"}} className="display-month">{getMonthName(today)+` ${today.getFullYear()}`}</label>
            <div style={{display:"flex",flexDirection:"row", justifyContent:"center"}}>
                <div className="calendar-wrapper">
                <button onClick={prevMonth} className="change-month-btn prev-month-btn"><IoIosArrowBack/></button>
                <div className="athlete-form-calendar">
                    {datess.map((day,index) => {
                    return (
                        <div onClick={ShowScheduler} id={`${day.getDate()}-${day.getMonth()+1}-${day.getFullYear()}`} key={index} style={determineToday(day)} className="date-day">
                        {day.getDate()}
                        </div>
                    );
                    })}
                </div>
                <button style={canNext} onClick={nextMonth} className="change-month-btn next-month-btn"><IoIosArrowForward/></button>
                </div>
                </div> 
                {fullDate[0]?<CoachCreateSchedule day = {fullDate[0]} month = {fullDate[1]} year = {fullDate[2]}/>:""}
            
        </div>
    )
}

export default CoachCalendar
