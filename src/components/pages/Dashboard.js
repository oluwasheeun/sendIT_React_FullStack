import React, { useContext, useEffect, Fragment } from 'react';
import CreateOrder from '../orders/CreateOrder';
import OrderSummary from '../orders/OrderSummary';
import OrderFilter from '../orders/OrderFilter';
import Orders from '../orders/Orders';
import AuthContext from '../../context/auth/authContext';
import UpdateOrder from '../orders/UpdateOrder';
import OrderContext from '../../context/order/orderContext';

const Dashboard = () => {
  const authcontext = useContext(AuthContext);
  const orderContext = useContext(OrderContext);

  const { loadUser, user } = authcontext;
  const { current } = orderContext;

  useEffect(() => {
    loadUser();

    // eslint-disable-next-line
  }, []);

  return (
    <Fragment>
      <section id='UserProfile'>
        <div className='container-2'>
          <div className='user'>
            <div className='profile'>
              {user && user.role === 'user' && <CreateOrder />}
              <OrderSummary />
            </div>
            <div className='orders'>
              <OrderFilter />
              <Orders />
            </div>
          </div>
        </div>
      </section>

      {current && <UpdateOrder />}
    </Fragment>
  );
};

export default Dashboard;
