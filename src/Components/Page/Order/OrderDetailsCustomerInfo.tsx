import React from 'react';
import { orderHeaderModel } from '../../../Interfaces';
import { timeCalculation } from '../../../Util';
import { SD_Status } from '../../../Util/SD';

interface Props {
  orderItem: orderHeaderModel;
}

function OrderDetailsCustomerInfo({ orderItem }: Props) {
  console.log(orderItem);

  return (
    <>
      <div className="row">
        <div className="col-4">
          <h5 className="text-info">
            <i className="bi bi-person-circle"></i> Customer
          </h5>
          <span className="d-block">
            <span className="fw-bold">Pickup Name:</span>
            <span className="opacity-75"> {orderItem.pickupName}</span>
          </span>
          <span className="d-block">
            <span className="fw-bold">E-mail:</span>
            <span className="opacity-75"> {orderItem.appUser.email} </span>
          </span>
          <span className="d-block">
            <span className="fw-bold">Pickup Phone Number:</span>
            <span className="opacity-75">{orderItem.pickupPhoneNumber}</span>
          </span>
          <a
            href="#"
            className="btn btn-sm btn-link bg-secondary link-info text-decoration-none"
          >
            View User Profile
          </a>
          <small>(not yet implemented)</small>
        </div>
        <div className="col-4">
          <h5 className="text-info">
            <i className="bi bi-credit-card-fill"></i> Payment Info
          </h5>
          <span className="d-block">
            <span className="fw-bold">Payment Status: {}</span>
            <span className="opacity-75">{SD_Status.Status_Pending}</span>
          </span>
          <span className="d-block">
            <span className="fw-bold">Payment Date: </span>
            <span className="opacity-75">
              {/* @{
                        if (Model.orderHead.PaymentDate.Year > 2000)
                        {
                            @Model.orderHead.PaymentDate
                        }
                        else
                        {
                            <text>Not yet paid</text>
                        }
                    }*/}
            </span>
          </span>

          <span className="d-block">
            <span className="fw-bold">Total:</span>
            <span className="opacity-75">
              {' '}
              ${orderItem.orderTotal?.toFixed(2)}
            </span>
          </span>
        </div>
        <div className="col-4">
          <h5 className="text-info">
            <i className="bi bi-truck"></i> Shipment Info
          </h5>
          <span className="d-block">
            <span className="fw-bold">Carrier:</span>
            <span className="opacity-75"></span>
          </span>
          <span className="d-block">
            <span className="fw-bold">Address:</span>
            <span className="opacity-75"> {orderItem.pickupAddress} </span>
          </span>
          <span className="d-block">
            <span className="fw-bold">Time of delivery(est.): </span>
            <span className="opacity-75">
              {/* this is dummy data */}
              {timeCalculation(new Date(orderItem.orderDate!), 5 * 60 * 1000)}
            </span>
          </span>
          <span className="d-block">
            <span className="fw-bold">Time of arrival(est.): </span>
            {timeCalculation(new Date(orderItem.orderDate!), 15 * 60 * 1000)}
            <span className="opacity-75"></span>
          </span>
        </div>
      </div>
    </>
  );
}

export default OrderDetailsCustomerInfo;
