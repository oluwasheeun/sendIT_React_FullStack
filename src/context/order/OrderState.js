import React, { useReducer } from 'react';
import axios from 'axios';
import OrderContext from './orderContext';
import OrderReducer from './orderReducer';
import {
  GET_ORDERS,
  CREATE_ORDER,
  DELETE_ORDER,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_ORDER,
  ORDER_ERROR,
  FILTER_ORDERS,
  CLEAR_FILTER,
  CLEAR_ORDERS,
} from '../types';

const OrderState = (props) => {
  const initialState = {
    orders: [],
    current: null,
    filtered: null,
    error: null,
  };

  const [state, dispatch] = useReducer(OrderReducer, initialState);

  // Get Orders
  const getOrders = async (role, userId) => {
    if (role === 'admin') {
      try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/parcels`);

        dispatch({
          type: GET_ORDERS,
          payload: res.data.data,
        });
      } catch (err) {
        dispatch({
          type: ORDER_ERROR,
          payload: err.response.error,
        });
      }
    } else {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_API_URL}/users/${userId}/parcels`
        );

        dispatch({
          type: GET_ORDERS,
          payload: res.data.data,
        });
      } catch (err) {
        dispatch({
          type: ORDER_ERROR,
          payload: err.response.error,
        });
      }
    }
  };

  // Create Order
  const createOrder = async (order) => {
    const config = {
      headers: {
        'content-Type': 'application/json',
      },
    };

    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/parcels`,
        order,
        config
      );

      dispatch({
        type: CREATE_ORDER,
        payload: res.data.data,
      });
    } catch (err) {
      dispatch({
        type: ORDER_ERROR,
        payload: err.response.error,
      });
    }
  };

  // Delete Order
  const deleteOrder = async (id) => {
    const config = {
      headers: {
        'content-Type': 'application/json',
      },
    };

    try {
      const res = await axios.put(
        `${process.env.REACT_APP_API_URL}/parcels/${id}/cancel`,
        config
      );

      if (res.data.success) {
        dispatch({
          type: DELETE_ORDER,
          payload: id,
        });
      }
    } catch (err) {
      dispatch({
        type: ORDER_ERROR,
        payload: err.response.error,
      });
    }
  };

  // Update Destination
  const updateDestination = async (id, newDestination) => {
    const config = {
      headers: {
        'content-Type': 'application/json',
      },
    };

    try {
      const res = await axios.put(
        `${process.env.REACT_APP_API_URL}/parcels/${id}/destination`,
        newDestination,
        config
      );

      dispatch({ type: UPDATE_ORDER, payload: res.data.data });
    } catch (err) {
      dispatch({
        type: ORDER_ERROR,
        payload: err.response.error,
      });
    }
  };

  // Update Status
  const updateStatus = async (id, newStatus) => {
    const config = {
      headers: {
        'content-Type': 'application/json',
      },
    };

    try {
      const res = await axios.put(
        `${process.env.REACT_APP_API_URL}/parcels/${id}/status`,
        newStatus,
        config
      );

      dispatch({ type: UPDATE_ORDER, payload: res.data.data });
    } catch (err) {
      dispatch({
        type: ORDER_ERROR,
        payload: err.response.error,
      });
    }
  };

  // Update PresentLocation
  const updatePresentLocation = async (id, PresentLocation) => {
    const config = {
      headers: {
        'content-Type': 'application/json',
      },
    };

    try {
      const res = await axios.put(
        `${process.env.REACT_APP_API_URL}/parcels/${id}/presentLocation`,
        PresentLocation,
        config
      );

      dispatch({ type: UPDATE_ORDER, payload: res.data.data });
    } catch (err) {
      dispatch({
        type: ORDER_ERROR,
        payload: err.response.error,
      });
    }
  };

  // Set Current
  const setCurrent = (order) => {
    dispatch({ type: SET_CURRENT, payload: order });
  };

  // Clear Current
  const clearCurrent = () => {
    dispatch({ type: CLEAR_CURRENT });
  };

  // Clear Orders
  const clearOrders = () => {
    dispatch({ type: CLEAR_ORDERS });
  };
  // Clear current Order
  // Filter Orders
  const filterOrders = (text) => {
    dispatch({ type: FILTER_ORDERS, payload: text });
  };
  // Clear Filter
  const clearFilter = () => {
    dispatch({ type: CLEAR_FILTER });
  };

  return (
    <OrderContext.Provider
      value={{
        orders: state.orders,
        current: state.current,
        filtered: state.filtered,
        error: state.error,
        getOrders,
        createOrder,
        deleteOrder,
        clearOrders,
        setCurrent,
        clearCurrent,
        filterOrders,
        clearFilter,
        updateDestination,
        updateStatus,
        updatePresentLocation,
      }}
    >
      {props.children}
    </OrderContext.Provider>
  );
};

export default OrderState;
