import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button, FormGroup } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../../components/Loader';
import Message from '../../components/Message';
import { login } from '../../actions/userActions';
import './Login.scss';
import { useForm } from '../../hooks/useForm';

const LoginScreen = ({ history }) => {
  const { inputs, handleInputChange } = useForm({
    email: '',
    password: '',
  });

  const [formErrors, setFormErrors] = useState({ email: '', password: '' });

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;

  useEffect(() => {
    if (userInfo) {
      history.push('/');
    }
  }, [history, userInfo]);

  const submitHandler = (e) => {
    e.preventDefault();

    const formErrors = validateForm(inputs);
    setFormErrors({ email: formErrors.email, password: formErrors.password });
    if (Object.keys(formErrors).length) return;

    dispatch(login(inputs.email, inputs.password));
  };

  const validateForm = (user) => {
    const errors = {};

    // Email error checking.
    if (!/^\S+@\S+\.com$/.test(user.email)) errors.email = 'Invalid Email';
    if (!user.email) errors.email = 'Email Required';

    // Password error checking.
    if (!user.password) errors.password = 'Password Required';
    return errors;
  };

  return (
    <>
      {loading && <Loader />}
      {error && <Message variant='danger'>{error}</Message>}
      <Form
        noValidate
        className='login-form login-form--shadowify'
        onSubmit={submitHandler}
      >
        <h2 className='login-form__title'>SIGN IN</h2>

        <FormGroup className='login-form__fields'>
          {formErrors.email && (
            <div style={{ color: 'red', marginBottom: '10px' }}>
              * {formErrors.email}
            </div>
          )}
          <Form.Control
            className='login-form__form-control--shadowify pl-3 login-form__form-control'
            type='email'
            placeholder='Enter email'
            name='email'
            value={inputs.email}
            onChange={handleInputChange}
          ></Form.Control>

          {formErrors.password && (
            <div style={{ color: 'red', marginBottom: '10px' }}>
              * {formErrors.password}
            </div>
          )}
          <Form.Control
            className='login-form__form-control--shadowify pl-3 login-form__form-control'
            type='password'
            placeholder='Enter password'
            name='password'
            value={inputs.password}
            onChange={handleInputChange}
          ></Form.Control>
        </FormGroup>

        <Button type='submit' variant='info' className='login-form__btn'>
          Sign In
        </Button>
      </Form>

      <div className='login-screen__link-container'>
        A New Leader ?{' '}
        <Link to={'/register'} className='login-screen__link'>
          Register
        </Link>
      </div>
    </>
  );
};

export default LoginScreen;
