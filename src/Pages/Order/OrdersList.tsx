import React, { useEffect, useState } from 'react';
import { auth } from '../../HOC';
import { UseSelector, useSelector } from 'react-redux/es/hooks/useSelector';
import { RootState } from '../../Storage/Redux/store';
import { useGetOrdersByUserIdQuery } from '../../api/orderApi';
import { LoaderBig } from '../../Components/Page/Utility';
import { orderHeaderModel } from '../../Interfaces';
import { OrderListItems } from '../../Components/Page/Order';
import OOPS from '../OOPS';
import { SD_Status } from '../../Util/SD';
import { inputHelper } from '../../Helper';

const filterOption = [
  'All',
  SD_Status.Status_Pending,
  SD_Status.Status_Confirmed,
  SD_Status.Status_Ready,
  SD_Status.Status_Completed,
  SD_Status.Status_Cancelled,
];
function OrdersList() {
  const userId = useSelector((state: RootState) => state.userStore.id);
  const [filters, setFilters] = useState({ searchData: '', status: '' });
  const [orderData, setOrderData] = useState([]);
  const { data, isLoading, isSuccess, isError, error } =
    useGetOrdersByUserIdQuery({
      ...(filters && {
        userId: userId,
        searchString: filters.searchData,
        status: filters.status,
      }),
    });

  useEffect(() => {
    if (data) {
      setOrderData(data.result);
    }
  }, [data]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const temp = inputHelper(e, filters);
    setFilters(temp);
  };

  return (
    <div>
      {isLoading ? (
        <LoaderBig></LoaderBig>
      ) : (
        <>
          <div className="row mt-4">
            <div className=" offset-1 col-4 d-flex align-item-center justify-content-between  ">
              <h1 className=""> Orders List</h1>
            </div>

            <div className=" offset-1 col-3">
              <input
                type="text"
                className="form-control bg-secondary mt-3 text-white"
                placeholder="Search by Name or Phone Number"
                onChange={(e) => {
                  handleChange(e);
                }}
                name="searchData"
              />
            </div>
            <div className="col-2">
              <select
                className="form-select  bg-secondary mt-3 text-white-50"
                onChange={(e) => {
                  handleChange(e);
                }}
                name="status"
              >
                {filterOption.map((item, index) => (
                  <option value={item === 'All' ? '' : item} key={index}>
                    {item}
                  </option>
                ))}
              </select>
            </div>
            {/* <div className="col-1 mt-3">
              <button
                className="btn btn-outline-info text-white "
                onClick={handleFilter}
              >
                Filter
              </button>
            </div> */}
          </div>
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
