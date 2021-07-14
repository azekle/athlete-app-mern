import React from 'react'

function Hello({userData}) {
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

export default Hello;