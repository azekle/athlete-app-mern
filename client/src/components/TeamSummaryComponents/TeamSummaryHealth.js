import React, { useState ,useEffect} from 'react'
import "./TeamSummaryCss/TeamSummaryTest.css"
import "./TeamSummaryCss/TeamSummaryHealth.css"
const TeamSummaryHealth = (props) => {
  const [players,setPlayers] = useState([])
  const players2 = []
  useEffect(() => {
    props.players.map(value=>{
      if(!value.is_coach)  players2.push(value)
    })
    setPlayers(players2)
  }, [props.players])
    return (
        <div className="team-summary-health">
            <table className="team-summary-table ">
          <thead>
            <tr>
              <th className="table-header-cell team-summary-health-cell">Athlete</th>
              <th className="table-header-cell team-summary-health-cell">status</th>
              <th className="table-header-cell team-summary-health-cell">details</th>
              <th className="table-header-cell team-summary-health-cell">severity of injury</th>
              
            </tr>
          </thead>
          <tbody className="tbody-load team-summary-test-tbody">
              {players.map(player=>
              <tr>
                  <td className="table-left-atr ">{player.firstName} {player.lastName}</td>
                  <td className="table-left-atr ">{player.training[player.training.length-1].injuries.length>0?<div className="injury-details">Injured</div>:<div className="injury-details-h"> Healthy</div>}</td>
                  <td className="table-left-atr ">{player.training[player.training.length-1].injuries.map(value=><div className="injury-details">{value.name}</div>)}</td>
                  <td className="table-left-atr ">{player.training[player.training.length-1].injuries.map(value=><div className="injury-details">{value.severity}/10</div>)}</td>
              </tr>)}
              
          </tbody>
        </table>
        </div>
    )
}

export default TeamSummaryHealth
