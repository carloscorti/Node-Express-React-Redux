import React, { useEffect } from 'react';
import { BrowserRouter, Route, Redirect } from 'react-router-dom';

import { connect } from 'react-redux';
import * as actions from '../actions';

import Header from './Header';
import Landing from './Landing';

const DashBoard = () => <h2>DashBoard</h2>;
const SurveyNew = () => <h2>SurveyNew</h2>;

const App = (props) => {

  useEffect(() => {
    props.fetchUser();

    return () => {};
  }, []);

  return (
    <div className="container">
      <BrowserRouter>
        <div>
          <Header />
          <Route
            path="/"
            render={() =>
              props.auth ? <Redirect to="/surveys" /> : <Landing />
            }
            exact
          />
          <Route 
            path="/surveys"
            render={() =>
              props.auth ? <DashBoard /> : <Landing /> 
            }
            exact />
          <Route 
            path="/surveys/new"
            render={() =>
              props.auth ? <SurveyNew /> : <Landing /> 
            }
          />
        </div>
      </BrowserRouter>
    </div>
  );
};

const mapStatetoProps = ({ auth }) => {
  return { auth };
};

export default connect(mapStatetoProps, actions)(App);
