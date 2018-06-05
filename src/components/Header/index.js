import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import logo from '../../logo.svg';
import avatar from '../../avatar.svg';

import './styles.css';

const Header = ({title}) => (
  <header className="header">
    <div>
      <img src={logo} className="header__logo" alt="company-logo" />
      <h3>{title}</h3>
    </div>
    <div>
      <img src={avatar} className="header__logo" alt="avatar-logo" />
      <h3>Signed In</h3>
      <Link to={'/'} className="header__sign-out">
        Sign Out
      </Link>
    </div>
  </header>
);

Header.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Header;
