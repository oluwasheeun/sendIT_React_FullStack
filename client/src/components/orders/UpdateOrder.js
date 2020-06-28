import React, { useContext, useState } from 'react';
import OrderContext from '../../context/order/orderContext';
import AuthContext from '../../context/auth/authContext';
import AlertContext from '../../context/alert/alertContext';

const UpdateOrder = () => {
  const orderContext = useContext(OrderContext);
  const authContext = useContext(AuthContext);
  const alertContext = useContext(AlertContext);

  const {
    current,
    clearCurrent,
    updateDestination,
    updateStatus,
    updatePresentLocation,
  } = orderContext;
  const { user } = authContext;
  const { setAlert } = alertContext;

  const [newDestination, setNewDestination] = useState({ destination: '' });
  const { destination } = newDestination;

  const [newStatus, setNewstatus] = useState({ status: '' });
  const { status } = newStatus;

  const [currentLocation, setCurrentLocation] = useState({
    presentLocation: '',
  });
  const { presentLocation } = currentLocation;

  const onChangeDestination = (e) =>
    setNewDestination({ description: e.target.value });

  const onChangeStatus = (e) => setNewstatus({ status: e.target.value });

  const onChangeLocation = (e) =>
    setCurrentLocation({ presentLocation: e.target.value });

  const clearCurrentOrder = () => {
    clearCurrent();
    document.querySelector('.modal').style.display = 'none';
  };

  const onSubmitDestination = (e) => {
    e.preventDefault();
    updateDestination(current._id, newDestination);

    setAlert('Update Success', 'success');
    clearCurrentOrder();
  };

  const onSubmitNewLocation = (e) => {
    e.preventDefault();
    updatePresentLocation(current._id, currentLocation);

    setAlert('Update Success', 'success');
    clearCurrentOrder();
  };

  const onSubmitNewStatus = (e) => {
    e.preventDefault();
    updateStatus(current._id, newStatus);

    setAlert('Update Success', 'success');
    clearCurrentOrder();
  };

  return (
    <div className='modal' id='editModal'>
      <div className='modal-content'>
        <span className='close-btn' onClick={clearCurrentOrder}>
          &times;
        </span>

        <div className='m-content'>
          {/* Change Destination */}

          {user.role === 'user' && (
            <div className='destination'>
              <h1 className='s-heading'>
                <span className='text-primary'>Change Destination</span>
              </h1>
              <form id='change-destination' onSubmit={onSubmitDestination}>
                <div className='form-group'>
                  <label htmlFor='new-destination'>New Destination:</label>
                  <input
                    type='text'
                    name='new-destination'
                    value={destination}
                    onChange={onChangeDestination}
                    required
                  />
                </div>
                <button type='submit' className='btn '>
                  Change Destination
                </button>
              </form>
            </div>
          )}

          {/* Change Location */}
          {user.role === 'admin' && (
            <div className='location'>
              <h1 className='s-heading'>
                <span>Update </span>Location
              </h1>
              <form id='update-location' onSubmit={onSubmitNewLocation}>
                <div className='form-group'>
                  <label htmlFor='new-location'>Current Location:</label>
                  <input
                    type='text'
                    name='new-location'
                    value={presentLocation}
                    onChange={onChangeLocation}
                    required
                  />
                </div>
                <button type='submit' className='btn '>
                  Change Location
                </button>
              </form>
            </div>
          )}

          {/* Update Status */}
          {user.role === 'admin' && (
            <div className='u-status'>
              <h1 className='s-heading'>
                <span className='text-primary'>Update Status</span>
              </h1>
              <form id='update-status' onSubmit={onSubmitNewStatus}>
                <div className='form-group'>
                  <label htmlFor='new-status'>Current Status:</label>
                  <select
                    id='new-status'
                    value={status}
                    onChange={onChangeStatus}
                  >
                    <option defaultValue=''> Select Status </option>
                    <option value='In-Transit'>In-Transit</option>
                    <option value='Delivered'>Delivered</option>
                  </select>
                </div>
                <button type='submit' className='btn '>
                  Update Status
                </button>
              </form>
            </div>
          )}
        </div>

        <div className='modal-footer text-center'>
          <button
            type='button'
            className='btn btn-secondary close-btn-2'
            onClick={clearCurrentOrder}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateOrder;
