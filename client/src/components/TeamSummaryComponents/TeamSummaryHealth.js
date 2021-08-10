import React from 'react'
import "./TeamSummaryCss/TeamSummaryTest.css"
import "./TeamSummaryCss/TeamSummaryHealth.css"
const TeamSummaryHealth = () => {
    return (
        <div className="team-summary-health">
            <table className="team-summary-table ">
          <thead>
            <tr>
              <th className="table-header-cell team-summary-health-cell">Athlete</th>
              <th className="table-header-cell team-summary-health-cell">status</th>
              <th className="table-header-cell team-summary-health-cell">details</th>
              <th className="table-header-cell team-summary-health-cell">days of injury</th>
              
            </tr>
          </thead>
          <tbody className="tbody-load team-summary-test-tbody">
              <tr >
                  <td className="table-left-atr ">$Athlete</td>
                  <td className="table-left-atr ">$Status</td>
                  <td className="table-left-atr ">$Details</td>
                  <td className="table-left-atr ">$DoI</td>
              </tr>
              
          </tbody>
        </table>
        </div>
    )
}

export default TeamSummaryHealth
