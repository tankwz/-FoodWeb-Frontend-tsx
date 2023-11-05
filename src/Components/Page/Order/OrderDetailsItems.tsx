import React from 'react';
import { cartItemModel, orderDetailModel } from '../../../Interfaces';
import { CheckoutItems } from '../Checkout';

interface Props {
  total: number;
  cartItem: cartItemModel[];
}

function OrderDetailsItems({ cartItem, total }: Props) {
  return (
    <div>
      <ul className="list-group">
        <CheckoutItems cartItem={cartItem}></CheckoutItems>

        <li className="list-group-item  bg-secondary text-">
          <div className="d-flex row">
            <div className="col-12 d-flex">
              <h6 className="m-0">Subtotal(To Be Implemented):</h6>
              <span className="ms-auto mb-0">$00.00</span>
            </div>
            <div className="col-12 d-flex">
              <h6 className="m-0">Tax(To Be Implemented):</h6>
              <strong className="ms-auto mb-0">$00.00</strong>
            </div>
            <div className="col-12 d-flex">
              <h6 className="m-0">Discount(To Be Implemented):</h6>
              <strong className="ms-auto mb-0 ">$00.00</strong>
            </div>
            <div className="col-12 d-flex">
              <h6 className="m-0 fw-bold">Total(USD):</h6>
              <strong className="ms-auto mb-0 fw-bold">
                ${total.toFixed(2)}
              </strong>
            </div>
          </div>
        </li>
      </ul>
    </div>
  );
}

export default OrderDetailsItems;
