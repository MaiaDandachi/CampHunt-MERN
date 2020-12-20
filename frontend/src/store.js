import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import {
  campListReducer,
  campDetailsReducer,
  campCreateReducer,
  campCreateReviewReducer,
  campDeleteReducer,
  campUpdateReducer,
} from './reducers/campReducers';
import {
  userLoginReducer,
  userRegisterReducer,
  userListReducer,
  userDetailsReducer,
  userUpadteProfileReducer,
  userDeleteReducer,
} from './reducers/userReducers';

const reducer = combineReducers({
  campList: campListReducer,
  campDetails: campDetailsReducer,
  campCreate: campCreateReducer,
  campReview: campCreateReviewReducer,
  campDelete: campDeleteReducer,
  campUpdate: campUpdateReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userList: userListReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile: userUpadteProfileReducer,
  userDelete: userDeleteReducer,
});

const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null;

const initialState = {
  userLogin: { userInfo: userInfoFromStorage },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
