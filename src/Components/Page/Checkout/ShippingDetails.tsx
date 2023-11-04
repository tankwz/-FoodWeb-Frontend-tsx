import React from 'react';
import { userModel } from '../../../Interfaces';
import { Link } from 'react-router-dom';
interface Props {
  userData: userModel;
}

function ShippingDetails(props: Props) {
  return (
    <div>
      <div className="card-header border-2 my-2 pt-0">
        <div className="col-12">
          <div className="row">
            <div className="col-12 mt-2 ">
              <div className="col-12 ">
                <h5>
                  <i className="bi bi-geo-alt-fill"></i> Shipping Details:{' '}
                </h5>
                <div className="d-flex">
                  {/* <input asp-for="OrderHead.Name" hidden></input>
                      <input asp-for="OrderHead.City" hidden></input>
                      <input asp-for="OrderHead.StreetAddress" hidden></input>
                      <input asp-for="OrderHead.PhoneNumber" hidden></input>
                      <input asp-for="OrderHead.State" hidden></input>
                      <input asp-for="OrderHead.PostalCode" hidden></input> */}

                  <span className="h5 fw-bold">{props.userData.name}</span>

                  <span className="h5">&nbsp;{props.userData.phoneNumber}</span>
                  <span className="ms-auto">
                    {props.userData.email}, {props.userData.address}{' '}
                  </span>
                  <Link
                    to={'/editcheckout'}
                    state={props.userData}
                    className="ps-2 m-0"
                  >
                    <h5 className="m-0">Change</h5>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShippingDetails;
