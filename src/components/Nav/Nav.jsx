import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import LogOutButton from '../LogOutButton/LogOutButton';
import './Nav.css';
import { useSelector } from 'react-redux';

function Nav() {
  const user = useSelector((store) => store.user);
  const history = useHistory();

  return (
    <div className="nav">
      <Link to="/home">
        <h2 className="nav-title">Pulse Share</h2>
      </Link>
      <div>
        {/* If no user is logged in, show these links */}
        {!user.id && (
          // If there's no user, show login/registration links
          <>

            <Link className="navLink" to="/home">
              Home
            </Link>

            <Link className="navLink" to="/posts">
              Pulse
            </Link>

            <Link className="navLink" to="/login">
              Login / Register
            </Link>

          </>

        )}

        {/* If a user is logged in, show these links */}
        {user.id && (
          <>
            <Link className="navLink" to="/home">
              Home
            </Link>

            <Link className="navLink" to="/posts">
              Pulse
            </Link>

            <Link className="navLink" to={`/profile/${user.id}`}>
              Profile
            </Link>
            {user.access_level === 2 && (
              <>
                <Link className="navLink" to="/admin">
                  Admin
                </Link>
              </>
            )}

            <LogOutButton className="navLink" />
          </>
        )}

      </div>
    </div>
  );
}

export default Nav;
