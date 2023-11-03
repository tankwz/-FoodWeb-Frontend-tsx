import { tokenCheck } from '../Util';

const auth = (WarppedComponent: any) => {
  return (props: any) => {
    if (!tokenCheck()) {
      window.location.replace('/login');
      return null;
    }
    return <WarppedComponent {...props}></WarppedComponent>;
  };
};
export default auth;
