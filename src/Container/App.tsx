import React from 'react';
import { Footer, Header } from '../Components/Layout';
import { Home, MenuItemDetails, NotFound } from '../Pages';
import { Routes, Route } from 'react-router-dom';

function App() {
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
        </Routes>
      </div>
      <Footer></Footer>
    </div>
  );
}

export default App;
