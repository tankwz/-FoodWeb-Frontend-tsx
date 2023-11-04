import React, { useState } from 'react';
import { inputHelper } from '../Helper';
import { useLocation } from 'react-router-dom';

function EditCheckout() {
  const location = useLocation();

  console.log(location.state);
  const [userInput, setUserInput] = useState({
    name: location.state.name,
    phoneNumber: location.state.phoneNumber,
    email: location.state.email,
    address: location.state.address,
  });
  const handleUserInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const Tempdata = inputHelper(e, userInput);
    setUserInput(Tempdata);
  };
  return (
    <div>
      <div className="container">
        <form method="post">
          <div className="card">
            <div className="card-header bg-gradient p-3 h2 text-info">
              Edit Pickup Details
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
                            className="col-form-label "
                            htmlFor="pickupName"
                          >
                            Pickup Name
                          </label>
                        </div>
                        <div className="col-8 d-flex align-items-center">
                          <input
                            //formco        asp-for="@Model.Name"
                            name="name"
                            onChange={handleUserInput}
                            id="pickupName"
                            value={userInput.name}
                            className="form-control py-1 bg-secondary text-white"
                          ></input>
                        </div>
                      </div>
                      <div className="form-group row">
                        <div className="col-3">
                          <label
                            className="col-form-label "
                            htmlFor="pickupPhoneNumber"
                          >
                            Pickup Phone Number
                          </label>
                        </div>
                        <div className="col-8 d-flex align-items-center">
                          <input
                            //formcontrol here  asp-for="@Model.PhoneNumber"
                            name="phoneNumber"
                            onChange={handleUserInput}
                            id="pickupPhoneNumber"
                            value={userInput.phoneNumber}
                            className="form-control py-1 bg-secondary text-white"
                          ></input>
                        </div>
                      </div>
                      <div className="form-group row">
                        <div className="col-3">
                          <label
                            htmlFor="pickupEmail"
                            className="col-form-label "
                          >
                            Pickup Email
                          </label>
                        </div>
                        <div className="col-8 d-flex align-items-center">
                          <input
                            name="email"
                            onChange={handleUserInput}
                            id="pickupEmail"
                            value={userInput.email}
                            className="form-control py-1 bg-secondary text-white"
                          ></input>
                          <span asp-validation-for="PostalCode"></span>
                        </div>
                      </div>
                      <div className="form-group row">
                        <div className="col-3">
                          <label
                            className="col-form-label "
                            htmlFor="pickupAddress"
                          >
                            Pickup Address
                          </label>
                        </div>
                        <div className="col-8 d-flex align-items-center">
                          <input
                            name="address"
                            value={userInput.address}
                            onChange={handleUserInput}
                            id="pickupAddress"
                            className="form-control py-1 bg-secondary text-white"
                          ></input>
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
                  <button
                    className="btn btn-primary form-control"
                    type="submit"
                  >
                    Edit
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditCheckout;
