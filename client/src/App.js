import React from 'react'
import NavBar from './components/Navbar'
import './App.css'
import { BrowserRouter, Route } from 'react-router-dom'
import Home from './components/screens/Home'
import Profile from './components/screens/Profile'
import Login from './components/screens/Login'
import SignUp from './components/screens/SignUp'
import CreatePost from './components/screens/CreatePost'

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Route exact path="/">
        <Home />
      </Route>
      <Route path="/login">
        <Login />
      </Route>
      <Route path="/signup">
        <SignUp />
      </Route>
      <Route path="/profile">
        <Profile />
      </Route>
      <Route path="/createpost">
        <CreatePost />
      </Route>
    </BrowserRouter>
  );
}

export default App;
