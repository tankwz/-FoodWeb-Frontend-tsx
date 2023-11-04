import React from 'react';
import { useParams } from 'react-router-dom';
import { useGetOrderByOrderIdQuery } from '../../api/orderApi';

function OrderDetails() {
  const { id } = useParams();
  const { isLoading, data, isError, error } = useGetOrderByOrderIdQuery(id);
  return (
    <div>
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
                      {' '}
                      &nbsp;@Model.orderHead.OrderDate.ToString("ddd, MMM dd,
                      yyyy, h:mmtt")
                    </span>
                  </div>
                  <div className="col-12">
                    <small className="" style={{ opacity: 0.7 }}>
                      {' '}
                      Order ID: @Model.orderHead.Id{' '}
                    </small>
                  </div>
                </div>
              </div>
              <div className="col-8">
                <div className="row d-flex">
                  <div className="col ms-auto">
                    <button className="btn btn-success form-control text-center py-2">
                      Approve
                    </button>
                  </div>
                  <div className="col">
                    <button className="btn btn-primary form-control text-center py-2">
                      Process
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
                  <div className="col">
                    <button className="btn btn-danger form-control text-center py-2">
                      Refund
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="card-body">
            <div className="row">
              <div className="col-4">
                <h5 className="text-info">
                  <i className="bi bi-person-circle"></i> Customer
                </h5>
                <span className="d-block">
                  <span className="fw-bold">Name:</span>
                  <span className="opacity-75"> @Model.orderHead.Name</span>
                </span>
                <span className="d-block">
                  <span className="fw-bold">E-mail:</span>
                  <span className="opacity-75">
                    {' '}
                    @Model.orderHead.AppUser.Email{' '}
                  </span>
                </span>
                <span className="d-block">
                  <span className="fw-bold">Phone Number:</span>
                  <span className="opacity-75">
                    {' '}
                    @Model.orderHead.PhoneNumber
                  </span>
                </span>
                <a
                  href="#"
                  className="btn btn-sm btn-link bg-secondary link-info text-decoration-none"
                >
                  View User Profile
                </a>
              </div>
              <div className="col-4">
                <h5 className="text-info">
                  <i className="bi bi-credit-card-fill"></i> Payment Info
                </h5>
                <span className="d-block">
                  <span className="fw-bold">Payment Status:</span>
                  <span className="opacity-75">
                    {' '}
                    @Model.orderHead.PaymentStatus
                  </span>
                </span>
                <span className="d-block">
                  <span className="fw-bold">Payment Date:</span>
                  <span className="opacity-75">
                    {/* @{
                                if (Model.orderHead.PaymentDate.Year > 2000)
                                {
                                    @Model.orderHead.PaymentDate
                                }
                                else
                                {
                                    <text>Not yet paid</text>
                                }
                            }*/}
                  </span>
                </span>
                <span className="d-block">
                  <span className="fw-bold">Payment DueDate:</span>
                  <span className="opacity-75">
                    {/* @{
                                                    
                                    if (@Model.orderHead.PaymentDueDate.Year > 2000)
                                {
                                    @Model.orderHead.PaymentDueDate
                                }
                                else
                                {
                                    <text>Only for Company user</text>
                                }
                            
                            } */}
                  </span>
                </span>
                <span className="d-block">
                  <span className="fw-bold">Total:</span>
                  <span className="opacity-75">
                    {' '}
                    @Model.orderHead.OrderTotal.ToString("c"){' '}
                  </span>
                </span>
              </div>
              <div className="col-4">
                <h5 className="text-info">
                  <i className="bi bi-truck"></i> Shipment Info
                </h5>
                <span className="d-block">
                  <span className="fw-bold">Carrier:</span>
                  <span className="opacity-75">
                    {' '}
                    @Model.orderHead.Carrier not yet implemented
                  </span>
                </span>
                <span className="d-block">
                  <span className="fw-bold">City:</span>
                  <span className="opacity-75">
                    {' '}
                    @Model.orderHead.AppUser.City @Model.orderHead.State{' '}
                  </span>
                </span>
                <span className="d-block">
                  <span className="fw-bold">Address:</span>
                  <span className="opacity-75">
                    {' '}
                    @Model.orderHead.StreetAddress{' '}
                  </span>
                </span>
                <span className="d-block">
                  <span className="fw-bold">Postal Code:</span>
                  <span className="opacity-75">
                    {' '}
                    @Model.orderHead.PostalCode
                  </span>
                </span>
              </div>
            </div>
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
                <div className="divider py-2 bg-success"></div>
              </div>
              <div className="col align-self-center ps-1 pe-0">
                <p>Shipped</p>
                <div className="divider py-2 bg-danger"></div>
              </div>
              <div className="col align-self-center ps-1 pe-2">
                <p>Refund</p>
                <div className="divider py-2 bg-secondary"></div>
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
                        <h6 className="m-0">Subtotal(To Be Implemented):</h6>
                        <span className="ms-auto mb-0">$123.00</span>
                      </div>
                      <div className="col-12 d-flex">
                        <h6 className="m-0">Tax(To Be Implemented):</h6>
                        <strong className="ms-auto mb-0">$123.00</strong>
                      </div>
                      <div className="col-12 d-flex">
                        <h6 className="m-0">Discount(To Be Implemented):</h6>
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
    </div>
  );
}

export default OrderDetails;
