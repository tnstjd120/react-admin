import { useAuthStore } from "@/auth/useAuthStore";
import { FC, ReactElement } from "react";
import { Navigate, Route } from "react-router-dom";

interface IProtectedRoute {
  element: ReactElement;
}

export const ProtecedRoute: FC<IProtectedRoute> = ({ element, ...rest }) => {
  const isAuth = useAuthStore((state) => state.isAuth);

  return isAuth ? (
    <Route element={element} {...rest} />
  ) : (
    <Navigate to="/login" replace />
  );
};
