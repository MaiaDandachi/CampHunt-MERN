import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Button, FormGroup } from 'react-bootstrap';

import Loader from '../../components/Loader';
import Message from '../../components/Message';
import { register } from '../../actions/userActions';
import './RegisterScreen.css';
import { useForm } from '../../hooks/useForm';

const RegisterScreen = ({ history }) => {
  const { inputs, handleInputChange } = useForm({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [formErrors, setFormErrors] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const dispatch = useDispatch();

  const userRegister = useSelector((state) => state.userRegister);
  const { loading, error, userInfo } = userRegister;

  useEffect(() => {
    if (userInfo) {
      history.push('/');
    }
  }, [history, userInfo]);

  const submitHandler = (e) => {
    e.preventDefault();

    const formErrors = validateForm(inputs);
    setFormErrors({
      name: formErrors.name,
      email: formErrors.email,
      password: formErrors.password,
      confirmPassword: formErrors.confirmPassword,
    });

    if (Object.keys(formErrors).length) return;

    dispatch(register(inputs.name, inputs.email, inputs.password));
  };

  const validateForm = (user) => {
    const errors = {};

    // name error check
    if (!user.name) {
      errors.name = 'Name is required';
    } else if (!/^\S.*?\S$/.test(user.name)) {
      errors.name = "Name can't have white spaces at the begining & end";
    } else if (/[0-9]/.test(user.name)) {
      errors.name = 'Name is invalid';
    }

    // email error check
    if (!user.email) {
      errors.email = 'Email address is required';
    } else if (!/^\S+@\S+\.com$/.test(user.email)) {
      errors.email = 'Email address is invalid';
    }

    // passwords error check
    if (!user.password) {
      errors.password = 'Password is required';
    } else if (user.password.length < 6) {
      errors.password = 'Password should have 6 or more characters';
    }

    // confirmPassword error check
    if (user.password !== user.confirmPassword) {
      errors.confirmPassword = "Passwords don't macth";
    }

    return errors;
  };

  return (
    <>
      {loading && <Loader />}
      {error && <Message variant='danger'>{error}</Message>}
      <Form
        noValidate
        className='register-form register-form--shadowify'
        onSubmit={submitHandler}
      >
        <h2 className='register-form__title'>SIGN UP</h2>

        <FormGroup className='register-form__fields'>
          {formErrors.name && (
            <div style={{ color: 'red', marginBottom: '10px' }}>
              * {formErrors.name}
            </div>
          )}
          <Form.Control
            className='register-form__form-control--shadowify pl-3 register-form__form-control'
            type='text'
            placeholder='Enter name'
            name='name'
            value={inputs.name}
            onChange={handleInputChange}
          ></Form.Control>

          {formErrors.email && (
            <div style={{ color: 'red', marginBottom: '10px' }}>
              * {formErrors.email}
            </div>
          )}
          <Form.Control
            className='register-form__form-control--shadowify pl-3 register-form__form-control'
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
            className='register-form__form-control--shadowify pl-3 register-form__form-control'
            type='password'
            placeholder='Enter password'
            name='password'
            value={inputs.password}
            onChange={handleInputChange}
          ></Form.Control>

          {formErrors.confirmPassword && (
            <div style={{ color: 'red', marginBottom: '10px' }}>
              * {formErrors.confirmPassword}
            </div>
          )}
          <Form.Control
            className='register-form__form-control--shadowify pl-3 register-form__form-control'
            type='password'
            placeholder='Confirm password'
            name='confirmPassword'
            value={inputs.confirmPassword}
            onChange={handleInputChange}
          ></Form.Control>
        </FormGroup>

        <Button type='submit' variant='info' className='register-form__btn '>
          Sign Up
        </Button>
      </Form>

      <div className='register-screen__link-container'>
        Already A Leader ?{' '}
        <Link to={'/login'} className='register-screen__link'>
          Login
        </Link>
      </div>
    </>
  );
};

export default RegisterScreen;
