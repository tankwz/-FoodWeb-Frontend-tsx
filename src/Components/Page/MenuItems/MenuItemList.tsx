import React, { useEffect, useState } from 'react';
import { menuItemModel } from '../../../Interfaces';
import MenuItemCard from './MenuItemCard';
import { useGetMenuItemsQuery } from '../../../api/menuItemApi';
import { useDispatch } from 'react-redux';
import { setMenuItem } from '../../../Storage/Redux/menuItemSlice';
function MenuItemList() {
  //  const [menuItem, setMenuItems] = useState<menuItemModel[]>([]);
  const { data, isLoading, isSuccess, isError, error } =
    useGetMenuItemsQuery(null);
  const dispatch = useDispatch();
  useEffect(() => {
    if (isSuccess) {
      dispatch(setMenuItem(data.result));
    } else {
      console.log(error);
    }
    // fetch('')
    //   .then((res) => res.json())
    //   .then((data) => {
    //     console.log(data);
    //     setMenuItems(data.result);
    //   });
  }, [isLoading]);
  return (
    <div>
      {isLoading ? (
        <div className="text-center mt-5">
          <span className="text-info h3">Loading... </span>
          <div className="spinner-border text-info" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : !isSuccess ? (
        <div>Error while fetching data...Check console for error details</div>
      ) : (
        <div className="row">
          {data.result.length > 0 &&
            data.result.map((menuItem: menuItemModel, index: number) => {
              return <MenuItemCard key={index} menuItem={menuItem} />;
            })}
        </div>
      )}
    </div>
  );
}

export default MenuItemList;
