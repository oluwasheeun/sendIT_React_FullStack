import React, { useContext, useRef, useEffect } from 'react';
import OrderContext from '../../context/order/orderContext';

const OrderFilter = () => {
  const orderContext = useContext(OrderContext);
  const { filtered, filterOrders, clearFilter } = orderContext;

  const text = useRef('');

  useEffect(() => {
    if (filtered === null) {
      text.current.value = '';
    }
  });

  const onChange = (e) => {
    if (text.current.value !== '') {
      filterOrders(e.target.value);
    } else {
      clearFilter();
    }
  };

  return (
    <div>
      <div className='filter text-center'>
        <input
          ref={text}
          type='text'
          name='filter'
          id='filter'
          placeholder='Search recipient name or phone number...'
          onChange={onChange}
        />{' '}
        <select id='select-filter'>
          <option value='Reset'>Reset</option>
          <option value='In-Transit'>In-Transit</option>
          <option value='Delivered'>Delivered</option>
        </select>
      </div>
    </div>
  );
};

export default OrderFilter;
