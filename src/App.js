import React, { useState,useEffect } from "react";
import Login from './Componentes/Login';
import Register from "./Componentes/Register";
import Profile from "./Componentes/Profile"
import Container from "@material-ui/core/Container";
import jwt_decode from "jwt-decode";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";




function App() {

  
  const [userProfile,setUserProfile] = useState("")
  const [userLogin,setUserLogin] = useState(false)

  const getSection = () =>{
    const logUser = localStorage.getItem('token')
    if (logUser){
      setUserLogin(true)
      setUserProfile(jwt_decode(logUser))
    }
  }

  useEffect(()=>{
    getSection()
  },[]);


  return (
    <Router>   
          <Switch>
            <Route path='/profile'>
              <Profile userLogin={userLogin} userProfile={userProfile}/>
            </Route>
            <Route path='/register'>
                  <Register />
            </Route>
            <Route path='/'>
                  <Login setUserLogin={setUserLogin} setUserProfile={setUserProfile}/>
            </Route>
          </Switch>
        
    </Router>
  );
}

export default App;
 