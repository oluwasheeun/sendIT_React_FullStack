import React, { useContext, useRef, useEffect, useState } from 'react';
import OrderContext from '../../context/order/orderContext';

const OrderFilter = () => {
  const orderContext = useContext(OrderContext);
  const { filtered, filterOrders, clearFilter } = orderContext;

  const [filterSelect, setFilterSelect] = useState('');

  const text = useRef('');

  useEffect(() => {
    if (filtered === null) {
      text.current.value = '';
      setFilterSelect('');
    }
  });

  const onChange = (e) => {
    if (text.current.value !== '') {
      filterOrders(e.target.value);
    } else {
      clearFilter();
    }
  };

  const onChangeSelect = (e) => {
    setFilterSelect(e.target.value);
    filterOrders(filterSelect);
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
        <select
          id='select-filter'
          value={filterSelect}
          onChange={onChangeSelect}
        >
          <option value=''>Filter Status</option>
          <option value='In-Transit'>Delivered</option>
          <option value='Delivered'>In-Transit</option>
        </select>
      </div>
    </div>
  );
};

export default OrderFilter;
