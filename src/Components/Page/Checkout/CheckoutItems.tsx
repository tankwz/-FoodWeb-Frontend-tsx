import React, { useEffect, useState } from 'react';
import CheckoutItemIndividual from './CheckoutItemIndividual';
import { cartItemModel } from '../../../Interfaces';

interface Props {
  cartItem: cartItemModel[];
}

function CheckoutItems(props: Props) {
  const [total, setTotal] = useState(0);
  useEffect(() => {
    let totalCal = props.cartItem.reduce((accumulator, cartItem) => {
      // if (!cartItem.selected) {
      // NEED TO BE CHANGE LATER
      return accumulator + cartItem.menuItem.price * cartItem.quantity;
      // } else {
      //   return accumulator;
      // }
    }, 0);
    setTotal(totalCal);
  });
  return (
    <div>
      <div className="row">
        <div className="col-12">
          <div className="row">
            <div className="col-12">
              <h5>Items:</h5>
            </div>
            <div>
              <ul className="list-group  ">
                <hr />

                {props.cartItem.map((item: cartItemModel, index: number) => (
                  <CheckoutItemIndividual
                    key={index}
                    cartItem={item}
                  ></CheckoutItemIndividual>
                ))}
                <li className="list-group-item  bg-secondary text-">
                  <div className="d-flex">
                    <h6 className="m-0">Total(USD):</h6>
                    <strong className="ms-auto mb-0">
                      ${Number(total.toFixed(2))}
                    </strong>
                  </div>
                </li>
              </ul>
              <ul className="list-group"></ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CheckoutItems;
