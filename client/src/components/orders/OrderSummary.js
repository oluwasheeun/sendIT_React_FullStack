import React, { useContext } from 'react';
import OrderContext from '../../context/order/orderContext';

const OrderSummary = () => {
  const orderContext = useContext(OrderContext);
  const { orders } = orderContext;

  return (
    <div
      className='order-details createOrder'
      style={{ background: '#333', marginTop: '50px' }}
    >
      <h1 className='s-heading text-center' style={{ marginBottom: '15px' }}>
        <span className='text-primary'>Summary </span>
      </h1>
      <p>Number of Orders: {orders.length}</p>
      <p>
        Orders In-Transit:{' '}
        {orders.filter((order) => order.status === 'In-Transit').length}{' '}
      </p>
      <p>
        Orders Delivered:{' '}
        {orders.filter((order) => order.status === 'Delivered').length}
      </p>
    </div>
  );
};

export default OrderSummary;
