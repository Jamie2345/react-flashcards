import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import axios from "axios";
import { useEffect, useRef } from "react";

const RequireAuth = () => {
  const { auth, setAuth } = useAuth();
  const location = useLocation();
  const isRefreshingRef = useRef(false);
  
  useEffect(() => {
    const refreshAccessToken = async () => {
      if (isRefreshingRef.current) {
        return; // already refreshing, exit early
      }
      isRefreshingRef.current = true;
      try {
        const response = await axios.get("/api/refresh");
        console.log(`persit ${JSON.stringify(response.data)}`);
        await setAuth(response.data);
        console.log(`Auth set ${JSON.stringify(auth)}`)
      } catch (error) {
        console.error(error);
      } finally {
        isRefreshingRef.current = false;
      }
    };

    if (!auth?.accessToken) {
      refreshAccessToken();
    }
  }, [auth, setAuth]);

  if (!auth?.accessToken && !isRefreshingRef) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <Outlet />;
};

export default RequireAuth;
