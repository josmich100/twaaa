import React from 'react';
import { Link } from 'react-router-dom';
import MainHeader from '../Mainheader/Mainheader'
import NavLinks from '../Navlinks/NavLinks'
import './MainNavigation.css';
import Img from "../../../assets/twaa.jpg"

const MainNavigation = props => {

  return (
    <React.Fragment>
      <MainHeader>
        <h1 className="main-navigation__title">
          <Link to="/"><img src={Img} alt="logo"/></Link>
        </h1>
        <nav className="main-navigation__header-nav">
          <NavLinks />
        </nav>
      </MainHeader>
    </React.Fragment>
  );
};

export default MainNavigation;