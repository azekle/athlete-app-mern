import './App.css';
import { useState, useEffect } from 'react'

const BACKEND = "http://localhost:9000/api/v1"

function App() {
  const [userData, setUserData] = useState({})

  useEffect(() => {
    fetch(BACKEND + "/user/getall",
    {
        headers: {
          'Authorization' : 'Bearer ' + localStorage.getItem('token'),
          'Content-Type': 'application/json',
          },
    }
    )
    .then(res => res.json())
    .then(userData => setUserData(userData[0]))
  }, [])

  return(
    <div>
      Hello -
      <p></p>
      User: {userData.username}
      <p></p>
      id: {userData.national_id}
    </div>
  )
}

export default App;
