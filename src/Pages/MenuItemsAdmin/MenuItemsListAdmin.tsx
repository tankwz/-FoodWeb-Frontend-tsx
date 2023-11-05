import React from 'react';
import { auth, authAdmin } from '../../HOC';
import { UseSelector, useSelector } from 'react-redux/es/hooks/useSelector';
import { RootState } from '../../Storage/Redux/store';
import { useGetOrdersByUserIdQuery } from '../../api/orderApi';
import { LoaderBig } from '../../Components/Page/Utility';
import { orderHeaderModel } from '../../Interfaces';
import { OrderListItems } from '../../Components/Page/Order';
import OOPS from '../OOPS';
import { useGetMenuItemsQuery } from '../../api/menuItemApi';
import { MenuListTable } from '../../Components/Page/MenuItemsAdmin';

function MenuItemsListAdmin() {
  const userId = useSelector((state: RootState) => state.userStore.id);
  const { data, isLoading, isSuccess, isError, error } =
    useGetMenuItemsQuery(null);

  if (!isLoading) {
    console.log(data);
  }
  if (!isLoading && data.result.length < 1) {
    return (
      <div className="container mt-5">
        <OOPS message="You don't have item yet" backmessage="Go back"></OOPS>
      </div>
    );
  }
  return (
    <div>
      {isLoading ? (
        <LoaderBig></LoaderBig>
      ) : (
        <>
          <MenuListTable menuItems={data.result}></MenuListTable>
        </>
      )}
    </div>
  );
}

export default authAdmin(MenuItemsListAdmin);
