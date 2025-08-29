import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import ShoppingCart from './pages/shopping-cart';
import ProductDetail from './pages/product-detail';
import ProductCatalog from './pages/product-catalog';
import CheckoutPage from './pages/checkout';
import Homepage from './pages/homepage';
import AdminDashboard from './pages/admin-dashboard';
import ProductManagement from './pages/product-management';
import ProductForm from './pages/product-form';
import LoginRegister from "pages/login-register";

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <ScrollToTop />
        <RouterRoutes>
          {/* Auth & Homepage */}
          <Route path="/login" element={<LoginRegister />} />
          <Route path="/" element={<Homepage />} />
          <Route path="/homepage" element={<Homepage />} />

          {/* Shopping & Checkout */}
          <Route path="/shopping-cart" element={<ShoppingCart />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/product-catalog" element={<ProductCatalog />} />

          {/* Product Detail - dynamic URL */}
          <Route path="/product-detail/:id/:slug" element={<ProductDetail />} />

          {/* Admin */}
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/product-management" element={<ProductManagement />} />
          <Route path="/product-form" element={<ProductForm />} />

          {/* Catch-all */}
          <Route path="*" element={<NotFound />} />
        </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
