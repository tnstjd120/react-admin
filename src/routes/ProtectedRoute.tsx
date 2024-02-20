import { API_PATH } from "@/api/API_PATH";
import { api } from "@/api/axios";
import { checkAuth } from "@/auth/checkAuth";
import Layout from "@/components/common/Layout";
import Loading from "@/components/common/Loading";
import { useRoleState } from "@/store/useRoleStore";
import { useUserState } from "@/store/useUserStore";
import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";

export const ProtectedRoute = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const { user, setUserInfo } = useUserState((state) => state);
  const { roles, setRoles } = useRoleState((state) => state);

  const getRoles = async () => {
    const { PATH, METHOD } = API_PATH.USERS.ROLES_GET;
    return await api(PATH, METHOD);
  };

  useEffect(() => {
    const authenticated = async () => {
      const authResponse = await checkAuth();

      const { isAuth, userInfo } = authResponse;

      setIsAuthenticated(isAuth);

      if (userInfo) setUserInfo({ ...user, ...userInfo });
    };

    if (!roles) {
      const getRolesInfo = async () => {
        const response = await getRoles();
        setRoles(response.data.roleLists);
      };
      getRolesInfo();
    }

    authenticated();
  }, []);

  if (isAuthenticated === null) return <Loading />;

  return isAuthenticated ? (
    <Layout>
      <Outlet />
    </Layout>
  ) : (
    <Navigate to="/login" replace />
  );
};
