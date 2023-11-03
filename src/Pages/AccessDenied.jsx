import React from 'react';
import { Link } from 'react-router-dom';

function AccessDenied() {
  return (
    <div>
      <div className="d-flex align-items-center justify-content-center vh-50">
        <div className="text-center">
          <h1 className="display-1 fw-bold">403</h1>
          <p className="fs-3">
            <span className="text-danger">Opps!</span> Access Denied.
          </p>
          <p className="lead">
            Looks like you don't have the required permission for this page.
            Please try logging in again with an admin account.
          </p>
          <Link to={'/'} className="btn btn-primary">
            Go Home
          </Link>
        </div>
      </div>
      );
    </div>
  );
}

export default AccessDenied;
