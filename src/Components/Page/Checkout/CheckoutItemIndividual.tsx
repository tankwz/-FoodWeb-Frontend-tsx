import React from 'react';
import { cartItemModel } from '../../../Interfaces';
interface Props {
  cartItem: cartItemModel;
}

function CheckoutItemIndividual(props: Props) {
  return (
    <div>
      {/* @for (var cart = Model.ListCarts.Count() - 1; cart >= 0; cart--) props*/}
      {
        <li className="list-group-item ">
          <div className="d-flex align-items-center row">
            <div className="col-8 col-md-6 col-lg-3 pe-0">
              <img
                className="border border-1 rounded border-secondary"
                src={props.cartItem.menuItem.image}
                style={{ width: '245px', height: '155px', objectFit: 'cover' }}
              ></img>
            </div>
            <div className="col-4 col-md-6 col-lg-9 ps-1">
              <div className="d-flex align-items-center">
                <h5 className="d-inline m-0">
                  {props.cartItem.menuItem!.name}
                </h5>
                <small className="align-self-end text-info">
                  &nbsp; ${props.cartItem.menuItem!.price}
                </small>
                <small className="align-self-end text-info">
                  &nbsp; x {props.cartItem.quantity}
                </small>
                <h6 className="d-inline ms-auto ">
                  $
                  {Number(
                    (
                      props.cartItem.quantity * props.cartItem.menuItem!.price
                    ).toFixed(2)
                  )}
                </h6>
              </div>
            </div>
          </div>
        </li>
      }
    </div>
  );
}

export default CheckoutItemIndividual;
