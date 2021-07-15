import React from 'react'

function Dashboard({userData}) {
    return (
        <div>
            Hello -
                <p></p>
                User: {userData?.username}
                <p></p>
                id: {userData?.national_id}

        </div>
    )
}

export default Dashboard;