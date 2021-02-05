import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Button, FormGroup } from 'react-bootstrap';

import Loader from '../../components/Loader';
import Message from '../../components/Message';
import { register } from '../../actions/userActions';
import './RegisterScreen.css';

const RegisterScreen = ({ history }) => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');

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
    if (password !== confirmPassword) {
      setMessage("Passwords don't match");
    } else {
      dispatch(register(name, email, password));
    }
  };
  return (
    <>
      {loading && <Loader />}
      {message && <Message variant='danger'>{message}</Message>}
      {error && <Message variant='danger'>{error}</Message>}
      <Form
        className='register-form register-form--shadowify'
        onSubmit={submitHandler}
      >
        <h2 className='register-form__title'>SIGN UP</h2>

        <FormGroup className='register-form__fields'>
          <Form.Control
            className='register-form__form-control--shadowify pl-3 register-form__form-control'
            type='text'
            placeholder='Enter name'
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></Form.Control>

          <Form.Control
            className='register-form__form-control--shadowify pl-3 register-form__form-control'
            type='email'
            placeholder='Enter email'
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>

          <Form.Control
            className='register-form__form-control--shadowify pl-3 register-form__form-control'
            type='password'
            placeholder='Enter password'
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>

          <Form.Control
            className='register-form__form-control--shadowify pl-3 register-form__form-control'
            type='password'
            placeholder='Confirm password'
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
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
