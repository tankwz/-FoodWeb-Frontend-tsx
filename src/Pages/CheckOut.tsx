import React, { useEffect } from 'react';
import { auth } from '../HOC';
import { cartItemModel, userModel } from '../Interfaces';
import { useSelector } from 'react-redux';
import { RootState } from '../Storage/Redux/store';
import { useNavigate } from 'react-router-dom';
import { toastPop } from '../Helper';
import { SD } from '../Util/SD';
import { CheckoutItems, ShippingDetails } from '../Components/Page/Checkout';

function CheckOut() {
  const cartFromStore: cartItemModel[] = useSelector(
    (state: RootState) => state.shoppingCartStore.cartItems ?? []
  );
  const userData: userModel = useSelector(
    (state: RootState) => state.userStore
  );

  const navigate = useNavigate();
  const hasSelectedItem = () => {
    return cartFromStore.some((item) => item.selected);
  };

  useEffect(() => {
    if (!hasSelectedItem()) {
      toastPop("Error, can't find any selected item in cart", SD.TOAST_WARNING);
      navigate('/');
    }
  }, []);

  const getSelectedCartItems = () => {
    return cartFromStore.filter((item) => item.selected);
  };

  const selectedCartItems = getSelectedCartItems();

  const formatEstimatedArrivalTime = () => {
    const now = new Date();
    const estimatedArrivalTime = new Date(now.getTime() + 15 * 60 * 1000); // Add 15 minutes in milliseconds

    const formattedHours = String(estimatedArrivalTime.getHours()).padStart(
      2,
      '0'
    );
    const formattedMinutes = String(estimatedArrivalTime.getMinutes()).padStart(
      2,
      '0'
    );
    const formattedDay = String(estimatedArrivalTime.getDate()).padStart(
      2,
      '0'
    );
    const formattedMonth = String(estimatedArrivalTime.getMonth() + 1).padStart(
      2,
      '0'
    ); // Months are zero-based, so add 1
    const formattedYear = estimatedArrivalTime.getFullYear();

    return `${formattedHours}:${formattedMinutes} - ${formattedDay}/${formattedMonth}/${formattedYear} `;
  };

  return (
    <div className="container ">
      <div className="card">
        <div className="card-header bg-gradient p-3 h2 text-info">
          Order Summary
        </div>
        <ShippingDetails userData={userData}></ShippingDetails>
        <div className="card-body">
          <CheckoutItems cartItem={selectedCartItems}></CheckoutItems>
        </div>
        <div className="card-footer">
          <div className="row">
            <div className="col-12 col-md-9 align-items-center d-flex">
              <p className="m-0 text-info" style={{ fontSize: '14px' }}>
                Estimate arrival time: {formatEstimatedArrivalTime()}
              </p>
            </div>
            <div className="col-12 col-md-3">
              <button className="btn btn-primary form-control">
                Place Order
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default auth(CheckOut);
