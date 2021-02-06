import React from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Navbar, Container, Nav, Button, NavDropdown } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

import './Header.css';
import { logout } from '../../actions/userActions';

const Header = () => {
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const logoutHandler = () => {
    dispatch(logout());
  };

  return (
    <header>
      <Navbar
        className='header'
        bg='dark'
        variant='dark'
        expand='lg'
        collapseOnSelect
      >
        <Container>
          <LinkContainer to='/' className='header__brand'>
            <Navbar.Brand>CampHunt</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='ml-auto'>
              {userInfo ? (
                <NavDropdown
                  title={userInfo.name}
                  id='username'
                  className='header__dropdown'
                >
                  <LinkContainer to='/profile'>
                    <NavDropdown.Item>Profile</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item onClick={logoutHandler}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <LinkContainer to='/login' className='header__link'>
                  <Nav.Link>Log in</Nav.Link>
                </LinkContainer>
              )}

              <LinkContainer to='/leaders' className='header__link--margin-bottom'>
                <Nav.Link>Leaders</Nav.Link>
              </LinkContainer>
            </Nav>
            <LinkContainer to='/new-campground'>
              <Button variant='info' className='header__btn'>
                Create Camp
              </Button>
            </LinkContainer>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
