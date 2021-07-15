import './App.css';
import { useState, useEffect } from 'react'
import {Switch, Route, BrowserRouter} from 'react-router-dom'
import Dashboard from './Dashboard'
import Login from './Login'
import {requests} from './utils/axios'
import useToken from './utils/useToken';

function App() {
  const [userData, setUserData] = useState({})
  const {token, setToken} = useToken();

  useEffect(() => {
    requests.get("/user/getall")
    .then(res => res.data[0])
    .then(data => setUserData(data))
  }, [])

  if(!token)
  {
    return <Login setToken={setToken} />
  }

  return (
    <div className="wrapper">
      <h1>Application</h1>
      <BrowserRouter>
        <Switch>
          <Route path="/dashboard/">
            <Dashboard userData={userData}/>
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  )
}

export default App;
