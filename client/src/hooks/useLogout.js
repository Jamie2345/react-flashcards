import axios from 'axios';
import useAuth from './useAuth';

const LOGOUT_URL = '/api/logout';

const useLogout = () => {
  const { setAuth } = useAuth();

  const logout = async () => {
    setAuth({});
    try {
      const response = await axios(LOGOUT_URL, {
        withCredentials: true
      });
    } catch (err) {
      console.error(err);
    }
  }

  return logout;
}

export default useLogout;