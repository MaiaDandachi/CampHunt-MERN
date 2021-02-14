import React from 'react';
import { Form, Col, Button } from 'react-bootstrap';
import { CountryDropdown, RegionDropdown } from 'react-country-region-selector';
import { useForm } from '../../hooks/useForm';
import './FilterBox.scss';

const FilterBox = ({ history }) => {
  const { inputs, handleInputChange, handleInputValue } = useForm({
    camp: '',
    minPrice: '',
    maxPrice: '',
    country: '',
    city: '',
  });

  const submitHandler = (e) => {
    e.preventDefault();
    let filterQuery = '?';

    if (inputs.camp) {
      filterQuery += `camp=${inputs.camp}`;
      filterQuery += `&`;
      handleInputValue('camp', '');
    }
    if (inputs.minPrice) {
      filterQuery += `minPrice=${inputs.minPrice}`;
      filterQuery += `&`;
      handleInputValue('minPrice', '');
    }
    if (inputs.maxPrice) {
      filterQuery += `maxPrice=${inputs.maxPrice}`;
      filterQuery += `&`;

      handleInputValue('maxPrice', '');
    }
    if (inputs.country) {
      filterQuery += `country=${inputs.country}`;
      filterQuery += `&`;

      handleInputValue('country', '');
    }
    if (inputs.city) {
      filterQuery += `city=${inputs.city}`;
      filterQuery += `&`;

      handleInputValue('city', '');
    }

    if (filterQuery.length > 1) {
      filterQuery = filterQuery.slice(0, -1); // remove the last &
      history.push({ pathname: `/filter`, search: filterQuery }); // ?camp=test&country=turkey
    } else {
      history.push('/');
    }
  };

  return (
    <Form className='filter-box' onSubmit={submitHandler}>
      <Form.Row>
        <Form.Group className='filter-box__form-group' as={Col} sm={12} md={6}>
          <Form.Label>What Camp?</Form.Label>
          <Form.Control
            className='filter-box__form-control'
            type='text'
            name='camp'
            placeholder='Camp Name'
            value={inputs.camp}
            onChange={handleInputChange}
          />
        </Form.Group>

        <Form.Group className='filter-box__form-group' as={Col}>
          <Form.Label>Min. Price</Form.Label>

          <Form.Control
            className='filter-box__form-control'
            type='number'
            name='minPrice'
            min='1'
            step='0.01'
            value={inputs.minPrice}
            placeholder='$ / Night'
            onChange={handleInputChange}
          />
        </Form.Group>

        <Form.Group className='filter-box__form-group' as={Col}>
          <Form.Label>Max. Price</Form.Label>
          <Form.Control
            className='filter-box__form-control'
            type='number'
            name='maxPrice'
            min='1'
            step='0.01'
            value={inputs.maxPrice}
            placeholder='$ / Night'
            onChange={handleInputChange}
          />
        </Form.Group>
      </Form.Row>

      <Form.Row className='select-row'>
        <Form.Group className='filter-box__form-group' as={Col}>
          <Form.Label>Country</Form.Label>
          <CountryDropdown
            className='form-control filter-box__form-control'
            name='country'
            defaultOptionLabel='Country'
            value={inputs.country}
            onChange={(value) => handleInputValue('country', value)}
          />
        </Form.Group>

        <Form.Group className='filter-box__form-group' as={Col}>
          <Form.Label>City</Form.Label>
          <RegionDropdown
            className='form-control filter-box__form-control'
            name='city'
            disableWhenEmpty={true}
            country={inputs.country}
            value={inputs.city}
            onChange={(value) => handleInputValue('city', value)}
          />
        </Form.Group>
      </Form.Row>
      <Form.Row>
        <Col>
          <Button type='submit' variant='info' className='filter-box__btn mt-3'>
            Filter
          </Button>
        </Col>
      </Form.Row>
    </Form>
  );
};

export default FilterBox;
