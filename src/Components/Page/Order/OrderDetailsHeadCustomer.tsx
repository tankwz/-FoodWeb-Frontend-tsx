import React, { useState } from 'react';
import { useUpdateOrderHeaderMutation } from '../../../api/orderApi';
import { SD, SD_Status } from '../../../Util/SD';
import { apiResponse } from '../../../Interfaces';
import { toastPop } from '../../../Helper';
import { LoaderSmall } from '../Utility';

function OrderDetailsHeadCustomer({ status, id }: any) {
  const [updateOrder] = useUpdateOrderHeaderMutation();
  const statusMapping: { [key: string]: number } = {
    Pending: 0,
    Confirmed: 1,
    Ready: 2,
    Completed: 3,
    Cancelled: 4,
  };
  const [isLoading, setIsLoading] = useState(!true);

  const handleUpdateStatus = async (status: string) => {
    setIsLoading(true);
    const response: apiResponse = await updateOrder({
      orderHeadId: id,
      status: status,
    });
    if (response.data?.isSuccess) {
      toastPop(`Successfully set order status to ${status}`, SD.TOAST_SUCCESS);
    } else {
      toastPop(
        `There were some errors while processing your request`,
        SD.TOAST_ERROR
      );
      console.log(response.data?.errorMessage);
    }

    setIsLoading(!true);
  };
  const statusValue = statusMapping[status] || 0;

  return (
    <>
      {isLoading ? (
        <div className="container">
          <div className="row">
            <div className="col-6"></div>
            <div className="col-4">
              <LoaderSmall></LoaderSmall>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <div className="row d-flex">
            <div className="col-4 ms-auto">
              <button
                className="btn btn-danger form-control text-center py-2"
                disabled={statusValue == 3 || statusValue == 4}
                onClick={() => handleUpdateStatus(SD_Status.Status_Cancelled)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default OrderDetailsHeadCustomer;
