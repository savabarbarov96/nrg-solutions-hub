import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AdminAuthProvider } from "@/contexts/AdminAuthContext";
import { ProtectedRoute } from "@/components/admin/ProtectedRoute";
import Index from "./pages/Index";
import Services from "./pages/Services";
import SolarForHome from "./pages/SolarForHome";
import SolarForBusiness from "./pages/SolarForBusiness";
import Pricing from "./pages/Pricing";
import Projects from "./pages/Projects";
import ProjectDetails from "./pages/ProjectDetails";
import Promos from "./pages/Promos";
import FAQ from "./pages/FAQ";
import About from "./pages/About";
import Contacts from "./pages/Contacts";
import NotFound from "./pages/NotFound";
import Login from "./pages/admin/Login";
import Dashboard from "./pages/admin/Dashboard";
import ProjectsList from "./pages/admin/ProjectsList";
import ProjectNew from "./pages/admin/ProjectNew";
import ProjectEdit from "./pages/admin/ProjectEdit";
import PricingManagement from "./pages/admin/PricingManagement";
import SupabaseTest from "./pages/admin/SupabaseTest";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AdminAuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Index />} />
            <Route path="/услуги" element={<Services />} />
            <Route path="/фотоволтаици-за-дома" element={<SolarForHome />} />
            <Route path="/фотоволтаици-за-бизнес" element={<SolarForBusiness />} />
            <Route path="/цени" element={<Pricing />} />
            <Route path="/проекти" element={<Projects />} />
            <Route path="/проекти/:slug" element={<ProjectDetails />} />
            <Route path="/промоции" element={<Promos />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/за-нас" element={<About />} />
            <Route path="/контакти" element={<Contacts />} />

            {/* Admin Routes */}
            <Route path="/admin/login" element={<Login />} />
            <Route
              path="/admin"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/projects"
              element={
                <ProtectedRoute>
                  <ProjectsList />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/projects/new"
              element={
                <ProtectedRoute>
                  <ProjectNew />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/projects/:id/edit"
              element={
                <ProtectedRoute>
                  <ProjectEdit />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/pricing"
              element={
                <ProtectedRoute>
                  <PricingManagement />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/test"
              element={
                <ProtectedRoute>
                  <SupabaseTest />
                </ProtectedRoute>
              }
            />

            {/* 404 */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AdminAuthProvider>
  </QueryClientProvider>
);

export default App;
