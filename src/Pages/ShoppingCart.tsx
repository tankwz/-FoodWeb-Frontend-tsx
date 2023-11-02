import React from 'react';
import { CartFooter, CartItem } from '../Components/Page/Cart';
import { useSelector } from 'react-redux';
import { cartItemModel } from '../Interfaces';
import { RootState } from '../Storage/Redux/store';

function ShoppingCart() {
  const cartFromStore: cartItemModel[] = useSelector(
    (state: RootState) => state.shoppingCartStore.cartItems ?? []
  );
  if (!cartFromStore) {
    return <div>Empty</div>;
  }
  return (
    <div className="container">
      <div className="card border-1 shadow">
        <div className="card-header bg-gradient ms-0 py-4">
          <div className="row">
            <div className="col">
              <h5 className="pt-2">Shopping Cart</h5>
            </div>
          </div>
        </div>
        <div className="card-body py-0">
          {cartFromStore.map((item: cartItemModel, index: number) => (
            <CartItem key={index} cartItem={item}></CartItem>
          ))}

          <div className="sticky-bottom ">
            <CartFooter></CartFooter>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShoppingCart;
