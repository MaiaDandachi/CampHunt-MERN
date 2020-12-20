import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button, FormGroup } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../../components/Loader';
import Message from '../../components/Message';
import { login } from '../../actions/userActions';
import './Login.css';

const LoginScreen = ({ history }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

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
    dispatch(login(email, password));
  };

  return (
    <>
      {loading && <Loader />}
      {error && <Message variant='danger'>{error}</Message>}
      <Form className='login-form' onSubmit={submitHandler}>
        <h2 className='login-title'>SIGN IN</h2>

        <FormGroup className='login-fields'>
          <Form.Control
            className='login-email pl-3'
            type='email'
            placeholder='Enter email'
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>

          <Form.Control
            className='login-password pl-3'
            type='password'
            placeholder='Enter password'
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </FormGroup>

        <Button type='submit' variant='info' className='login-button '>
          Sign In
        </Button>
      </Form>

      <div className='login-link'>
        A New Leader ? <Link to={'/register'}>Register</Link>
      </div>
    </>
  );
};

export default LoginScreen;
