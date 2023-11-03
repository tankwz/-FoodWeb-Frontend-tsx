import { toast, TypeOptions } from 'react-toastify';
import { SD } from '../Util/SD';
const toastPop = (message: string, type: TypeOptions = SD.TOAST_SUCCESS) => {
  toast.success(message, {
    position: 'top-right',
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: 'dark',
  });
};
export default toastPop;
