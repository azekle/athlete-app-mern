import React,{useState,useEffect} from 'react'
import "./TeamSummaryCss/TeamSummaryTest.css"
import {requests} from '../../utils/axios'
import {AiFillLock,AiFillUnlock} from 'react-icons/ai'
import moment from 'moment'
const TeamSummaryTest = (props) => {
  const [totalPlayers, setTotalPlayers] = useState(props.players)
  const [players,setPlayers] = useState([])
  var height
  var weight
  var fat
  
  const [playerName,setPlayerName] =useState("")
  const [measurementsTab,setMeasurementsTab] = useState(true)
  var playerId = "";
  const [playerToUpdate,setPlayerToUpdate] = useState("")
  const [tests,setTests] = useState([])
  const [theaders,setTheaders] = useState(["Athlete","Team","Season","Date"])
  const theaders2 = ["Athlete","Season","Date","Height","Weight","Fat","BMI"]
  const measurements = ["Height","Weight","Fat","BMI"]
  const [test1Name,setTest1Name] = useState()
  const [test2Name,setTest2Name] = useState()
  const [test3Name,setTest3Name] = useState()
  const [test4Name,setTest4Name] = useState()
  const [test5Name,setTest5Name] = useState()
  const [test6Name,setTest6Name] = useState()
  const [test7Name,setTest7Name] = useState()
  const [test8Name,setTest8Name] = useState()
  const [nrOfCols,setNrOfCols] = useState(12)
  const [lock,setLock] = useState(true)
  const [testDate,setTestDate] = useState("")
  var testNames
  if (players.length==0) totalPlayers.map((value,index)=>{
   if(!value.is_coach) players.push(value)
  
  })
  requests.post("/user/username",{username:"tests"})
  .then(res=>{testNames= res.data[0];
   if(theaders.length<5){
   tests[0] = testNames.tests[0].test1;
   tests[1] = testNames.tests[0].test2;
   tests[2] = testNames.tests[0].test3;
   tests[3] = testNames.tests[0].test4;
   tests[4] = testNames.tests[0].test5;
   tests[5] = testNames.tests[0].test6;
   tests[6] = testNames.tests[0].test7;
   tests[7] = testNames.tests[0].test8;
   setTheaders([...theaders,...tests]);
   theaders.length = testNames.tests[0].nrOfCols;
   setNrOfCols(testNames.tests[0].nrOfCols)
  } 
  theaders.length = nrOfCols 
   })
  const handleTestValue = async (e)=>{
    var test1TUV="";
    var test2TUV="";
    var test3TUV="";
    var test4TUV="";
    var test5TUV="";
    var test6TUV="";
    var test7TUV="";
    var test8TUV="";
    var playerTU="";
    var date = "";
    var season = ""
    playerId = e.target.name.split("/")[2]
    players.map((value)=>{if(value._id==playerId) {setPlayerToUpdate(value);playerTU = value}})
    
    if(e.target.name.split("/")[3] == "Test1") {test1TUV = e.target.value}
    if(e.target.name.split("/")[3] == "Test2") {test2TUV = e.target.value}
    if(e.target.name.split("/")[3] == "Test3") {test3TUV = e.target.value}
    if(e.target.name.split("/")[3] == "Test4") {test4TUV = e.target.value}
    if(e.target.name.split("/")[3] == "Test5") {test5TUV = e.target.value}
    if(e.target.name.split("/")[3] == "Test6") {test6TUV = e.target.value}
    if(e.target.name.split("/")[3] == "Test7") {test7TUV = e.target.value}
    if(e.target.name.split("/")[3] == "Test8") {test8TUV = e.target.value}
    if(e.target.name.split("/")[3] == "date") {setTestDate(e.target.value)}
    if(e.target.name.split("/")[3] == "season") {season = e.target.value}
    setPlayerName(e.target.name.split("/")[0]+" "+e.target.name.split("/")[1])

///////////////////////////////////////////////////
    
   //jump1
      if(playerTU){// requests.get("/user/get").then(res => console.log(res));
      if(test1TUV!="") playerTU.tests[e.target.name.split("/")[4]].test1 = test1TUV;
      if(test2TUV!="") playerTU.tests[e.target.name.split("/")[4]].test2 = test2TUV;
      if(test3TUV!="") playerTU.tests[e.target.name.split("/")[4]].test3 = test3TUV;
      if(test4TUV!="") playerTU.tests[e.target.name.split("/")[4]].test4 = test4TUV;
      if(test5TUV!="") playerTU.tests[e.target.name.split("/")[4]].test5 = test5TUV;
      if(test6TUV!="") playerTU.tests[e.target.name.split("/")[4]].test6 = test6TUV;
      if(test7TUV!="") playerTU.tests[e.target.name.split("/")[4]].test7 = test7TUV;
      if(test8TUV!="") playerTU.tests[e.target.name.split("/")[4]].test8 = test8TUV;
      if(date!="") playerTU.tests[e.target.name.split("/")[4]].date = testDate;
      if(season!="") playerTU.tests[e.target.name.split("/")[4]].season = season;
      playerTU.tests.date = moment().format("DD/MM/YY")
     await requests.put("/user/update",playerTU)
      .then(res=>console.log(res))
     }
////////////////////////////////////////////////////

  }
 

  const updateMeasurementsTable = async(e) =>{
    playerId = e.target.name.split("/")[2]
    players.map((value)=>{if(value._id==playerId) setPlayerToUpdate(value)})
    if(e.target.name.split("/")[3] == "height") height = e.target.value
    if(e.target.name.split("/")[3] == "weight") weight = e.target.value
    if(e.target.name.split("/")[3] == "fat") fat = e.target.value
    setPlayerName(e.target.name.split("/")[0]+" "+e.target.name.split("/")[1])
    if(playerToUpdate){// requests.get("/user/get").then(res => console.log(res));
    if(height!="")playerToUpdate.measurements.height = height;
    if(weight!="")playerToUpdate.measurements.weight = weight;
    if(fat!="")playerToUpdate.measurements.fat = fat;
   await requests.put("/user/update",playerToUpdate)
    .then(res=>console.log(res))
   }}
   const handleMeasurementsValue = async (e)=>{
    var height = "";
    var weight = "";
    var fat = "";
    var playerTU="";
    var date = "";
    var season = ""
    playerId = e.target.name.split("/")[2]
    players.map((value)=>{if(value._id==playerId) {setPlayerToUpdate(value);playerTU = value}})
    
    if(e.target.name.split("/")[3] == "weight") {weight = e.target.value}
    if(e.target.name.split("/")[3] == "height") {height = e.target.value}
    if(e.target.name.split("/")[3] == "fat") {fat = e.target.value}
    if(e.target.name.split("/")[3] == "date") {date = e.target.value}
    if(e.target.name.split("/")[3] == "season") {season = e.target.value}
    setPlayerName(e.target.name.split("/")[0]+" "+e.target.name.split("/")[1])

///////////////////////////////////////////////////
    
   //jump1
      if(playerTU){// requests.get("/user/get").then(res => console.log(res));
      if(weight!="") playerTU.measurements[e.target.name.split("/")[4]].weight = weight;
      if(height!="") playerTU.measurements[e.target.name.split("/")[4]].height = height;
      if(fat!="") playerTU.measurements[e.target.name.split("/")[4]].fat = fat;
      if(date!="") playerTU.measurements[e.target.name.split("/")[4]].date = date;
      if(season!="") playerTU.measurements[e.target.name.split("/")[4]].season = season;
     await requests.put("/user/update",playerTU)
      .then(res=>console.log(res))
     }
////////////////////////////////////////////////////

  }
 
  const updateTestNames = async ()=>{
    if(lock) return
    //the player with the username:tests was used in order to store the test names
    await requests.post("/user/username",{username:"tests"})
   .then(res=>testNames= res.data[0])
    if(test1Name)testNames.tests[0].test1 = test1Name
    if(test2Name)testNames.tests[0].test2 = test2Name
    if(test3Name)testNames.tests[0].test3 = test3Name
    if(test4Name)testNames.tests[0].test4 = test4Name
    if(test5Name)testNames.tests[0].test5 = test5Name
    if(test6Name)testNames.tests[0].test6 = test6Name
    if(test7Name)testNames.tests[0].test7 = test7Name
    if(test8Name)testNames.tests[0].test8 = test8Name
    testNames.image = ' '
    await requests.put("/user/update",testNames)
   .then(res=>console.log(res))
  }
  const handleTestName = (e) =>{
    if(e.target.name==="test1") {tests[0]=e.target.value;setTest1Name(e.target.value)}
    if(e.target.name==="test2") {tests[1]=e.target.value;setTest2Name(e.target.value)}
    if(e.target.name==="test3") {tests[2]=e.target.value;setTest3Name(e.target.value)}
    if(e.target.name==="test4") {tests[3]=e.target.value;setTest4Name(e.target.value)}
    if(e.target.name==="test5") {tests[4]=e.target.value;setTest5Name(e.target.value)}
    if(e.target.name==="test6") {tests[5]=e.target.value;setTest6Name(e.target.value)}
    if(e.target.name==="test7") {tests[6]=e.target.value;setTest7Name(e.target.value)}
    if(e.target.name==="test8") {tests[7]=e.target.value;setTest8Name(e.target.value)}
  }
  const styleLockOffHeader = {
    background:"none",
    border:"none",
    fontSize:"1.1em",
    textAlign:"center",
    color:"#8E8E8E",
    
  }
  const styleLockOffField= {
    border:"none",
    fontSize:"1.1em",
    textAlign:"center",
    color:"black",
    textAlign:"center",
    width:"100%",fontSize:"1em",
    background:"white"
  }
  const styleLockOn = {
    
    fontSize:"1.1em",
    
  }
  const changeLockState=()=>{
    setLock(!lock)
  }
  const filterTests = (e) =>{
    var testName = e.target.value;
    tests.map((value,index)=>{
      if(value==testName) testName = "test"+(index+1)
    })
    
    var aux
    if(testName==="test1") players.map(()=>{
      players.map((value,index)=>{  
        if(players[index+1])if(parseInt(value.tests[0].test1)>parseInt(players[index+1].tests[0].test1)){
          aux = players[index]
          players[index] = players[index+1]
          players[index+1] = aux ;
        }
      })
    })
    if(testName==="test2") players.map(()=>{
      players.map((value,index)=>{
        if(players[index+1])if(parseInt(value.tests[0].test2)>parseInt(players[index+1].tests[0].test2)){
          aux = players[index]
          players[index] = players[index+1]
          players[index+1] = aux ;
        }
      })
    })
    if(testName==="test3") players.map(()=>{
      players.map((value,index)=>{
        if(players[index+1])if(parseInt(value.tests[0].test3)>parseInt(players[index+1].tests[0].test3)){
          aux = players[index]
          players[index] = players[index+1]
          players[index+1] = aux ;
        }
      })
    })
    if(testName==="test4") players.map(()=>{
      players.map((value,index)=>{
        if(players[index+1])if(parseInt(value.tests[0].test4)>parseInt(players[index+1].tests[0].test4)){
          aux = players[index]
          players[index] = players[index+1]
          players[index+1] = aux ;
        }
      })
    })
    if(testName==="test5") players.map(()=>{
      players.map((value,index)=>{
        if(players[index+1])if(parseInt(value.tests[0].test5)>parseInt(players[index+1].tests[0].test5)){
          aux = players[index]
          players[index] = players[index+1]
          players[index+1] = aux ;
        }
      })
    })
    if(testName==="test6") players.map(()=>{
      players.map((value,index)=>{
        if(players[index+1])if(parseInt(value.tests[0].test6)>parseInt(players[index+1].tests[0].test6)){
          aux = players[index]
          players[index] = players[index+1]
          players[index+1] = aux ;
        }
      })
    })
    if(testName==="test7") players.map(()=>{
      players.map((value,index)=>{
        if(players[index+1])if(parseInt(value.tests[0].test7)>parseInt(players[index+1].tests[0].test7)){
          aux = players[index]
          players[index] = players[index+1]
          players[index+1] = aux ;
        }
      })
    })
    if(testName==="test8") players.map(()=>{
      players.map((value,index)=>{
        if(players[index+1])if(parseInt(value.tests[0].test8)>parseInt(players[index+1].tests[0].test8)){
          aux = players[index]
          players[index] = players[index+1]
          players[index+1] = aux ;
        }
      })
    })
  
  
  setPlayers([...players]);  
  }
  const addRowTests = async (e) =>{
    var playerOnNewRow 
    if(e.target.nodeName=="INPUT"||e.target.id.split("/").includes("athletename")) return
   await requests.post("/user/username",{username:e.target.id.split("/")[0]})
  .then(res=>{playerOnNewRow = res.data[0]})
  playerOnNewRow.tests.push({
    test1:"0",
    test2:"0",
    test3:"0",
    test4:"0",
    test5:"0",
    test6:"0",
    test7:"0",
    test8:"0",
    date:"0",
    nrOfCols:12
  })
   await requests.put("/user/update",playerOnNewRow)
      .then(res=>console.log(res))
      window.location.reload()
      setMeasurementsTab(false)
 
  }
  const addRowMeasurements = async (e) =>{
    if(e.target.nodeName=="INPUT"||e.target.id.split("/").includes("athletename")) return
    var playerOnNewRow
   await requests.post("/user/username",{username:e.target.id.split("/")[0]})
  .then(res=>{playerOnNewRow = res.data[0]})
  playerOnNewRow.measurements.push({
    height:"0",
    weight:"0",
    fat:"0",
    date:"0",
    season:"0",
  })
   await requests.put("/user/update",playerOnNewRow)
      .then(res=>console.log(res))
      window.location.reload()
 
  }
  const removeRowMeasurements = async (e) =>{
    if(e.target.nodeName=="INPUT") return
    var rowToBeRemoved = e.target.id;
    var rowToBeRemoved = rowToBeRemoved.split("/")[1]
    var indexOfPlayer
    players.map((player,index)=>{if(player.measurements.length<2) return ;if(player.username==e.target.id.split("/")[0])  indexOfPlayer = index })
    players[indexOfPlayer].measurements.splice(rowToBeRemoved,1)
    const playerToBeUpdated = players[indexOfPlayer];
    await requests.put("/user/update",playerToBeUpdated)
    .then(res=>console.log(res)) 
    window.location.reload()
  }
  const removeRowTests = async (e) =>{
    if(e.target.nodeName=="INPUT") return
    var rowToBeRemoved = e.target.id;
    var rowToBeRemoved = rowToBeRemoved.split("/")[1]
    var indexOfPlayer
    players.map((player,index)=>{if(player.tests.length<2) return ;if(player.username==e.target.id.split("/")[0])  indexOfPlayer = index })
    players[indexOfPlayer].tests.splice(rowToBeRemoved,1)
    const playerToBeUpdated = players[indexOfPlayer];
    await requests.put("/user/update",playerToBeUpdated)
    .then(res=>console.log(res)) 
    window.location.reload()
  }
  const filterMeasurements = (e) =>{
    var measurementName = e.target.value;
    
   
    
   var aux
    if(measurementName==="Height") players.map(()=>{
      players.map((value,index)=>{
        if(players[index+1])if(parseInt(value.measurements[0].height)>parseInt(players[index+1].measurements[0].height)){
          aux = players[index]
          players[index] = players[index+1]
          players[index+1] = aux ;
        }
      })
    })
    if(measurementName==="Weight") players.map(()=>{
      players.map((value,index)=>{
        if(players[index+1])if(parseInt(value.measurements[0].weight)>parseInt(players[index+1].measurements[0].weight)){
          aux = players[index]
          players[index] = players[index+1]
          players[index+1] = aux ;
        }
      })
    })
    if(measurementName==="Fat") players.map(()=>{
      players.map((value,index)=>{
        if(players[index+1])if(parseInt(value.measurements[0].fat)>parseInt(players[index+1].measurements[0].fat)){
          aux = players[index]
          players[index] = players[index+1]
          players[index+1] = aux ;
        }
      })
    })
    if(measurementName==="BMI") players.map(()=>{
      players.map((value,index)=>{
        if(players[index+1])if(parseInt(value.measurements[0].bmi)>parseInt(players[index+1].measurements[0].bmi)){
          aux = players[index]
          players[index] = players[index+1]
          players[index+1] = aux ;
        }
      })
    })
  setPlayers([...players]);  
  }
  const reduceCols = async() =>{
    if(nrOfCols>5){setNrOfCols(nrOfCols-1);theaders.length = nrOfCols-1;
    
    //the player with the username:tests was used in order to store the test names
    await requests.post("/user/username",{username:"tests"})
   .then(res=>testNames= res.data[0])
    testNames.tests[0].nrOfCols = nrOfCols-1;
    
    await requests.put("/user/update",testNames)
   .then(res=>console.log(res))
    }
  }
  const addCols = async() =>{
    if(nrOfCols<12) {setNrOfCols(nrOfCols+1);theaders.length  = nrOfCols+1;
    //the player with the username:tests was used in order to store the test names
    await requests.post("/user/username",{username:"tests"})
   .then(res=>testNames= res.data[0])
    testNames.tests[0].nrOfCols = nrOfCols+1;
    await requests.put("/user/update",testNames)
   .then(res=>console.log(res))

   await requests.post("/user/username",{username:"tests"})
   .then(res=>{testNames= res.data[0];
  
  })
  window.location.reload()
  }}
  useEffect(() => {
    
    setTotalPlayers(props.players);
  }, [props.players,tests,players])
  
  if(measurementsTab) return(
    
    <div className="overview team-summary-test">
      
    <button onClick={changeLockState} className={lock?"lock-locked":"lock-unlocked"}>{lock?<AiFillLock/>:<AiFillUnlock/>}</button>
    <div>
      <button onClick={()=>setMeasurementsTab(false)} className="test-measurements-button">Squad Test</button>
      <button style={measurementsTab?{color:"black"}:""} className="test-measurements-button">Body Measurements</button>
     
    </div>
    <select onChange={filterMeasurements} className="filter">
      <option>Filter by</option>
      {measurements.map((value,index)=>{
        return<option id={"test"+index}>{value}</option>
      })
      }
    </select>
  <table className="team-summary-table ">
    <thead>
      <tr>
        {theaders2.map((value)=>{
          return <th className="table-header-cell team-summary-test-cell">{value}</th>
        })}
      </tr>
    </thead>
    <tbody className="tbody-load team-summary-test-tbody">
    
       {players.map((value,index2)=>{return(value.measurements.map((theMeasurement,index3)=>{ return(
       <tr className={index3+1==value.measurements.length&&!lock?"":""} >
            {theaders2.map((value2,index)=>{
          return <td style={{width:"12%"}} id = {value2=="Athlete"?value.username+"/"+index3+"/athletename":value.username+"/"+index3} onClick={!lock&&value.measurements.length>1&&index3+1!==value.measurements.length?removeRowMeasurements:""}  className={value2=="Athlete"&&index3+1!==value.measurements.length&&!lock?"removeRow table-left-atr-test pso-sub2 ":"table-left-atr-test pso-sub2"}>{
          value2 == "Athlete" ? value.firstName+" "+value.lastName :
          value2 == "Season"&&!lock ? <input disabled={lock?true:false} id={value.username}  style={lock?styleLockOffField:styleLockOn} name={value.firstName+"/"+value.lastName+"/"+value._id+"/"+"season"+"/"+index3} onChange={handleMeasurementsValue} placeholder={theMeasurement.season}></input>:
          value2 == "Season"&&lock ? theMeasurement.season:
          value2 == "Date"&&!lock ? <input disabled={lock?true:false} id={value.username}  style={lock?styleLockOffField:styleLockOn} name={value.firstName+"/"+value.lastName+"/"+value._id+"/"+"date"+"/"+index3} onChange={handleMeasurementsValue} placeholder={theMeasurement.date}></input>:
          value2 == "Date"&&lock ? theMeasurement.date:
          value2 == measurements[0]&&value.measurements ? <input disabled={lock?true:false}  style={lock?styleLockOffField:styleLockOn} name={value.firstName+"/"+value.lastName+"/"+value._id+"/"+"height"+"/"+index3} onChange={handleMeasurementsValue} placeholder={theMeasurement.height}></input>:
          value2 == measurements[1]&&value.measurements ? <input disabled={lock?true:false}  style={lock?styleLockOffField:styleLockOn} name={value.firstName+"/"+value.lastName+"/"+value._id+"/"+"weight"+"/"+index3} onChange={handleMeasurementsValue} placeholder={theMeasurement.weight}></input>:
          value2 == measurements[2]&&value.measurements ? <input disabled={lock?true:false}  style={lock?styleLockOffField:styleLockOn} name={value.firstName+"/"+value.lastName+"/"+value._id+"/"+"fat"+"/"+index3} onChange={handleMeasurementsValue} placeholder={theMeasurement.fat}></input>:""
          }
         {index3+1==value.measurements.length&&value2=="Athlete"&&!lock?<div><div id = {value2=="Athlete"?value.username+"/"+index3:value.username+"/"+index3} onClick={!lock&&index3+1==value.measurements.length? addRowMeasurements:value2=="Athlete"&&!lock?removeRowMeasurements:""} className={"add-row-label"}>+</div><label className="add-row-label-hidden">add row below  </label></div>:""}
          </td>
        })} 
        </tr>)}))})}
        
    </tbody>
  </table>
  
</div>
  )
    return (
        <div className="overview team-summary-test">
          
          <button onClick={()=>{changeLockState();updateTestNames()}} className={lock?"lock-locked":"lock-unlocked"}>{lock?<AiFillLock/>:<AiFillUnlock/>}</button>
            <div>
              
              <button style={!measurementsTab?{color:"black"}:{}} onClick={()=>setMeasurementsTab(false)} className="test-measurements-button">Squad Test</button>
              <button style={measurementsTab?{color:"black"}:{}}  onClick={()=>setMeasurementsTab(true)} className="test-measurements-button">Body Measurements</button>
              <button className="add-reduce-tests" onClick={reduceCols}>-</button>
              <button className="add-reduce-tests" onClick={addCols}>+</button>
          </div>
          <select onChange={filterTests} className="filter">
            <option>Filter by</option>
            {tests.map((value,index)=>{
              return<option id={"test"+index}>{value}</option>
            })
            }
          </select>
        <table className="team-summary-table ">
          <thead>
            <tr>
              {theaders.map((value,index)=>{
                if(index>3) return <th className="team-summary-test-cell"><input className={lock?"table-header-cell":"input-test"} disabled={lock?true:false}  style={lock?styleLockOffHeader:styleLockOn} name={`test`+(index-3)} onChange={handleTestName} defaultValue={value}></input></th>
                return <th className="table-header-cell team-summary-test-cell">{value}</th>
              })}
            </tr>
          </thead>
          <tbody className="tbody-load team-summary-test-tbody">
          
             {players.map((value,index2)=>{return(
               value.tests.map((theTest,index3)=>{
                 //jump2 ↑↑↑↑↑ return statement needed to be made-> continue from here
               return( <tr className={index3+1==value.tests.length&&!lock?"":""} >
                  {theaders.map((value2,index)=>{
                return <td style={{width:"12%"}} id = {value2=="Athlete"?value.username+"/"+index3+"/athletename":value.username+"/"+index3} onClick={!lock&&value.tests.length>1&&index3+1!==value.tests.length?removeRowTests:console.log("")}  className={value2=="Athlete"&&index3+1!==value.tests.length&&!lock?"removeRow table-left-atr-test pso-sub2 ":"table-left-atr-test pso-sub2"}>{
                  value2 == "Athlete" ? value.firstName+" "+value.lastName :
                  value2 == "Team" ? value.team:
                  value2 == "Season"&&!lock ? <input disabled={lock?true:false} id={value.username} className={!lock?"input-test":""} style={lock?styleLockOffField:styleLockOn} name={value.firstName+"/"+value.lastName+"/"+value._id+"/"+"season"+"/"+index3} onChange={handleTestValue} placeholder={theTest.season}></input>:
                  value2 == "Season"&&lock ? theTest.season:
                  value2 == "Date"&&!lock ? <input disabled={lock?true:false} id={value.username} className={!lock?"input-test":""} style={lock?styleLockOffField:styleLockOn} name={value.firstName+"/"+value.lastName+"/"+value._id+"/"+"date"+"/"+index3} onChange={handleTestValue} placeholder={theTest.date}></input>:
                  value2 == "Date"&&lock ?testDate?testDate: theTest.date:
                  value2 == tests[0]&&value.tests ? <input disabled={lock?true:false} className={!lock?"input-test":""} style={lock?styleLockOffField:styleLockOn} name={value.firstName+"/"+value.lastName+"/"+value._id+"/"+"Test1"+"/"+index3} onChange={handleTestValue} placeholder={theTest.test1}></input>:
                  value2 == tests[1]&&value.tests ? <input disabled={lock?true:false} className={!lock?"input-test":""} style={lock?styleLockOffField:styleLockOn} name={value.firstName+"/"+value.lastName+"/"+value._id+"/"+"Test2"+"/"+index3} onChange={handleTestValue} placeholder={theTest.test2}></input>:
                  value2 == tests[2]&&value.tests ? <input disabled={lock?true:false} className={!lock?"input-test":""} style={lock?styleLockOffField:styleLockOn} name={value.firstName+"/"+value.lastName+"/"+value._id+"/"+"Test3"+"/"+index3} onChange={handleTestValue} placeholder={theTest.test3}></input>:
                  value2 == tests[3]&&value.tests ? <input disabled={lock?true:false} className={!lock?"input-test":""} style={lock?styleLockOffField:styleLockOn} name={value.firstName+"/"+value.lastName+"/"+value._id+"/"+"Test4"+"/"+index3} onChange={handleTestValue} placeholder={theTest.test4}></input>:
                  value2 == tests[4]&&value.tests ? <input disabled={lock?true:false} className={!lock?"input-test":""} style={lock?styleLockOffField:styleLockOn} name={value.firstName+"/"+value.lastName+"/"+value._id+"/"+"Test5"+"/"+index3} onChange={handleTestValue} placeholder={theTest.test5}></input>:
                  value2 == tests[5]&&value.tests ? <input disabled={lock?true:false} className={!lock?"input-test":""} style={lock?styleLockOffField:styleLockOn} name={value.firstName+"/"+value.lastName+"/"+value._id+"/"+"Test6"+"/"+index3} onChange={handleTestValue} placeholder={theTest.test6}></input>:
                  value2 == tests[6]&&value.tests ? <input disabled={lock?true:false} className={!lock?"input-test":""} style={lock?styleLockOffField:styleLockOn} name={value.firstName+"/"+value.lastName+"/"+value._id+"/"+"Test7"+"/"+index3} onChange={handleTestValue} placeholder={theTest.test7}></input>:
                  value2 == tests[7]&&value.tests ? <input disabled={lock?true:false} className={!lock?"input-test":""} style={lock?styleLockOffField:styleLockOn} name={value.firstName+"/"+value.lastName+"/"+value._id+"/"+"Test8"+"/"+index3} onChange={handleTestValue} placeholder={theTest.test8}></input>:""
                  }
                 {index3+1==value.tests.length&&value2=="Athlete"&&!lock?<div><div id = {value2=="Athlete"?value.username+"/"+index3:value.username+"/"+index3} onClick={!lock&&index3+1==value.tests.length? addRowTests:value2=="Athlete"&&!lock?removeRowTests:""} className={"add-row-label"}>+</div><label className="add-row-label-hidden">add row below  </label></div>:""}
                  </td>
              })}
              </tr>)}))})}
              
          </tbody>
        </table>
        
      </div>
    )
}

export default TeamSummaryTest
