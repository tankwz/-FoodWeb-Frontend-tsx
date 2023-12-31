import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { cartItemModel, userModel } from '../../Interfaces';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../Storage/Redux/store';
import { emptyUser, setUser } from '../../Storage/Redux/userAuthSlice';
import { SD } from '../../Util/SD';
let logo = require('../../Assets/img/iconnobg.ico');
//import logo from './logo.svg';
//need a logo
function Header() {
  const cartFromStore: cartItemModel[] = useSelector(
    (state: RootState) => state.shoppingCartStore.cartItems ?? []
  );

  const nagivate = useNavigate();
  const dispatch = useDispatch();
  const userData: userModel = useSelector(
    (state: RootState) => state.userStore
  );
  const handleLogout = () => {
    // localStorage.clear();
    localStorage.removeItem('token');
    localStorage.removeItem('selectedItems');

    dispatch(setUser({ ...emptyUser }));
    nagivate('/');
  };

  return (
    <div>
      <nav
        className="ps-2  pb-0 navbar navbar-expand-sm navbar-toggleable-sm navbar-dark  border-bottom box-shadow mb-0 "
        style={{ backgroundColor: 'rgb(17, 110, 180)' }}
      >
        <NavLink className="navbar-brand text-center " to="/">
          <img src={logo} style={{ width: '40px' }} className="  mb-1 me-1" />
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
                  {userData.id ? (
                    <>
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
                    </>
                  ) : (
                    <></>
                  )}
                </i>
              </NavLink>
            </li>
            {userData.role == SD.ROLE_ADMIN ? (
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  id="navbarDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Admin Stuff
                </a>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <li>
                    <NavLink
                      className="dropdown-item"
                      to={'/order/OrdersListAdmin'}
                    >
                      All Orders
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      className="dropdown-item"
                      to={'/MenuItemsAdmin/MenuItemList'}
                    >
                      Items List
                    </NavLink>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      User Management (not yet implemented)
                    </a>
                  </li>
                </ul>
              </li>
            ) : (
              <div></div>
            )}
            <div className="ms-auto d-flex ">
              {userData.id ? (
                <>
                  {userData.role == SD.ROLE_CUSTOMER ? (
                    <li className="nav-item">
                      <NavLink
                        className="btn       text-white border-0 "
                        to={'/order/ordersList'}
                      >
                        Orders
                      </NavLink>
                    </li>
                  ) : (
                    <div></div>
                  )}
                  <li className="nav-item">
                    <NavLink
                      className="btn btn-link  text-white border-0 "
                      to={'/'}
                    >
                      Hi {userData.name} !
                    </NavLink>
                  </li>
                  <li className="nav-item ">
                    <button
                      className="btn btn-success btn-outlined rounded-pill text-white  "
                      style={{ border: 'none', height: '40px', width: '100px' }}
                      onClick={handleLogout}
                    >
                      Logout
                    </button>
                  </li>
                </>
              ) : (
                <>
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
                </>
              )}
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
