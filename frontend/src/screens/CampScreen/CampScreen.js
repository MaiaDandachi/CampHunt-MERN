import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, ListGroup, Card, Button, Form } from 'react-bootstrap';

import Rating from '../../components/Rating/Rating';
import Loader from '../../components/Loader';
import Message from '../../components/Message';
import {
  listCampDetails,
  createCampReview,
  deleteCamp,
} from '../../actions/campActions';
import { CAMP_CREATE_REVIEW_RESET } from '../../constants/campConstants';
import { LinkContainer } from 'react-router-bootstrap';
import { useForm } from '../../hooks/useForm';

const CampScreen = ({ match, history }) => {
  const { inputs, handleInputChange, handleInputValue } = useForm({
    name: '',
    comment: '',
    rating: 0,
  });

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const campDetails = useSelector((state) => state.campDetails);
  const { loading, error, camp } = campDetails;

  const campReview = useSelector((state) => state.campReview);
  const { error: errorReview, success: successReview } = campReview;

  const campDelete = useSelector((state) => state.campDelete);
  const { success: successDelete } = campDelete;

  useEffect(() => {
    if (successReview) {
      alert('Review Submitted');
      handleInputValue('rating', 0);
      handleInputValue('name', '');
      handleInputValue('comment', '');

      dispatch({ type: CAMP_CREATE_REVIEW_RESET });
    }

    if (successDelete) {
      history.push('/');
    }

    dispatch(listCampDetails(match.params.id));
  }, [
    dispatch,
    match.params.id,
    successReview,
    successDelete,
    history,
    handleInputValue,
  ]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      createCampReview(match.params.id, {
        name: inputs.name,
        rating: inputs.rating,
        comment: inputs.comment,
      })
    );
  };

  const deleteHandler = () => {
    if (window.confirm('Are you sure ?')) {
      dispatch(deleteCamp(match.params.id));
    }
  };

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
          <Col md={4} className='order-md-2'>
            {/* Show edit and delete buttons only when the creator of the camp is logged in */}
            {userInfo && camp.user && userInfo._id === camp.user._id && (
              <div className='mb-2'>
                <LinkContainer
                  to={`/camp/${camp._id}/edit`}
                  style={{
                    borderRadius: '50px',
                    padding: '9px 25px',
                    border: 'none',
                  }}
                >
                  <Button variant='info'>Edit</Button>
                </LinkContainer>

                <Button
                  variant='danger'
                  style={{
                    borderRadius: '50px',
                    padding: '9px 25px',
                    border: 'none',
                    marginLeft: '10px',
                  }}
                  onClick={() => {
                    deleteHandler();
                  }}
                >
                  Delete
                </Button>
              </div>
            )}

            <ListGroup>
              <ListGroup.Item>
                <span className='d-block'>Price</span>
                <span className='font-weight-bold'>$ {camp.price} / night</span>
              </ListGroup.Item>

              <ListGroup.Item>
                <span className='d-block'>Rating</span>
                <span className='font-weight-bold'>
                  <Rating
                    value={camp.rating ? camp.rating : 0}
                    text={`${camp.numReviews} reviews`}
                  />
                </span>
              </ListGroup.Item>

              <ListGroup.Item>
                <span className='d-block'>Creator</span>
                <span className='font-weight-bold'>
                  {camp.user && camp.user.name}
                </span>
              </ListGroup.Item>

              <ListGroup.Item>
                <span className='d-block'>Created Date</span>
                <span className='font-weight-bold'>
                  {camp.createdAt && camp.createdAt.toString().split('T')[0]}
                </span>
              </ListGroup.Item>

              <ListGroup.Item>
                <span className='d-block'>Country</span>
                <span className='font-weight-bold'>{camp.country}</span>
              </ListGroup.Item>

              <ListGroup.Item>
                <span className='d-block'>City</span>
                <span className='font-weight-bold'>{camp.city}</span>
              </ListGroup.Item>

              <ListGroup.Item>
                <span className='d-block'>Phone</span>
                <span className='font-weight-bold'>999-999-9999</span>
              </ListGroup.Item>

              <ListGroup.Item>
                <span className='d-block'>Email</span>
                <span className='font-weight-bold'>
                  {camp.user && camp.user.email}
                </span>
              </ListGroup.Item>
            </ListGroup>
          </Col>

          <Col md={8} className='order-md-1'>
            <Card
              className='pb-3'
              style={{ transition: 'none', transform: 'none' }}
            >
              <Card.Title as='h3' className='pl-3 my-3'>
                {camp.name}
              </Card.Title>
              <Card.Img
                src={camp.image}
                variant='top'
                alt={camp.name}
                fluid='true'
              />
              <Card.Body>
                <Card.Text>{camp.description}</Card.Text>
              </Card.Body>
            </Card>

            <Card
              className='bg-light my-4'
              style={{ transition: 'none', transform: 'none' }}
            >
              <Card.Body>
                <h2>Reviews</h2>
                {camp.reviews.length === 0 && <Message>No Reviews</Message>}
                <ListGroup variant='flush'>
                  {camp.reviews.map((review) => (
                    <ListGroup.Item key={review._id}>
                      <strong>{review.name}</strong>
                      <Rating value={review.rating} />
                      <p>{review.createdAt.substring(0, 10)}</p>
                      <p>{review.comment}</p>
                    </ListGroup.Item>
                  ))}
                  <ListGroup.Item>
                    <h2>Add Your Review</h2>
                    {errorReview && (
                      <Message variant='danger'>{errorReview}</Message>
                    )}

                    <Form onSubmit={submitHandler}>
                      <Form.Group controlId='name'>
                        <Form.Label>Reviewer Name</Form.Label>
                        <Form.Control
                          type='name'
                          placeholder='Enter Name'
                          required
                          name='name'
                          value={inputs.name}
                          onChange={handleInputChange}
                        ></Form.Control>
                      </Form.Group>

                      <Form.Group controlId='rating'>
                        <Form.Label>Rating</Form.Label>
                        <Form.Control
                          as='select'
                          name='rating'
                          required
                          value={inputs.rating}
                          onChange={handleInputChange}
                        >
                          <option value=''>Select ... </option>
                          <option value='1'>1 - Poor</option>
                          <option value='2'>2 - Fair</option>
                          <option value='3'>3 - Good</option>
                          <option value='4'>4 - Very Good</option>
                          <option value='5'>5 - Excellent</option>
                        </Form.Control>
                      </Form.Group>
                      <Form.Group controlId='comment'>
                        <Form.Label>Comment</Form.Label>
                        <Form.Control
                          as='textarea'
                          row='3'
                          name='comment'
                          value={inputs.comment}
                          required
                          onChange={handleInputChange}
                        ></Form.Control>
                      </Form.Group>
                      <Button
                        type='submit'
                        variant='info'
                        className='ml-0'
                        style={{
                          cursor: 'pointer',
                          borderRadius: '50px',
                          border: 'none',
                          marginBottom: '2px',
                          padding: '9px 25px',
                        }}
                      >
                        Add
                      </Button>
                    </Form>
                  </ListGroup.Item>
                </ListGroup>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      )}
    </>
  );
};

export default CampScreen;
