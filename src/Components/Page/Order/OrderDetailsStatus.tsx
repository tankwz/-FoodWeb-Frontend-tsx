import React from 'react';

function OrderDetailsStatus({ status }: any) {
  // Status_Pending = 'Pending',
  // Status_Confirmed = 'Confirmed',
  // Status_Ready = 'Ready',
  // Status_Completed = 'Completed',
  // Status_Cancelled = 'Cancelled',
  const statusMapping: { [key: string]: number } = {
    Pending: 1,
    Confirmed: 2,
    Ready: 3,
    Completed: 4,
    Cancelled: 0,
  };

  const bgColor = statusMapping[status] || 0;

  return (
    <div className="row mt-3">
      <div className="col align-self-center ps-3 pe-0">
        <p>Pending</p>
        <div
          className={`divider py-2  ${
            bgColor >= 1
              ? 'bg-success'
              : bgColor === 0
              ? 'bg-danger'
              : 'bg-secondary'
          }`}
        ></div>
      </div>
      <div className="col align-self-center ps-1 pe-0">
        <p>Confirmed</p>
        <div
          className={`divider py-2  ${
            bgColor >= 2
              ? 'bg-success'
              : bgColor === 0
              ? 'bg-danger'
              : 'bg-secondary'
          }`}
        ></div>
      </div>
      <div className="col align-self-center ps-1 pe-0">
        <p>Ready</p>
        <div
          className={`divider py-2  ${
            bgColor >= 3
              ? 'bg-success'
              : bgColor === 0
              ? 'bg-danger'
              : 'bg-secondary'
          }`}
        ></div>
      </div>
      <div className="col align-self-center ps-1 pe-0">
        <p>Completed</p>
        <div
          className={`divider py-2  ${
            bgColor >= 4
              ? 'bg-success'
              : bgColor === 0
              ? 'bg-danger'
              : 'bg-secondary'
          }`}
        ></div>
      </div>
    </div>
  );
}

export default OrderDetailsStatus;
