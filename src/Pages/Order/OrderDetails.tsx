import React from 'react';
import { useParams } from 'react-router-dom';
import { useGetOrderByOrderIdQuery } from '../../api/orderApi';
import { LoaderBig } from '../../Components/Page/Utility';
import { OrderDetailsCustomerInfo } from '../../Components/Page/Order';
import { timeCalculation } from '../../Util';

function OrderDetails() {
  const { id } = useParams();
  const { isLoading, data, isError, error } = useGetOrderByOrderIdQuery(id);
  let orderItem;
  if (!isLoading && data?.result) {
    // orderItem = {
    //   orderHeadId: data.result.orderHeadId,
    //   pickupName: data.result.pickupName,
    //   pickupPhoneNumber: data.result.pickupPhoneNumber,
    //   pickupAddress: data.result.pickupAddress,
    //   appUserId: data.result.appUserId,
    //   appUser: data.result.appUser,
    //   orderTotal: data.result.orderTotal,
    //   orderDate: data.result.orderDate,
    //   status: data.result.status,
    //   totalItems: data.result.totalItems,
    //   orderDetails: data.result.orderDetails,
    // };
    //console.log(data.result);
  }

  return (
    <div>
      {isLoading ? (
        <LoaderBig></LoaderBig>
      ) : (
        <>
          {!isError && data.result && (
            <div className="container">
              <div className="card">
                <div className="card-header bg-gradient p-3 ">
                  <div className="row">
                    <div className="col-12">
                      <h3 className="mb-1 text-info">Order Details {id}</h3>
                    </div>
                    <div className="col-4">
                      <div className="row">
                        <div className="col-12 ">
                          <i className="bi bi-calendar"></i>{' '}
                          <span>
                            &nbsp;
                            {timeCalculation(new Date(data.result.orderDate!))}
                          </span>
                        </div>
                        <div className="col-12">
                          <small className="" style={{ opacity: 0.7 }}>
                            Order ID: {data.result.orderHeadId}
                          </small>
                        </div>
                      </div>
                    </div>
                    <div className="col-8">
                      <div className="row d-flex">
                        <div className="col ms-auto">
                          <button className="btn btn-success form-control text-center py-2">
                            Confirm
                          </button>
                        </div>
                        <div className="col">
                          <button className="btn btn-primary form-control text-center py-2">
                            Ready
                          </button>
                        </div>
                        <div className="col">
                          <button
                            className="btn btn-primary form-control text-center py-2"
                            disabled
                          >
                            Ship
                          </button>
                        </div>
                        <div className="col">
                          <button className="btn btn-danger form-control text-center py-2">
                            Cancel
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="card-body">
                  <OrderDetailsCustomerInfo
                    orderItem={data.result}
                  ></OrderDetailsCustomerInfo>
                  <div className="row"></div>
                  <div className="row mt-3">
                    <div className="col align-self-center ps-3 pe-0">
                      <p>Pending</p>
                      <div className="divider py-2 bg-success"></div>
                    </div>
                    <div className="col align-self-center ps-1 pe-0">
                      <p>Approved</p>
                      <div className="divider py-2 bg-success"></div>
                    </div>
                    <div className="col align-self-center ps-1 pe-0">
                      <p>Processing</p>
                      <div className="divider py-2 bg-secondary"></div>
                    </div>
                    <div className="col align-self-center ps-1 pe-0">
                      <p>Shipped</p>
                      <div className="divider py-2 bg-danger"></div>
                    </div>
                  </div>
                  <div className="row my-4">
                    <div className="col-12">
                      <ul className="list-group">
                        @foreach (var detail in reversedOrderDetail)
                        {
                          <li className="list-group-item">
                            <div className="d-flex align-items-center row">
                              <div className="col-8 col-md-6 col-lg-2 pe-0">
                                <img
                                  className="border border-1 rounded border-secondary"
                                  src="@detail.Product.ImageUrl"
                                  style={{ width: '95%' }}
                                ></img>
                              </div>

                              <div className="col-4 col-md-6 col-lg-10 ps-1">
                                <div className="d-flex align-items-center">
                                  <h5 className="d-inline m-0">
                                    {' '}
                                    @detail.Product.Title
                                  </h5>
                                  <small className="align-self-end text-info">
                                    &nbsp; @detail.Price.ToString("c")
                                  </small>
                                  <small className="align-self-end text-info">
                                    &nbsp; x @detail.Count
                                  </small>
                                  <h6 className="d-inline ms-auto">
                                    {/* @string.Format("{0:C}", detail.Count * detail.Price) a */}
                                  </h6>
                                </div>
                              </div>
                            </div>
                          </li>
                        }
                        <li className="list-group-item  bg-secondary text-">
                          <div className="d-flex row">
                            <div className="col-12 d-flex">
                              <h6 className="m-0">
                                Subtotal(To Be Implemented):
                              </h6>
                              <span className="ms-auto mb-0">$123.00</span>
                            </div>
                            <div className="col-12 d-flex">
                              <h6 className="m-0">Tax(To Be Implemented):</h6>
                              <strong className="ms-auto mb-0">$123.00</strong>
                            </div>
                            <div className="col-12 d-flex">
                              <h6 className="m-0">
                                Discount(To Be Implemented):
                              </h6>
                              <strong className="ms-auto mb-0 ">$123.00</strong>
                            </div>
                            <div className="col-12 d-flex">
                              <h6 className="m-0 fw-bold">Total(USD):</h6>
                              <strong className="ms-auto mb-0 fw-bold">
                                @Model.orderHead.OrderTotal.ToString("c")
                              </strong>
                            </div>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default OrderDetails;
