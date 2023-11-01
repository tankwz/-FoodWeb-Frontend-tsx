import React from 'react';

function CartItem() {
  return (
    <div>
      <input asp-for="@Model.ListCarts[z].Id" hidden></input>
      <input
        asp-for="@Model.ListCarts[z].selected"
        hidden
        type="checkbox"
        id="selected-@Model.ListCarts[z].Id"
      ></input>
      <div
        className="row py-2 clickable"
        id="div-@Model.ListCarts[z].Id"
        style="border:3px solid grey"
      >
        <div className=" py-2  col-12 col-lg-4  ps-1">
          <img
            className="  border border-1 border-secondary rounded"
            src="@Model.ListCarts[z].Product.ImageUrl"
            style="width:100%"
          ></img>
        </div>
        <div className="col-12 col-lg-8 ">
          <div className="row">
            <div className="col-12 ps-1">
              <H3 className="text-primary text-uppercase">
                {' '}
                @Model.ListCarts[z].Product.Title{' '}
              </H3>
              <p>
                {/* <small>
                                        @if (Model.ListCarts[z].Product.Description.Length > 475)
                                        {
                                            <span><p className="m-0 p-0 d-inline">@Html.Raw(Model.ListCarts[z].Product.Description.Substring(3,475))</span>

                                            <div id="extra-des-@Model.ListCarts[z].ProductId" style="display:none;">
                                            <span className=""  >
                                                @Html.Raw(Model.ListCarts[z].Product.Description.Substring(475))

                                            </span>
                                            </div>
                                            <button style="margin-top: -1rem" className="btn btn-link m-0 p-0" type="button" id="readmorebutton-@Model.ListCarts[z].ProductId" onclick="toggleDescription(@Model.ListCarts[z].ProductId)">Show More</button>

                                            // <a href="#" id="readmorelink-@cart.ProductId" onclick="return toggleDescription(@cart.ProductId)" >ShowMore</a>
                                            //<span>@Html.Raw(cart.Product.Description.Substring(0, 475))</span>
                                            // <span style="" id="more-@cart.Product.Id" style="display: none;">@Html.Raw(cart.Product.Description.Substring(475))</span>
                                            //<a href="#" id="readmorelink-@cart.ProductId" onclick="return toggleDescription(@cart.Product.Id)">Show More</a>

                                        }
                                        else
                                        {
                                            @Html.Raw(Model.ListCarts[z].Product.Description)
                                        }
                                    </small> */}
              </p>
            </div>
            <div className="col-12">
              <div className="row align-items-center">
                <div className="col-2 ms-2 p-0 ">
                  <div className="input-group">
                    <button
                      asp-area="customer"
                      asp-controller="ShoppingCart"
                      asp-route-cartid="@Model.ListCarts[z].Id"
                      asp-action="Less"
                      className="btn btn-secondary"
                    >
                      -
                    </button>
                    <input
                      asp-for="@Model.ListCarts[z].count"
                      disabled
                      type="number"
                      className="form-control text-center"
                    ></input>
                    <span id="Count-@Model.ListCarts[z].Id" hidden>
                      {' '}
                      @Model.ListCarts[z].count{' '}
                    </span>
                    <button
                      asp-action="More"
                      asp-route-cartid="@Model.ListCarts[z].Id"
                      className="btn btn-secondary"
                    >
                      +
                    </button>
                  </div>
                </div>
                <div className="col-3">
                  <div className="row">
                    <div className="col-12">
                      <span
                        id="BasePrice-@Model.ListCarts[z].Id"
                        className="text-decoration-line-through"
                      >
                        @Model.ListCarts[z].Product.ListPrice.ToString("c")
                      </span>
                      <span id="OrderPrice-@Model.ListCarts[z].Id">
                        @Model.ListCarts[z].price.ToString("c")
                      </span>
                    </div>
                    <div className="col-12">
                      <span>
                        Total:&nbsp;@Model.ListCarts[z].currentprice.ToString("c")
                      </span>
                    </div>
                  </div>
                </div>
                <div className="col-3 ms-2 p-0">
                  <button
                    type="button"
                    className="btn btn-lg btn-primary form-control"
                  >
                    Buy
                  </button>
                </div>
                <div className="col-3 ms-2 p-0">
                  <button
                    asp-area="Customer"
                    asp-controller="ShoppingCart"
                    asp-action="DeleteOne"
                    asp-route-cartid="@Model.ListCarts[z].Id"
                    className="btn btn-lg btn-danger form-control"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <hr />
    </div>
  );
}

export default CartItem;
