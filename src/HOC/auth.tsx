import { toastPop } from '../Helper';
import { tokenCheck } from '../Util';
import { SD } from '../Util/SD';

const auth = (WarppedComponent: any) => {
  return (props: any) => {
    if (!tokenCheck()) {
      window.location.replace('/login');
      //  toastPop('Please login', SD.TOAST_DEFAULT);
      return null;
    }
    //^ debt => this is bad, toast doesnt work i need to redirect it to the real page after login somehow, gotta figure to fix it later
    return <WarppedComponent {...props}></WarppedComponent>;
  };
};
export default auth;
