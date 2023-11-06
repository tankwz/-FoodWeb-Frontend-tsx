import React from 'react';
import { orderHeaderModel } from '../../../Interfaces';
import OrderListProps from './orderListType';
import { LoaderBig } from '../Utility';
import { useNavigate } from 'react-router-dom';
import { timeCalculation } from '../../../Util';
import { statusColor } from '../../../Helper';

function OrderListItems({ isLoading, orderData }: OrderListProps) {
  const navigate = useNavigate();

  return isLoading ? (
    <LoaderBig></LoaderBig>
  ) : (
    <div>
      <div className="container mt-2   ">
        <div className="p-2">
          <div className=" align-middle ">
            <table
              id="tblData"
              className="table table-dark table-bordered table-striped table-hover align-middle "
              style={{ width: '100%' }}
            >
              <thead className="align-middle text-center  border  border-1 border-light   ">
                <tr className=" ">
                  <th className="">ID</th>
                  <th>Name</th>
                  <th>Phone</th>
                  <th>Total</th>
                  <th>Items</th>
                  <th>Date</th>
                  <th>Status</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {orderData.map((orderItem: orderHeaderModel) => {
                  return (
                    <tr key={orderItem.orderHeadId}>
                      <td>{orderItem.orderHeadId}</td>
                      <td>{orderItem.pickupName}</td>
                      <td>{orderItem.pickupPhoneNumber}</td>
                      <td>$ {orderItem.orderTotal!.toFixed(2)}</td>
                      <td>{orderItem.totalItems}</td>
                      <td>{timeCalculation(new Date(orderItem.orderDate!))}</td>
                      <td>
                        <span
                          className={`badge py-2 bg-${statusColor(
                            orderItem.status!
                          )} form-control text-white`}
                        >
                          {orderItem.status}
                        </span>
                      </td>
                      <td className="text-center">
                        <button
                          className="btn btn-info"
                          onClick={() =>
                            navigate(
                              '/order/orderDetails/' + orderItem.orderHeadId
                            )
                          }
                        >
                          Details
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          {/* <div className="row border">
            <div className="col-1">ID</div>
            <div className="col-3">Name</div>
            <div className="col-2">Phone</div>
            <div className="col-1">Total</div>
            <div className="col-1">Items</div>
            <div className="col-2">Date</div>
            <div className="col-2"></div>
          </div> */}
        </div>
      </div>
    </div>
  );
}

export default OrderListItems;
