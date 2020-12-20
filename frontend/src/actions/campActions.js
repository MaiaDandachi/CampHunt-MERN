import axios from 'axios';
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
  CAMP_DELETE_REQUEST,
  CAMP_DELETE_SUCCESS,
  CAMP_DELETE_FAIL,
  CAMP_UPDATE_REQUEST,
  CAMP_UPDATE_SUCCESS,
  CAMP_UPDATE_FAIL,
} from '../constants/campConstants';

export const listCamps = (filterQuery = '') => async (dispatch) => {
  try {
    dispatch({ type: CAMP_LIST_REQUEST });

    const { data } = await axios.get(`/api/camps${filterQuery}`);

    dispatch({ type: CAMP_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: CAMP_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const listCampDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: CAMP_DETAILS_REQUEST });

    const { data } = await axios.get(`/api/camps/${id}`);

    dispatch({ type: CAMP_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: CAMP_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const createCamp = (camp) => async (dispatch, getState) => {
  try {
    dispatch({
      type: CAMP_CREATE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.post('/api/camps', camp, config);

    dispatch({
      type: CAMP_CREATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CAMP_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const createCampReview = (id, review) => async (dispatch) => {
  try {
    dispatch({
      type: CAMP_CREATE_REVIEW_REQUEST,
    });

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    await axios.post(`/api/camps/${id}/reviews`, review, config);

    dispatch({
      type: CAMP_CREATE_REVIEW_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: CAMP_CREATE_REVIEW_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deleteCamp = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: CAMP_DELETE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    await axios.delete(`/api/camps/${id}`, config);

    dispatch({
      type: CAMP_DELETE_SUCCESS,
    });
  } catch (err) {
    dispatch({
      type: CAMP_DELETE_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};

export const updateCamp = (camp) => async (dispatch, getState) => {
  try {
    dispatch({
      type: CAMP_UPDATE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.put(`/api/camps/${camp._id}`, camp, config);

    dispatch({
      type: CAMP_UPDATE_SUCCESS,
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: CAMP_UPDATE_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};
