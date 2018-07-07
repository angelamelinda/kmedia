import React from 'react';
import './style.scss';
import Logo from '../../assets/img/logo-white.png';
const Header = () => {
  return (
    <header>
      <div className="container">
        <div className="logo pt-3 pb-3">
          <a href="/" className="d-inline-block">
            <img src={Logo} alt="KMedia"/>
          </a>
        </div>
      </div>
    </header>
  )
}

export default Header;
