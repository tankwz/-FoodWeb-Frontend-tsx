import React, { useState } from 'react';
import { SD_Roles } from '../Util/SD';
import { inputHelper } from '../Helper';
import { useRegisterUserMutation } from '../api/authApi';
import { apiResponse } from '../Interfaces';

function Register() {
  const [showPassword, changeShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [userInput, setUserInput] = useState({
    email: '',
    name: '',
    phoneNumber: '',
    address: '',
    role: '',
    password: '',
  });

  const [registerUser] = useRegisterUserMutation();

  const showpass = () => {
    changeShowPassword(!showPassword);
  };

  const handleUserInput = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const tempData = inputHelper(e, userInput);
    setUserInput(tempData);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const response: apiResponse = await registerUser(userInput);
    if (response.data) {
      console.log(response.data);
    } else if (response.error) {
      console.log(response.data);
    }

    setLoading(!true);
  };
  return (
    <div className="container">
      <div className="card shadow border-0 my-5">
        <div className="card-header text-center">
          <h2 className="mt-3 text-info">Register</h2>

          <hr />
        </div>
        <div className="card-body ">
          <div className="row ">
            <div className="col-12">
              <form method="post" onSubmit={handleSubmit}>
                <div className="mt-3 row">
                  {/* !!!IMPORTANT

          .form-floating > .form-select ~ label::after {
            position: absolute;
            inset: 1rem 0.375rem;
            z-index: -1;
            height: 1.5em;
            content: '';
background-color: #ff000000; Change the background color to transparent !!!!! NEED TO OVERWRITE IN BOOSTRAP 
            border-radius: var(--bs-border-radius); */}
                  <div className="form-floating mb-2 col-md-12 ">
                    <input
                      className="form-control  bg-secondary text-white  "
                      placeholder="name@example.com"
                      type="email"
                      name="email"
                      value={userInput.email}
                      onChange={handleUserInput}
                      required
                    />
                    <label className=" ps-4 ">Email</label>
                    <span className=""></span>
                  </div>
                  <div className="form-floating mb-2 col-md-6 ">
                    <input
                      className="form-control  bg-secondary text-white  "
                      placeholder="name@example.com"
                      required
                      name="name"
                      value={userInput.name}
                      onChange={handleUserInput}
                    />
                    <label className=" ps-4 ">Full Name</label>
                    <span className=""></span>
                  </div>{' '}
                  <div className="form-floating mb-2 col-md-6 ">
                    <input
                      className="form-control  bg-secondary text-white  "
                      placeholder="name@example.com"
                      type="number"
                      required
                      name="phoneNumber"
                      value={userInput.phoneNumber}
                      onChange={handleUserInput}
                    />
                    <label className=" ps-4 ">Phone Number</label>
                    <span className=""></span>
                  </div>
                  <div className="form-floating mb-2 col-md-6 ">
                    <input
                      className="form-control  bg-secondary text-white  "
                      placeholder="name@example.com"
                      type={showPassword ? 'text' : 'password'}
                      required
                      name="password"
                      value={userInput.password}
                      onChange={handleUserInput}
                    />
                    <label className=" ps-4 ">Password</label>

                    <span className=""></span>
                  </div>
                  <div className="form-floating mb-2 col-md-6 ">
                    <input
                      className="form-control  bg-secondary text-white  "
                      placeholder="name@example.com"
                      type={showPassword ? 'text' : 'password'}
                      required
                    />
                    <label className=" ps-4 ">Confirm Password</label>
                    <span className=""></span>
                  </div>
                  <div className="form-floating mb-2 col-md-6 ">
                    <input
                      className="form-control  bg-secondary text-white  "
                      placeholder="name@example.com"
                      required
                      name="address"
                      value={userInput.address}
                      onChange={handleUserInput}
                    />
                    <label className=" ps-4 ">Address</label>
                    <span className=""></span>
                  </div>
                  <div className="mb-2 mb-2 col-md-6 mt-3 ">
                    <input
                      id="checkboxpassword"
                      type="checkbox"
                      onChange={showpass}
                    ></input>
                    <label htmlFor="checkboxpassword">Show Password</label>
                  </div>
                  <div className="col-sm-6 offset-sm-3 col-xs-12 mt-4">
                    <select
                      className="form-control form-select bg-secondary text-white"
                      required
                      name="role"
                      value={userInput.role}
                      onChange={handleUserInput}
                    >
                      <option value="">
                        --Select Role(for testing purpose only)--
                      </option>
                      <option value={`${SD_Roles.CUSTOMER}`}>Customer</option>
                      <option value={`${SD_Roles.ADMIN}`}>Admin</option>
                    </select>
                  </div>
                </div>
                <div className="col-4 offset-4 mt-3">
                  <button
                    id="registerSubmit"
                    type="submit"
                    className="w-100 px-5 btn btn-lg btn-primary"
                  >
                    Register
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
