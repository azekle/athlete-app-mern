import React,{useState,useEffect} from 'react'
import "./TeamSummaryCss/TeamSummaryTest.css"
import {requests} from '../../utils/axios'
import {AiFillLock,AiFillUnlock} from 'react-icons/ai'
import moment from 'moment'
const TeamSummaryTest = (props) => {
  const [totalPlayers, setTotalPlayers] = useState(props.players)
  const [players,setPlayers] = useState([])
  const [test1Value,setTest1Value] = useState("") 
  const [test2Value,setTest2Value] = useState("") 
  const [test3Value,setTest3Value] = useState("") 
  const [test4Value,setTest4Value] = useState("") 
  const [test5Value,setTest5Value] = useState("") 
  const [test6Value,setTest6Value] = useState("") 
  const [test7Value,setTest7Value] = useState("") 
  const [test8Value,setTest8Value] = useState("") 
  const [height,setHeight] = useState("") 
  const [weight,setWeight] = useState("") 
  const [fat,setFat] = useState("") 
  
  const [playerName,setPlayerName] =useState("")
  const [measurementsTab,setMeasurementsTab] = useState(true)
  var playerId = "";
  const [playerToUpdate,setPlayerToUpdate] = useState("")
  const [tests,setTests] = useState([])
  const [theaders,setTheaders] = useState(["Athlete","Season","Date","Team"])
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
  var testNames
  if (players.length==0) totalPlayers.map((value,index)=>{
   if(!value.is_coach) players.push(value)
  
  })
  requests.post("/user/username",{username:"tests"})
  .then(res=>{testNames= res.data[0];
   if(theaders.length<5){
   tests[0] = testNames.tests.test1;
   tests[1] = testNames.tests.test2;
   tests[2] = testNames.tests.test3;
   tests[3] = testNames.tests.test4;
   tests[4] = testNames.tests.test5;
   tests[5] = testNames.tests.test6;
   tests[6] = testNames.tests.test7;
   tests[7] = testNames.tests.test8;
   setTheaders([...theaders,...tests]);
   theaders.length = testNames.tests.nrOfCols;
   setNrOfCols(testNames.tests.nrOfCols)
  } theaders.length = nrOfCols 
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
    playerId = e.target.name.split("/")[2]
    players.map((value)=>{if(value._id==playerId) {setPlayerToUpdate(value);playerTU = value}})
    if(e.target.name.split("/")[3] == "Test1") {setTest1Value(e.target.value);test1TUV = e.target.value}
    if(e.target.name.split("/")[3] == "Test2") {setTest2Value(e.target.value);test2TUV = e.target.value }
    if(e.target.name.split("/")[3] == "Test3") {setTest3Value(e.target.value);test3TUV = e.target.value}
    if(e.target.name.split("/")[3] == "Test4") {setTest4Value(e.target.value);test4TUV = e.target.value}
    if(e.target.name.split("/")[3] == "Test5") {setTest5Value(e.target.value);test5TUV = e.target.value}
    if(e.target.name.split("/")[3] == "Test6") {setTest6Value(e.target.value);test6TUV = e.target.value}
    if(e.target.name.split("/")[3] == "Test7") {setTest7Value(e.target.value);test7TUV = e.target.value}
    if(e.target.name.split("/")[3] == "Test8") {setTest8Value(e.target.value);test8TUV = e.target.value}
    setPlayerName(e.target.name.split("/")[0]+" "+e.target.name.split("/")[1])

///////////////////////////////////////////////////
    
   
      if(playerTU){// requests.get("/user/get").then(res => console.log(res));
      if(test1TUV!="") playerTU.tests.test1 = test1TUV;
      if(test2TUV!="") playerTU.tests.test2 = test2TUV;
      if(test3TUV!="") playerTU.tests.test3 = test3TUV;
      if(test4TUV!="") playerTU.tests.test4 = test4TUV;
      if(test5TUV!="") playerTU.tests.test5 = test5TUV;
      if(test6TUV!="") playerTU.tests.test6 = test6TUV;
      if(test7TUV!="") playerTU.tests.test7 = test7TUV;
      if(test8TUV!="") playerTU.tests.test8 = test8TUV;
      playerTU.tests.date = moment().format("DD/MM/YY")
     await requests.put("/user/update",playerTU)
      .then(res=>console.log(res))
     }
////////////////////////////////////////////////////

  }
  const handleMeasurementsValue = (e)=>{
  
    playerId = e.target.name.split("/")[2]
    players.map((value)=>{if(value._id==playerId) setPlayerToUpdate(value)})
    if(e.target.name.split("/")[3] == "height") setHeight(e.target.value)
    if(e.target.name.split("/")[3] == "weight") setWeight(e.target.value)
    if(e.target.name.split("/")[3] == "fat") setFat(e.target.value)
    setPlayerName(e.target.name.split("/")[0]+" "+e.target.name.split("/")[1])
  }

  const updateMeasurementsTable = async() =>{
   
    if(playerToUpdate){// requests.get("/user/get").then(res => console.log(res));
    if(height!="")playerToUpdate.measurements.height = height;
    if(weight!="")playerToUpdate.measurements.weight = weight;
    if(fat!="")playerToUpdate.measurements.fat = fat;
   await requests.put("/user/update",playerToUpdate)
    .then(res=>console.log(res))
   }}
  const updateTestNames = async ()=>{
    //the player with the username:tests was used in order to store the test names
    await requests.post("/user/username",{username:"tests"})
   .then(res=>testNames= res.data[0])
    if(test1Name)testNames.tests.test1 = test1Name
    if(test2Name)testNames.tests.test2 = test2Name
    if(test3Name)testNames.tests.test3 = test3Name
    if(test4Name)testNames.tests.test4 = test4Name
    if(test5Name)testNames.tests.test5 = test5Name
    if(test6Name)testNames.tests.test6 = test6Name
    if(test7Name)testNames.tests.test7 = test7Name
    if(test8Name)testNames.tests.test8 = test8Name
    
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
    color:"#8E8E8E"
  }
  const styleLockOffField= {
    border:"none",
    fontSize:"1.1em",
    textAlign:"center",
    color:"black",
    textAlign:"center",
    width:"100%",fontSize:"1em"
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
        if(players[index+1])if(parseInt(value.tests.test1)>parseInt(players[index+1].tests.test1)){
          aux = players[index]
          players[index] = players[index+1]
          players[index+1] = aux ;
        }
      })
    })
    if(testName==="test2") players.map(()=>{
      players.map((value,index)=>{
        if(players[index+1])if(parseInt(value.tests.test2)>parseInt(players[index+1].tests.test2)){
          aux = players[index]
          players[index] = players[index+1]
          players[index+1] = aux ;
        }
      })
    })
    if(testName==="test3") players.map(()=>{
      players.map((value,index)=>{
        if(players[index+1])if(parseInt(value.tests.test3)>parseInt(players[index+1].tests.test3)){
          aux = players[index]
          players[index] = players[index+1]
          players[index+1] = aux ;
        }
      })
    })
    if(testName==="test4") players.map(()=>{
      players.map((value,index)=>{
        if(players[index+1])if(parseInt(value.tests.test4)>parseInt(players[index+1].tests.test4)){
          aux = players[index]
          players[index] = players[index+1]
          players[index+1] = aux ;
        }
      })
    })
    if(testName==="test5") players.map(()=>{
      players.map((value,index)=>{
        if(players[index+1])if(parseInt(value.tests.test5)>parseInt(players[index+1].tests.test5)){
          aux = players[index]
          players[index] = players[index+1]
          players[index+1] = aux ;
        }
      })
    })
    if(testName==="test6") players.map(()=>{
      players.map((value,index)=>{
        if(players[index+1])if(parseInt(value.tests.test6)>parseInt(players[index+1].tests.test6)){
          aux = players[index]
          players[index] = players[index+1]
          players[index+1] = aux ;
        }
      })
    })
    if(testName==="test7") players.map(()=>{
      players.map((value,index)=>{
        if(players[index+1])if(parseInt(value.tests.test7)>parseInt(players[index+1].tests.test7)){
          aux = players[index]
          players[index] = players[index+1]
          players[index+1] = aux ;
        }
      })
    })
    if(testName==="test8") players.map(()=>{
      players.map((value,index)=>{
        if(players[index+1])if(parseInt(value.tests.test8)>parseInt(players[index+1].tests.test8)){
          aux = players[index]
          players[index] = players[index+1]
          players[index+1] = aux ;
        }
      })
    })
  
  
  setPlayers([...players]);  
  }
  const filterMeasurements = (e) =>{
    var measurementName = e.target.value;
    
   
    
   var aux
    if(measurementName==="Height") players.map(()=>{
      players.map((value,index)=>{
        if(players[index+1])if(parseInt(value.measurements.height)>parseInt(players[index+1].measurements.height)){
          aux = players[index]
          players[index] = players[index+1]
          players[index+1] = aux ;
        }
      })
    })
    if(measurementName==="Weight") players.map(()=>{
      players.map((value,index)=>{
        if(players[index+1])if(parseInt(value.measurements.weight)>parseInt(players[index+1].measurements.weight)){
          aux = players[index]
          players[index] = players[index+1]
          players[index+1] = aux ;
        }
      })
    })
    if(measurementName==="Fat") players.map(()=>{
      players.map((value,index)=>{
        if(players[index+1])if(parseInt(value.measurements.fat)>parseInt(players[index+1].measurements.fat)){
          aux = players[index]
          players[index] = players[index+1]
          players[index+1] = aux ;
        }
      })
    })
    if(measurementName==="BMI") players.map(()=>{
      players.map((value,index)=>{
        if(players[index+1])if(parseInt(value.measurements.bmi)>parseInt(players[index+1].measurements.bmi)){
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
    testNames.tests.nrOfCols = nrOfCols-1;
    
    await requests.put("/user/update",testNames)
   .then(res=>console.log(res))
    }
  }
  const addCols = async() =>{
    if(nrOfCols<12) {setNrOfCols(nrOfCols+1);theaders.length  = nrOfCols+1;
    //the player with the username:tests was used in order to store the test names
    await requests.post("/user/username",{username:"tests"})
   .then(res=>testNames= res.data[0])
    testNames.tests.nrOfCols = nrOfCols+1;
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
    
       {players.map((value,index2)=>{return( <tr className="">
            {theaders2.map((value2,index)=>{
          return <td style={{width:"12%"}} className="table-left-atr-test pso-sub2">{
          value2 == "Athlete" ? value.firstName+" "+value.lastName :
          value2 == "Season"? "Season" :
          value2 == "Date" ? value.tests.date:
          value2 == measurements[0]&&value.measurements ? <input disabled={lock?true:false}  style={lock?styleLockOffField:styleLockOn} name={value.firstName+"/"+value.lastName+"/"+value._id+"/"+"height"} onChange={handleMeasurementsValue} placeholder={value.measurements.height}></input>:
          value2 == measurements[1]&&value.measurements ? <input disabled={lock?true:false}  style={lock?styleLockOffField:styleLockOn} name={value.firstName+"/"+value.lastName+"/"+value._id+"/"+"weight"} onChange={handleMeasurementsValue} placeholder={value.measurements.weight}></input>:
          value2 == measurements[2]&&value.measurements ? <input disabled={lock?true:false}  style={lock?styleLockOffField:styleLockOn} name={value.firstName+"/"+value.lastName+"/"+value._id+"/"+"fat"} onChange={handleMeasurementsValue} placeholder={value.measurements.fat}></input>:""
          }</td>
        })}
        </tr>)})}
        
    </tbody>
  </table>
  {!lock?<button style={playerName? {alignSelf:"center"}:{background:"grey",alignSelf:"center"}} onClick={updateMeasurementsTable} className="submit-button">{`Update ${playerName}`}</button>:""}
</div>
  )
    return (
        <div className="overview team-summary-test">
          
          <button onClick={changeLockState} className={lock?"lock-locked":"lock-unlocked"}>{lock?<AiFillLock/>:<AiFillUnlock/>}</button>
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
                if(index>3) return <th className="team-summary-test-cell"><input className="table-header-cell" disabled={lock?true:false}  style={lock?styleLockOffHeader:styleLockOn} name={`test`+(index-3)} onChange={handleTestName} defaultValue={value}></input></th>
                return <th className="table-header-cell team-summary-test-cell">{value}</th>
              })}
            </tr>
          </thead>
          <tbody className="tbody-load team-summary-test-tbody">
          
             {players.map((value,index2)=>{return( <tr className="">
                  {theaders.map((value2,index)=>{
                return <td style={{width:"12%"}} className="table-left-atr-test pso-sub2">{
                value2 == "Athlete" ? value.firstName+" "+value.lastName :
                value2 == "Season"? "Season" :
                value2 == "Date" ? value.tests.date:
                value2 == "Team" ? value.team:
                value2 == tests[0]&&value.tests ? <input disabled={lock?true:false}  style={lock?styleLockOffField:styleLockOn} name={value.firstName+"/"+value.lastName+"/"+value._id+"/"+"Test1"} onChange={handleTestValue} placeholder={value.tests.test1}></input>:
                value2 == tests[1]&&value.tests ? <input disabled={lock?true:false}  style={lock?styleLockOffField:styleLockOn} name={value.firstName+"/"+value.lastName+"/"+value._id+"/"+"Test2"} onChange={handleTestValue} placeholder={value.tests.test2}></input>:
                value2 == tests[2]&&value.tests ? <input disabled={lock?true:false}  style={lock?styleLockOffField:styleLockOn} name={value.firstName+"/"+value.lastName+"/"+value._id+"/"+"Test3"} onChange={handleTestValue} placeholder={value.tests.test3}></input>:
                value2 == tests[3]&&value.tests ? <input disabled={lock?true:false}  style={lock?styleLockOffField:styleLockOn} name={value.firstName+"/"+value.lastName+"/"+value._id+"/"+"Test4"} onChange={handleTestValue} placeholder={value.tests.test4}></input>:
                value2 == tests[4]&&value.tests ? <input disabled={lock?true:false}  style={lock?styleLockOffField:styleLockOn} name={value.firstName+"/"+value.lastName+"/"+value._id+"/"+"Test5"} onChange={handleTestValue} placeholder={value.tests.test5}></input>:
                value2 == tests[5]&&value.tests ? <input disabled={lock?true:false}  style={lock?styleLockOffField:styleLockOn} name={value.firstName+"/"+value.lastName+"/"+value._id+"/"+"Test6"} onChange={handleTestValue} placeholder={value.tests.test6}></input>:
                value2 == tests[6]&&value.tests ? <input disabled={lock?true:false}  style={lock?styleLockOffField:styleLockOn} name={value.firstName+"/"+value.lastName+"/"+value._id+"/"+"Test7"} onChange={handleTestValue} placeholder={value.tests.test7}></input>:
                value2 == tests[7]&&value.tests ? <input disabled={lock?true:false}  style={lock?styleLockOffField:styleLockOn} name={value.firstName+"/"+value.lastName+"/"+value._id+"/"+"Test8"} onChange={handleTestValue} placeholder={value.tests.test8}></input>:""
                }</td>
              })}
              </tr>)})}
              
          </tbody>
        </table>
        
        {!lock?<button style={test1Name||test2Name||test3Name||test4Name||test5Name||test6Name||test7Name||test8Name? {alignSelf:"center"}:{background:"grey",alignSelf:"center"}} onClick={updateTestNames} className="submit-button">Update Tests</button>:""}
      </div>
    )
}

export default TeamSummaryTest
