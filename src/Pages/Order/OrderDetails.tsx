import React from 'react';
import { useParams } from 'react-router-dom';
import { useGetOrderByOrderIdQuery } from '../../api/orderApi';
import { LoaderBig } from '../../Components/Page/Utility';
import {
  OrderDetailsCustomerInfo,
  OrderDetailsItems,
} from '../../Components/Page/Order';
import { timeCalculation } from '../../Util';
import { CheckoutItems } from '../../Components/Page/Checkout';
import { cartItemModel, orderDetailModel } from '../../Interfaces';

function OrderDetails() {
  const { id } = useParams();
  const { isLoading, data, isError, error } = useGetOrderByOrderIdQuery(id);
  let cartItem: cartItemModel[] = [];
  if (!isLoading && data?.result) {
    data.result.orderDetails.forEach((item: orderDetailModel) => {
      const tempOrderDetail: any = {};
      tempOrderDetail['id'] = item.orderHeadId;
      tempOrderDetail['menuItemId'] = item.menuItemId;
      tempOrderDetail['menuItem'] = item.menuItem;
      tempOrderDetail['quantity'] = item.quantity;
      tempOrderDetail['selected'] = true;
      cartItem.push(tempOrderDetail);
    });

    // cartItem = {
    //   id: data.result.orderDetails.orderHeadId,
    //   menuItemId: data.result.orderDetails.menuItemId,
    //   menuItem: data.result.orderDetails.menuItem,
    //   quantity: data.result.orderDetails.quantity,
    //   selected: true,
    // };

    // orderItem = {
    //   orderHeadId: data.result.orderHeadId,
    //   pickupName: data.result.pickupName,
    //   pickupPhoneNumber: data.result.pickupPhoneNumber,
    //   pickupAddress: data.result.pickupAddress,
    //   appUserId: data.result.appUserId,
    //   appUser: data.result.appUser,
    //   orderTotal: data.result.orderTotal,
    //   orderDate: data.result.orderDate,
    //   status: data.result.status,
    //   totalItems: data.result.totalItems,
    //   orderDetails: data.result.orderDetails,
    // };
  }

  return (
    <div>
      {isLoading ? (
        <LoaderBig></LoaderBig>
      ) : (
        <>
          {!isError && data.result && (
            <div className="container">
              <div className="card">
                <div className="card-header bg-gradient p-3 ">
                  <div className="row">
                    <div className="col-12">
                      <h3 className="mb-1 text-info">Order Details {id}</h3>
                    </div>
                    <div className="col-4">
                      <div className="row">
                        <div className="col-12 ">
                          <i className="bi bi-calendar"></i>{' '}
                          <span>
                            &nbsp;
                            {timeCalculation(new Date(data.result.orderDate!))}
                          </span>
                        </div>
                        <div className="col-12">
                          <small className="" style={{ opacity: 0.7 }}>
                            Order ID: {data.result.orderHeadId}
                          </small>
                        </div>
                      </div>
                    </div>
                    <div className="col-8">
                      <div className="row d-flex">
                        <div className="col ms-auto">
                          <button className="btn btn-success form-control text-center py-2">
                            Confirm
                          </button>
                        </div>
                        <div className="col">
                          <button className="btn btn-primary form-control text-center py-2">
                            Ready
                          </button>
                        </div>
                        <div className="col">
                          <button
                            className="btn btn-primary form-control text-center py-2"
                            disabled
                          >
                            Ship
                          </button>
                        </div>
                        <div className="col">
                          <button className="btn btn-danger form-control text-center py-2">
                            Cancel
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="card-body">
                  <OrderDetailsCustomerInfo
                    orderItem={data.result}
                  ></OrderDetailsCustomerInfo>
                  <div className="row"></div>
                  <div className="row mt-3">
                    <div className="col align-self-center ps-3 pe-0">
                      <p>Pending</p>
                      <div className="divider py-2 bg-success"></div>
                    </div>
                    <div className="col align-self-center ps-1 pe-0">
                      <p>Approved</p>
                      <div className="divider py-2 bg-success"></div>
                    </div>
                    <div className="col align-self-center ps-1 pe-0">
                      <p>Processing</p>
                      <div className="divider py-2 bg-secondary"></div>
                    </div>
                    <div className="col align-self-center ps-1 pe-0">
                      <p>Shipped</p>
                      <div className="divider py-2 bg-danger"></div>
                    </div>
                  </div>
                  <div className="row my-4">
                    <div className="col-12">
                      <OrderDetailsItems
                        cartItem={cartItem}
                        total={data.result.orderTotal}
                      ></OrderDetailsItems>
                      {/* <CheckoutItems cartItem={cartItem}></CheckoutItems> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default OrderDetails;
