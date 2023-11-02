import React, { useEffect } from 'react';
import { Footer, Header } from '../Components/Layout';
import { Home, MenuItemDetails, NotFound, ShoppingCart } from '../Pages';
import { Routes, Route } from 'react-router-dom';
import { useGetCartQuery } from '../api/shoppingCartApi';
import { useDispatch } from 'react-redux';
import { setCart } from '../Storage/Redux/shoppingCartSlice';

function App() {
  const { data, isLoading, isSuccess, isError, error } = useGetCartQuery(
    'ac131858-7e3c-47c6-8627-24bf078cb8b6'
  );
  const disPatch = useDispatch();
  useEffect(() => {
    if (isSuccess) {
      disPatch(setCart(data.result?.cartItems));
      //console.log(data);

      console.log(data.result.cartItems);
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
        </Routes>
      </div>
      <Footer></Footer>
    </div>
  );
}

export default App;
