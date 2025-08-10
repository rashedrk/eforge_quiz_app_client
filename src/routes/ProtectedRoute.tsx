import { Navigate, useLocation } from "react-router-dom";
import { logout, useCurrentToken } from "@/redux/features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import type { ReactNode } from "react";

type TProtectedRoute = {
  children: ReactNode;
};

const ProtectedRoute = ({ children }: TProtectedRoute) => {
  const token = useAppSelector(useCurrentToken);
  const dispatch = useAppDispatch();
  const location = useLocation();

  if (!token) {
    dispatch(logout());
    return (
      <Navigate to="/login" replace state={{ from: location.pathname + location.search }}/>
    );
  }

  return children;
};

export default ProtectedRoute;
