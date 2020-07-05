import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import OrderContext from '../../context/order/orderContext';

const OrderItem = ({ order }) => {
  const orderContext = useContext(OrderContext);

  const { deleteOrder, setCurrent, clearCurrent } = orderContext;

  const {
    _id,
    description,
    pickupLocation,
    destination,
    recipientName,
    phone,
    presentLocation,
    status,
  } = order;

  const onDelete = () => {
    const confrimDelete = window.confirm(
      'You are about to delete an order! Do you want to proceed?'
    );

    if (confrimDelete === true) {
      deleteOrder(_id);
      clearCurrent();
    }
  };

  return (
    <tr>
      <td>{description}</td>
      <td>{pickupLocation}</td>
      <td>{destination}</td>
      <td>{recipientName}</td>
      <td>{phone}</td>
      <td>{presentLocation}</td>
      <td>{status}</td>
      <td className='text-center'>
        <i
          className='fas fa-edit editOrder'
          onClick={() => setCurrent(order)}
        ></i>
      </td>
      <td className='text-center'>
        <i className='far fa-trash-alt deleteOrder' onClick={onDelete}></i>
      </td>
    </tr>
  );
};

OrderItem.protoType = {
  order: PropTypes.object.isRequired,
};

export default OrderItem;
