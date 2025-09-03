import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Button from "../../components/ui/Button";
import AdminSidebar from "./components/AdminSidebar";
import MetricsCard from "./components/MetricsCard";
import RecentActivity from "./components/RecentActivity";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [products] = useState(() => {
    const saved = localStorage.getItem("adminProducts");
    return saved
      ? JSON.parse(saved)
      : [
          {
            id: 1,
            name: "Luxury Watch",
            price: 2500,
            category: "Accessories",
            image: "/assets/images/no_image.png",
            description: "Premium luxury timepiece",
            createdAt: "2025-01-04",
          },
          {
            id: 2,
            name: "Designer Handbag",
            price: 1800,
            category: "Fashion",
            image: "/assets/images/no_image.png",
            description: "Elegant designer handbag",
            createdAt: "2025-01-03",
          },
        ];
  });

  useEffect(() => {
    const adminAuth = localStorage.getItem("adminAuthenticated");
    if (adminAuth !== "true") {
      navigate("/login"); // 🚀 redirect if not logged in
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("adminAuthenticated");
    navigate("/login");
  };

  const metrics = {
    totalProducts: products?.length || 0,
    categories: [...new Set(products?.map((p) => p?.category))]?.length,
    recentAdditions:
      products?.filter((p) => {
        const productDate = new Date(p?.createdAt);
        const weekAgo = new Date();
        weekAgo?.setDate(weekAgo?.getDate() - 7);
        return productDate >= weekAgo;
      })?.length || 0,
    totalValue: products?.reduce((sum, p) => sum + (p?.price || 0), 0) || 0,
  };

  const recentActivities =
    products?.slice(-5)?.map((product) => ({
      id: product?.id,
      action: "Product Added",
      item: product?.name,
      timestamp: product?.createdAt,
      type: "create",
    })) || [];

  return (
    <div className="min-h-screen bg-background">
      <div className="flex">
        <AdminSidebar onLogout={handleLogout} />

        <main className="flex-1 ml-64 p-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            {/* Header */}
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-3xl font-luxury text-gradient-gold">
                  Dashboard Overview
                </h1>
                <p className="text-muted-foreground mt-2">
                  Welcome back, manage your luxury store
                </p>
              </div>

              <Button
                onClick={() => navigate("/product-management")}
                iconName="Plus"
                className="shadow-luxury"
              >
                Add Product
              </Button>
            </div>

            {/* Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <MetricsCard
                title="Total Products"
                value={metrics?.totalProducts}
                icon="Package"
                trend="+12%"
                trendUp={true}
              />
              <MetricsCard
                title="Categories"
                value={metrics?.categories}
                icon="Grid3X3"
                trend="+5%"
                trendUp={true}
              />
              <MetricsCard
                title="Recent Additions"
                value={metrics?.recentAdditions}
                icon="TrendingUp"
                trend="+25%"
                trendUp={true}
              />
              <MetricsCard
                title="Total Value"
                value={`$${metrics?.totalValue?.toLocaleString()}`}
                icon="DollarSign"
                trend="+18%"
                trendUp={true}
              />
            </div>

            {/* Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <RecentActivity activities={recentActivities} />

              <div className="bg-card rounded-lg border border-border p-6">
                <h3 className="text-xl font-luxury text-foreground mb-4">
                  Quick Actions
                </h3>
                <div className="space-y-3">
                  <Button
                    onClick={() => navigate("/product-management")}
                    variant="outline"
                    fullWidth
                    iconName="Eye"
                    iconPosition="left"
                  >
                    View All Products
                  </Button>
                  <Button
                    onClick={() => navigate("/product-management")}
                    variant="outline"
                    fullWidth
                    iconName="Plus"
                    iconPosition="left"
                  >
                    Create New Product
                  </Button>
                  <Button
                    variant="outline"
                    fullWidth
                    iconName="BarChart3"
                    iconPosition="left"
                    disabled
                  >
                    Analytics (Coming Soon)
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
