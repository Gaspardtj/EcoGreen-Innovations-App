import React from "react";
import { useAuth } from "./context/AuthContext";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./components/auth/ProtectedRoute";

// Layout
import Layout from "./components/layout/Layout";

// Public Pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Impact from "./pages/Impact";
import About from "./pages/About";
import Donate from "./pages/Donate";

// Awareness
import Articles from "./pages/Articles";
import ArticleDetail from "./pages/ArticleDetail";

// Compost
import Compost from "./pages/Compost";
import CompostDetail from "./pages/CompostDetail";

// Agriculture & AI
import CropDetection from "./pages/CropDetection";

// Waste
import WasteRequests from "./pages/WasteRequests";
import WasteRequestForm from "./pages/WasteRequestForm";

// Volunteer / Collector
import Volunteer from "./pages/Volunteer";
import VolunteerTasks from "./pages/VolunteerTasks";

// Orders & Checkout
import OrderHistory from "./pages/OrderHistory";
import Checkout from "./pages/Checkout";

// Dashboards
import MemberDashboard from "./pages/MemberDashboard";
import VolunteerDashboard from "./pages/VolunteerDashboard";

// Admin
import AdminDashboard from "./pages/admin/AdminDashboard";

function App() {
  return (
    <Router>
      <Routes>

        {/* PUBLIC ROUTES */}
        <Route path="/" element={<Layout><Home /></Layout>} />
        <Route path="/about" element={<Layout><About /></Layout>} />
        <Route path="/impact" element={<Layout><Impact /></Layout>} />
        <Route path="/articles" element={<Layout><Articles /></Layout>} />
        <Route path="/articles/:id" element={<Layout><ArticleDetail /></Layout>} />
        <Route path="/donate" element={<Layout><Donate /></Layout>} />
        <Route path="/compost" element={<Layout><Compost /></Layout>} />
        <Route path="/compost/:id" element={<Layout><CompostDetail /></Layout>} />

        {/* AUTH */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* AGRICULTURE & AI */}
        <Route
          path="/crop-detection"
          element={
            <ProtectedRoute allowedRoles={["farmer", "admin"]}>
              <CropDetection />
            </ProtectedRoute>
          }
        />

        {/* WASTE REQUESTS */}
        <Route
          path="/waste-requests"
          element={
            <ProtectedRoute>
              <WasteRequests />
            </ProtectedRoute>
          }
        />
        <Route
          path="/waste-request/new"
          element={
            <ProtectedRoute>
              <WasteRequestForm />
            </ProtectedRoute>
          }
        />

        {/* VOLUNTEER / COLLECTOR */}
        <Route
          path="/volunteer"
          element={
            <ProtectedRoute>
              <Layout><Volunteer /></Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/volunteer/tasks"
          element={
            <ProtectedRoute>
              <Layout><VolunteerTasks /></Layout>
            </ProtectedRoute>
          }
        />

        {/* ORDERS & CHECKOUT */}
        <Route
          path="/orders"
          element={
            <ProtectedRoute>
              <Layout><OrderHistory /></Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/checkout"
          element={
            <ProtectedRoute>
              <Layout><Checkout /></Layout>
            </ProtectedRoute>
          }
        />

        {/* DASHBOARDS */}
        <Route
          path="/member/dashboard"
          element={
            <ProtectedRoute allowedRoles={["member"]}>
              <Layout><MemberDashboard /></Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/volunteer/dashboard"
          element={
            <ProtectedRoute allowedRoles={["volunteer", "collector"]}>
              <Layout><VolunteerDashboard /></Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        {/* DASHBOARD REDIRECT */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Layout>
                <DashboardRedirect />
              </Layout>
            </ProtectedRoute>
          }
        />

        {/* 404 */}
        <Route
          path="*"
          element={
            <Layout>
              <div className="min-h-[60vh] flex items-center justify-center">
                <div className="text-center">
                  <h1 className="text-6xl font-bold text-primary-600 mb-4">404</h1>
                  <p className="text-xl text-gray-600 mb-8">Page not found</p>
                  <a href="/" className="btn-primary">Go Home</a>
                </div>
              </div>
            </Layout>
          }
        />

      </Routes>
    </Router>
  );
}

// Dashboard Redirect
const DashboardRedirect = () => {
  const { userRole } = useAuth();

  if (userRole === "volunteer" || userRole === "collector") {
    return <Navigate to="/volunteer/dashboard" replace />;
  }

  if (userRole === "admin") {
    return <Navigate to="/admin/dashboard" replace />;
  }

  return <Navigate to="/member/dashboard" replace />;
};

export default App;
