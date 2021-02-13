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
import { useForm } from '../../hooks/useForm';

const CampEditScreen = ({ match, history }) => {
  const { inputs, handleInputChange, handleInputValue } = useForm({
    name: '',
    description: '',
    country: '',
    city: '',
    price: 0,
    image: '',
  });

  const [uploading, setUploading] = useState(false);

  const [formErrors, setFormErrors] = useState({
    name: '',
    description: '',
    price: '',
    image: '',
  });

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
      handleInputValue('name', camp.name);
      handleInputValue('price', camp.price);
      handleInputValue('image', camp.image);
      handleInputValue('description', camp.description);
      handleInputValue('country', camp.country);
      handleInputValue('city', camp.city);
    }
  }, [
    dispatch,
    camp,
    match,
    successUpdate,
    history,
    userInfo,
    handleInputValue,
  ]);

  const submitHandler = (event) => {
    event.preventDefault();

    const formErrors = validateForm(inputs);
    setFormErrors({
      name: formErrors.name,
      description: formErrors.description,
      price: formErrors.price,
      image: formErrors.image,
    });

    if (Object.keys(formErrors).length) return;

    dispatch(
      updateCamp({
        _id: match.params.id,
        ...inputs,
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

      handleInputValue('image', data);
      setUploading(false);
    } catch (error) {
      console.error(error);
      setUploading(false);
    }
  };

  const validateForm = (camp) => {
    const errors = {};

    //name error check
    if (!camp.name) {
      errors.name = 'Name is required';
    } else if (!/^\S.*?\S$/.test(camp.name)) {
      errors.name = "Name can't have white spaces at the begining & end";
    }

    // description error check
    if (!camp.description) {
      errors.description = 'Description is required';
    } else if (!/^\S.*?\S$/.test(camp.description)) {
      errors.description =
        "Description can't have white spaces at the begining";
    }

    // price error check
    if (!camp.price) {
      errors.price = 'Price is required';
    }

    // image error check
    if (!camp.image) {
      errors.image = 'Image is required';
    }

    return errors;
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
        <Form onSubmit={submitHandler} noValidate>
          <Form.Group controlId='name'>
            <Form.Label>Camp Name</Form.Label>
            {formErrors.name && (
              <div style={{ color: 'red', marginBottom: '10px' }}>
                * {formErrors.name}
              </div>
            )}
            <Form.Control
              type='name'
              placeholder='Enter name'
              name='name'
              value={inputs.name}
              onChange={handleInputChange}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId='description'>
            <Form.Label>Description</Form.Label>
            {formErrors.description && (
              <div style={{ color: 'red', marginBottom: '10px' }}>
                * {formErrors.description}
              </div>
            )}
            <Form.Control
              type='text'
              placeholder='Enter description'
              name='description'
              value={inputs.description}
              onChange={handleInputChange}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId='price'>
            <Form.Label>Price</Form.Label>
            {formErrors.price && (
              <div style={{ color: 'red', marginBottom: '10px' }}>
                * {formErrors.price}
              </div>
            )}
            <Form.Control
              type='number'
              placeholder='Enter Price'
              name='price'
              value={inputs.price}
              onChange={handleInputChange}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId='country'>
            <Form.Label>Country</Form.Label>
            <CountryDropdown
              className='form-control'
              defaultOptionLabel='Country'
              name='country'
              value={inputs.country}
              onChange={(value) => handleInputValue('country', value)}
            />
          </Form.Group>

          <Form.Group controlId='city'>
            <Form.Label>City</Form.Label>
            <RegionDropdown
              className='form-control'
              disableWhenEmpty={true}
              name='city'
              country={inputs.country}
              value={inputs.city}
              onChange={(value) => handleInputValue('city', value)}
            />
          </Form.Group>

          <Form.Group controlId='image'>
            <Form.Label>Image</Form.Label>
            {formErrors.image && (
              <div style={{ color: 'red', marginBottom: '10px' }}>
                * {formErrors.image}
              </div>
            )}
            <Form.Control
              type='text'
              placeholder='Enter image url'
              name='image'
              value={inputs.image}
              onChange={handleInputChange}
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
            Update
          </Button>
        </Form>
      </FormContainer>
    </>
  );
};

export default CampEditScreen;
