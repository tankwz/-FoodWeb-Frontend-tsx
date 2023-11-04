import React from 'react';
import { auth } from '../../HOC';
import { UseSelector, useSelector } from 'react-redux/es/hooks/useSelector';
import { RootState } from '../../Storage/Redux/store';
import { useGetOrdersByUserIdQuery } from '../../api/orderApi';
import { LoaderBig } from '../../Components/Page/Utility';
import { orderHeader } from '../../Interfaces';

function OrdersList() {
  const userId = useSelector((state: RootState) => state.userStore.id);
  const { data, isLoading, isSuccess, isError, error } =
    useGetOrdersByUserIdQuery(userId);

  console.log(data);

  // useEffect(() => {
  //   if (isSuccess) {
  //     disPatch(setCart(data.result?.cartItems));
  //     // console.log(data);

  //     // console.log(data.result.cartItems);
  //   }
  // }, [data]);

  return (
    <div>
      {isLoading ? (
        <LoaderBig></LoaderBig>
      ) : (
        <>
          <div className="table p-5 table-dark  ">
            <h1 className="">Orders List</h1>
            <div className="p-2">
              <div className="row border">
                <div className="col-1">ID</div>
                <div className="col-3">Name</div>
                <div className="col-2">Phone</div>
                <div className="col-1">Total</div>
                <div className="col-1">Items</div>
                <div className="col-2">Date</div>
                <div className="col-2"></div>
              </div>
              {data.result.map((orderItem: orderHeader) => {
                return (
                  <div className="row border" key={orderItem.orderHeadId}>
                    <div className="col-1">{orderItem.orderHeadId}</div>
                    <div className="col-3">{orderItem.pickupName}</div>
                    <div className="col-2">{orderItem.pickupPhoneNumber}</div>
                    <div className="col-1">
                      $ {orderItem.orderTotal!.toFixed(2)}
                    </div>
                    <div className="col-1"># {orderItem.totalItems}</div>
                    <div className="col-2">
                      {new Date(orderItem.orderDate!).toLocaleDateString()}
                    </div>
                    <div className="col-2">
                      <button className="btn btn-success">Details</button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default auth(OrdersList);
