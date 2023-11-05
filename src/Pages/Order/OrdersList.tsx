import React from 'react';
import { auth } from '../../HOC';
import { UseSelector, useSelector } from 'react-redux/es/hooks/useSelector';
import { RootState } from '../../Storage/Redux/store';
import { useGetOrdersByUserIdQuery } from '../../api/orderApi';
import { LoaderBig } from '../../Components/Page/Utility';
import { orderHeaderModel } from '../../Interfaces';
import { OrderListItems } from '../../Components/Page/Order';
import OOPS from '../OOPS';

function OrdersList() {
  const userId = useSelector((state: RootState) => state.userStore.id);
  const { data, isLoading, isSuccess, isError, error } =
    useGetOrdersByUserIdQuery(userId);

  // useEffect(() => {
  //   if (isSuccess) {
  //     disPatch(setCart(data.result?.cartItems));
  //     // console.log(data);

  //     // console.log(data.result.cartItems);
  //   }
  // }, [data]);
  // if (!isLoading) {
  //   console.log(data.result.length < 1);
  // }
  if (!isLoading && data.result.length < 1) {
    return (
      <div className="container mt-5">
        <OOPS
          message="You don't have any order yet"
          backmessage="Let's get order something"
        ></OOPS>
      </div>
    );
  }
  return (
    <div>
      {isLoading ? (
        <LoaderBig></LoaderBig>
      ) : (
        <>
          <OrderListItems
            isLoading={isLoading}
            orderData={data.result}
          ></OrderListItems>
        </>
      )}
    </div>
  );
}

export default auth(OrdersList);
