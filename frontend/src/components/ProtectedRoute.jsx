import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({ admin = false }) {
  const { user, loading } = useAuth();
  if (loading) return <div className="container-page py-20 text-center text-brand-muted">Yuklanmoqda...</div>;
  if (!user) return <Navigate to="/login" replace />;
  if (admin && user.role !== "admin") return <Navigate to="/" replace />;
  return <Outlet />;
}
