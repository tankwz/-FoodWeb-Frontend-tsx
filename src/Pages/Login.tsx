import React, { useState } from 'react';
import { inputHelper } from '../Helper';
import { useLoginUserMutation } from '../api/authApi';
import { apiResponse, userModel } from '../Interfaces';
import { jwtDecode } from 'jwt-decode';
import { useDispatch } from 'react-redux';
import { setUser } from '../Storage/Redux/userAuthSlice';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [loading, setLoading] = useState(false);
  const naviage = useNavigate();
  const [userInput, setUserInput] = useState({
    email: '',
    password: '',
  });
  const handleUserInput = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const tempData = inputHelper(e, userInput);
    setUserInput(tempData);
  };
  const [loginUser] = useLoginUserMutation();
  const dispatch = useDispatch();
  const handleSubmit = async (e: React.FormEvent<HTMLElement>) => {
    e.preventDefault();
    setLoading(true);
    const response: apiResponse = await loginUser(userInput);
    if (response.data) {
      console.log(response);
      const { token } = response.data.result;
      localStorage.setItem('token', token);

      const { id, name, email, role, phoneNumber, address, exp }: userModel =
        jwtDecode(token);

      //reminder to handle expire token

      dispatch(setUser({ id, name, email, role, phoneNumber, address }));
      naviage('/');
    } else if (response.error) {
      console.log(response);
    }
    setLoading(!true);
  };

  return (
    <div className="container">
      <div className="card shadow border-0 my-5">
        <div className="card-header text-center">
          <h2 className="mt-3 text-info">Login</h2>

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
                  <div className="form-floating mb-2  col-md-10 offset-1  ">
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

                  <div className="form-floating mb-2 col-md-10 offset-1 ">
                    <input
                      className="form-control  bg-secondary text-white  "
                      placeholder="name@example.com"
                      name="password"
                      value={userInput.password}
                      onChange={handleUserInput}
                      type="password"
                      required
                    />
                    <label className=" ps-4 ">Password</label>

                    <span className=""></span>
                  </div>
                </div>

                <div className="col-4 offset-4 mt-3">
                  <button
                    id="registerSubmit"
                    type="submit"
                    className="w-100 px-5 btn btn-lg btn-primary"
                  >
                    Login
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

export default Login;
