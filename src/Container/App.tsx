import React from 'react';
import { Footer, Header } from '../Components/Layout';
import { Home } from '../Pages';
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className=" ">
      <Header></Header>
      <div className="pb-5">
        <Routes>
          <Route path="/" element={<Home></Home>}></Route>
        </Routes>
      </div>
      <Footer></Footer>
    </div>
  );
}

export default App;
