import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Header from './components/Header/Header';
import Footer from './components/Footer';
import HomeScreen from './screens/HomeScreen/HomeScreen';
import CampScreen from './screens/CampScreen/CampScreen';
import CampEditScreen from './screens/CampEditScreen/CampEditScreen';
import LoginScreen from './screens/LoginScreen/LoginScreen';
import RegisterScreen from './screens/RegisterScreen/RegisterScreen';
import AddCampScreen from './screens/AddCampScreen/AddCampScreen';
import LeadersListScreen from './screens/LeadersListScreen/LeadersListScreen';
import LeaderDetailsScreen from './screens/LeaderDetailsScreen/LeaderDetailsScreen';
import ProfileScreen from './screens/ProfileScreen/ProfileScreen';
import { Container } from 'react-bootstrap';

const App = () => {
  return (
    <Router>
      <Header />
      <main>
        <Container>
          <Route path='/filter' component={HomeScreen} />
          <Route path='/' component={HomeScreen} exact />

          <Route path='/login' component={LoginScreen} />
          <Route path='/register' component={RegisterScreen} />

          <Route path='/camp/:id' component={CampScreen} exact />
          <Route path='/camp/:id/edit' component={CampEditScreen} />
          <Route path='/new-campground' component={AddCampScreen} />

          <Route path='/leaders' component={LeadersListScreen} exact />
          <Route path='/leaders/:id' component={LeaderDetailsScreen} />

          <Route path='/profile' component={ProfileScreen} />
        </Container>
      </main>
      <Footer />
    </Router>
  );
};

export default App;
