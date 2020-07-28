// import React, { useState, useEffect } from 'react';
import React from 'react';

import { connect } from 'react-redux';

import { Link } from 'react-router-dom';

const Header = (props) => {
  // const [stateVariable, setstateVariable] = useState([]);

  // useEffect(() => {

  //   return () => {};
  // }, []);

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
              <Link to='/surveys'>{auth.name}</Link>
            </li>
            <li>
              <a href='/api/logout'>Logout</a>
            </li>
          </>
        );
    }
  }


  console.log(props.auth)
  return (
    <nav>
      <div className="nav-wrapper">
        <Link to={props.auth ? "/surveys" : "/"} className="left brand-logo">
          Emaly
        </Link>
        <ul id="nav-mobile" className="right hide-on-med-and-down">
          {renderLogContent(props.auth)}
        </ul>
      </div>
    </nav>
  );
};

const mapStatetoProps = ({auth}) =>  {return {auth}};

export default connect(mapStatetoProps)(Header);
