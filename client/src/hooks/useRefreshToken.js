import axios from 'axios';
import useAuth from './useAuth';

const useRefreshToken = () => {
  const { setAuth } = useAuth();

  const refresh = async () => {
    console.log('refresh called')
    const response = await axios.get('/api/refresh', {
      withCredentials: true
    });
    setAuth(prev => {
      console.log(JSON.stringify(prev))
      console.log(response.data.accessToken)
      return { ...prev, username: response.data.username, accessToken: response.data.accessToken}
    })
    return response.data.accessToken
  }

  return refresh;
  
}

export default useRefreshToken