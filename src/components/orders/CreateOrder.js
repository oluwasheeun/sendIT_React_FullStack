import React, { useState, useContext } from 'react';
import OrderContext from '../../context/order/orderContext';
import AlertContext from '../../context/alert/alertContext';

const CreateOrder = () => {
  const orderContext = useContext(OrderContext);
  const alertContext = useContext(AlertContext);

  const { createOrder } = orderContext;
  const { setAlert } = alertContext;

  const [order, setOrder] = useState({
    description: '',
    pickupLocation: '',
    destination: '',
    recipientName: '',
    phone: '',
  });

  const {
    description,
    pickupLocation,
    destination,
    recipientName,
    phone,
  } = order;

  const onChange = (e) =>
    setOrder({ ...order, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    createOrder(order);

    setAlert('Order Created', 'success');

    //Clear input field
    setOrder({
      description: '',
      pickupLocation: '',
      destination: '',
      recipientName: '',
      phone: '',
    });
  };

  return (
    <div
      className='createOrder'
      style={{ background: '#333', marginTop: '65px' }}
    >
      <h1 className='s-heading text-center'>
        <span className='text-primary'>Create Order </span>
      </h1>
      <form onSubmit={onSubmit} id='create-order-form'>
        <div className='form-group'>
          <label htmlFor='description'>Item Description</label>
          <textarea
            name='description'
            id='description'
            value={description}
            onChange={onChange}
            required
          ></textarea>
        </div>
        <div className='form-group'>
          <label htmlFor='pickupLocation'>Pickup Location</label>
          <input
            type='text'
            name='pickupLocation'
            id='pickupLocation'
            value={pickupLocation}
            onChange={onChange}
            required
          />
        </div>
        <div className='form-group'>
          <label htmlFor='destination'> Destination </label>
          <input
            type='text'
            name='destination'
            id='destination'
            value={destination}
            onChange={onChange}
            required
          />
        </div>
        <div className='form-group'>
          <label htmlFor='recipientName'>Recipient's Name</label>
          <input
            type='recipientName'
            name='recipientName'
            id='recipientName'
            value={recipientName}
            onChange={onChange}
            required
          />
        </div>
        <div className='form-group'>
          <label htmlFor='phone'>Recipient Phone No.</label>
          <input
            type='tel'
            name='phone'
            id='phone'
            pattern='\+(9[976]\d|8[987530]\d|6[987]\d|5[90]\d|42\d|3[875]\d|2[98654321]\d|9[8543210]|8[6421]|6[6543210]|5[87654321]|4[987654310]|3[9643210]|2[70]|7|1)\d{1,14}$'
            value={phone}
            onChange={onChange}
            required
          />
          <span className='validity validity2'>Format: +1234....</span>
        </div>
        <input
          type='submit'
          name='myButton'
          value='Create Order'
          className='btn register-btn'
        ></input>
      </form>
    </div>
  );
};

export default CreateOrder;
