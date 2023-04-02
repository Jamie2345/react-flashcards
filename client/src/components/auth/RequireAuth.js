import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { useEffect, useRef, useState } from "react";
import useRefreshToken from "../../hooks/useRefreshToken";

const RequireAuth = () => {
  const { auth, setAuth } = useAuth();
  const location = useLocation();
  const isRefreshingRef = useRef(false);
  const refresh = useRefreshToken();

  const [ err, setErr ] = useState(false);
  
  useEffect(() => {
    const refreshAccessToken = async () => {
      if (isRefreshingRef.current) {
        return; // already refreshing, exit early
      }
      isRefreshingRef.current = true;

      try {
        await refresh();
        setErr(false);
      }
      catch (err) {
        setErr(true);
      } 
    };

    if (!auth?.accessToken) {
      refreshAccessToken();
    }
  }, [auth, setAuth, err]);

  if (!auth?.accessToken && err) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return <Outlet />;
};

export default RequireAuth;
