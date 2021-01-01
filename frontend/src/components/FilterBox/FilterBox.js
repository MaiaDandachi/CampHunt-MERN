import React, { useState } from 'react';
import { Form, Col, Button } from 'react-bootstrap';
import { CountryDropdown, RegionDropdown } from 'react-country-region-selector';
import './FilterBox.css';

const FilterBox = ({ history }) => {
  const [camp, setCamp] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [country, setCountry] = useState('');
  const [city, setCity] = useState('');

  const submitHandler = (e) => {
    e.preventDefault();
    let filterQuery = '?';

    if (camp) {
      filterQuery += `camp=${camp}`;
      filterQuery += `&`;
      setCamp('');
    }
    if (minPrice) {
      filterQuery += `minPrice=${minPrice}`;
      filterQuery += `&`;
      setMinPrice('');
    }
    if (maxPrice) {
      filterQuery += `maxPrice=${maxPrice}`;
      filterQuery += `&`;

      setMaxPrice('');
    }
    if (country) {
      filterQuery += `country=${country}`;
      filterQuery += `&`;

      setCountry('');
    }
    if (city) {
      filterQuery += `city=${city}`;
      filterQuery += `&`;

      setCity('');
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
        <Form.Group as={Col}>
          <Form.Label>What Camp?</Form.Label>
          <Form.Control
            type='text'
            name='campName'
            placeholder='Camp Name'
            value={camp}
            onChange={(e) => setCamp(e.target.value)}
          />
        </Form.Group>

        <Form.Group as={Col} sm={12} md={6}>
          <Form.Label>Min. Price</Form.Label>

          <Form.Control
            type='number'
            name='minPrice'
            min='1'
            step='0.01'
            value={minPrice}
            placeholder='$ / Night'
            onChange={(e) => setMinPrice(e.target.value)}
          />
        </Form.Group>

        <Form.Group as={Col}>
          <Form.Label>Max. Price</Form.Label>
          <Form.Control
            type='number'
            name='maxPrice'
            min='1'
            step='0.01'
            value={maxPrice}
            placeholder='$ / Night'
            onChange={(e) => setMaxPrice(e.target.value)}
          />
        </Form.Group>
      </Form.Row>

      <Form.Row className='select-row'>
        <Form.Group as={Col}>
          <Form.Label>Country</Form.Label>
          <CountryDropdown
            className='form-control'
            name='country'
            defaultOptionLabel='Country'
            value={country}
            onChange={(value) => setCountry(value)}
          />
        </Form.Group>

        <Form.Group as={Col}>
          <Form.Label>City</Form.Label>
          <RegionDropdown
            className='form-control'
            name='city'
            disableWhenEmpty={true}
            country={country}
            value={city}
            onChange={(value) => setCity(value)}
          />
        </Form.Group>
      </Form.Row>
      <Form.Row>
        <Col>
          <Button
            type='submit'
            variant='info'
            className='mt-3'
            style={{ width: '40%' }}
          >
            Filter
          </Button>
        </Col>
      </Form.Row>
    </Form>
  );
};

export default FilterBox;
