import React from 'react';
import { menuItemModel } from '../../../Interfaces';
import { Link } from 'react-router-dom';

interface Props {
  menuItem: menuItemModel;
}

function MenuItemCard(props: Props) {
  return (
    <div className="col-sm-6 col-lg-4 col-xxl-3">
      <div className="row p-2">
        <div className="col-12 p-1">
          <div className="card shadow border-5 rounded p-2">
            <div className="row">
              <div className="col-12">
                <Link to={`/MenuItemDetails/${props.menuItem.id}`}>
                  <img
                    src={`https://via.placeholder.com/150`} //{props.menuItem.image}
                    className="card-img-top mt-2"
                    style={{ height: '200px', objectFit: 'cover' }}
                  ></img>
                </Link>
              </div>
            </div>
            <div className="card-body pb-0">
              <div>
                <p className="card-title text-center bg-secondary border border-info rounded-1 text-uppercase py-1 ">
                  {props.menuItem.name}
                </p>
                <div className="row text-center">
                  <div className="col">
                    <h4
                      className="badge bg-light  "
                      style={{ display: 'inline', fontSize: '1em' }}
                    >
                      {props.menuItem.category}
                    </h4>
                  </div>
                </div>
              </div>

              {props.menuItem.specialTag &&
                props.menuItem.specialTag.length > 0 && (
                  <i
                    className="bi bi-star btn btn-success"
                    style={{
                      position: 'absolute',
                      top: '5px',
                      left: '5px',
                      padding: '0px 5px',
                      borderRadius: '3px',
                      //        outline: 'none !important',
                      //    cursor: 'pointer',
                    }}
                  >
                    &nbsp; {props.menuItem.specialTag}
                  </i>
                )}
              <i
                className="bi bi-cart-plus-fill btn btn-info"
                style={{
                  position: 'absolute',
                  top: '5px',
                  right: '5px',
                  padding: '0px 5px',
                  borderRadius: '3px',
                  outline: 'none !important',
                  cursor: 'pointer',
                }}
              ></i>

              <div className="text-center pt-1 pb-0 mb-0">
                <p className="p-0 m-0 opacity-75 ">
                  <span className="">${props.menuItem.price}</span>
                </p>
              </div>
            </div>
            <p className="card-text text-center ">
              {props.menuItem.description.length > 110
                ? props.menuItem.description.substring(
                    0,
                    props.menuItem.description.lastIndexOf(' ', 110)
                  ) + '...'
                : props.menuItem.description}
            </p>
            <div>
              <Link
                className="btn btn-secondary form-control bg-gradient"
                to={`/MenuItemDetails/${props.menuItem.id}`}
              >
                Detail
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MenuItemCard;
