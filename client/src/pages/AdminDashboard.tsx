import { useAuth } from "@/_core/hooks/useAuth";
import { useLocation } from "wouter";
import { useEffect } from "react";
import DashboardLayout from "@/components/DashboardLayout";

export default function AdminDashboard() {
  const { user, isAuthenticated, loading } = useAuth();
  const [, setLocation] = useLocation();

  useEffect(() => {
    if (!loading && (!isAuthenticated || user?.role !== "admin")) {
      setLocation("/");
    }
  }, [isAuthenticated, user, loading, setLocation]);

  if (loading) return <div>Loading...</div>;
  if (!isAuthenticated || user?.role !== "admin") return null;

  return (
    <DashboardLayout>
      <div className="p-6">
        <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
        <p className="text-muted-foreground">Welcome to the admin panel. Use the sidebar to manage content.</p>
      </div>
    </DashboardLayout>
  );
}
