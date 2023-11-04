import React, { useEffect } from 'react';
import { CartFooter, CartItem } from '../Components/Page/Cart';
import { useDispatch, useSelector } from 'react-redux';
import { cartItemModel, userModel } from '../Interfaces';
import { RootState } from '../Storage/Redux/store';
import { auth, authAdmin } from '../HOC';
import { emptyUser } from '../Storage/Redux/userAuthSlice';
import { useGetCartQuery } from '../api/shoppingCartApi';
import { setCart } from '../Storage/Redux/shoppingCartSlice';
import { Link } from 'react-router-dom';

function ShoppingCart() {
  const userData: userModel = useSelector((state: RootState) =>
    state.userStore.id ? state.userStore : emptyUser
  );
  // const { data, isLoading, isSuccess, isError, error } = useGetCartQuery(
  //   userData.id
  // );
  // const dispatch = useDispatch();
  // useEffect(() => {
  //   if (isSuccess) {
  //     dispatch(setCart(data.result?.cartItems));
  //     console.log(data);

  //     // console.log(data.result.cartItems);
  //   }
  // }, [data]);
  const cartFromStore: cartItemModel[] = useSelector(
    (state: RootState) => state.shoppingCartStore.cartItems ?? []
  );
  if (cartFromStore.length == 0) {
    return (
      <div className="container mt-5">
        <div className="d-flex align-items-center justify-content-center vh-50">
          <div className="text-center ">
            <h1 className="display-1 fw-bold"></h1>
            <p className="fs-3">
              <span className="text-info ">Oops!!</span> You don't have any item
              in cart yet.
            </p>
            <p className="lead"></p>
            <Link to={'/'} className="btn btn-primary">
              Let's get something to eat!
            </Link>
          </div>
        </div>
      </div>
    );
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

          <div className="sticky-bottom mb-5">
            <CartFooter></CartFooter>
          </div>
        </div>
      </div>
    </div>
  );
}

export default auth(ShoppingCart);
