// import React, { useState, useEffect } from 'react';
import React from 'react';

const Header = () => {
  // const [stateVariable, setstateVariable] = useState([]);

  // useEffect(() => {

  //   return () => {};
  // }, []);

  return (
    <nav>
      <div className="nav-wrapper">
        <a href="#" className="left brand-logo">
          Emaly
        </a>
        <ul id="nav-mobile" className="right hide-on-med-and-down">
          <li>
            <a href="#">Login With Google</a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Header;
