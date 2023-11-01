import React from 'react';

function CartFooter() {
  return (
    <div>
      <div className="sticky-bottom  ">
        <div className="row">
          <div className="col-12 bg-secondary py-2    ">
            <div className="row bg-secondary border-1 ">
              <div className="col-2 form-check d-flex align-items-center check">
                <input
                  type="checkbox"
                  className="form-check-input ms-5 me-3 p-2"
                  id="SelectAll"
                ></input>
                <label for="SelectAll" className="form-check-label h5 m-0 pt-1">
                  Select All
                </label>
              </div>
              <div className="col-5 d-flex align-items-center pt-3">
                <h5 style="display:inline">Total Price:&nbsp;</h5>
                <h5
                  style="display:inline"
                  id="TotalBasePrice"
                  className="text-decoration-line-through"
                >
                  $0.00@* @Model.TotalBase.ToString("c") *@
                </h5>
                <h5 style="display:inline" id="TotalOrderPrice">
                  &nbsp;$0.00 @* @Model.OrderHead.OrderTotal.ToString("c") *@
                </h5>
              </div>
              <div className="col-3 ">
                <button
                  type="submit"
                  className=" btn btn-primary mt-2 form-control py-2 "
                >
                  <h4 className="m-0 p-0">Buy</h4>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartFooter;
