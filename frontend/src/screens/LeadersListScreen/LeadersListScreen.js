import React, { useEffect } from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import Loader from '../../components/Loader';
import Message from '../../components/Message';
import { listUsers } from '../../actions/userActions';
import { listCamps } from '../../actions/campActions';
import './LeadersListScreen.css';

const LeadersListScreen = () => {
  const dispatch = useDispatch();

  const userList = useSelector((state) => state.userList);
  const { loading, users, error } = userList;

  const campList = useSelector((state) => state.campList);
  const { camps } = campList;

  useEffect(() => {
    dispatch(listUsers());
    dispatch(listCamps());
  }, [dispatch]);

  return (
    <>
      <Link className='btn btn-light my-3' to='/'>
        Go Back
      </Link>

      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <Row>
          {users.map((leader) => {
            const leaderCamps = camps.filter(
              (camp) => camp.user === leader._id
            );

            return (
              <Col key={leader._id} lg={6} className='mb-3'>
                <div className='card-user h-100'>
                  <Card
                    className='flex-row h-100 p-2'
                    style={{ transition: 'none', transform: 'none' }}
                  >
                    <Card.Img
                      src={
                        'https://camphunt-images.s3.eu-west-2.amazonaws.com/1608398309241'
                      }
                      alt={leader.name}
                      fluid='true'
                      className='roundedcircle'
                    />

                    <Card.Body>
                      <Link to={`/leaders/${leader._id}`}>
                        <h5>{leader.name}</h5>
                      </Link>
                      <span>
                        {leaderCamps.length}
                        {leaderCamps.length === 1
                          ? ' campground'
                          : ' campgrounds'}
                      </span>
                    </Card.Body>
                  </Card>
                </div>
              </Col>
            );
          })}
        </Row>
      )}
    </>
  );
};

export default LeadersListScreen;
