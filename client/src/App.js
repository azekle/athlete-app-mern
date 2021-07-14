import './App.css';
import { useState, useEffect } from 'react'
import {Switch, Redirect, Route} from 'react-router-dom'
import Hello from './Hello'
import Login from './Login'
import {instance} from './utils/axios'

function App() {
  const [userData, setUserData] = useState({})

  useEffect(() => {
    instance.get("/user/getall")
    .then(res => res.data[0])
    .then(data => setUserData(data))
  }, [])

  return(
    <div>
      <Switch>
        <Route exact path="/">
          <Redirect to="/Login" />
        </Route>
      <Route exact path="/Hello" render={() => <Hello userData={userData}/>}></Route>
    <Route exact path="/Login" component={Login}></Route>
      </Switch>
    </div>
  )
}

export default App;
