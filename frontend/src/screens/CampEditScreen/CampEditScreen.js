import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { CountryDropdown, RegionDropdown } from 'react-country-region-selector';
import { Link } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';

import Message from '../../components/Message';
import Loader from '../../components/Loader';
import FormContainer from '../../components/FormContainer';
import { CAMP_UPDATE_RESET } from '../../constants/campConstants';
import { listCampDetails, updateCamp } from '../../actions/campActions';

const CampEditScreen = ({ match, history }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [country, setCountry] = useState('');
  const [city, setCity] = useState('');
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState('');
  const [uploading, setUploading] = useState(false);

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const campDetails = useSelector((state) => state.campDetails);
  const { loading, error, camp } = campDetails;

  const campUpdate = useSelector((state) => state.campUpdate);
  const { success: successUpdate } = campUpdate;

  useEffect(() => {
    if (!userInfo || successUpdate) {
      history.push(`/camp/${match.params.id}`);
      dispatch({
        type: CAMP_UPDATE_RESET,
      });
    }

    if (!camp.name) {
      dispatch(listCampDetails(match.params.id));
    } else {
      setName(camp.name);
      setPrice(camp.price);
      setImage(camp.image);
      setDescription(camp.description);
      setCountry(camp.country);
      setCity(camp.city);
    }
  }, [dispatch, camp, match, successUpdate, history, userInfo]);

  const submitHandler = (event) => {
    event.preventDefault();
    dispatch(
      updateCamp({
        _id: match.params.id,
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
      <Link to={`/camp/${match.params.id}`} className='btn btn-light my-3'>
        Go Back
      </Link>

      <FormContainer>
        <h1>Edit Camp</h1>
        {loading && <Loader />}
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
            style={{ width: '50%', textAlign: 'center', marginLeft: '25%' }}
          >
            Update
          </Button>
        </Form>
      </FormContainer>
    </>
  );
};

export default CampEditScreen;
