import React, { useEffect } from 'react';
import { Col, Jumbotron, Row, Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Route } from 'react-router-dom';

import FilterBox from '../../components/FilterBox/FilterBox';
import Camp from '../../components/Camp/Camp';
import Loader from '../../components/Loader';
import Message from '../../components/Message';
import './HomeScreen.css';

import { listCamps } from '../../actions/campActions';

const HomeScreen = ({ location }) => {
  const dispatch = useDispatch();

  const campList = useSelector((state) => state.campList);
  const { loading, camps, error } = campList;

  useEffect(() => {
    dispatch(listCamps(location.search));
  }, [dispatch, location]);

  return (
    <>
      <Jumbotron>
        <h1>WELCOME TO CAMPHUNT</h1>
        <h4>Find your next getaway</h4>

        <Route render={({ history }) => <FilterBox history={history} />} />
      </Jumbotron>
      <Container className='campground-results-heading'>
        <h3>Available Campgrounds</h3>
        <div className='hr-container'>
          <hr />
        </div>
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{error}</Message>
        ) : (
          <>
            <Row>
              {camps.map((camp) => (
                <Col key={camp._id} sm={12} md={6} lg={4}>
                  <Camp camp={camp} />
                </Col>
              ))}
            </Row>
          </>
        )}
      </Container>
    </>
  );
};

export default HomeScreen;
