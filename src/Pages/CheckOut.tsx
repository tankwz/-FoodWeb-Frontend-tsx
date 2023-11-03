import React, { useEffect } from 'react';
import { auth } from '../HOC';
import { cartItemModel } from '../Interfaces';
import { useSelector } from 'react-redux';
import { RootState } from '../Storage/Redux/store';
import { useNavigate } from 'react-router-dom';
import { toastPop } from '../Helper';
import { SD } from '../Util/SD';

function CheckOut() {
  const cartFromStore: cartItemModel[] = useSelector(
    (state: RootState) => state.shoppingCartStore.cartItems ?? []
  );

  const navigate = useNavigate();
  const hasSelectedItem = () => {
    return cartFromStore.some((item) => item.selected);
  };

  useEffect(() => {
    if (!hasSelectedItem()) {
      toastPop("Error, can't find any selected item in cart", SD.TOAST_WARNING);
      navigate('/');
    }
  }, []);

  return (
    <div className="container ">
      <form method="post">
        <div className="card">
          <div className="card-header bg-gradient p-3 h2 text-info">
            Order Summary
          </div>

          <div className="card-header border-2 my-2 pt-0">
            <div className="col-12">
              <div className="row">
                <div className="col-12 mt-2 ">
                  <div className="col-12 ">
                    <h5>
                      <i className="bi bi-geo-alt-fill"></i> Shipping Details:{' '}
                    </h5>
                    <div className="d-flex">
                      <input asp-for="OrderHead.Name" hidden></input>
                      <input asp-for="OrderHead.City" hidden></input>
                      <input asp-for="OrderHead.StreetAddress" hidden></input>
                      <input asp-for="OrderHead.PhoneNumber" hidden></input>
                      <input asp-for="OrderHead.State" hidden></input>
                      <input asp-for="OrderHead.PostalCode" hidden></input>

                      <span className="h5 fw-bold">@Model.OrderHead.Name</span>

                      <span className="h5">
                        &nbsp;@Model.OrderHead.PhoneNumber
                      </span>
                      <span className="ms-auto">
                        @Model.OrderHead.StreetAddress , @Model.OrderHead.State
                        , @Model.OrderHead.City, @Model.OrderHead.PostalCode
                      </span>
                      <a
                        asp-area="customer"
                        asp-controller="ShoppingCart"
                        asp-action="ShippingDetails"
                        className="ps-2 m-0"
                      >
                        <h5 className="m-0">Change</h5>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="card-body">
            <div className="row">
              <div className="col-12">
                <div className="row">
                  <div className="col-12">
                    <h5>Items:</h5>
                  </div>
                  <div>
                    <ul className="list-group  ">
                      {/* </hr> */}
                      {/* @for (var cart = Model.ListCarts.Count() - 1; cart >= 0; cart--)
                            {

                                <li className="list-group-item ">
                                    <div className="d-flex align-items-center row">
                                        <input hidden asp-for="@Model.ListCarts[cart].Id"></input>
                                        @*
                                    <input hidden asp-for="@Model.ListCarts[cart].count"></input>
                                    <input hidden asp-for="@Model.ListCarts[cart].currentprice"></input>
                                    *@

                                        <div className="col-8 col-md-6 col-lg-2 pe-0">

                                            <img className="border border-1 rounded border-secondary" src="@Model.ListCarts[cart].Product.ImageUrl" style="width:95%"> </img>

                                        </div>
                                        <div className="col-4 col-md-6 col-lg-10 ps-1">
                                            <div className="d-flex align-items-center">
                                                <h5 className="d-inline m-0"> @Model.ListCarts[cart].Product.Title</h5>
                                                <small className="align-self-end text-info">&nbsp;  @Model.ListCarts[cart].price.ToString("c")</small>
                                                <small className="align-self-end text-info">&nbsp; x @Model.ListCarts[cart].count</small>
                                                <h6 className="d-inline ms-auto ">@Model.ListCarts[cart].currentprice.ToString("c")</h6>
                                            </div>
                                        </div>
                                    </div>

                                </li>
                            } */}

                      <li className="list-group-item  bg-secondary text-">
                        <div className="d-flex">
                          <h6 className="m-0">Total(USD):</h6>
                          <strong className="ms-auto mb-0">
                            @Model.OrderHead.OrderTotal.ToString("c")
                          </strong>
                        </div>
                      </li>
                    </ul>
                    <ul className="list-group"></ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="card-footer">
            <div className="row">
              <div className="col-12 col-md-9 align-items-center d-flex">
                <p className="m-0 text-info" style={{ fontSize: '14px' }}>
                  Estimate arrival time:
                  @DateTime.Now.AddDays(7).ToString("dd/MM/yyyy") -
                  @DateTime.Now.AddDays(14).ToString("dd/MM/yyyy")
                </p>
              </div>
              <div className="col-12 col-md-3">
                <button className="btn btn-primary form-control" type="submit">
                  Place Order
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default auth(CheckOut);
