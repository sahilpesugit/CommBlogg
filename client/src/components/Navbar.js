import React, { useContext } from 'react';
import { Link } from 'react-router-dom' //used so that every component whe clicked doesnt have to reload the page
import { userContext } from '../App'
const NavBar = () => {
    const { state, dispatch } = useContext(userContext)
    const renderList = () => {
        if (state) {
            return [
                <li><Link to="/profile">Profile</Link></li>,
                <li><Link to="/createpost">Create Post</Link></li>
            ]
        } else {
            return [
                <li><Link to="/login">Login</Link></li>,
                <li><Link to="/signup">SignUp</Link></li>
            ]
        }
    }
    return (
        <nav>
            <div className="nav-wrapper white">
                <Link to={state ? "/" : "login"} className="brand-logo left">CommBlogg</Link>
                <ul id="nav-mobile" className="right">
                    {renderList()}
                </ul>
            </div>
        </nav>

    )
}
export default NavBar