import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { CountryDropdown, RegionDropdown } from 'react-country-region-selector';
import { Link } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

import Message from '../../components/Message';
import Loader from '../../components/Loader';
import FormContainer from '../../components/FormContainer';
import { createCamp } from '../../actions/campActions';

const AddCampScreen = ({ history }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [country, setCountry] = useState('');
  const [city, setCity] = useState('');
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState('');
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState('');

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const campCreate = useSelector((state) => state.campCreate);
  const { loading, error, success: successCreate } = campCreate;

  useEffect(() => {
    if (!userInfo) {
      setMessage('Please Login First');
      history.push('/login');
    }
    if (successCreate) {
      history.push('/');
    }
  }, [history, userInfo, successCreate]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      createCamp({
        name,
        price,
        image,
        description,
        country,
        city,
      })
    );
  };

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0]; // single file upload so 1st item in the array
    const formData = new FormData();
    formData.append('image', file);
    setUploading(true);
    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      };
      const { data } = await axios.post('/api/upload', formData, config);
      setImage(data);
      setUploading(false);
    } catch (error) {
      console.error(error);
      setUploading(false);
    }
  };
  return (
    <>
      <Link to='/' className='btn btn-light my-3'>
        Go Back
      </Link>
      <FormContainer>
        <h1>New Camp</h1>
        {loading && <Loader />}
        {message && <Message variant='danger'>{message}</Message>}
        {error && <Message variant='danger'>{error}</Message>}
        <Form onSubmit={submitHandler}>
          <Form.Group controlId='name'>
            <Form.Label>Camp Name</Form.Label>
            <Form.Control
              type='name'
              placeholder='Enter name'
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId='description'>
            <Form.Label>Description</Form.Label>
            <Form.Control
              type='text'
              placeholder='Enter description'
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId='price'>
            <Form.Label>Price</Form.Label>
            <Form.Control
              type='number'
              placeholder='Enter Price'
              required
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId='country'>
            <Form.Label>Country</Form.Label>
            <CountryDropdown
              className='form-control'
              defaultOptionLabel='Country'
              value={country}
              onChange={(value) => setCountry(value)}
            />
          </Form.Group>

          <Form.Group controlId='city'>
            <Form.Label>City</Form.Label>
            <RegionDropdown
              className='form-control'
              disableWhenEmpty={true}
              country={country}
              value={city}
              onChange={(value) => setCity(value)}
            />
          </Form.Group>

          <Form.Group controlId='image'>
            <Form.Label>Image</Form.Label>
            <Form.Control
              type='text'
              placeholder='Enter image url'
              value={image}
              onChange={(e) => setImage(e.target.value)}
            ></Form.Control>
            <Form.File
              id='image-file'
              label='Choose File'
              custom
              onChange={uploadFileHandler}
            ></Form.File>
            {uploading && <Loader />}
          </Form.Group>

          <Button
            type='submit'
            variant='info'
            style={{
              width: '50%',
              textAlign: 'center',
              marginLeft: '25%',
              borderRadius: '50px',
            }}
          >
            Add
          </Button>
        </Form>
      </FormContainer>
    </>
  );
};

export default AddCampScreen;
