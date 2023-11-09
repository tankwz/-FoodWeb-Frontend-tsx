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
  //
  const [totalRecords, setTotalRecords] = useState(0);
  const [page, setPage] = useState({
    pageNumber: 1,
    pageSize: 10,
  });
  const [currentPageSize, setCurrentPageSize] = useState(page.pageSize);
  //
  const userId = useSelector((state: RootState) => state.userStore.id);
  const [filters, setFilters] = useState({ searchData: '', status: '' });
  const [orderData, setOrderData] = useState([]);
  const { data, isLoading, isSuccess, isError, error } =
    useGetOrdersByUserIdQuery({
      ...(filters && {
        userId: userId,
        searchString: filters.searchData,
        status: filters.status,
        page: page.pageNumber,
        size: page.pageSize,
      }),
    });

  useEffect(() => {
    if (data) {
      setOrderData(data.apiReponse.result);
      const { ForTotal } = JSON.parse(data.totalRecords);
      const a = JSON.parse(data.totalRecords);

      setTotalRecords(ForTotal);
    }
  }, [data]);

  const getPageDetails = () => {
    const dataStartNumber = (page.pageNumber - 1) * page.pageSize + 1;

    const dataEndNumber = page.pageNumber * page.pageSize;

    console.log(totalRecords);

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

  const handleChangePage = (direction: string, pageSize: number) => {
    if (direction === '-1') {
      setPage({ pageSize: pageSize, pageNumber: page.pageNumber - 1 });
    } else if (direction === '+1') {
      setPage({ pageSize: pageSize, pageNumber: page.pageNumber + 1 });
    } else if (direction === 'change') {
      setPage({
        pageSize: pageSize ? pageSize : 10,
        pageNumber: 1,
      });
    }
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
            orderData={orderData}
          ></OrderListItems>
          <div
            className="d-flex mx-5 justify-content-end text-center align-items-center pe-4 "
            style={{ height: '50px' }}
          >
            <div className=" me-3">Rows per page:</div>
            <div className="me-5">
              <select
                name=""
                className="   form-select bg-secondary text-white  text-white"
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                  handleChangePage('change', Number(e.target.value));
                  setCurrentPageSize(Number(e.target.value));
                }}
                value={currentPageSize}
                id=""
              >
                <option>10</option>
                <option>15</option>
                <option>20</option>
                <option>25</option>
                <option>30</option>
              </select>
            </div>

            <button
              className="btn btn-outline-info px-3 mx-2"
              disabled={page.pageNumber === 1}
              onClick={() => handleChangePage('-1', currentPageSize)}
            >
              <i className="bi bi-chevron-left"></i>
            </button>
            <div className="mx-2">{getPageDetails()}</div>
            <button
              className="btn  btn-outline-info px-3 ms-2 me-5"
              disabled={page.pageNumber * page.pageSize >= totalRecords}
              onClick={() => handleChangePage('+1', currentPageSize)}
            >
              <i className="bi bi-chevron-right"></i>
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default auth(OrdersList);
