import { jwtDecode } from 'jwt-decode';
import { tokenCheck } from '../Util';
import { SD } from '../Util/SD';

const authAdmin = (WarppedComponent: any) => {
  return (props: any) => {
    if (!tokenCheck()) {
      window.location.replace('/login');
      return null;
    }
    const token = localStorage.getItem('token');
    const decode: {
      role: string;
    } = jwtDecode(token!);
    if (decode.role !== SD.ROLE_ADMIN) {
      window.location.replace('/accessdenied');
      return null;
    }

    return <WarppedComponent {...props}></WarppedComponent>;
  };
};
export default authAdmin;
