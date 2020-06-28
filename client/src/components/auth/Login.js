import React, { useState, useContext, useEffect } from 'react';
import AlertContext from '../../context/alert/alertContext';
import AuthContext from '../../context/auth/authContext';

const Login = (props) => {
  const alertContext = useContext(AlertContext);
  const authContext = useContext(AuthContext);

  const { setAlert } = alertContext;
  const { login, error, clearError, isAuthenticated } = authContext;

  useEffect(() => {
    if (isAuthenticated) {
      props.history.push('/profile');
    }

    if (error) {
      setAlert(error, 'danger');
      clearError();
    }
    // eslint-disable-next-line
  }, [error, isAuthenticated, props.history]);

  const [user, setUser] = useState({
    email: '',
    password: '',
  });

  const { email, password } = user;

  const onChange = (e) => setUser({ ...user, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();

    if (email === '' || password === '') {
      setAlert('Please enter in all fields', 'danger');
    }else {
      login({
        email,
        password
      })
    }
  };

  return (
    <section id='login'>
      <div className='container'>
        <div className='form-box text-center '>
          <h1 className='m-heading'>
            <span className='text-primary'>Log</span>in
          </h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis,
            alias.
          </p>
          <form onSubmit={onSubmit} id='login-form'>
            <div className='form-group'>
              <label htmlFor='email'>Email</label>
              <input
                type='email'
                name='email'
                id='email'
                value={email}
                onChange={onChange}
                placeholder='Enter Email'
                required
              />
            </div>
            <div className='form-group'>
              <label htmlFor='password'>Password</label>
              <input
                type='password'
                name='password'
                id='password'
                value={password}
                onChange={onChange}
                placeholder='Enter Password'
                required
              />
            </div>
            <input type='submit' value='Login' className='btn register-btn' />
            {/* <button type='submit' className='btn register-btn'>
              Login
            </button> */}
            <p className='register'>
              Don't have an acount?
              <a href='/register'>
                <span className='text-primary'> Register</span>
              </a>
            </p>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Login;
