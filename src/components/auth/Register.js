import React, { useState, useContext, useEffect } from 'react';
import AlertContext from '../../context/alert/alertContext';
import AuthContext from '../../context/auth/authContext';

const Register = (props) => {
  const alertContext = useContext(AlertContext);
  const authContext = useContext(AuthContext);

  const { setAlert } = alertContext;
  const { register, error, clearError, isAuthenticated } = authContext;

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
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });

  const { firstName, lastName, email, phone, password, confirmPassword } = user;

  const onChange = (e) => setUser({ ...user, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setAlert('Password do not match', 'danger');
    } else {
      register({
        firstName,
        lastName,
        email,
        phone,
        password,
      });
    }
  };

  return (
    <section id='signup'>
      <div className='container'>
        <div className='form-box text-center '>
          <h1 className='m-heading text-primary'>Register</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis,
            alias.
          </p>
          <form onSubmit={onSubmit} id='register-form'>
            <div className='form-group'>
              <label htmlFor='firstName'>First Name</label>
              <input
                type='text'
                name='firstName'
                id='firstName'
                value={firstName}
                onChange={onChange}
                placeholder='Enter First Name'
                required
              />
            </div>
            <div className='form-group'>
              <label htmlFor='lastName'>Last Name</label>
              <input
                type='text'
                name='lastName'
                id='lastName'
                value={lastName}
                onChange={onChange}
                placeholder='Enter Last Name'
                required
              />
            </div>
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
              <label htmlFor='phone'>Phone No.</label>
              <input
                type='tel'
                name='phone'
                id='phone'
                value={phone}
                onChange={onChange}
                pattern='\+(9[976]\d|8[987530]\d|6[987]\d|5[90]\d|42\d|3[875]\d|2[98654321]\d|9[8543210]|8[6421]|6[6543210]|5[87654321]|4[987654310]|3[9643210]|2[70]|7|1)\d{1,14}$'
                placeholder='Enter Phone Number'
                required
              />
              <span className='validity'>Format: +1234....</span>
            </div>
            <div className='form-group'>
              <label htmlFor='password'>Password</label>
              <input
                type='password'
                name='password'
                id='password'
                value={password}
                onChange={onChange}
                min='8'
                placeholder='Enter Password'
                required
              />
            </div>
            <div className='form-group'>
              <label htmlFor='confirmPassword'>Confirm Password</label>
              <input
                type='password'
                name='confirmPassword'
                id='confirmPassword'
                value={confirmPassword}
                onChange={onChange}
                min='8'
                placeholder='Confirm Password'
                required
              />
            </div>
            <input
              type='submit'
              value='Register'
              className='btn register-btn'
            />
            {/* <button type='submit' className='btn register-btn'>
              Register
            </button> */}
            <p className='terms'>
              By clicking the Sign Up button, you agree to our
              <a href='#!'> Terms & Conditions</a> and
              <a href='#!'> Privacy Policy</a>
            </p>
            <p className='login'>
              Already have an account?
              <a href='/login'>
                <span className='text-primary'> Login Here</span>
              </a>
            </p>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Register;
