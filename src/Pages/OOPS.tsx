import React from 'react';
import { Link } from 'react-router-dom';

interface Props {
  message: string;
  backmessage: string;
}

function OOPS({ message, backmessage }: Props) {
  return (
    <div className="container mt-5">
      <div className="d-flex align-items-center justify-content-center vh-50">
        <div className="text-center ">
          <h1 className="display-1 fw-bold"></h1>
          <p className="fs-3">
            <span className="text-info ">Oops!!</span> {message}
          </p>
          <p className="lead"></p>
          <Link to={'/'} className="btn btn-primary">
            {backmessage}
          </Link>
        </div>
      </div>
    </div>
  );
}

export default OOPS!;
