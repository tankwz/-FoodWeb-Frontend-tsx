import React, { useEffect } from 'react';
import { Footer, Header } from '../Components/Layout';
import {
  Home,
  Login,
  MenuItemDetails,
  NotFound,
  Register,
  ShoppingCart,
} from '../Pages';
import { Routes, Route } from 'react-router-dom';
import { useGetCartQuery } from '../api/shoppingCartApi';
import { useDispatch } from 'react-redux';
import { setCart } from '../Storage/Redux/shoppingCartSlice';
import { tokenCheck } from '../Util';
import { jwtDecode } from 'jwt-decode';
import { userModel } from '../Interfaces';
import { setUser } from '../Storage/Redux/userAuthSlice';

function App() {
  const { data, isLoading, isSuccess, isError, error } = useGetCartQuery(
    'ac131858-7e3c-47c6-8627-24bf078cb8b6'
  );
  const disPatch = useDispatch();

  //expire handle inside tokenCheck()
  useEffect(() => {
    const token = localStorage.getItem('token');

    if (tokenCheck()) {
      const { id, name, email, role, phoneNumber, address, exp }: userModel =
        jwtDecode(token!);
      disPatch(setUser({ id, name, email, role, phoneNumber, address, exp }));
    }
  }, []);

  useEffect(() => {
    if (isSuccess) {
      disPatch(setCart(data.result?.cartItems));
      //console.log(data);

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
          <Route path="/login" element={<Login></Login>}></Route>
          <Route path="/register" element={<Register></Register>}></Route>
        </Routes>
      </div>
      <Footer></Footer>
    </div>
  );
}

export default App;
