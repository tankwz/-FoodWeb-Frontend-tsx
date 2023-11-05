import React from 'react';
import { MenuItemList } from '../Components/Page/MenuItems';
import { Banner } from '../Components/Page/Utility';

function Home() {
  return (
    <div>
      <Banner></Banner>
      <div className="container p-2">
        <MenuItemList></MenuItemList>
      </div>
    </div>
  );
}

export default Home;
