import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Home from './components/pages/Home';
import About from './components/pages/About';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Alert from './components/layout/Alert';
import Dashboard from './components/pages/Dashboard';
import PrivateRoute from './components/routing/PrivateRoute'

import AlertState from './context/alert/AlertState';
import OrderState from './context/order/OrderState';
import AuthState from './context/auth/AuthState';
import setAuthToken from './utils/setAuthToken'
import './App.css';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  return (
    <AuthState>
      <OrderState>
        <AlertState>
          <Router>
            <Fragment>
              <Navbar />
              <Alert />
              <Switch>
                <Route exact path='/' component={Home} />
                <Route exact path='/about' component={About} />
                <Route exact path='/register' component={Register} />
                <Route exact path='/login' component={Login} />
                <PrivateRoute exact path='/profile' component={Dashboard} />
              </Switch>
              <Footer />
            </Fragment>
          </Router>
        </AlertState>
      </OrderState>
    </AuthState>
  );
};

export default App;
