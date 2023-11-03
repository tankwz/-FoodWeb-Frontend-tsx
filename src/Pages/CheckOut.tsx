import React from 'react';

function CheckOut() {
  return (
    <div>
      <form method="post">
        <div className="card">
          <div className="card-header bg-gradient p-3 h2 text-info">
            Edit Shipping Details
          </div>
          <div className="card-body">
            <div className="row">
              <div className="col-12">
                <div className="row">
                  <div className="col-12 mt-2">
                    <div className="col-12">
                      <h5>Shipping Details:</h5>
                    </div>
                    <div className="form-group row">
                      <div className="col-3">
                        <label
                          asp-for="@Model.Name"
                          className="col-form-label "
                        ></label>
                      </div>
                      <div className="col-8 d-flex align-items-center">
                        <input
                          asp-for="@Model.Name"
                          className="form-control py-1 bg-secondary text-white"
                        ></input>
                        <span asp-validation-for="Name"></span>
                      </div>
                    </div>
                    <div className="form-group row">
                      <div className="col-3">
                        <label
                          asp-for="@Model.PhoneNumber"
                          className="col-form-label "
                        >
                          Phone
                        </label>
                      </div>
                      <div className="col-8 d-flex align-items-center">
                        <input
                          asp-for="@Model.PhoneNumber"
                          className="form-control py-1 bg-secondary text-white"
                        ></input>
                        <span asp-validation-for="PhoneNumber"></span>
                      </div>
                    </div>
                    <div className="form-group row">
                      <div className="col-3">
                        <label
                          asp-for="@Model.StreetAddress"
                          className="col-form-label "
                        ></label>
                      </div>
                      <div className="col-8 d-flex align-items-center">
                        <input
                          asp-for="@Model.StreetAddress"
                          className="form-control py-1 bg-secondary text-white"
                        ></input>
                        <span asp-validation-for="StreetAddress"></span>
                      </div>
                    </div>
                    <div className="form-group row">
                      <div className="col-3">
                        <label
                          asp-for="@Model.City"
                          className="col-form-label "
                        ></label>
                      </div>
                      <div className="col-8 d-flex align-items-center">
                        <input
                          asp-for="@Model.City"
                          className="form-control py-1 bg-secondary text-white"
                        ></input>
                        <span asp-validation-for="City"></span>
                      </div>
                    </div>
                    <div className="form-group row">
                      <div className="col-3">
                        <label
                          asp-for="@Model.State"
                          className="col-form-label "
                        ></label>
                      </div>
                      <div className="col-8 d-flex align-items-center">
                        <input
                          asp-for="@Model.State"
                          className="form-control py-1 bg-secondary text-white"
                        ></input>
                        <span asp-validation-for="State"></span>
                      </div>
                    </div>
                    <div className="form-group row">
                      <div className="col-3">
                        <label
                          asp-for="@Model.PostalCode"
                          className="col-form-label "
                        >
                          Postal Code
                        </label>
                      </div>
                      <div className="col-8 d-flex align-items-center">
                        <input
                          asp-for="@Model.PostalCode"
                          className="form-control py-1 bg-secondary text-white"
                        ></input>
                        <span asp-validation-for="PostalCode"></span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="card-footer">
            <div className="row">
              <div className="col-12 col-md-9 align-items-center d-flex">
                <p className="m-0 text-info" style={{ fontSize: '14px' }}></p>
              </div>
              <div className="col-12 col-md-3">
                <button className="btn btn-primary form-control" type="submit">
                  Edit
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default CheckOut;
