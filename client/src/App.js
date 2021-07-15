import './App.css';
import { useState, useEffect } from 'react'
import {Switch, Route, BrowserRouter, Redirect} from 'react-router-dom'
import Dashboard from './Dashboard'
import NonExistingPage from './NonExistingPage'
import Login from './Login'
import {requests} from './utils/axios'
import useToken from './utils/useToken';

function App() {
  const [userData, setUserData] = useState({})
  const {token, setToken} = useToken();

  useEffect(() => {
    requests.get("/user/current")
    .then(res => res.data)
    .then(data => setUserData(data))
  }, [])

  // TODO: this is not good enough, token might be wrong, need to validate it
  if(!token)
  {
    return <Login setToken={setToken} />
  }

  return (
    <div className="wrapper">
      <h1>Application</h1>
      <BrowserRouter>
        <Switch>
          <Route exact path="/dashboard/">
            <Dashboard userData={userData}/>
          </Route>
          <Route path='/404' component={NonExistingPage}/>
          <Redirect from='*' to='/404' />
        </Switch>
      </BrowserRouter>
    </div>
  )
}

export default App;
