import Layout from "@/components/base/Layout";
import { Navigate, Outlet } from "react-router-dom";

type Props = { isAuth: boolean };

export const ProtectedRoute = ({ isAuth }: Props) => {
  // const setUserInfo =

  // api.get("/api/users/personalInfo").then((response) => {});
  // TODO: accessToken 만료 검증 로직 구현 해야함.

  return isAuth ? (
    <Layout>
      <Outlet />
    </Layout>
  ) : (
    <Navigate to="/login" replace />
  );
};
