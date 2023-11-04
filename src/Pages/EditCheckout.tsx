import React, { useState } from 'react';
import { inputHelper, toastPop } from '../Helper';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUserPick } from '../Storage/Redux/userAuthSlice';

function EditCheckout() {
  const location = useLocation();

  //console.log(location.state);
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
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleChangeInput = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(
      setUserPick({
        pickupName: userInput.name,
        phoneNumber: userInput.phoneNumber,
        email: userInput.email, //debt well, this one should be remove later since i changed the api to not let the user change email in the order
        address: userInput.address,
      })
    );
    toastPop('Successfully changed shipping details');
    navigate('/checkout');
  };
  return (
    <div>
      <div className="container">
        <form method="post" onSubmit={handleChangeInput}>
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
                            required
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
                            type="number"
                            required
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
                            type="email"
                            required
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
                            required
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
                  <button className="btn btn-primary form-control">Edit</button>
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
