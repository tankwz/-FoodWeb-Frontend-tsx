import React, { useEffect, useState } from 'react';
import { auth } from '../HOC';
import { apiResponse, cartItemModel, userModel } from '../Interfaces';
import { useSelector } from 'react-redux';
import { RootState } from '../Storage/Redux/store';
import { useNavigate } from 'react-router-dom';
import { toastPop } from '../Helper';
import { SD, SD_Status } from '../Util/SD';
import { CheckoutItems, ShippingDetails } from '../Components/Page/Checkout';
import { useNewOrderMutation } from '../api/orderApi';
import { LoaderBig } from '../Components/Page/Utility';
import { timeCalculation } from '../Util';

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
      toastPop('Please select item from cart', SD.TOAST_DEFAULT);
      navigate('/');
    }
  }, []);

  const getSelectedCartItems = () => {
    return cartFromStore.filter((item) => item.selected); //debt => here can you local storage for selected item
  };

  const selectedCartItems = getSelectedCartItems();

  const now = new Date();

  const [isLoading, setIsLoading] = useState(!true);

  const [newOrder] = useNewOrderMutation();
  const handleNewOrder = async () => {
    setIsLoading(true);
    let total = 0;
    let itemCount = 0;
    const orderDetailsDTO: any = [];
    //    console.log(selectedCartItems);

    selectedCartItems.forEach((item: cartItemModel) => {
      const tempOrderDetail: any = {};
      tempOrderDetail['menuItemId'] = item.menuItemId;
      tempOrderDetail['itemName'] = item.menuItem.name;
      tempOrderDetail['quantity'] = item.quantity;
      tempOrderDetail['price'] = item.menuItem?.price;
      orderDetailsDTO.push(tempOrderDetail);
      total += item.quantity! * item.menuItem?.price!;
      itemCount += item.quantity!;
    });

    const itemCountConst = itemCount;
    //   console.log(itemCountConst);

    // console.log({
    //   pickupName: userData.pickupName,
    //   pickupPhoneNumber: userData.phoneNumber,
    //   pickupAddress: userData.address,
    //   appUserId: userData.id,
    //   orderTotal: total,
    //   totalItems: itemCount,
    //   status: '',
    //   orderDetailsDTO,
    // });

    const response: apiResponse = await newOrder({
      pickupName: userData.pickupName,
      pickupPhoneNumber: userData.phoneNumber,
      pickupAddress: userData.address,
      appUserId: userData.id,
      orderTotal: total,
      totalItems: itemCountConst,
      status: '',
      orderDetailsDTO,
    });
    // console.log(response);
    setIsLoading(!true);

    if (response) {
      if (response.data?.result.status === SD_Status.Status_Pending) {
        toastPop('Order Placed Successfully', SD.TOAST_SUCCESS);
        navigate(`/order/orderDetails/${response.data.result.orderHeadId}`);
      }
    } else {
      toastPop('OOPS! Something gone wrong, please try again', SD.TOAST_ERROR); //wrong
    }

    // -  "pickupName": "string",
    // -  "pickupPhoneNumber": "string",
    // -  "pickupAddress": "string",
    // -  "appUserId": "string",
    // -  "orderTotal": 0,
    // -  "status": "string",
    // -  "totalItems": 0,
    //-   "orderDetailsDTO": [{
    //-       "menuItemId": 0,
    //-       "itemName": "string",
    //-       "quantity": 0,
    //-       "price": 0 } ]
  };

  return (
    <div className="container ">
      <div className="card">
        <div className="card-header bg-gradient p-3 h2 text-info">
          Order Summary
        </div>

        {isLoading ? (
          <>
            {' '}
            <div className="card-body mb-5">
              <LoaderBig></LoaderBig>
            </div>
          </>
        ) : (
          <>
            <ShippingDetails userData={userData}></ShippingDetails>
            <div className="card-body">
              <CheckoutItems cartItem={selectedCartItems}></CheckoutItems>
            </div>
          </>
        )}
        <div className="card-footer">
          <div className="row">
            <div className="col-12 col-md-9 align-items-center d-flex">
              <p className="m-0 text-info" style={{ fontSize: '14px' }}>
                Estimate arrival time: {timeCalculation(now, 15 * 60 * 1000)}
              </p>
            </div>
            <div className="col-12 col-md-3">
              <button
                className="btn btn-primary form-control"
                onClick={handleNewOrder}
              >
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
