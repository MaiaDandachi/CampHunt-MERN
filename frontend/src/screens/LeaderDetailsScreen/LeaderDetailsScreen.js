import React, { useEffect } from 'react';
import { Row, Col, Card, Image } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import Loader from '../../components/Loader';
import Message from '../../components/Message';
import { listUsers } from '../../actions/userActions';
import { listCamps } from '../../actions/campActions';

const LeaderDetailsScreen = ({ match }) => {
  const dispatch = useDispatch();

  const userList = useSelector((state) => state.userList);
  const { loading: userLoading, users, error: userError } = userList;

  const campList = useSelector((state) => state.campList);
  const { loading: campLoading, camps, error: campError } = campList;

  useEffect(() => {
    dispatch(listUsers());
    dispatch(listCamps());
  }, [dispatch, match]);

  const leaderCamps = camps.filter((camp) => camp.user === match.params.id);
  const currentUser = users.find((user) => user._id === match.params.id);

  return (
    <>
      <Link className='btn btn-light my-3' to='/leaders'>
        Go Back
      </Link>
      <Row>
        {userLoading ? (
          <Loader />
        ) : userError ? (
          <Message variant='danger'>{userError}</Message>
        ) : (
          <Col md={4} className='border-right pr-md-3 pr-lg-4 pr-xl-5'>
            <div className='mb-4 mb-md-0'>
              <div className='border-bottom border-bottom-md-0 p-3 p-md-0'>
                <div className='d-flex flex-column align-items-center'>
                  <Image
                    src={
                      'https://camphunt-images.s3.eu-west-2.amazonaws.com/1608398309241'
                    }
                    roundedCircle
                    className='img-fluid mb-3'
                  />
                  <h4 className='pb-3'>{currentUser && currentUser.name}</h4>
                </div>
              </div>
            </div>
          </Col>
        )}

        {campLoading ? (
          <Loader />
        ) : campError ? (
          <Message variant='danger'>{campError}</Message>
        ) : (
          <Col md={8}>
            {leaderCamps.map((camp) => (
              <Card
                key={camp._id}
                style={{ transition: 'none', transform: 'none' }}
              >
                <Card.Img
                  src={camp.image}
                  alt={camp.name}
                  fluid='true'
                  className='roundedcircle'
                  style={{ maxWidth: '300px' }}
                />

                <Card.Body>
                  <Link to={`/camp/${camp._id}`}>
                    <h5>{camp.name}</h5>
                  </Link>
                </Card.Body>
              </Card>
            ))}
          </Col>
        )}
      </Row>
    </>
  );
};

export default LeaderDetailsScreen;
