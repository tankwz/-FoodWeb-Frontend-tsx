import React, { useEffect, useState } from 'react';
import { menuItemModel } from '../../../Interfaces';
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
  return <div>MenuItemList</div>;
}

export default MenuItemList;
