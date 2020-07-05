import React, { Fragment, useContext } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../../context/auth/authContext';
import OrderContext from '../../context/order/orderContext';

const Navbar = () => {
  const authContext = useContext(AuthContext);
  const orderContext = useContext(OrderContext);

  const { isAuthenticated, logout, user } = authContext;
  const { clearOrders } = orderContext;

  const onLogout = () => {
    logout();
    clearOrders();
  };

  const authLinks = (
    <Fragment>
      <li>Hello {user && user.firstName}</li>
      <li>
        <a onClick={onLogout} href='#!'>
          <i className='fas fa-sign-out-alt'></i>
          <span className='hide-sm'>Logout</span>
        </a>
      </li>
    </Fragment>
  );

  const guestLinks = (
    <Fragment>
      <li className='current'>
        <Link to='/'>Home</Link>
      </li>
      <li>
        <Link to='/about'>About</Link>
      </li>
      <li>
        <Link to='/register'>Register</Link>
      </li>
      <li>
        <Link to='/login'>Login</Link>
      </li>
    </Fragment>
  );

  return (
    <nav id='navbar'>
      <h1 className='logo'>
        Send
        <Link to='/'>
          {' '}
          <span className='it-logo'>IT</span>
        </Link>
      </h1>
      <ul>{isAuthenticated ? authLinks : guestLinks}</ul>
    </nav>
  );
};

export default Navbar;
