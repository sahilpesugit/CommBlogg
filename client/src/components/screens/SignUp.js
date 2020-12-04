import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom'
import M from 'materialize-css'
const SignUp = () => {
    const history = useHistory()
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const postData = () => {
        if (!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)) {
            M.toast({ html: "invalid email." })
            return
        }
        fetch("/signup", {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name,
                email,
                password
            })
        }).then(res => res.json())
            .then(data => {
                if (data.error) {
                    M.toast({ html: data.error })
                }
                else {
                    M.toast({ html: data.message })
                    history.push('/login')
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
                    placeholder="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
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
                    SignUp
                </button>
                <h6>
                    <Link to='/login'><i>Already have an account?</i></Link>
                </h6>
            </div>
        </div>
    )
}

export default SignUp