import React, { useState, useContext } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { userContext } from '../../App'
import M from 'materialize-css'
const Login = () => {
    const { state, dispatch } = useContext(userContext)
    const history = useHistory()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const postData = () => {
        if (!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)) {
            M.toast({ html: "invalid email." })
            return
        }
        fetch("/login", {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email,
                password
            })
        }).then(res => res.json())
            .then(data => {
                console.log(data)
                if (data.error) {
                    M.toast({ html: data.error })
                }
                else {
                    localStorage.setItem("jwt", data.token)
                    localStorage.setItem("jwt", JSON.stringify(data.user))
                    dispatch({ type: "USER", payload: data.user })
                    M.toast({ html: "successfully signed in." })
                    history.push('/')
                }
            }).catch(err => {
                console.log(err)
            })
    }
    return (
        <div className="mycard">
            <div className="authcard input-field">
                <h2>CommBlogg</h2>
                <input
                    type="text"
                    placeholder="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button className="btn waves-effect #212121 grey darken-4"
                    onClick={() => postData()}>
                    Login
                </button>
                <h6>
                    <Link to='/signup'><i>Don't have an account?</i></Link>
                </h6>
            </div>
        </div>
    )
}

export default Login