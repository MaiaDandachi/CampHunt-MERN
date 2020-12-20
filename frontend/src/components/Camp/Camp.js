import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from 'react-bootstrap';

import Rating from '../Rating/Rating';
import './Camp.css';

const Camp = ({ camp }) => {
  return (
    <Card className='my-3 rounded'>
      <Link to={`/camp/${camp._id}`}>
        <Card.Img src={camp.image} variant='top' />
      </Link>

      <Card.Body>
        <Link to={`/camp/${camp._id}`}>
          <Card.Title as='div'>
            <strong>{camp.name}</strong>
          </Card.Title>
        </Link>

        <Card.Text as='div'>
          <Rating value={camp.rating} text={`${camp.numReviews} reviews`} />
        </Card.Text>
        <Card.Text as='h4' className='pt-3'>
          <span className='font-weight-bold' style={{ color: '#212529' }}>
            $ {camp.price} / Night
          </span>
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Camp;
