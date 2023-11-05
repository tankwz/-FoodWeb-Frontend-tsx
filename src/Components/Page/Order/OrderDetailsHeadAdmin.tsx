import React from 'react';

function OrderDetailsHeadAdmin() {
  return (
    <div>
      {' '}
      <div className="row d-flex">
        <div className="col ms-auto">
          <button className="btn btn-success form-control text-center py-2">
            Confirm
          </button>
        </div>
        <div className="col">
          <button className="btn btn-primary form-control text-center py-2">
            Ready
          </button>
        </div>
        <div className="col">
          <button
            className="btn btn-primary form-control text-center py-2"
            disabled
          >
            Ship
          </button>
        </div>
        <div className="col">
          <button className="btn btn-danger form-control text-center py-2">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default OrderDetailsHeadAdmin;
