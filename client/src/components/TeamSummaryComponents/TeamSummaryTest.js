import React from 'react'
import "./TeamSummaryCss/TeamSummaryTest.css"
const TeamSummaryTest = () => {
    return (
        <div className="overview team-summary-test">
        <table className="team-summary-table ">
          <thead>
            <tr>
              <th className="table-header-cell team-summary-test-cell">Athlete</th>
              <th className="table-header-cell team-summary-test-cell">Season</th>
              <th className="table-header-cell team-summary-test-cell">Date</th>
              <th className="table-header-cell team-summary-test-cell">Name</th>
              <th className="table-header-cell team-summary-test-cell">Team</th>
              <th className="table-header-cell team-summary-test-cell">Test Name</th>
              <th className="table-header-cell team-summary-test-cell">Test Name</th>
              <th className="table-header-cell team-summary-test-cell">Test Name</th>
            </tr>
          </thead>
          <tbody className="tbody-load team-summary-test-tbody">
              <tr >
                  <td className="table-left-atr-test ">$Athlete1</td>
                  <td className="table-left-atr-test ">$Season</td>
                  <td className="table-left-atr-test ">$Date</td>
                  <td className="table-left-atr-test ">$Name</td>
                  <td className="table-left-atr-test ">$Team</td>
                  <td className="table-left-atr-test ">$Test Name</td>
                  <td className="table-left-atr-test ">$Test Name</td>
                  <td className="table-left-atr-test ">$Test Name</td>
              </tr>
              
          </tbody>
        </table>
      </div>
    )
}

export default TeamSummaryTest
