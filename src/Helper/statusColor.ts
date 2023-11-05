import { SD_Status } from '../Util/SD';

const statusColor = (status: SD_Status) => {
  switch (status) {
    case SD_Status.Status_Pending:
      return 'warning';
    case SD_Status.Status_Confirmed:
      return 'info';
    case SD_Status.Status_Ready:
      return 'primary';
    case SD_Status.Status_Completed:
      return 'success';
    case SD_Status.Status_Cancelled:
      return 'danger';
    default:
      return 'dark';
  }
};
export default statusColor;
