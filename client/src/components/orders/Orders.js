import React, { useContext, useEffect } from 'react';
import OrderContext from '../../context/order/orderContext';
import OrderItem from './OrderItem';
import AuthContext from '../../context/auth/authContext';
import Spinner from '../layout/Spinner';

const Orders = () => {
  const orderContext = useContext(OrderContext);
  const authContext = useContext(AuthContext);

  const { orders, filtered, getOrders, loading } = orderContext;
  const { user } = authContext;

  useEffect(() => {
    if (user) {
      getOrders(user.role, user._id);
    }
    // eslint-disable-next-line
  }, [authContext, user]);

  if (!orders) {
    return <Spinner />;
  }

  if (orders !== null && orders.length === 0 && !loading) {
    return <h4>Please create order</h4>;
  }

  return (
    <table className='orders-table'>
      <thead>
        <tr>
          <th>Item Description</th>
          <th>Pickup Location</th>
          <th>Destination</th>
          <th>Recipient Name</th>
          <th>Recipient Phone Number</th>
          <th>Current Location</th>
          <th>Status</th>
          <th>Edit</th>
          <th>Delete</th>
        </tr>
      </thead>
      <tbody className='list-orders'>
        {filtered !== null
          ? filtered.map((order) => <OrderItem key={order._id} order={order} />)
          : orders.map((order) => <OrderItem key={order._id} order={order} />)}
      </tbody>
    </table>
  );
};

export default Orders;
