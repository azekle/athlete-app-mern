import './App.css';
import './pages/Register.css'
import { useState, useEffect } from 'react'
import {Switch, Route, BrowserRouter, Redirect} from 'react-router-dom'
import Dashboard from './Dashboard'
import NonExistingPage from './NonExistingPage'
import Login from './pages/Login'
import Register from './pages/Register'
import {requests} from './utils/axios'
import useToken from './utils/useToken';
import {isAuthenticated} from './utils/services'

function App() {
  const [userData, setUserData] = useState({})
  const {token, setToken} = useToken();
  const [tokenValidated, setTokenValidated] = useState(false);
  const [onRegister, setOnRegister] = useState(false)
  const [pathName,setPathName] = useState(window.location.pathname)

  useEffect(() => {
    if(pathName=="/register"){setOnRegister(true)}
    requests.get("/user/current")
    .then(res => res.data)
    .then(data => setUserData(data))
  }, [])
  useEffect(() => {
    if(!tokenValidated)
    {
      isAuthenticated().then(res => {setTokenValidated(res)})
    }
  }, [])
  if(onRegister&& !token && !tokenValidated){
    return(<Register/>)
  }
  if(!token || !tokenValidated)
  {
    return <Login setToken={setToken} />
  }

  return (
    <div className="wrapper">
      <h1>Application</h1>
      <BrowserRouter>
        <Switch>
          <Route exact path="/dashboard">
           <Dashboard userData={userData}/>
          </Route>
          
          <Redirect from="/" to="/dashboard"/>
          <Route path='/404' component={NonExistingPage}/>
          <Redirect from='*' to='/404' />
        </Switch>
      </BrowserRouter>
    </div>
  )
}

export default App;
