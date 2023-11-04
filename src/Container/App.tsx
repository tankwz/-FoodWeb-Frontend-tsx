import React, { useEffect } from 'react';
import { Footer, Header } from '../Components/Layout';
import {
  Home,
  Login,
  MenuItemDetails,
  NotFound,
  Register,
  ShoppingCart,
  AccessDenied,
  Checkout,
  EditCheckout,
  OrderDetails,
  OrdersList,
} from '../Pages';
import { Routes, Route } from 'react-router-dom';
import { useGetCartQuery } from '../api/shoppingCartApi';
import { useDispatch, useSelector } from 'react-redux';
import { setCart } from '../Storage/Redux/shoppingCartSlice';
import { tokenCheck } from '../Util';
import { jwtDecode } from 'jwt-decode';
import { userModel } from '../Interfaces';
import { emptyUser, setUser } from '../Storage/Redux/userAuthSlice';
import { RootState } from '../Storage/Redux/store';

function App() {
  const disPatch = useDispatch();

  const userData: userModel = useSelector((state: RootState) =>
    state.userStore.id ? state.userStore : emptyUser
  );
  //^ debt => this is bad, it trys to load the state even when there is no user, gotta figure to fix it later

  //expire handle inside tokenCheck()
  useEffect(() => {
    const token = localStorage.getItem('token');

    if (tokenCheck()) {
      const { id, name, email, role, phoneNumber, address, exp }: userModel =
        jwtDecode(token!);
      disPatch(setUser({ id, name, email, role, phoneNumber, address, exp }));
    }
  }, []);

  const { data, isLoading, isSuccess, isError, error } = useGetCartQuery(
    userData.id
  );
  useEffect(() => {
    if (isSuccess) {
      disPatch(setCart(data.result?.cartItems));
      // console.log(data);

      // console.log(data.result.cartItems);
    }
  }, [data]);
  return (
    <div className=" ">
      <Header></Header>
      <div className="pb-5">
        <Routes>
          <Route path="/" element={<Home></Home>}></Route>
          <Route path="*" element={<NotFound></NotFound>}></Route>
          <Route
            path="/MenuItemDetails/:menuItemId"
            element={<MenuItemDetails></MenuItemDetails>}
          ></Route>
          <Route
            path="/ShoppingCart"
            element={<ShoppingCart></ShoppingCart>}
          ></Route>
          <Route path="/Checkout" element={<Checkout></Checkout>}></Route>
          <Route
            path="/EditCheckout"
            element={<EditCheckout></EditCheckout>}
          ></Route>

          <Route path="/login" element={<Login></Login>}></Route>
          <Route path="/register" element={<Register></Register>}></Route>
          <Route
            path="/accessDenied"
            element={<AccessDenied></AccessDenied>}
          ></Route>
          <Route
            path="/Order/OrderDetails/:id?"
            element={<OrderDetails></OrderDetails>}
          ></Route>
          <Route
            path="/order/ordersList"
            element={<OrdersList></OrdersList>}
          ></Route>
        </Routes>
      </div>
      <Footer></Footer>
    </div>
  );
}

export default App;
