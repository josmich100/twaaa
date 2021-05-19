import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../../../context/auth-context'
import './NavLinks.css';
import { useHistory } from 'react-router-dom';
import SearchIcon from '@material-ui/icons/Search';

const NavLinks = props => {
  const history = useHistory();
  const auth = useContext(AuthContext);

  function onLogOut() {
    console.log(history)
    auth.logout()
    history.push('/auth')

  }
  return <ul className="nav-links">
    <li>
      <NavLink to="/" exact>Home</NavLink>
    </li>
    {auth.isLoggedIn && (<>
      <li>
      <div>
        <SearchIcon />
        <input />
      </div>
     </li>
      <li>
      <NavLink to="/profile">Profile</NavLink>
    </li>
      <li>
        <NavLink to="/mypost">My Post</NavLink>
      </li>
      <li>
        <NavLink to="/create">Create Post</NavLink>
      </li>
    </>
    )}



    {/* <li>
      <NavLink to="/auth">AUTHENTICATE</NavLink>
    </li> */}

    {!auth.isLoggedIn && (
      <li>
        <NavLink to="/auth">Login/Register</NavLink>
      </li>
    )}

    {auth.isLoggedIn && (
      <li>
        <button onClick={onLogOut}>Logout</button>
      </li>
    )}
  </ul>
};

export default NavLinks;