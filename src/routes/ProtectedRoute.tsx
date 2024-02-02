import { checkAuth } from "@/auth/checkAuth";
import Layout from "@/components/common/Layout";
import { useUserState } from "@/store/useUserState";
import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";

export const ProtectedRoute = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const { user, setUserInfo } = useUserState((state) => state);

  useEffect(() => {
    const authenticated = async () => {
      const authResponse = await checkAuth();

      const { isAuth, userInfo } = authResponse;
      console.log("ProtectedRoute authResponse => ", authResponse);
      console.log("ProtectedRoute isAuthenticated => ", isAuthenticated);
      setIsAuthenticated(isAuth);
      if (userInfo) {
        console.log("isAuth => ", isAuth);
        setUserInfo({ ...user, ...userInfo });
      }
    };

    authenticated();
  }, []);

  if (isAuthenticated === null) {
    return <div>Loading...</div>;
  }

  return isAuthenticated ? (
    <Layout>
      <Outlet />
    </Layout>
  ) : (
    <Navigate to="/login" replace />
  );
};
