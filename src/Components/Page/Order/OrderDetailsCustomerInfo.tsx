import React from 'react';
import { orderHeaderModel } from '../../../Interfaces';

interface Props {
  orderItem: orderHeaderModel;
}

function OrderDetailsCustomerInfo({ orderItem }: Props) {
  console.log(orderItem);

  return (
    <div className="row">
      <div className="col-12 ">
        <i className="bi bi-calendar"></i>{' '}
        <span>
          {' '}
          &nbsp;{new Date(orderItem.orderDate!).toLocaleDateString()}
        </span>
      </div>
      <div className="col-12">
        <small className="" style={{ opacity: 0.7 }}>
          {' '}
          Order ID: @Model.orderHead.Id{' '}
        </small>
      </div>
    </div>
  );
}

export default OrderDetailsCustomerInfo;
