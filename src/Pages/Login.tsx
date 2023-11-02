import React from 'react';

function Login() {
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
              <form method="post">
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
                      required
                    />
                    <label className=" ps-4 ">Email</label>
                    <span className=""></span>
                  </div>

                  <div className="form-floating mb-2 col-md-10 offset-1 ">
                    <input
                      className="form-control  bg-secondary text-white  "
                      placeholder="name@example.com"
                      type={'password'}
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
