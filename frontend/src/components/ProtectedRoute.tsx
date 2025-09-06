import { useAppSelector } from "@/hooks/reduxHooks";
import type { ReactNode } from "react";
import { Navigate } from "react-router";
import { toast } from "sonner";

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const { isAuthenticated, isLoading } = useAppSelector((state) => state.auth);

  if (isLoading) {
    return
  }

  if (!isAuthenticated) {
    // toast.error("Not authenticated")
    return <Navigate to="/auth/login" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
