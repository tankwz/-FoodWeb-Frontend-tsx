import React, { useEffect, useState } from 'react';
import { menuItemModel } from '../../../Interfaces';
import MenuItemCard from './MenuItemCard';
function MenuItemList() {
  const [menuItem, setMenuItems] = useState<menuItemModel[]>([]);
  useEffect(() => {
    fetch('https://localhost:7196/api/MenuItem')
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setMenuItems(data.result);
      });
  }, []);
  return (
    <div className="row">
      {menuItem.length > 0 &&
        menuItem.map((menuItem, index) => {
          return <MenuItemCard key={index} menuItem={menuItem} />;
        })}
    </div>
  );
}

export default MenuItemList;
