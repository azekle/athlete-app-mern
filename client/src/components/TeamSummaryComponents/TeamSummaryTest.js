import React,{useState,useEffect} from 'react'
import "./TeamSummaryCss/TeamSummaryTest.css"
import {requests} from '../../utils/axios'
import {AiFillLock,AiFillUnlock} from 'react-icons/ai'
import moment from 'moment'
const TeamSummaryTest = (props) => {
  const [totalPlayers, setTotalPlayers] = useState(props.players)
  const players = []
  const [test1Value,setTest1Value] = useState("") 
  const [test2Value,setTest2Value] = useState("") 
  const [test3Value,setTest3Value] = useState("") 
  const [test4Value,setTest4Value] = useState("") 
  const [playerName,setPlayerName] =useState("")
  var playerId = "";
  const [playerToUpdate,setPlayerToUpdate] = useState("")
  const [tests,setTests] = useState([])
  const [theaders,setTheaders] = useState(["Athlete","Season","Date","Team"])
  const [test1Name,setTest1Name] = useState()
  const [test2Name,setTest2Name] = useState()
  const [test3Name,setTest3Name] = useState()
  const [test4Name,setTest4Name] = useState()
  const [lock,setLock] = useState(true)
  var testNames
  totalPlayers.map((value)=>{
  if(!value.is_coach) players.push(value)
  })
  requests.post("/user/username",{username:"tests"})
  .then(res=>{testNames= res.data[0];
   if(theaders.length<5){
   tests[0] = testNames.tests.test1;
   tests[1] = testNames.tests.test2;
   tests[2] = testNames.tests.test3;
   setTheaders([...theaders,...tests]);}  
   })
  const handleTestValue = (e)=>{
    console.log(test1Value)
    playerId = e.target.name.split("/")[2]
    players.map((value)=>{if(value._id==playerId) setPlayerToUpdate(value)})
    if(e.target.name.split("/")[3] == "Test1") setTest1Value(e.target.value)
    if(e.target.name.split("/")[3] == "Test2") setTest2Value(e.target.value)
    if(e.target.name.split("/")[3] == "Test3") setTest3Value(e.target.value)
    if(e.target.name.split("/")[3] == "Test4") setTest4Value(e.target.value)
    setPlayerName(e.target.name.split("/")[0]+" "+e.target.name.split("/")[1])
  }
  const updateTestTable = async() =>{
    console.log(test1Value)
   if(playerToUpdate){// requests.get("/user/get").then(res => console.log(res));
   if(test1Value!="")playerToUpdate.tests.test1 = test1Value;
   if(test2Value!="")playerToUpdate.tests.test2 = test2Value;
   if(test3Value!="")playerToUpdate.tests.test3 = test3Value;
   if(test4Value!="")playerToUpdate.tests.test4 = test4Value;
   console.log(playerToUpdate)
   playerToUpdate.tests.date = moment().format("DD/MM/YY")
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
    console.log(testNames.tests)
    await requests.put("/user/update",testNames)
   .then(res=>console.log(res))
  }
  const handleTestName = (e) =>{
    if(e.target.name==="test1") {tests[0]=e.target.value;setTest1Name(e.target.value)}
    if(e.target.name==="test2") {tests[1]=e.target.value;setTest2Name(e.target.value)}
    if(e.target.name==="test3") {tests[2]=e.target.value;setTest3Name(e.target.value)}
    if(e.target.name==="test4") {tests[3]=e.target.value;setTest4Name(e.target.value)}
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
  useEffect(() => {
    
    setTotalPlayers(props.players);
  }, [props.players,tests])
    return (
        <div className="overview team-summary-test">
          <button onClick={changeLockState} className={lock?"lock-locked":"lock-unlocked"}>{lock?<AiFillLock/>:<AiFillUnlock/>}</button>
        <table className="team-summary-table ">
          <thead>
            <tr>
              {theaders.map((value,index)=>{
                if(index>3) return <th className="table-header-cell team-summary-test-cell"><input disabled={lock?true:false}  style={lock?styleLockOffHeader:styleLockOn} name={`test`+(index-3)} onChange={handleTestName} defaultValue={value}></input></th>
                return <th className="table-header-cell team-summary-test-cell">{value}</th>
              })}
            </tr>
          </thead>
          <tbody className="tbody-load team-summary-test-tbody">
          
             {players.map((value)=>{return( <tr className="">
                  {theaders.map((value2)=>{
                return <td style={{width:"12%"}} className="table-left-atr-test pso-sub2">{
                value2 == "Athlete" ? value.firstName+" "+value.lastName :
                value2 == "Season"? "Season" :
                value2 == "Date" ? value.tests.date:
                value2 == "Team" ? "team":
                value2 == tests[0]&&value.tests ? <input disabled={lock?true:false}  style={lock?styleLockOffField:styleLockOn} name={value.firstName+"/"+value.lastName+"/"+value._id+"/"+"Test1"} onChange={handleTestValue}  defaultValue={value.tests.test1}></input>:
                value2 == tests[1]&&value.tests ? <input disabled={lock?true:false}  style={lock?styleLockOffField:styleLockOn} name={value.firstName+"/"+value.lastName+"/"+value._id+"/"+"Test2"} onChange={handleTestValue}   defaultValue={value.tests.test2}></input>:
                value2 == tests[2]&&value.tests ? <input disabled={lock?true:false}  style={lock?styleLockOffField:styleLockOn} name={value.firstName+"/"+value.lastName+"/"+value._id+"/"+"Test3"} onChange={handleTestValue}   defaultValue={value.tests.test3}></input>:""
                }</td>
              })}
              </tr>)})}
              
          </tbody>
        </table>
        {!lock?<button style={playerName? {alignSelf:"center"}:{background:"grey",alignSelf:"center"}} onClick={updateTestTable} className="submit-button">{`Update ${playerName}`}</button>:""}
        {!lock?<button style={test1Name||test2Name||test3Name||test4Name? {alignSelf:"center"}:{background:"grey",alignSelf:"center"}} onClick={updateTestNames} className="submit-button">Update Tests</button>:""}
      </div>
    )
}

export default TeamSummaryTest
