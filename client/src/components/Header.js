import React from 'react';

import { connect } from 'react-redux';

import { Link } from 'react-router-dom';

import StripePayments from './StripePayments';

const renderLogContent = (auth) => {
  switch (auth) {
    case null:
      return;
    case false:
      return (
        <li>
          <a href="/auth/google">Login With Google</a>
        </li>
      );
    default:
      return (
        <>
          <li>
            <StripePayments />
          </li>
          <li>
            <Link to="/surveys">{auth.name}</Link>
          </li>
          <li>
            <span>Credits: {auth.credits}</span>
          </li>
          <li>
            <a href="/api/logout">Logout</a>
          </li>
        </>
      );
  }
};

const Header = (props) => {
  return (
    <nav>
      <div className="nav-wrapper">
        <Link to={props.auth ? '/surveys' : '/'} className="left brand-logo">
          Emaly
        </Link>
        <ul id="nav-mobile" className="right hide-on-med-and-down">
          {renderLogContent(props.auth)}
        </ul>
      </div>
    </nav>
  );
};

const mapStatetoProps = ({ auth }) => {
  return { auth };
};

export default connect(mapStatetoProps)(Header);
