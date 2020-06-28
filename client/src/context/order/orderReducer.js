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

export default (state, action) => {
  switch (action.type) {
    case GET_ORDERS:
      return {
        ...state,
        orders: action.payload,
        loading: false,
      };
    case CREATE_ORDER:
      return {
        ...state,
        orders: [...state.orders, action.payload],
        loading: false,
      };
    case UPDATE_ORDER:
      return {
        ...state,
        orders: state.orders.map((order) =>
          order._id === action.payload._id ? action.payload : order
        ),
        loading: false,
      };
    case DELETE_ORDER:
      return {
        ...state,
        orders: state.orders.filter((order) => order._id !== action.payload),
        loading: false,
      };
    case CLEAR_ORDERS:
      return {
        ...state,
        orders: null,
        current: null,
        filtered: null,
        error: null,
      };
    case SET_CURRENT:
      return {
        ...state,
        current: action.payload,
      };
    case CLEAR_CURRENT:
      return {
        ...state,
        current: null,
      };
    case FILTER_ORDERS:
      return {
        ...state,
        filtered: state.orders.filter((order) => {
          const regex = new RegExp(`${action.payload}`, 'gi');
          return order.recipientName.match(regex) || order.phone.match(regex);
        }),
      };
    case CLEAR_FILTER:
      return {
        ...state,
        filtered: null,
      };
    case ORDER_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};
