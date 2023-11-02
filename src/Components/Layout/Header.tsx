import React from 'react';
import { NavLink } from 'react-router-dom';
import { cartItemModel } from '../../Interfaces';
import { useSelector } from 'react-redux';
import { RootState } from '../../Storage/Redux/store';
//need a logo
function Header() {
  const cartFromStore: cartItemModel[] = useSelector(
    (state: RootState) => state.shoppingCartStore.cartItems ?? []
  );

  return (
    <div>
      <nav
        className="ps-4 pb-0 navbar navbar-expand-sm navbar-toggleable-sm navbar-dark  border-bottom box-shadow mb-3 "
        style={{ backgroundColor: 'rgb(17, 110, 180)' }}
      >
        <NavLink className="navbar-brand mb-2" to="/">
          Food Web
        </NavLink>

        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse " id="navbarSupportedContent">
          <ul className="navbar-nav  w-100">
            <li className="nav-item ">
              <NavLink className="nav-link" to="/">
                Home
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink
                className="nav-link "
                style={{ fontSize: '20px' }}
                to="/ShoppingCart"
              >
                <i
                  className="bi bi-cart"
                  style={{
                    position: 'relative',
                    top: '-5px',
                  }}
                >
                  {cartFromStore?.length > 0 && (
                    <span
                      style={{
                        backgroundColor: 'orange',
                        color: 'white',
                        borderRadius: '50%',
                        padding: '1px 5px',
                        fontSize: '10px',
                        position: 'absolute',
                        top: '-5px',
                        right: '-7px',
                      }}
                    >
                      {cartFromStore.length}
                    </span>
                  )}
                </i>
              </NavLink>
            </li>

            <li className="nav-item dropdown ">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                id="navbarDropdown"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Admin Stuff
              </a>
              <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                <a className="dropdown-item" href="#">
                  Action
                </a>
                <a className="dropdown-item" href="#">
                  Another action
                </a>
                <div className="dropdown-divider"></div>
                <a className="dropdown-item" href="#">
                  Something else here
                </a>
              </div>
            </li>

            <div className="ms-auto d-flex ">
              <li className="nav-item ">
                <button
                  className="btn btn-success btn-outlined rounded-pill text-white  "
                  style={{ border: 'none', height: '40px', width: '100px' }}
                >
                  Logout
                </button>
              </li>
              <li className="nav-item">
                <NavLink
                  className=" nav-link text-white text-center "
                  style={{ border: 'none', height: '40px', width: '100px' }}
                  to={'/register'}
                >
                  Register
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  className="btn btn-success btn-outlined rounded-pill text-white ms-0 me-3"
                  style={{ border: 'none', height: '40px', width: '100px' }}
                  to={'/Login'}
                >
                  Login
                </NavLink>
              </li>
            </div>
          </ul>
          <div className="d-flex ms-auto"></div>
          {/* <form className="form-inline my-2 my-lg-0">
            <button
              className="btn btn-outline-success my-2 my-sm-0"
              type="submit"
            >
              Search
            </button>
          </form> */}
        </div>
      </nav>
    </div>
  );
}

export default Header;
