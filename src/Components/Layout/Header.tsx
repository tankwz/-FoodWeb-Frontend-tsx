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
        className="ps-4 navbar navbar-expand-sm navbar-toggleable-sm navbar-dark  border-bottom box-shadow mb-3 "
        style={{ backgroundColor: 'rgb(17, 110, 180)' }}
      >
        <NavLink className="navbar-brand" to="/">
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
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item ">
              <NavLink className="nav-link" to="/">
                Home
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink
                className="nav-link"
                style={{ fontSize: '20px' }}
                to="/ShoppingCart"
              >
                <i className="bi bi-cart" style={{ position: 'relative' }}>
                  {cartFromStore?.length > 0 && (
                    <span
                      style={{
                        backgroundColor: 'orange',
                        color: 'white',
                        borderRadius: '50%',
                        padding: '1px 5px',
                        fontSize: '9px',
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

            <li className="nav-item dropdown">
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
          </ul>
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
