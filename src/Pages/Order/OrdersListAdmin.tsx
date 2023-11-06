import React, { useState, useEffect } from 'react';
import { auth, authAdmin } from '../../HOC';
import { UseSelector, useSelector } from 'react-redux/es/hooks/useSelector';
import { RootState } from '../../Storage/Redux/store';
import { useGetOrdersByUserIdQuery } from '../../api/orderApi';
import { LoaderBig } from '../../Components/Page/Utility';
import { orderHeaderModel } from '../../Interfaces';
import { OrderListItems } from '../../Components/Page/Order';
import OOPS from '../OOPS';
import { inputHelper } from '../../Helper';
import { SD_Status } from '../../Util/SD';
const filterOption = [
  'All',
  SD_Status.Status_Pending,
  SD_Status.Status_Confirmed,
  SD_Status.Status_Ready,
  SD_Status.Status_Completed,
  SD_Status.Status_Cancelled,
];
function OrdersListAdmin() {
  const [totalRecords, setTotalRecords] = useState(0);
  const [page, setPage] = useState({
    pageNumber: 1,
    pageSize: 10,
  });

  //const userId = useSelector((state: RootState) => state.userStore.id);
  const [filters, setFilters] = useState({ searchData: '', status: '' });
  const [orderData, setOrderData] = useState([]);
  const [currentPageSize, setCurrentPageSize] = useState(page.pageSize);
  const { data, isLoading, isSuccess, isError, error } =
    useGetOrdersByUserIdQuery({
      ...(filters && {
        searchString: filters.searchData,
        status: filters.status,
        page: page.pageNumber,
        size: page.pageSize,
      }),
    });

  // const handleFilter = () => {
  //   const temp = data.result.filter((orderData: orderHeaderModel) => {
  //     if (
  //       (orderData.pickupName &&
  //         orderData.pickupName
  //           .toLowerCase()
  //           .includes(filters.searchData.toLowerCase())) ||
  //       (orderData.pickupPhoneNumber &&
  //         orderData.pickupPhoneNumber.includes(filters.searchData))
  //     ) {
  //       return orderData;
  //     }
  //   });
  //   const result = temp.filter((orderData: orderHeaderModel) =>
  //     filters.status !== '' ? orderData.status === filters.status : orderData
  //   );
  //   setOrderData(result);
  // };

  useEffect(() => {
    if (data) {
      setOrderData(data.apiReponse.result);
      const { ForTotal } = JSON.parse(data.totalRecords);
      const a = JSON.parse(data.totalRecords);

      console.log(a);

      setTotalRecords(ForTotal);
    }
  }, [data]);

  const getPageDetails = () => {
    const dataStartNumber = (page.pageNumber - 1) * page.pageSize + 1;
    const dataEndNumber = page.pageNumber * page.pageSize;

    return `${dataStartNumber} - ${
      dataEndNumber < totalRecords ? dataEndNumber : totalRecords
    } of ${totalRecords}`;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const temp = inputHelper(e, filters);
    setFilters(temp);
  };

  const handleChangePage = (direction: string) => {
    if (direction === '-1') {
      setPage({ pageSize: 10, pageNumber: page.pageNumber - 1 });
    } else if (direction === '+1') {
      setPage({ pageSize: 10, pageNumber: page.pageNumber + 1 });
    }
  };
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

  return (
    <div>
      {isLoading ? (
        <LoaderBig></LoaderBig>
      ) : (
        <>
          {' '}
          <div className="row mt-4">
            <div className=" offset-1 col-4 d-flex align-item-center justify-content-between  ">
              <h1 className="">Admin Orders List </h1>
            </div>

            <div className="offset-1 col-3">
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
            orderData={orderData}
          ></OrderListItems>
          <div className="d-flex mx-5 justify-content-end align-content-between ">
            <button
              className="btn btn-outline-info px-3 mx-2"
              disabled={page.pageNumber === 1}
              onClick={() => handleChangePage('-1')}
            >
              <i className="bi bi-chevron-left"></i>
            </button>
            <div className="mx-2">{getPageDetails()}</div>
            <button
              className="btn  btn-outline-info px-3 mx-2"
              disabled={page.pageNumber * page.pageSize >= totalRecords}
              onClick={() => handleChangePage('+1')}
            >
              <i className="bi bi-chevron-right"></i>
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default authAdmin(OrdersListAdmin);
