import {
  CAMP_LIST_REQUEST,
  CAMP_LIST_SUCCESS,
  CAMP_LIST_FAIL,
  CAMP_DETAILS_REQUEST,
  CAMP_DETAILS_SUCCESS,
  CAMP_DETAILS_FAIL,
  CAMP_CREATE_REQUEST,
  CAMP_CREATE_SUCCESS,
  CAMP_CREATE_FAIL,
  CAMP_CREATE_REVIEW_REQUEST,
  CAMP_CREATE_REVIEW_SUCCESS,
  CAMP_CREATE_REVIEW_FAIL,
  CAMP_CREATE_REVIEW_RESET,
  CAMP_DELETE_REQUEST,
  CAMP_DELETE_SUCCESS,
  CAMP_DELETE_FAIL,
  CAMP_UPDATE_REQUEST,
  CAMP_UPDATE_SUCCESS,
  CAMP_UPDATE_FAIL,
  CAMP_UPDATE_RESET,
} from '../constants/campConstants';

export const campListReducer = (state = { camps: [] }, action) => {
  switch (action.type) {
    case CAMP_LIST_REQUEST:
      return { loading: true, camps: [] };

    case CAMP_LIST_SUCCESS:
      return {
        loading: false,
        camps: action.payload,
      };

    case CAMP_LIST_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const campDetailsReducer = (
  state = { camp: { reviews: [] } },
  action
) => {
  switch (action.type) {
    case CAMP_DETAILS_REQUEST:
      return { loading: true, ...state };

    case CAMP_DETAILS_SUCCESS:
      return { loading: false, camp: action.payload };

    case CAMP_DETAILS_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const campCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case CAMP_CREATE_REQUEST:
      return { loading: true };

    case CAMP_CREATE_SUCCESS:
      return { loading: false, success: true, camp: action.payload };

    case CAMP_CREATE_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const campCreateReviewReducer = (state = {}, action) => {
  switch (action.type) {
    case CAMP_CREATE_REVIEW_REQUEST:
      return { loading: true };

    case CAMP_CREATE_REVIEW_SUCCESS:
      return { loading: false, success: true };

    case CAMP_CREATE_REVIEW_FAIL:
      return { loading: false, error: action.payload };

    case CAMP_CREATE_REVIEW_RESET:
      return {};

    default:
      return state;
  }
};

export const campDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case CAMP_DELETE_REQUEST:
      return { loading: true };

    case CAMP_DELETE_SUCCESS:
      return { loading: false, success: true };

    case CAMP_DELETE_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const campUpdateReducer = (state = { camp: {} }, action) => {
  switch (action.type) {
    case CAMP_UPDATE_REQUEST:
      return { loading: true };

    case CAMP_UPDATE_SUCCESS:
      return { loading: false, success: true, camp: action.payload };

    case CAMP_UPDATE_FAIL:
      return { loading: false, error: action.payload };

    case CAMP_UPDATE_RESET:
      return { camp: {} };

    default:
      return state;
  }
};
