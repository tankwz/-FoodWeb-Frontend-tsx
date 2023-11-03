import { jwtDecode } from 'jwt-decode';

function tokenCheck() {
  const token = localStorage.getItem('token');

  if (token) {
    const { exp } = jwtDecode(token);
    const currentTimestamp = Date.now() / 1000;

    if (exp && typeof exp === 'number' && exp < currentTimestamp) {
      //  expired
      console.log('token expired, gonna remove.');
      localStorage.removeItem('token');
      return !true;
    } else {
      //  valid
      console.log('token still valid.');
      return true;
    }
  } else {
    // 404
    console.log('token 404.');
    return !true;
  }
}

export default tokenCheck;
