import React, { useEffect, createContext, useReducer, useContext } from 'react'
import NavBar from './components/Navbar'
import './App.css'
import { BrowserRouter, Route, Switch, useHistory } from 'react-router-dom'
import Home from './components/screens/Home'
import Profile from './components/screens/Profile'
import Login from './components/screens/Login'
import SignUp from './components/screens/SignUp'
import CreatePost from './components/screens/CreatePost'
import UpdatePost from './components/screens/UpdatePost'
import { reducer, initialState } from './reducers/userReducer'
export const userContext = createContext()

const Routing = () => {
  const history = useHistory()
  const { state, dispatch } = useContext(userContext)
  useEffect(() => {
    // const user = JSON.parse(localStorage.getItem("_id"))
    console.log(state)
    if (JSON.parse(localStorage.getItem("_id"))) {
      //dispatch({ type: "USER", payload: user })
      history.push('/')
    }
    else {
      history.push('/login')
    }
  }, [])
  return (
    <Switch>
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
      <Route path="/updatepost">
        <UpdatePost />
      </Route>
    </Switch>
  )
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState)
  return (
    <userContext.Provider value={{ state, dispatch }}>
      <BrowserRouter>
        <NavBar />
        <Routing />
      </BrowserRouter>
    </userContext.Provider>
  );
}

export default App;
