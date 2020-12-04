import React from 'react';
import { Link } from 'react-router-dom' //used so that every component whe clicked doesnt have to reload the page

const NavBar = () => {
    return (
        <nav>
            <div className="nav-wrapper white">
                <Link to="/" className="brand-logo left">CommBlogg</Link>
                <ul id="nav-mobile" className="right">
                    <li><Link to="/createpost">Create Post</Link></li>
                    <li><Link to="/login">Login</Link></li>
                    <li><Link to="/signup">SignUp</Link></li>
                    <li><Link to="/profile">Profile</Link></li>

                </ul>
            </div>
        </nav>

    )
}
export default NavBar