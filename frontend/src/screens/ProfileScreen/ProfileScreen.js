import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import './ProfileScreen.scss';
import {
  getUserDetails,
  updateUserProfile,
  deleteUser,
} from '../../actions/userActions';

import { useForm } from '../../hooks/useForm';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import { USER_UPDATE_PROFILE_RESET } from '../../constants/userConstants';
import { logout } from '../../actions/userActions';

const ProfileScreen = ({ history }) => {
  const { inputs, handleInputChange, handleInputValue } = useForm({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [formErrors, setFormErrors] = useState({
    password: '',
    confirmPassword: '',
  });

  const dispatch = useDispatch();

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const { success } = userUpdateProfile;

  useEffect(() => {
    if (!userInfo) {
      history.push('/login');
    } else {
      if (!user || !user.name || success) {
        dispatch({ type: USER_UPDATE_PROFILE_RESET });
        dispatch(getUserDetails('profile'));
      } else {
        handleInputValue('name', user.name);
        handleInputValue('email', user.email);
      }
    }
  }, [dispatch, history, userInfo, user, success, handleInputValue]);

  const submitHandler = (event) => {
    event.preventDefault();

    const formErrors = validateForm(inputs);
    setFormErrors({
      password: formErrors.password,
      confirmPassword: formErrors.confirmPassword,
    });

    if (Object.keys(formErrors).length) return;

    dispatch(updateUserProfile({ id: user._id, ...inputs }));
  };

  const deleteHandler = (userId) => {
    if (window.confirm('Are you sure ?')) {
      dispatch(deleteUser(userId));
      dispatch(logout());
      history.push('/');
    }
  };

  const validateForm = (user) => {
    const errors = {};

    // passwords error check
    if (user.password && user.password.length < 6) {
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
      <Link className='btn btn-light my-3' to='/'>
        Go Back
      </Link>
      <h2 className='py-4'>User Profile</h2>
      {error && <Message variant='danger'>{error}</Message>}
      {success && <Message variant='success'>Profile Updated</Message>}
      {loading && <Loader />}
      <Form noValidate onSubmit={submitHandler} className='profile-form'>
        <Form.Group controlId='name'>
          <Form.Label>Name</Form.Label>
          <Form.Control
            type='name'
            placeholder='Enter name'
            name='name'
            value={inputs.name}
            onChange={handleInputChange}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='email'>
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type='email'
            placeholder='Enter email'
            name='email'
            value={inputs.email}
            onChange={handleInputChange}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='password'>
          <Form.Label>Password</Form.Label>
          {formErrors.password && (
            <div style={{ color: 'red', marginBottom: '10px' }}>
              * {formErrors.password}
            </div>
          )}
          <Form.Control
            type='password'
            placeholder='Enter password'
            name='password'
            value={inputs.password}
            onChange={handleInputChange}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='confirmPassword'>
          <Form.Label>Confirm Password</Form.Label>
          {formErrors.confirmPassword && (
            <div style={{ color: 'red', marginBottom: '10px' }}>
              * {formErrors.confirmPassword}
            </div>
          )}
          <Form.Control
            type='password'
            placeholder='Confirm password'
            name='confirmPassword'
            value={inputs.confirmPassword}
            onChange={handleInputChange}
          ></Form.Control>
        </Form.Group>

        <Button type='submit' variant='info' className='profile-form__btn'>
          Update
        </Button>
      </Form>

      <div className='mt-4 profile-delete'>
        <h5 className='border-bottom pb-2'>Delete Account</h5>
        <p>
          This will delete your account permanently and will delete all your
          created camps.
        </p>
        <Button
          variant='danger'
          className='profile-delete__btn'
          onClick={() => {
            deleteHandler(user._id);
          }}
        >
          DELETE MY ACCOUNT
        </Button>
      </div>
    </>
  );
};

export default ProfileScreen;
